var controller = {
    //params--{"city":"MUMBAI/AHMEDABAD/HYDERABAD/'ALL'"} Empty string to get Profiles of all cities 
    search: function (req, res) {
        if (req.body && req.body.city && _.has(req.body, 'keyword')) {
            if (req.body.keyword) {
                Registration.searchByCity(req.body, res.callback);
            } else {
                res.json({
                    value: true,
                    data: []
                });
            }
        } else {
            res.json({
                value: false,
                data: "Invalid Params-G"
            });
        }
    },

    getRanksLanding: function (req, res) {
        Rank.getRanksAsPerCity(req.body, res.callback);
    },

    getCityLanding: function (req, res) {
        if (req.body && req.body.city) {
            Rank.getCityLanding(req.body, res.callback);
        } else {
            res.json({
                value: false,
                data: "Invalid Params"
            });
        }
    },

    getHeader: function (req, res) {
        var school = {};
        var event = {};

        if (req.body && req.body.schoolName && req.body.city) {

            function headerFromLive(obj, callback) {
                // obj{
                //     "schoolName":"school",
                //     "url":"url"
                // }
                var headers = {
                    'Content-Type': 'application/x-www-form-urlencoded'
                }

                var options = {
                    url: obj.url,
                    method: 'POST',
                    headers: headers,
                    form: {
                        schoolName: obj.schoolName,
                    }
                }

                request(options, function (error, response, body) {
                    if (!error && response.statusCode == 200) {
                        var b = JSON.parse(body);
                        if (b.value) {
                            callback(null, b.data);
                        } else {
                            callback(b.error, null);
                        }
                    } else {
                        callback("Something Went Wrong", null);
                    }
                })
            }

            Registration.findOne({
                "schoolName": req.body.schoolName
            }).exec(function (err, result) {
                if (err) {
                    res.callback(err, null);
                } else if (!_.isEmpty(result)) {

                    school = result;
                    async.waterfall([

                        function (callback) {
                            LiveEvent.liveOrPastEvent({
                                "city": req.body.city,
                                "tabName": "header"
                            }, callback);
                        },

                        function (liveOrPast, callback) {
                            if (liveOrPast.live && liveOrPast.live.live) {
                                event = liveOrPast.live.data;
                                event.location = 'live';
                                callback(null, liveOrPast);
                            } else {
                                Event.findOne({
                                    "city": new RegExp('^' + req.body.city + '$', "i"),
                                    "year": school.currentYear
                                }).exec(function (err, result) {
                                    if (err) {
                                        callback(err, null);
                                    } else if (!_.isEmpty(result)) {
                                        event = result;
                                        event.location = "past";
                                        callback(null, liveOrPast);
                                    } else {
                                        callback("School Not Found", null);
                                    }
                                });
                            }
                        },

                        function (liveOrPast, callback) {
                            var matchObj = {
                                school: school,
                                event: event
                            }

                            if (event.location == 'live') {
                                console.log("event.link", event.link);
                                LiveEvent.callLiveDb({
                                    url: event.link + "/rank/getProfile",
                                    schoolName: school.schoolName
                                }, function (err, liveResp) {
                                    if (err) {
                                        if (err == "Not Found") {
                                            Rank.getProfile({
                                                school: school,
                                                event: liveOrPast.past.data
                                            }, function (err, result) {
                                                if (err) {
                                                    callback(err, null);
                                                } else {
                                                    liveResp.flag = "0"
                                                    result.location = 'past'
                                                    callback(null, result);
                                                }
                                            });
                                        } else {
                                            callback(err, null);
                                        }
                                    } else {
                                        liveResp.flag = "1"
                                        callback(null, liveResp);
                                    }
                                });
                            } else if (event.location == 'past') {
                                Rank.getProfile(matchObj, function (err, result) {
                                    if (err) {
                                        callback(err, null);
                                    } else {
                                        result.flag = "0";
                                        result.location = 'past';
                                        callback(null, result);
                                    }
                                });
                            } else {
                                callback("Internel Error", null);
                            }
                        }

                    ], function (err, final) {
                        if (err) {
                            res.callback(err, null);
                        } else {
                            res.callback(null, final);
                        }
                    });

                } else {

                    //find on live
                    LiveEvent.find({
                        "city": new RegExp('^' + req.body.city + '$', "i"),
                    }).sort({
                        year: -1
                    }).exec(function (err, result) {
                        if (err) {
                            res.callback(err, null);
                        } else if (!_.isEmpty(result)) {
                            var matchObj = {
                                url: result[0].link + "/rank/getProfile",
                                schoolName: req.body.schoolName
                            }

                            LiveEvent.callLiveDb(matchObj, function (err, liveResp) {
                                if (err) {
                                    if (err == "Not Found") {
                                        res.callback("School Not Found", null);
                                    } else {
                                        res.callback(err, null);
                                    }
                                } else {
                                    liveResp.flag = "1";
                                    liveResp.location = 'live';
                                    res.callback(null, liveResp);
                                }
                            });
                        } else {
                            res.callback("School Not Found", null);
                        }
                    });
                }
            });

        } else {
            res.json({
                "data": "Invalid Params",
                "value": false
            });
        }
    },

    getHighlights: function (req, res) {
        var event={};
        var sendObj={};
        async.waterfall([

            // check which data, Live/Past is to be shown
            function (callback) {
                req.body.tabName = "Highlights";
                LiveEvent.schoolProfileTabs(req.body, callback)
            },

            function (liveOrPast, callback) {
                if (liveOrPast.live.live) {
                    event = liveOrPast.live.data;
                    sendObj.year = event.year;
                    var matchObj = {
                        url: liveOrPast.live.data.link + "/registration/getHighlights",
                        schoolName: req.body.schoolName
                    }
                    LiveEvent.callLiveDb(matchObj, callback);
                } else {
                    //Get Past Data
                }
            }

        ], res.callback);
    },

    getTrackRecord: function (req, res) {
        async.waterfall([

            // check which data Live/Past data is to be shown
            function (callback) {
                req.body.tabName = "Track Record";
                LiveEvent.schoolProfileTabs(req.body, callback)
            },

            function (liveOrPast, callback) {
                if (liveOrPast.live.live) {
                    if (liveOrPast.live.live) {
                        var matchObj = {
                            url: liveOrPast.live.data.link + "/registration/getTrackRecord",
                            schoolName: req.body.schoolName
                        }
                        LiveEvent.callLiveDb(matchObj, callback);
                    } else {
                        //Get Past Data
                    }
                } else {
                    //Get Past Data
                }
            }

        ], res.callback);
    },

    geTeam: function (req, res) {
        async.waterfall([

            // check which data Live/Past data is to be shown
            function (callback) {
                req.body.tabName = "Team";
                LiveEvent.schoolProfileTabs(req.body, callback)
            },

            function (liveOrPast, callback) {
                if (liveOrPast.live.live) {
                    if (liveOrPast.live.live) {
                        var matchObj = {
                            url: liveOrPast.live.data.link + "/registration/geTeam",
                            schoolName: req.body.schoolName
                        }
                        LiveEvent.callLiveDb(matchObj, callback);
                    } else {
                        //Get Past Data
                    }
                } else {
                    //Get Past Data
                }
            }

        ], res.callback);
    },

    getStatistics: function (req, res) {
        async.waterfall([

            // check which data Live/Past data is to be shown
            function (callback) {
                req.body.tabName = "Statistics";
                LiveEvent.schoolProfileTabs(req.body, callback)
            },

            function (liveOrPast, callback) {
                if (liveOrPast.live.live) {
                    if (liveOrPast.live.live) {
                        var matchObj = {
                            url: liveOrPast.live.data.link + "/registration/getStatistics",
                            schoolName: req.body.schoolName
                        }
                        LiveEvent.callLiveDb(matchObj, callback);
                    } else {
                        //Get Past Data
                    }
                } else {
                    //Get Past Data
                }
            }

        ], res.callback);
    },

    getAchievements: function (req, res) {
        async.waterfall([

            // check which data Live/Past data is to be shown
            function (callback) {
                req.body.tabName = "Achievements";
                LiveEvent.schoolProfileTabs(req.body, callback)
            },

            function (liveOrPast, callback) {
                if (liveOrPast.live.live) {
                    if (liveOrPast.live.live) {
                        var matchObj = {
                            url: liveOrPast.live.data.link + "/registration/getAchievements",
                            schoolName: req.body.schoolName
                        }
                        LiveEvent.callLiveDb(matchObj, callback);
                    } else {
                        //Get Past Data
                    }
                } else {
                    //Get Past Data
                }
            }

        ], res.callback);
    },

    getVideo: function (req, res) {
        async.waterfall([

            // check which data Live/Past data is to be shown
            function (callback) {
                req.body.tabName = "Video";
                LiveEvent.schoolProfileTabs(req.body, callback)
            },

            function (liveOrPast, callback) {
                if (liveOrPast.live.live) {
                    if (liveOrPast.live.live) {
                        var matchObj = {
                            url: liveOrPast.live.data.link + "/registration/getVideo",
                            schoolName: req.body.schoolName
                        }
                        LiveEvent.callLiveDb(matchObj, callback);
                    } else {
                        //Get Past Data
                    }
                } else {
                    //Get Past Data
                }
            }

        ], res.callback);
    },


}
module.exports = _.assign(module.exports, controller);