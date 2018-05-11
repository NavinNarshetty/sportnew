var schema = new Schema({
    name: {
        type: String,
    },
    sportsListCategory: {
        type: Schema.Types.ObjectId,
        ref: 'SportsListCategory',
        index: true
    },
    isTeam: Boolean,
    filter: [{
        name: String
    }],
    rules: {
        type: Schema.Types.ObjectId,
        ref: 'Rules',
        index: true
    },
    sportType: String,
    maxSelect: Number,
    inactiveimage: String,
    image: String,
    endDate: Date

});

schema.plugin(deepPopulate, {
    populate: {
        'sportsListCategory': {
            select: '_id name'
        },
        'rules': {
            select: '_id name tournamentFormat rulesAndRegulation ageGroupContent ageGroupTable eligibilityContent eligibilityTable tournamentCommittee'
        }
    }
});
schema.plugin(uniqueValidator);
schema.plugin(timestamps);
module.exports = mongoose.model('SportsListSubCategory', schema);

var exports = _.cloneDeep(require("sails-wohlig-service")(schema));
var model = {
    getSportByEvent: function (data, callback) {
        SportsListSubCategory.find({ eventId: { $in: [ObjectId(data.eventId)] } }, function (err, found) {
            if (err) {
                callback(err, null);
            } else if (_.isEmpty(found)) {
                callback(null, []);
            } else {
                callback(null, found);
            }

        });

    },

    getSportsBySportName: function (data, callback) {
        async.waterfall([
            function (callback) {
                SportsListSubCategory.aggregate(

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
                            $match: {
                                "name": data.sportName,
                                "eventData.year": data.eventYear

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

            },
            function (found, callback) {
                // console.log("found", found);
                if (!_.isEmpty(found)) {
                    SportsList.find({ "sportsListSubCategory": ObjectId(found[0]._id) }, "_id").lean().exec(function (err, found) {
                        callback(null, found);
                    });
                } else {
                    callback(null, []);

                }

            },
            function (found, callback) {
                async.concatSeries(found, function (obj, callback) {
                    Sport.find({ "sportslist": ObjectId(obj._id) }).lean().deepPopulate("sportslist sportslist.sportsListSubCategory").exec(function (err, found) {
                        callback(null, found);
                    });

                }, function (err, files) {
                    callback(null, files);
                });
            }
        ], function (err, result) {
            // console.log("result", result.length);
            if (err) {
                callback(err, null);
            } else if (_.isEmpty(result)) {
                callback(null, []);
            } else {
                callback(null, result);
            }

        });
    },
    getTeamSportwiseMedals: function (obj, callback) {
        Medal.aggregate(
            // Pipeline
            [
                // Stage 1
                {
                    $match: {
                        "sport": ObjectId(obj._id)
                    }
                },

                // Stage 2
                {
                    $unwind: {
                        path: "$team",
                        includeArrayIndex: "arrayIndex", // optional
                        preserveNullAndEmptyArrays: false // optional
                    }
                },

                // Stage 3
                {
                    $lookup: {
                        "from": "teamsports",
                        "localField": "team",
                        "foreignField": "_id",
                        "as": "team"
                    }
                },

                // Stage 4
                {
                    $unwind: {
                        path: "$team",
                        includeArrayIndex: "arrayIndex", // optional
                        preserveNullAndEmptyArrays: false // optional
                    }
                },

                // Stage 5
                {
                    $lookup: {
                        "from": "sports",
                        "localField": "sport",
                        "foreignField": "_id",
                        "as": "sport"
                    }
                },

                // Stage 6
                {
                    $unwind: {
                        path: "$sport",
                        includeArrayIndex: "arrayIndex", // optional
                        preserveNullAndEmptyArrays: false // optional
                    }
                },

                // Stage 7
                {
                    $lookup: {
                        "from": "sportslists",
                        "localField": "sport.sportslist",
                        "foreignField": "_id",
                        "as": "sportlistData"
                    }
                },

                // Stage 8
                {
                    $unwind: {
                        path: "$sportlistData",
                        includeArrayIndex: "arrayIndex", // optional
                        preserveNullAndEmptyArrays: false // optional
                    }
                },

                // Stage 9
                {
                    $lookup: {
                        "from": "sportslistsubcategories",
                        "localField": "sportlistData.sportsListSubCategory",
                        "foreignField": "_id",
                        "as": "sportListSubCat"
                    }
                },

                // Stage 10
                {
                    $unwind: {
                        path: "$sportListSubCat",
                        includeArrayIndex: "arrayIndex", // optional
                        preserveNullAndEmptyArrays: false // optional
                    }
                },

                // Stage 11
                {
                    $lookup: {
                        "from": "agegroups",
                        "localField": "sport.ageGroup",
                        "foreignField": "_id",
                        "as": "ageGroupData"
                    }
                },

                // Stage 12
                {
                    $unwind: {
                        path: "$ageGroupData",
                        includeArrayIndex: "arrayIndex", // optional
                        preserveNullAndEmptyArrays: false // optional
                    }
                },

                // Stage 13
                {
                    $lookup: {
                        "from": "weights",
                        "localField": "sport.weight",
                        "foreignField": "_id",
                        "as": "weightData"
                    }
                }
            ], function (err, found) {
                if (err) {
                    callback(err, null);
                } else if (_.isEmpty(found)) {
                    callback(null, []);
                } else {
                    callback(null, found);
                }
            });


    },
    getIndividualSportWiseMedals: function (obj, callback) {
        console.log("obj", obj);
        Medal.aggregate(

            // Pipeline
            [
                // Stage 1
                {
                    $match: {
                        "sport": ObjectId(obj._id)
                    }
                },

                // Stage 2
                {
                    $unwind: {
                        path: "$player",
                        includeArrayIndex: "arrayIndex", // optional
                        preserveNullAndEmptyArrays: false // optional
                    }
                },

                // Stage 3
                {
                    $lookup: {
                        "from": "individualsports",
                        "localField": "player",
                        "foreignField": "athleteId",
                        "as": "player"
                    }
                },

                // Stage 4
                {
                    $unwind: {
                        path: "$player",
                        includeArrayIndex: "arrayIndex", // optional
                        preserveNullAndEmptyArrays: false // optional
                    }
                },

                // Stage 5
                {
                    $unwind: {
                        path: "$player.sport",
                        includeArrayIndex: "arrayIndex", // optional
                        preserveNullAndEmptyArrays: false // optional
                    }
                },

                // Stage 6
                {
                    $lookup: {
                        "from": "sports",
                        "localField": "sport",
                        "foreignField": "_id",
                        "as": "sport"
                    }
                },

                // Stage 7
                {
                    $unwind: {
                        path: "$sport",
                        includeArrayIndex: "arrayIndex", // optional
                        preserveNullAndEmptyArrays: false // optional
                    }
                },

                // Stage 8
                {
                    $lookup: {
                        "from": "sportslists",
                        "localField": "sport.sportslist",
                        "foreignField": "_id",
                        "as": "sportslistData"
                    }
                },

                // Stage 9
                {
                    $unwind: {
                        path: "$sportslistData",
                        includeArrayIndex: "arrayIndex", // optional
                        preserveNullAndEmptyArrays: false // optional
                    }
                },

                // Stage 10
                {
                    $lookup: {
                        "from": "agegroups",
                        "localField": "sport.ageGroup",
                        "foreignField": "_id",
                        "as": "ageGroup"
                    }
                },

                // Stage 11
                {
                    $unwind: {
                        path: "$ageGroup",
                        includeArrayIndex: "arrayIndex", // optional
                        preserveNullAndEmptyArrays: false // optional
                    }
                },

                // Stage 12
                {
                    $lookup: {
                        "from": "weights",
                        "localField": "sport.weight",
                        "foreignField": "_id",
                        "as": "weightData"
                    }
                },

                // Stage 13
                {
                    $lookup: {
                        "from": "atheletes",
                        "localField": "player.athleteId",
                        "foreignField": "_id",
                        "as": "player"
                    }
                },

                // Stage 14
                {
                    $unwind: {
                        path: "$player",
                        includeArrayIndex: "arrayIndex", // optional
                        preserveNullAndEmptyArrays: false // optional
                    }
                },

                // Stage 15
                {
                    $unwind: {
                        path: "$school",
                        includeArrayIndex: "arrayIndex", // optional
                        preserveNullAndEmptyArrays: false // optional
                    }
                }], function (err, found) {
                    if (err) {
                        callback(err, null);
                    } else if (_.isEmpty(found)) {
                        callback(null, []);
                    } else {
                        callback(null, found);
                    }

                });

    },
    getSportWiseMedalWinners: function (data, callback) {
        var isTeam;
        async.waterfall([
            function (callback) {
                SportsListSubCategory.getSportsBySportName(data, callback);
            },
            function (data, callback) {
                // console.log("data", data);
                if (data.length > 0) {
                    isTeam = data[0].sportslist.sportsListSubCategory.isTeam;
                    if (isTeam) {
                        //GET TEAM SPORTS WISE MEDALS
                        async.concatSeries(data, function (obj, callback) {
                            SportsListSubCategory.getTeamSportwiseMedals(obj, callback);

                        }, function (err, files) {
                            callback(null, files);
                        });
                    } else {
                        //GET INDIVIDUAL SPORTS WISE MEDALS
                        console.log("im inndividual");
                        async.concatSeries(data, function (obj, callback) {
                            SportsListSubCategory.getIndividualSportWiseMedals(obj, callback);

                        }, function (err, files) {
                            callback(null, files);
                        });
                    }
                } else {
                    callback(null, []);
                }




            },
            function (data, callback) {
                if (isTeam) {
                    //Team Sport
                    var finalData = _(data)
                        .groupBy('team.teamId')
                        .map(function (items, name) {
                            var subData = _(items)
                                .groupBy('medalType')
                                .map(function (value, name) {
                                    return {
                                        medalName: name,
                                        value: value,
                                        count: value.length
                                    };
                                });
                            return {
                                teamId: name,
                                items: subData,
                                count: items.length
                            };
                        }).value();

                    callback(null, finalData);
                } else {
                    //Individual Sport
                    console.log("Individual sport");
                    var finalData = _(data)
                        .groupBy('player._id')
                        .map(function (items, name) {
                            var subData = _(items)
                                .groupBy('medalType')
                                .map(function (value, name) {
                                    return {
                                        medalName: name,
                                        value: value,
                                        count: value.length
                                    };
                                });
                            return {
                                playerId: name,
                                items: subData,
                                count: items.length
                            };
                        }).value();

                    callback(null, finalData);
                }

            },
            function (data, callback) {
                var finalDataArr = [];
                if (isTeam) {
                    // if isTeam true
                    // TeamSports
                    async.concatSeries(data, function (obj, callback) {
                        async.concatSeries(obj.items, function (value, callback) {
                            SportsListSubCategory.getSchoolDetails(obj, function (err, found) {
                                if (found.length > 0 && found[0].schoolLogo) {
                                    obj.schoolLogo = found[0].schoolLogo;
                                } else {
                                    obj.schoolLogo = '';
                                }

                                if (value.medalName == 'gold') {
                                    obj.gold = value.value.length;
                                } else {
                                    obj.gold = 0;
                                }
                                if (value.medalName == 'silver') {
                                    obj.silver = value.value.length;
                                } else {
                                    obj.silver = 0;
                                }
                                if (value.medalName == 'bronze') {
                                    obj.bronze = value.value.length;
                                } else {
                                    obj.bronze = 0;
                                }

                                var dataObj = {};
                                dataObj.gold = obj.gold;
                                dataObj.silver = obj.silver;
                                dataObj.bronze = obj.bronze;
                                dataObj.teamName = value.value[0].team.schoolName;
                                dataObj.teamId = value.value[0].team.teamId;
                                dataObj.sportName = value.value[0].sportlistData.name;
                                dataObj.ageGroup = value.value[0].ageGroupData.name;
                                dataObj.age = parseInt(value.value[0].ageGroupData.name.slice(2));
                                dataObj.gender = value.value[0].sport.gender;
                                if (value.value[0].weightData && value.value[0].weightData.length > 0) {
                                    dataObj.weightName = value.value[0].weightData[0].name;
                                }
                                if (!isTeam) {
                                    dataObj.sportListSubCat = value.value[0].sportListSubCat.name;
                                }
                                finalDataArr.push(dataObj);
                                callback(null, dataObj);

                            });


                        }, function (err, files) {
                            if (err) {
                                callback(err, null);
                            } else if (_.isEmpty(files)) {
                                callback(null, []);
                            } else {
                                files = files.filter(o => Object.keys(o).length);
                                callback(null, files);
                            }

                        });

                    }, function (err, files) {
                        if (err) {
                            callback(err, null);
                        } else if (_.isEmpty(files)) {
                            callback(null, []);
                        } else {
                            files = _.filter(files, function (o) { return o.gold >= 1; });
                            files = _.orderBy(files, ['gold', 'age'], ['desc', 'desc']);
                            callback(null, files);
                        }
                    });
                } else {
                    //if isTeam false
                    // Individual Sport
                    async.concatSeries(data, function (obj, callback) {
                        async.concatSeries(obj.items, function (value, callback) {
                            if (value.medalName == 'gold') {
                                obj.gold = value.value.length;
                            } else {
                                obj.gold = 0;
                            }
                            if (value.medalName == 'silver') {
                                obj.silver = value.value.length;
                            } else {
                                obj.silver = 0;
                            }
                            if (value.medalName == 'bronze') {
                                obj.bronze = value.value.length;
                            } else {
                                obj.bronze = 0;
                            }

                            var dataObj = {};
                            dataObj.playerId = value.value[0].player._id;
                            dataObj.firstName = value.value[0].player.firstName;
                            dataObj.middleName = value.value[0].player.middleName;
                            dataObj.surname = value.value[0].player.surname;
                            dataObj.profilePic = value.value[0].player.photograph;
                            dataObj.sportName = value.value[0].sportslistData.name;
                            dataObj.ageGroup = value.value[0].ageGroup.name;
                            dataObj.age = parseInt(value.value[0].ageGroup.name.slice(2));
                            dataObj.gender = value.value[0].sport.gender;
                            if (value.value[0].weightData && value.value[0].weightData.length > 0) {
                                dataObj.weightName = value.value[0].weightData[0].name;
                            }
                            dataObj.schoolName = value.value[0].school.schoolName;
                            // if (!isTeam) {
                            //     dataObj.sportListSubCat = value.value[0].sportListSubCat.name;
                            // }
                            dataObj.gold = obj.gold;
                            dataObj.silver = obj.silver;
                            dataObj.bronze = obj.bronze;
                            finalDataArr.push(dataObj);
                            callback(null, dataObj);
                        }, function (err, files) {
                            if (err) {
                                callback(err, null);
                            } else if (_.isEmpty(files)) {
                                callback(null, []);
                            } else {
                                files = files.filter(o => Object.keys(o).length);
                                callback(null, files);
                            }

                        });

                    }, function (err, files) {
                        if (err) {
                            callback(err, null);
                        } else if (_.isEmpty(files)) {
                            callback(null, []);
                        } else {
                            files = _.filter(files, function (o) { return o.gold >= 1; });
                            files = _.orderBy(files, ['gold', 'age'], ['desc', 'desc']);
                            files = _.takeRight(files, 5);
                            callback(null, files);
                        }
                    });

                }


            },
        ], function (err, result) {
            if (err) {
                callback(err, null);
            } else if (_.isEmpty(result)) {
                callback(null, []);
            } else {
                callback(null, result);
            }

        });

    },



    getSchoolDetails: function (data, callback) {
        Registration.find({ schoolName: data.teamName, status: 'Verified' }).lean().exec(function (err, found) {
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