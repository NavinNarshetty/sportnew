var schema = new Schema({
    name: {
        type: String,
        required: true,
        unique: true,
        uniqueCaseInsensitive: true,
        excel: {
            name: "Name"
        }
    }
});

schema.plugin(deepPopulate, {});
schema.plugin(uniqueValidator);
schema.plugin(timestamps);
module.exports = mongoose.model('Gallery', schema);

var exports = _.cloneDeep(require("sails-wohlig-service")(schema));
var model = {

    getPhotosAndVideos: function (data, callback) {
        console.log("data", data);
        async.waterfall([
            function (callback) {
                Gallery.aggregate(
                    // Pipeline
                    [
                        // Stage 1
                        {
                            $lookup: {
                                "from": "events",
                                "localField": "eventId",
                                "foreignField": "_id",
                                "as": "eventData"
                            }
                        },

                        // Stage 2
                        {
                            $unwind: {
                                path: "$eventData",
                                preserveNullAndEmptyArrays: true
                            }
                        },

                        // Stage 3
                        {
                            $match: {
                                "eventData.city": {
                                    $regex: data.city,
                                    $options: "i"
                                }
                            }
                        },

                    ],
                    function (err, foundImages) {
                        console.log("err", err);
                        console.log("found", foundImages);
                        if (err) {
                            callback(err, null);
                        } else {
                            if (!_.isEmpty(foundImages)) {
                                callback(null, foundImages);
                            }

                        }
                    }
                );

            },
            function (foundImages, callback) {
                Media.aggregate(

                    // Pipeline
                    [
                        // Stage 1
                        {
                            $match: {
                                "mediatype": "video"
                            }
                        },

                        // Stage 2
                        {
                            $lookup: {
                                "from": "events",
                                "localField": "eventId",
                                "foreignField": "_id",
                                "as": "eventData"
                            }
                        },

                        // Stage 3
                        {
                            $unwind: {
                                path: "$eventData",
                                preserveNullAndEmptyArrays: true
                            }
                        },

                        // Stage 4
                        {
                            $match: {
                                "eventData.city": {
                                    $regex: data.city,
                                    $options: "i"
                                }
                            }
                        },

                    ],
                    function (err, foundVideos) {
                        var finalData = [];
                        if (err) {
                            callback(err, null);
                        } else {
                            if (!_.isEmpty(foundVideos)) {
                                foundImages = _.shuffle(foundImages);
                                foundImages = _.take(foundImages, 6);
                                foundVideos = _.shuffle(foundVideos);
                                foundVideos = _.take(foundVideos, 3);
                                finalData = _.concat(foundVideos, foundImages);
                                finalData = _.shuffle(finalData);
                                callback(null, finalData);
                            }

                        }
                    });
            }

        ], function (err, finalResult) {
            if (err) {
                callback(err, null);
            } else {
                callback(null, finalResult);
            }
        });


    },


    getSchoolCollegeAlbums: function (data, callback) {
        async.waterfall([
            function (callback) {
                Gallery.aggregate(
                    // Pipeline
                    [
                        // Stage 1
                        {
                            $lookup: {
                                "from": "events",
                                "localField": "eventId",
                                "foreignField": "_id",
                                "as": "eventData"
                            }
                        },

                        // Stage 2
                        {
                            $unwind: {
                                path: "$eventData",
                                preserveNullAndEmptyArrays: true
                            }
                        },

                        // Stage 3
                        {
                            $match: {
                                "eventData.city": {
                                    $regex: data.city,
                                    $options: "i"
                                },
                                "eventData.institutionType": {
                                    $regex: data.institutionType,
                                    $options: "i"
                                }
                            }
                        },
                        // Stage 4
                        {
                            $addFields: {
                                "eventTitle": { $concat: ['SFA', ' ', "$eventData.city", ' ', "$eventData.eventYear"] },


                            }
                        },
                    ], function (err, found) {
                        if (err) {
                            callback(err, null);
                        } else {
                            callback(null, found);
                        }
                    });

            },
            function (finalData, callback) {
                var finalArr = [];
                var obj = {};

                finalData = _.groupBy(finalData, 'eventTitle');
                async.forEachOf(finalData, function (value, key, callback) {
                    if (key) {
                        obj.eventTitle = key;
                        value = _.unionBy(value, 'folderName');
                        obj.totalCount = value.length;
                        obj.mediaLink = value[0].mediaLink;
                        obj.eventData = value[0].eventData;
                        finalArr.push(obj);
                        obj = {};
                    }
                    callback();
                }, function (err) {
                    if (err) {
                        callback(err, 'A file failed to process');
                        console.log('A file failed to process');
                    } else {
                        console.log('All files have been processed successfully');
                        callback(null, finalArr);
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



    

};
module.exports = _.assign(module.exports, exports, model);