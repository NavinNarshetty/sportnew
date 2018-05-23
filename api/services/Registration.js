var schema = new Schema({
    registerID: Number,
    eventCity: String,
    institutionType: {
        type: String,
    },
    receiptId: Number,
    sfaID: {
        type: String,
        default: ""
    },
    status: {
        type: String,
        default: "Pending"
    },
    password: String,
    currentYear: String,
    year: [{
        type: String
    }],
    schoolName: String,
    schoolType: String,
    schoolCategory: String,
    affiliatedBoard: String,
    schoolLogo: String,
    schoolAddress: String,
    schoolAddressLine2: String,
    state: String,
    district: String,
    city: String,
    locality: String,
    pinCode: String,
    contactPerson: String,
    landline: String,
    email: String,
    website: String,
    mobile: String,
    enterOTP: String,
    schoolPrincipalName: String,
    schoolPrincipalMobile: String,
    schoolPrincipalLandline: String,
    schoolPrincipalEmail: String,
    sportsDepartment: [{
        name: String,
        designation: String,
        mobile: String,
        email: String,
        photograph: String
    }],

    teamSports: [{
        name: {
            type: String
        }
    }],
    racquetSports: [{
        name: {
            type: String
        }
    }],
    aquaticsSports: [{
        name: {
            type: String
        }
    }],
    combatSports: [{
        name: {
            type: String
        }
    }],
    targetSports: [{
        name: {
            type: String
        }
    }],
    individualSports: [{
        name: {
            type: String
        }
    }],
    registrationFee: String,
    paymentStatus: {
        type: String,
        default: "Pending"
    },
    verifyCount: {
        type: Number,
        default: 0,
    },
    transactionID: {
        type: String,
    },
    verifiedDate: Date,
    remarks: String,
    accessToken: String,
    utm_medium: String,
    utm_source: String,
    utm_campaign: String,
    panNo: String,
    gstNo: String,
    oldId: {
        type: Schema.Types.ObjectId,
        ref: 'OldRegistration',
        index: true
    }
});

schema.plugin(deepPopulate, {});
schema.plugin(uniqueValidator);
schema.plugin(timestamps);
module.exports = mongoose.model('Registration', schema);

var exports = _.cloneDeep(require("sails-wohlig-service")(schema));
var model = {

    search: function (data, callback) {

        var Model = this;
        var Const = this(data);
        var maxRow = Config.maxRow;

        var page = 1;
        if (data.page) {
            page = data.page;
        }
        var field = data.field;
        var options = {
            field: data.field,
            filters: {
                keyword: {
                    fields: [],
                    term: data.keyword
                }
            },
            sort: {
                asc: 'createdAt'
            },
            start: (page - 1) * maxRow,
            count: maxRow
        };

        var matchObj = {
            $or: [{
                sfaID: {
                    $regex: data.keyword,
                    $options: "i"
                }
            }, {
                schoolName: {
                    $regex: data.keyword,
                    $options: "i"
                }
            }]
        };

        var Search = Model.find(matchObj, '_id sfaID schoolName mobile email')
            .order(options)
            .keyword(options)
            .page(options, function (err, found) {
                if (err) {
                    callback(err, null);
                } else {
                    callback(null, found);
                }
            });
    },

    getSearch: function (data, callback) {

        var Model = this;
        var Const = this(data);
        var maxRow = 10;

        var page = 1;
        if (data.page) {
            page = data.page;
        }
        var field = data.field;
        var options = {
            field: data.field,
            filters: {
                keyword: {
                    fields: [],
                    term: data.keyword
                }
            },
            sort: {
                asc: 'createdAt'
            },
            start: (page - 1) * maxRow,
            count: maxRow
        };

        var matchObj = {
            $and: [{
                    $or: [{
                        sfaID: {
                            $ne: "",
                            $regex: data.keyword,
                            $options: "i"
                        }
                    }, {
                        schoolName: {
                            $regex: data.keyword,
                            $options: "i"
                        }
                    }]
                },
                {
                    eventCity: data.sfaCity
                }
            ],
        };

        var Search = Model.find(matchObj, '_id sfaID schoolName mobile email')
            .order(options)
            .keyword(options)
            .page(options, function (err, found) {
                if (err) {
                    callback(err, null);
                } else {
                    callback(null, found);
                }
            });
    },

    filterSchool: function (data, callback) {
        var maxRow = Config.maxRow;
        console.log(data);
        var page = 1;
        if (data.page) {
            page = data.page;
        }
        var field = data.field;
        var options = {
            field: data.field,
            filters: {
                keyword: {
                    fields: ['schoolName', 'sfaID'],
                    term: data.keyword
                }
            },
            sort: {
                desc: 'createdAt'
            },
            start: (page - 1) * maxRow,
            count: maxRow
        };
        var matchObj = {
            $or: [{
                registrationFee: {
                    $ne: "online PAYU"
                }
            }, {
                paymentStatus: {
                    $ne: "Pending"
                }
            }],
        };
        if (data.type == "Date") {

            var endOfDay = moment(data.endDate).endOf("day").toDate();
            matchObj.createdAt = {
                $gt: data.startDate,
                $lt: endOfDay,
            };
        } else if (data.type == "SFA-ID") {
            matchObj = {
                sfaID: {
                    $regex: data.input,
                    $options: "i"
                },
                $or: [{
                    registrationFee: {
                        $ne: "online PAYU"
                    }
                }, {
                    paymentStatus: {
                        $ne: "Pending"
                    }
                }]
            };
        } else if (data.type == "UTM_Source") {
            matchObj = {
                utm_source: {
                    $regex: data.input,
                    $options: "i"
                },
                $or: [{
                    registrationFee: {
                        $ne: "online PAYU"
                    }
                }, {
                    paymentStatus: {
                        $ne: "Pending"
                    }
                }]
            };
        } else if (data.type == "UTM_Campaign") {
            matchObj = {
                utm_campaign: {
                    $regex: data.input,
                    $options: "i"
                },
                $or: [{
                    registrationFee: {
                        $ne: "online PAYU"
                    }
                }, {
                    paymentStatus: {
                        $ne: "Pending"
                    }
                }]
            };
        } else if (data.type == "UTM_Medium") {
            matchObj = {
                utm_medium: {
                    $regex: data.input,
                    $options: "i"
                },
                $or: [{
                    registrationFee: {
                        $ne: "online PAYU"
                    }
                }, {
                    paymentStatus: {
                        $ne: "Pending"
                    }
                }]
            };
        } else if (data.type == "School Name") {
            matchObj = {
                'schoolName': {
                    $regex: data.input,
                    $options: "i"
                },
                $or: [{
                    registrationFee: {
                        $ne: "online PAYU"
                    }
                }, {
                    paymentStatus: {
                        $ne: "Pending"
                    }
                }]

            };
        } else if (data.type == "Payment Mode") {
            if (data.input == "cash" || data.input == "Cash") {
                matchObj = {
                    'registrationFee': "cash",
                };
            } else if (data.input == "online" || data.input == "Online") {
                matchObj = {
                    'registrationFee': "online PAYU",
                    paymentStatus: {
                        $ne: "Pending"
                    }
                };

            }
            //-----------for sponsored---------
            else if (data.input == "sponsor" || data.input == "Sponsor") {
                matchObj = {
                    'registrationFee': "Sponsor",
                    paymentStatus: {
                        $ne: "Pending"
                    }
                };

            }
            //-----------for sponsored---------
        } else if (data.type == "Payment Status") {
            if (data.input == "Paid" || data.input == "paid") {
                matchObj = {
                    'paymentStatus': "Paid",
                };
            } else if (data.input == "Pending" || data.input == "pending") {
                matchObj = {
                    'paymentStatus': "Pending",
                    registrationFee: {
                        $ne: "online PAYU"
                    }
                };
            }

        } else if (data.type == "Verified Status") {
            matchObj = {
                'status': {
                    $regex: data.input,
                    $options: "i"

                },

                $or: [{
                    registrationFee: {
                        $ne: "online PAYU"
                    }
                }, {
                    paymentStatus: {
                        $ne: "Pending"
                    }
                }]
            };
        } else {
            var matchObj = {
                $or: [{
                    registrationFee: {
                        $ne: "online PAYU"
                    }
                }, {
                    paymentStatus: {
                        $ne: "Pending"
                    }
                }]
            };
        }
        if (data.keyword !== "") {
            Registration.aggregate(
                [{
                        $match: {

                            $or: [{
                                    "schoolName": {
                                        $regex: data.keyword,
                                        $options: "i"
                                    }
                                },
                                {
                                    "sfaID": data.keyword
                                }
                            ]

                        }
                    },
                    // Stage 4
                    {
                        $match: {
                            $or: [{
                                registrationFee: {
                                    $ne: "online PAYU"
                                }
                            }, {
                                paymentStatus: {
                                    $ne: "Pending"
                                }
                            }]
                        }
                    },
                    {
                        $sort: {
                            "createdAt": -1

                        }
                    },
                ],
                function (err, returnReq) {
                    console.log("returnReq : ", returnReq);
                    if (err) {
                        console.log(err);
                        callback(null, err);
                    } else {
                        if (_.isEmpty(returnReq)) {
                            var count = returnReq.length;
                            console.log("count", count);

                            var data = {};
                            data.options = options;

                            data.results = returnReq;
                            data.total = count;
                            callback(null, data);
                        } else {
                            var count = returnReq.length;
                            console.log("count", count);

                            var data = {};
                            data.options = options;

                            data.results = returnReq;
                            data.total = count;
                            callback(null, data);

                        }
                    }
                });
        } else {
            Registration.find(matchObj)
                .order(options)
                .keyword(options)
                .page(options, function (err, found) {
                    // console.log("found", found);

                    if (err) {
                        callback(err, null);
                    } else if (_.isEmpty(found)) {
                        callback(null, "Data is empty");
                    } else {
                        callback(null, found);
                    }
                });
        }
    },

    //pass data as array of strings containing school names
    // eg:['jamnabai','R N Shah'] 
    // returns array of matched results
    getListOfSchools: function (data, callback) {
        var matchObj = {
            $or: _.map(data, function (n) {
                return {
                    "schoolName": n,
                    "status": "Verified"
                }
            })
        }

        Registration.find(matchObj).lean().exec(function (err, result) {
            callback(err, result);
        });
    },

    // -----school profile-----

    // data={
    // "city":"",
    // "keyboard":""    
    // }

    searchByCity: function (data, callback) {

        async.waterfall([

            // gatAll Server List
            function (callback) {
                var serverList = [{
                    "city": "Mumbai",
                    "url": "http://testmumbaischool.sfanow.in/api"
                }, {
                    "city": "Hyderabad",
                    "url": "http://localhost:1338/api"
                }];

                var server = _.find(serverList, ['city', data.city]);
                callback(null, server);
            },

            // search from local DB
            function (serverDetails, callback) {
                if (!serverDetails) {
                    callback(null, []);
                } else {
                    var headers = {
                        'Content-Type': 'application/x-www-form-urlencoded'
                    }

                    // Configure the request
                    var options = {
                        url: serverDetails.url + "/registration/getSchoolProfile",
                        method: 'POST',
                        headers: headers,
                        form: data
                    }

                    request(options, function (error, response, body) {
                        if (!error && response.statusCode == 200) {
                            callback(null, JSON.parse(body));
                        } else {
                            callback("Something Went Wrong", null);
                        }
                    })
                }
            },

            //search from global DB
            function (localData, callback) {

                var collectionData = {
                    "local": localData.data
                }

                Registration.aggregate([{
                    $lookup: {
                        from: "events",
                        localField: "eventId",
                        foreignField: "_id",
                        as: "eventId"
                    }
                }, {
                    $unwind: {
                        path: "$eventId"
                    }
                }, {
                    $match: {
                        "status": "Verified",
                        "eventId.city": data.city,
                        $or: [{
                            sfaID: {
                                $regex: data.keyword,
                                $options: "i"
                            }
                        }, {
                            schoolName: {
                                $regex: data.keyword,
                                $options: "i"
                            }
                        }]
                    }
                }, {
                    $project: {
                        "schoolName": "$schoolName",
                        "email": "$email",
                        "mobile": "$mobile",
                        "sfaID": "$sfaID",
                        "currentYear": "$currentYear",
                        "schoolLogo": "$schoolLogo"
                    }
                }], function (err, globalData) {
                    if (err) {
                        callback(err, null);
                    } else {
                        collectionData.global = globalData;
                        callback(null, collectionData);
                    }
                })

            },

            //merging of local & global
            function (merged, callback) {
                merged.merged = _.unionBy(merged.local, merged.global, "sfaID");
                callback(null, merged.merged);
            }

        ], function (err, final) {
            if (err) {
                callback(err, null);
            } else {
                // pagination
                var max = 20;
                if (!data.page) {
                    data.page = 1;
                }
                var start = (data.page - 1) * 20;
                final = _.slice(final, start, (start + 20));
                callback(null, final);
            }
        });



    },

    // -----school profile Ends-----






};
module.exports = _.assign(module.exports, exports, model);