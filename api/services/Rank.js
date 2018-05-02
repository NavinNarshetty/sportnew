var schema = new Schema({
    name: {
        type: String
    },
    medal: {
        "gold": {
            name: String,
            count: Number,
            points: Number
        },
        "silver": {
            name: String,
            count: Number,
            points: Number
        },
        "bronze": {
            name: String,
            count: Number,
            points: Number
        }
    },
    totalCount: Number,
    totalPoints: Number,
    totalMatches: Number,
    sportData: [{
        name: String,
        medals: {
            "gold": {
                name: String,
                count: Number,
                points: Number
            },
            "silver": {
                name: String,
                count: Number,
                points: Number
            },
            "bronze": {
                name: String,
                count: Number,
                points: Number
            }
        },
        count: Number,
        totalCount: Number,
        totalPoints: Number,
    }]
});

schema.plugin(deepPopulate, {});
schema.plugin(uniqueValidator);
schema.plugin(timestamps);
module.exports = mongoose.model('Rank', schema);

var exports = _.cloneDeep(require("sails-wohlig-service")(schema));
var model = {

    getRanksBySport: function (data, callback) {
        Rank.aggregate(
            // Pipeline
            [
                // Stage 1
                {
                    $match: {
                        "eventId": ObjectId(data.eventId),
                        "sportData.name": { $regex: data.sportName, $options: "i" }

                    }
                },

                // Stage 2
                {
                    $project: {
                        "name": 1,
                        "sportData": 1,
                        "eventId": 1
                    }

                },

                // Stage 3
                {
                    $unwind: {
                        path: "$sportData",
                        includeArrayIndex: "arrayIndex", // optional
                        preserveNullAndEmptyArrays: false // optional
                    }

                },

                // Stage 4
                {
                    $match: {
                        "eventId": ObjectId(data.eventId),
                        "sportData.name": { $regex: data.sportName, $options: "i" }

                    }
                },

                // Stage 5
                {
                    $group: {
                        "_id": "$name",
                        "sportData": {
                            $push: "$sportData"
                        },
                        "count": {
                            "$sum": "$sportData.count"
                        },
                        "totalCount": {
                            "$sum": "$sportData.totalCount"
                        },
                        "totalPoints": {
                            "$sum": "$sportData.totalPoints"
                        },
                        "bronzeCount": {
                            "$sum": "$sportData.medals.bronze.count"
                        },
                        "bronzePoints": {
                            "$sum": "$sportData.medals.bronze.points"
                        },
                        "silverCount": {
                            "$sum": "$sportData.medals.silver.count"
                        },
                        "silverPoints": {
                            "$sum": "$sportData.medals.silver.points"
                        },
                        "goldCount": {
                            "$sum": "$sportData.medals.gold.count"
                        },
                        "goldPoints": {
                            "$sum": "$sportData.medals.gold.points"
                        },
                    }
                },

                // Stage 6
                {
                    $sort: {
                        "totalPoints": -1,
                        "goldPoints": -1,
                        "silverPoints": -1,
                        "bronzePoints": -1
                    }
                },

                // Stage 7
                {
                    $unwind: {
                        path: "$sportData",
                        includeArrayIndex: "arrayIndex", // optional
                        preserveNullAndEmptyArrays: false // optional
                    }
                },

            ], function (err, found) {
                if (err) {
                    callback(err, null);
                } else if (_.isEmpty(found)) {
                    callback(null, []);
                } else {
                    callback(null, found);
                }
            });




    }

};
module.exports = _.assign(module.exports, exports, model);