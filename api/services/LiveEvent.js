var schema = new Schema({
    city: String,
    year: Number,
    link: String,
    startDate: Date,
    endDate: Date,
    showProfile: {
        type: Boolean,
        default: false
    }
});

schema.plugin(deepPopulate, {});
schema.plugin(uniqueValidator);
schema.plugin(timestamps);
module.exports = mongoose.model('LiveEvent', schema);

var exports = _.cloneDeep(require("sails-wohlig-service")(schema));
var model = {

    // input {
    //     "city":"Mumbai",
    //     "type":"header/others"
    // }

    liveOrPastEvent: function (data, callback) {
        async.waterfall([
            //Live
            function (callback) {
                if (data.tabName == 'header') {
                    var matchObj = {
                        "city": new RegExp('^' + data.city + '$', "i")
                    }
                } else {
                    var matchObj = {
                        "city": new RegExp('^' + data.city + '$', "i"),
                        "showProfile": true
                    }
                }
                LiveEvent.findOne(matchObj).exec(function (err, event) {
                    if (err) {
                        callback(err, null);
                    } else if (!_.isEmpty(event)) {
                        callback(null, {
                            "live": true,
                            "data": event
                        });
                    } else {
                        callback(null, {
                            "live": false,
                            "data": "No Live Events Found"
                        });
                    }
                });
            },

            //Past
            function (liveRes, callback) {
                Event.getExecutedEvents(function (err, result) {
                    if (err || _.isEmpty(result)) {
                        callback(null, {
                            "past": false,
                            "data": "No Past Events Found"
                        });
                    } else if (!_.isEmpty(result)) {
                        callback(null, {
                            "live": liveRes,
                            "past": {
                                "past": true,
                                "data": result
                            }
                        });
                    }
                });
            }
        ], function (err, final) {
            if (err) {
                callback(err, null);
            } else {
                callback(null, final);
            }
        });
    },

    schoolProfileTabs: function (data, callback) {
        if (data && data.schoolName && data.city) {
            LiveEvent.liveOrPastEvent({
                "city": data.city,
                "type": data.tabName
            }, callback);
        } else {
            callback("Invalid Params", null);
        }
    },

    callLiveDb: function (obj, callback) {
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
            if (!error && response && response.statusCode == 200) {
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
};
module.exports = _.assign(module.exports, exports, model);