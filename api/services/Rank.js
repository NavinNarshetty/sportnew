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
    totalCount: Number, //totalMedalsCount
    totalPoints: Number, //totalMedalsPoint
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
    }],
    eventId: {
        type: Schema.Types.ObjectId,
        ref: 'Event',
        index: true
    }
});

schema.plugin(deepPopulate, {
    populate: {
        'eventId': {
            select: ''
        }
    }
});
schema.plugin(uniqueValidator);
schema.plugin(timestamps);
module.exports = mongoose.model('Rank', schema);

var exports = _.cloneDeep(require("sails-wohlig-service")(schema));
var model = {
    sortingPriority: {
        "totalPoints": -1,
        "medal.gold.points": -1,
        "medal.silver.points": -1,
        "medal.bronze.points": -1,
        "totalMatches": -1
    },

    // schoolList includes school name and its eventId
    // Returns schoolList with its Ranks
    listOfSchoolsWithRank: function (schoolList, callback) {

    },

    //get ranks of particular city - merged sports data like tennis and tennisdoubles,badminton and bandmintondoubles  etc
    getCityRanks: function (data, callback) {

        async.waterfall([

            // get last executed years of cities
            function (callback) {
                Event.getExecutedEvents(function (err, result) {
                    if (err) {
                        callback(err, null);
                    } else {
                        var landingCity = _.find(result, function (n) {
                            return (_.toLower(n._id) == _.toLower(data.city))
                        });
                        if (landingCity) {
                            callback(null, landingCity);
                        } else {
                            callback("City Not Found", null);
                        }
                    }
                });
            },

            // get Ranks of that city
            function (landingCity, callback) {
                var matchObj = {
                    "eventId": ObjectId(landingCity.eventId)
                }

                Rank.find(matchObj).sort(Rank.sortingPriority).lean().exec(function (err, result) {
                    if (err) {
                        callback(err, null);
                    } else if (!_.isEmpty(result)) {
                        callback(null, result);
                    } else {
                        callback("No Ranks Found For This City", null);
                    }
                });
            },

        ], function (err, finalResult) {
            callback(err, finalResult);
        });

    },

    // get top 10 rankers grouped by city name
    getRanksAsPerCity: function (data, callback) {
        // console.log("yes");
        async.waterfall([

            // get last executed years of cities
            function (callback) {
                Event.getExecutedEvents(callback);
            },

            //perform aggregate and get ranks
            function (yearsList, callback) {

                var matchObj = _.map(yearsList, function (n) {
                    return {
                        "eventId": ObjectId(n.eventId)
                    }
                })

                Rank.aggregate([{
                    $match: {
                        $or: matchObj
                    }
                }, {
                    $lookup: {
                        "from": "events",
                        "localField": "eventId",
                        "foreignField": "_id",
                        "as": "eventId"
                    }
                }, {
                    $unwind: {
                        path: "$eventId",
                        preserveNullAndEmptyArrays: false // optional
                    }
                }, {
                    $sort: Rank.sortingPriority
                }, {
                    $group: {
                        "_id": "$eventId._id",
                        "year": {
                            $first: "$eventId.year"
                        },
                        "city": {
                            $first: "$eventId.city"
                        },
                        "ranks": {
                            $push: {
                                "schoolName": "$name"
                            }
                        }
                    }
                }, {
                    $project: {
                        "_id": 1,
                        "year": 1,
                        "city": 1,
                        "totalSchools": {
                            $size: "$ranks"
                        },
                        "ranks": {
                            "$slice": ["$ranks", 0, 10]
                        }
                    }
                }], function (err, result) {
                    async.concatSeries(result, function (item, callback) {
                        var listOfSchoolNames = _.map(item.ranks, 'schoolName');

                        Registration.getListOfSchools(listOfSchoolNames, function (err, list) {
                            async.forEachOf(item.ranks, function (school, key, callback) {
                                editSchool = _.find(list, ['schoolName', school.schoolName]);
                                if (!_.isEmpty(editSchool)) {
                                    school.schoolLogo = editSchool.schoolLogo;
                                    school.sfaID = editSchool.sfaID;
                                    school.rank = key + 1;
                                }
                                callback();
                            }, function (err) {
                                if (err) {
                                    callback(err, null);
                                } else {
                                    callback(null, item);
                                }
                            });
                        });
                    }, function (err, finalResult) {
                        callback(err, finalResult);
                    });

                });
            }

        ], callback);
    },

    getCityLanding: function (data, callback) {
        var sendObj = {};
        var schoolRanks = [];
        var landingCity = {};
        var temp;

        function checkForContingent(arr, callback) {
            var matchObj = {
                $or: arr
            };

            Reportcard.find(matchObj).sort({
                "totalStrength": -1
            }).exec(function (err, result) {
                if (err) {
                    callback(err, null);
                } else {
                    var lastIndex = 0;
                    for (i = 0; i < result.length - 1; i++) {

                        if (result[i].totalStrength == result[i + 1].totalStrength) {
                            lastIndex = i + 1;
                            continue;
                        } else {
                            lastIndex = i;
                            break;
                        }

                    }
                    // console.log("matched school with contingent count--", lastIndex + 1);
                    callback(null, result.slice(0, lastIndex + 1));
                }
            });
        };

        function checkForRanks(arr, callback) {
            var schoolsSame = _.intersectionBy(_.cloneDeep(schoolRanks), arr, 'name');
            schoolsSame = _.sortBy(schoolsSame, ['rank']);
            callback(null, schoolsSame[0]);
        };

        function getMaxGSBWon(medalType, callback) {
            var matchObj = {
                "eventId": ObjectId(landingCity.eventId)
            }

            var sortObj;
            if (medalType == "gold") {
                sortObj = {
                    "medal.gold.count": -1
                }
            } else if (medalType == "silver") {
                sortObj = {
                    "medal.silver.count": -1
                }
            } else {
                sortObj = {
                    "medal.bronze.count": -1
                }
            }

            Rank.find(matchObj).sort(sortObj).lean().exec(function (err, totalCountArr) {
                if (err) {
                    callback(err, null)
                } else {
                    var lastIndex;
                    for (i = 0; i < totalCountArr.length - 1; i++) {
                        if (totalCountArr[i].medal[medalType].count == totalCountArr[i + 1].medal[medalType].count) {
                            lastIndex = i + 1;
                            continue;
                        } else {
                            lastIndex = i;
                            break;
                        }
                    }
                    // console.log("matched school with total medals count--", lastIndex + 1);
                    if (lastIndex == 0) {
                        temp = _.find(_.cloneDeep(schoolRanks), ['name', totalCountArr[0].name]);
                        totalCountArr[0].rank = temp.rank;
                        callback(null, totalCountArr[0]);
                    } else {
                        var schoolsTotalCountSame = totalCountArr.slice(0, lastIndex + 1);
                        var reportArr = _.map(schoolsTotalCountSame, function (n) {
                            return {
                                "schoolName": n.name,
                                "eventId": n.eventId
                            }
                        });
                        checkForContingent(reportArr, function (err, reports) {
                            if (err) {
                                callback(err, null);
                            } else if (!_.isEmpty(reports)) {
                                if (reports.length == 1) {
                                    var school = _.find(schoolsTotalCountSame, ['name', reports[0].schoolName])
                                    school.contingent = reports[0].totalStrength;
                                    temp = _.find(_.cloneDeep(schoolRanks), ['name', reports[0].schoolName]);
                                    // console.log("reports[0]", reports[0]);
                                    school.rank = temp.rank;
                                    // sendObj.maxMedalsWon.maxGoldMedalsWon = school
                                    callback(null, school);
                                } else {
                                    var reportSchools = _.map(reports, function (n) {
                                        return {
                                            "name": n.schoolName
                                        }
                                    });
                                    var schools = _.intersectionBy(schoolsTotalCountSame, reportSchools, 'name');
                                    var rankArr = _.map(schools, function (n) {
                                        return {
                                            "name": n.name
                                        }
                                    })
                                    checkForRanks(rankArr, function (err, topSchool) {
                                        // sendObj.maxMedalsWon.maxGoldMedalsWon = topSchool
                                        if (err) {
                                            callback(err, null)
                                        } else {
                                            temp = _.find(_.cloneDeep(schoolRanks), ['name', topSchool.name]);
                                            topSchool.rank = temp.rank;
                                            callback(null, topSchool);
                                        }
                                    })
                                }
                            } else {
                                //if not even a single reportcard card is found of schools with same totalCount
                                // sendObj.maxMedalsWon.maxGoldMedalsWon = schoolsTotalCountSame[0]
                                temp = _.find(_.cloneDeep(schoolRanks), ['name', schoolsTotalCountSame[0].name]);
                                schoolsTotalCountSame[0].rank = temp.rank;
                                callback(null, schoolsTotalCountSame[0]);
                            }

                        });
                    }
                }
            });
        };

        async.waterfall([

            // get landing City eventId
            function (callback) {
                Event.getExecutedEvents(function (err, result) {
                    if (err) {
                        callback(err, null);
                    } else {
                        landingCity = _.find(result, function (n) {
                            return (_.toLower(n._id) == _.toLower(data.city))
                        });
                        if (landingCity) {
                            callback();
                        } else {
                            callback("City Not Found", null);
                        }
                    }
                });
            },

            // sort school by ranks
            function (callback) {
                Rank.find({
                    "eventId": landingCity.eventId
                }).sort(Rank.sortingPriority).lean().exec(function (err, ranks) {
                    if (err) {
                        callback(err, null);
                    } else if (!_.isEmpty(ranks)) {
                        _.each(ranks, function (n, i) {
                            n.rank = i + 1
                        });
                        schoolRanks = ranks;
                        callback();
                    } else {
                        callback("No Ranks Found For This City", null);
                    }
                });
            },

            // get school with Maxmimum total medals won
            function (callback) {
                var matchObj = {
                    "eventId": ObjectId(landingCity.eventId)
                }
                Rank.find(matchObj).sort({
                    "totalCount": -1
                }).lean().exec(function (err, totalCountArr) {
                    if (err) {
                        callback(err, null)
                    } else {
                        var lastIndex = 0;
                        for (i = 0; i < totalCountArr.length - 1; i++) {
                            if (totalCountArr[i].totalCount == totalCountArr[i + 1].totalCount) {
                                lastIndex = i + 1;
                                continue;
                            } else {
                                lastIndex = i;
                                break;
                            }
                        }
                        // console.log("matched school with total medals count--", lastIndex + 1);
                        console.log("lastIndex",lastIndex);
                        if (lastIndex == 0) {
                            sendObj.maxMedalsWon = {
                                "maxTotal": totalCountArr[0]
                            }
                        } else {
                            var schoolsTotalCountSame = totalCountArr.slice(0, lastIndex + 1);
                            var reportArr = _.map(schoolsTotalCountSame, function (n) {
                                return {
                                    "schoolName": n.name,
                                    "eventId": n.eventId
                                }
                            });
                            checkForContingent(reportArr, function (err, reports) {
                                if (err) {
                                    callback(err, null);
                                } else if (!_.isEmpty(reports)) {
                                    console.log("reports",reports.length);
                                    if (reports.length == 1) {
                                        var school = _.find(schoolsTotalCountSame, ['name', reports[0].schoolName])
                                        school.contingent = reports[0].totalStrength;
                                        sendObj.maxMedalsWon = {
                                            "maxTotal": school
                                        }
                                    } else {
                                        var reportSchools = _.map(reports, function (n) {
                                            return {
                                                "name": n.schoolName
                                            }
                                        });
                                        var schools = _.intersectionBy(schoolsTotalCountSame, reportSchools, 'name');
                                        var rankArr = _.map(schools, function (n) {
                                            return {
                                                "name": n.name
                                            }
                                        })
                                        checkForRanks(rankArr, function (err, topSchool) {
                                            if (err) {
                                                callback(err, null);
                                            } else {
                                                sendObj.maxMedalsWon = {
                                                    "maxTotal": topSchool
                                                }
                                            }
                                        })
                                    }
                                } else {
                                    //if not even a single reportcard card is found of schools with same totalCount
                                    sendObj.maxMedalsWon = {
                                        "maxTotal": schoolsTotalCountSame[0]
                                    }
                                }
                            });
                        }
                        callback();
                    }
                });
            },

            // get school with Maxmimum Gold medals won
            function (callback) {
                getMaxGSBWon('gold', function (err, school) {
                    if (err) {
                        callback(err, null);
                    } else {
                        sendObj.maxMedalsWon.maxGold = school
                        callback();
                    }
                })
            },

            // get school with Maxmimum Silver medals won            
            function (callback) {
                getMaxGSBWon('silver', function (err, school) {
                    if (err) {
                        callback(err, null);
                    } else {
                        sendObj.maxMedalsWon.maxSilver = school
                        callback();
                    }
                })
            },

            // get school with Maxmimum Bronze medals won            
            function (callback) {
                getMaxGSBWon('bronze', function (err, school) {
                    if (err) {
                        callback(err, null);
                    } else {
                        sendObj.maxMedalsWon.maxBronze = school
                        callback();
                    }
                })
            },

            // now Get sfaID of all schools medal won
            function(callback){
                _.each(sendObj.maxMedalsWon,function(n,i){
                    if(n && n.name){
                        n.schoolName=n.name;
                        delete n.name;
                        delete n.sportData;
                        Registration.findOne({
                            "schoolName":n.schoolName
                        }).exec(function(err,result){
                            if(err){
                                callback(err,null);
                            }else{
                                n.sfaID = result.sfaID;
                                n.schoolLogo = result.schoolLogo;
                            }
                        });
                    }
                });
                callback();
            },

            // get max sport participation school
            function (callback) {
                Rank.find({
                    "eventId": landingCity.eventId
                }).sort(Rank.sortingPriority).lean().exec(function (err, data) {
                    var sportsToMerge = ['Tennis', 'Badminton', 'Table Tennis', 'Athletics', 'Swimming']
                    var sportsFound = [];
                    var arr = [];

                    async.concatSeries(data, function (singleData, callback) {

                        _.each(sportsToMerge, function (sportName, key) {


                            singleData[sportName] = _.filter(singleData.sportData, function (sport) {
                                // console.log(sport.name.indexOf(sportName) == 0);
                                if (sport.name.indexOf(sportName) != -1 && !sport.name.indexOf(sportName) > 0) {
                                    return sport;
                                }
                            })

                            if (!_.isEmpty(singleData[sportName])) {
                                var obj = {
                                    _ids: {},
                                    name: sportName,
                                    count: 0,
                                    totalCount: 0,
                                    totalPoints: 0,
                                    medals: {
                                        bronze: {
                                            name: "bronze",
                                            count: 0,
                                            points: 0
                                        },
                                        silver: {
                                            name: "silver",
                                            count: 0,
                                            points: 0
                                        },
                                        gold: {
                                            name: "gold",
                                            count: 0,
                                            points: 0
                                        }
                                    }
                                }
                                _.each(singleData[sportName], function (n) {
                                    n.removeElement = true;
                                });

                                singleData.sportData.push(obj);
                            }
                            delete singleData[sportName];
                            singleData.sportData = _.filter(singleData.sportData, function (n) {
                                return !n.removeElement;
                            });
                            singleData.totalParticipatedSport = singleData.sportData.length;
                            if (sportsToMerge.length - 1 == key) {
                                callback(null, singleData);
                            }

                        });

                    }, function (err, result) {
                        if (err) {
                            callback(err, null);
                        } else {
                            result = _.orderBy(result, ['totalParticipatedSport'], ['desc']);
                            result = result.slice(0, 3);
                            var matchArr = _.map(result, function (n) {
                                return {
                                    "schoolName": n.name,
                                    "eventId": n.eventId
                                }
                            });
                            Reportcard.find({
                                $or: matchArr
                            }).sort({
                                "totalStrength": -1
                            }).exec(function (err, report) {
                                if (err) {
                                    callback(err, null);
                                } else {
                                    _.each(report, function (n, i) {
                                        var f1 = _.find(result, ['name', n.schoolName]);
                                        f1.contingent = n.totalStrength;
                                        f1.sfaID = n.sfaId;
                                    });

                                    result = _.map(result, function (n) {
                                        // n.rank = _.find(schoolRanks, ['name', n.name]).rank;
                                        temp = _.find(_.cloneDeep(schoolRanks), ['name', n.name]);
                                        
                                        if(temp){
                                            n.rank = temp.rank;
                                            n.schoolName = n.name;
                                            n=_.omit(n,['sportData','medal','createdAt','createdAt','name']);
                                            return n;
                                        }else{
                                            console.log("n.name",n.name);
                                        }
                                    });
                                    result = _.orderBy(result, ['totalParticipatedSport', 'contingent', 'rank'], ['desc', 'desc', 'desc']);

                                    sendObj.maxParticipatedSport = result;
                                    callback();
                                }
                            });
                        }
                    });
                });
            },

            // get Highest Win Percentage School
            function (callback) {

                Reportcard.find({
                    "eventId": ObjectId(landingCity.eventId),
                    "totalMatches": {
                        $gte: 50
                    }
                }).sort({
                    "winPercent": -1,
                    "totalMatches": -1
                }).skip(0).limit(3).exec(function (err, result) {
                    if (err) {
                        callback(err, null);
                    } else {
                        result = _.map(result, function (n) {
                            var rank = _.find(_.cloneDeep(schoolRanks), ['name', n.schoolName]);
                            if (rank) {
                                rank.winPercent = n.winPercent,
                                rank.sfaID = n.sfaId,
                                rank.schoolName = rank.name
                            }
                            rank = _.omit(rank,['sportData','medal','createdAt','createdAt','name']);
                            return rank;
                        });
                        sendObj.maxWinPercentage = result;
                        callback();
                    }
                });
            },

            // get largetst contingent School
            function (callback) {
                Reportcard.find({
                    "eventId": ObjectId(landingCity.eventId)
                }).sort({
                    "totalStrength": -1
                }).skip(0).limit(3).lean().exec(function (err, result) {
                    if(err){
                        callback(err,null);
                    }else{
                        result = _.map(result, function (n) {
                            var contingent = _.find(_.cloneDeep(schoolRanks), ['name', n.schoolName]);
                            if (contingent) {
                                contingent.totalStrength = n.totalStrength;
                                contingent.maleCount = n.maleCount;
                                contingent.femaleCount = n.femaleCount;
                                contingent.schoolName = contingent.name;
                                contingent.sfaID = n.sfaId;
                            }
                            contingent = _.omit(contingent,['sportData','medal','createdAt','createdAt','name']);
                            return contingent;
                        });
                        sendObj.maxContingent = _.orderBy(result,['totalStrength','rank'],['desc','desc']);
                        callback();
                    }
                });
            }

        ], function (err, finalResult) {
            if (err) {
                callback(err, null);
            } else {
                callback(null, sendObj);
            }
        });
    },

    getRanksBySport: function (data, callback) {
        Rank.aggregate(
            // Pipeline
            [
                // Stage 1
                {
                    $match: {
                        "eventId": ObjectId(data.eventId),
                        "sportData.name": {
                            $regex: data.sportName,
                            $options: "i"
                        }

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
                        "sportData.name": {
                            $regex: data.sportName,
                            $options: "i"
                        }

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

            ],
            function (err, found) {
                if (err) {
                    callback(err, null);
                } else if (_.isEmpty(found)) {
                    callback(null, []);
                } else {
                    callback(null, found);
                }
            });




    },



};
module.exports = _.assign(module.exports, exports, model);