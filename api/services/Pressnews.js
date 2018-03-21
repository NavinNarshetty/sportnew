var schema = new Schema({
    mediaTitle: String,
    newsDate: Date,
    year: String,
    city: String,
    mediaType: String,
    mediaLink: String
});

schema.plugin(deepPopulate, {});
schema.plugin(uniqueValidator);
schema.plugin(timestamps);
module.exports = mongoose.model('Pressnews', schema);

var exports = _.cloneDeep(require("sails-wohlig-service")(schema));
var model = {

    getPressNews: function (data, callback) {
        var finalData = {};
        var maxRow = Config.maxRow;
        var page = 1;
        if (data.page) {
            page = parseInt(data.page);
        }

        var options = {
            start: (page - 1) * maxRow,
            count: maxRow
        };
        if (data) {
            if (data.city && data.city != " " && data.year && data.year != " ") {
                console.log("im in  if city and year");
                async.waterfall([
                    function (callback) {
                        Pressnews.aggregate(
                            // Pipeline
                            [
                                // Stage 1
                                {
                                    $addFields: {
                                        "eventyear": { $year: "$newsDate" }
                                    }
                                },

                                // Stage 2
                                {
                                    $match: {
                                        // "eventyear": parseInt(data.year),
                                        // "city": { $regex: data.city, $options: "i" },

                                        $or: [{
                                            city: {
                                                $regex: data.city,
                                                $options: "i"
                                            }
                                        }, {
                                            city: {
                                                $regex: "allcities",
                                                $options: "i"
                                            }
                                        }],
                                        "eventyear": parseInt(data.year),

                                    }
                                },

                                // Stage 3
                                {
                                    $sort: {
                                        "newsDate": -1
                                    }
                                },

                                // Stage 4
                                {
                                    $skip: options.start

                                },

                                // Stage 5
                                {
                                    $limit: options.count
                                },

                            ], function (err, found) {
                                if (err) {
                                    callback(err, null);
                                } else {
                                    callback(null, found);
                                }
                            }
                        );


                    },
                    function (returnResult, callback) {
                        //GET TOTAL COUNT
                        Pressnews.aggregate(
                            // Pipeline
                            [
                                // Stage 1
                                {
                                    $addFields: {
                                        "eventyear": { $year: "$newsDate" }
                                    }
                                },

                                // Stage 2
                                {
                                    $match: {
                                        // "eventyear": parseInt(data.year),
                                        // "city": { $regex: data.city, $options: "i" }

                                        $or: [{
                                            city: {
                                                $regex: data.city,
                                                $options: "i"
                                            }
                                        }, {
                                            city: {
                                                $regex: "allcities",
                                                $options: "i"
                                            }
                                        }],
                                        "eventyear": parseInt(data.year),
                                    }
                                },

                                // Stage 3
                                {
                                    $sort: {
                                        "newsDate": -1
                                    }
                                },

                                // Stage 4
                                {
                                    $count: "count"

                                }


                            ], function (err, found) {
                                console.log("found", found);
                                console.log("returnResult", returnResult);
                                if (found.length > 0) {
                                    finalData.total = found[0].count;
                                } else {
                                    finalData.total = 0;
                                }
                                finalData.result = returnResult;

                                if (err) {
                                    callback(err, null);
                                } else {
                                    callback(null, finalData);
                                }
                            }
                        );
                    }

                ], function (err, result) {
                    if (err) {
                        callback(err, null);
                    } else {
                        callback(null, result);
                    }

                });

            } else if (data.city || data.year) {
                console.log("im in  else if city or year");
                var pipeline = // Pipeline
                    [
                        // Stage 1
                        {
                            $addFields: {
                                "eventyear": { $year: "$newsDate" }
                            }
                        },

                        // Stage 3
                        {
                            $sort: {
                                "newsDate": -1
                            }
                        },

                        // Stage 4
                        {
                            $skip: options.start

                        },

                        // Stage 5
                        {
                            $limit: options.count
                        },

                    ];

                if (data.city && data.city != " ") {
                    console.log("immi city");
                    pipeline.splice(1, 0, {
                        $match: {
                            // "city": { $regex: data.city, $options: "i" }
                            $or: [{
                                city: {
                                    $regex: data.city,
                                    $options: "i"
                                }
                            }, {
                                city: {
                                    $regex: "allcities",
                                    $options: "i"
                                }
                            }]
                        }
                    });
                } else if (data.year && data.year != " ") {
                    pipeline.splice(1, 0, {
                        $match: {
                            "eventyear": parseInt(data.year)

                        }
                    });
                }
                async.waterfall([
                    function (callback) {
                        console.log("pipeline", pipeline);
                        Pressnews.aggregate(pipeline,
                            function (err, found) {
                                if (err) {
                                    callback(err, null);
                                } else {
                                    callback(null, found);
                                }
                            }
                        );
                    },
                    function (found, callback) {
                        //GET TOTAL COUNT
                        console.log("pipelin Originale", pipeline);
                        finalData.result = found;
                        if (found.length > 0) {
                            pipeline.splice(3, 2);
                            pipeline.push({
                                $count: "count"
                            });
                            Pressnews.aggregate(pipeline, function (err, total) {
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
                console.log("options", options);
                async.waterfall([
                    function (callback) {
                        Pressnews.find().sort({ "newsDate": -1 }).skip(options.start).limit(options.count).lean().exec(function (err, found) {
                            if (err) {
                                callback(err, null);
                            } else {

                                callback(null, found);
                            }

                        });
                    },
                    function (returnResult, callback) {
                        //GET TOTAL COUNT
                        Pressnews.find().count().lean().exec(function (err, totalCount) {
                            console.log("totalCout", totalCount);
                            if (err) {
                                callback(err, null);
                            } else {
                                finalData.result = returnResult;
                                finalData.total = totalCount;
                                callback(null, finalData);
                            }
                        });


                    }

                ], function (err, result) {
                    if (err) {
                        callback(err, null);
                    } else {
                        callback(null, result);
                    }

                });


            }

        }
    }

};
module.exports = _.assign(module.exports, exports, model);