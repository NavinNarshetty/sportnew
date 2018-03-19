var schema = new Schema({
    releaseDate: Date,
    city: String,
    title: String,
    description: String,
    content: String,
    year: String,
    monthYear: String
});

schema.plugin(deepPopulate, {});
schema.plugin(uniqueValidator);
schema.plugin(timestamps);
module.exports = mongoose.model('Pressrelease', schema);

var exports = _.cloneDeep(require("sails-wohlig-service")(schema));
var model = {
    savePressrelease: function (data, callback) {
        //    var obj=
        if (data) {
            data.year = moment(data.releaseDate).subtract(1, "days").format('YYYY');
            data.monthYear = moment(data.releaseDate).subtract(1, "days").format('MMMM YYYY');
            console.log("data", data);
            Pressrelease.saveData(data, function (err, saved) {
                if (err) {
                    callback(err, null);
                } else {
                    callback(null, saved);
                }

            });
        }

    },

    getAggregatePipeline: function () {
        var returnPipeline =
            // Pipeline
            [
                // Stage 1
                {
                    $sort: {
                        releaseDate: -1
                    }
                },

                // Stage 2
                {
                    $group: {
                        _id: {
                            year: {
                                $year: "$releaseDate"
                            },
                            month: {
                                $month: "$releaseDate"
                            },
                            monthyear: "$monthYear"
                        },
                        newsArr: {
                            $push: {
                                "year": "$year",
                                "monthYear": "$monthYear",
                                "city": "$city",
                                "content": "$content",
                                "title": "$title",
                                "releaseDate": "$releaseDate"
                            }
                        }
                    }
                },

                // Stage 3
                {
                    $sort: {
                        "_id.year": -1,
                        "_id.month": -1,

                    }
                }
            ];

        return returnPipeline;

    },

    getPressMediaRelease: function (data, callback) {
        var maxLimit = 2;
        var page = 1;
        if (data.page) {
            page = parseInt(data.page);
        }
        var options = {
            start: (page - 1) * maxLimit,
            count: maxLimit
        };

        if (data.city && data.city != '' && data.city != 'all' && data.year && data.year != '') {
            console.log("im in  if");
            var pipelineOne;
            async.waterfall([
                function (callback) {
                    pipelineOne = Pressrelease.getAggregatePipeline();
                    pipelineOne.splice(0, 0, {
                        $match: {
                            city: {
                                $regex: data.city,
                                $options: "i"
                            },
                            year: data.year
                        }
                    });

                    pipelineOne.push({
                        $skip: options.start
                    }, {
                        $limit: options.count
                    });
                    Pressrelease.aggregate(pipelineOne, function (err, found) {
                        if (err) {
                            callback(err, null);
                        } else {
                            callback(null, found);
                        }
                    });
                },
                function (found, callback) {
                    //GET TOTAL COUNT
                    var finalData = {};
                    finalData.result = found;
                    if (found.length > 0) {
                        pipelineOne.splice(4, 2);
                        pipelineOne.push({
                            $count: "count"
                        });
                        Pressrelease.aggregate(pipelineOne, function (err, total) {
                            if (err) {
                                callback(err, null);
                            } else {
                                finalData.total = total[0].count;
                                callback(null, finalData);

                            }
                        });
                    } else {
                        callback(null, finalData);
                    }


                }
            ], function (err, result) {
                if (err) {
                    callback(err, null);
                } else {
                    callback(null, result);
                }

            });
        } else if (data.city || data.year) {
            console.log("im in  else if");
            var cityOrYearWisePipeline = Pressrelease.getAggregatePipeline();
            cityOrYearWisePipeline.splice(0, 0, {
                $match: {
                    $or: [{
                        city: {
                            $regex: data.city,
                            $options: "i"
                        }
                    }, {
                        year: data.year
                    }]
                }
            });
            async.waterfall([
                function (callback) {
                    cityOrYearWisePipeline.push({
                        $skip: options.start
                    }, {
                        $limit: options.count
                    });
                    Pressrelease.aggregate(cityOrYearWisePipeline, function (err, found) {
                        if (err) {
                            callback(err, null);
                        } else {
                            callback(null, found);
                        }
                    });
                },
                function (found, callback) {
                    //GET TOTAL COUNT
                    var finalData = {};
                    finalData.result = found;
                    if (found.length > 0) {
                        cityOrYearWisePipeline.splice(4, 2);
                        cityOrYearWisePipeline.push({
                            $count: "count"
                        });
                        Pressrelease.aggregate(cityOrYearWisePipeline, function (err, total) {
                            if (err) {
                                callback(err, null);
                            } else {
                                finalData.total = total[0].count;
                                callback(null, finalData);
                            }
                        });
                    } else {
                        callback(null, finalData);
                    }



                }
            ], function (err, result) {
                if (err) {
                    callback(err, null);
                } else {
                    callback(null, result);
                }
            });


        } else {
            console.log("im in else");
            async.waterfall([
                function (callback) {
                    var pipelineOne = Pressrelease.getAggregatePipeline();
                    pipelineOne.push({
                        $skip: options.start
                    }, {
                        $limit: options.count
                    });
                    Pressrelease.aggregate(pipelineOne,
                        function (err, returnResult) {
                            if (err) {
                                callback(err, null);
                            } else {
                                callback(null, returnResult);
                            }
                        }
                    );


                },
                function (returnResult, callback) {
                    //GET TOTAL COUNT
                    var finalData = {};
                    finalData.result = returnResult;
                    var getCountPipeline = Pressrelease.getAggregatePipeline();
                    if (returnResult.length > 0) {
                        getCountPipeline.push({
                            $count: "count"
                        });
                        Pressrelease.aggregate(getCountPipeline, function (err, total) {
                            if (err) {
                                callback(err, null);
                            } else {
                                finalData.total = total[0].count;
                                callback(null, finalData);
                            }
                        });
                    } else {
                        callback(null, finalData);
                    }



                }

            ], function (err, result) {
                if (err) {
                    callback(err, null);
                } else {
                    callback(null, result);
                }

            });
        }

    },


};
module.exports = _.assign(module.exports, exports, model);