var schema = new Schema({
    receiptId: Number,
    atheleteID: {
        type: Number
    },
    sfaId: String,
    status: {
        type: String,
        default: "Pending"
    },
    school: {
        type: Schema.Types.ObjectId,
        ref: 'School',
        index: true
    },
    year: [{
        type: String
    }],
    currentYear: String,
    idProof: String,
    surname: String,
    password: String,
    firstName: String,
    middleName: String,
    gender: String,
    standard: String,
    bloodGroup: String,
    photograph: String,
    photographCheck: Boolean,
    dob: Date,
    age: Number,
    ageProof: String,
    photoImage: String,
    photoImageCheck: Boolean,
    birthImage: String,
    birthImageCheck: Boolean,

    playedTournaments: {
        type: Boolean,
        default: "false"
    },
    sportLevel: [{
        level: String,
        sport: String,
    }],


    mobile: String,
    smsOTP: String,
    email: String,
    emailOTP: String,

    address: String,
    addressLine2: String,
    state: String,
    district: String,
    city: String,
    pinCode: String,

    termsAndCondition: {
        type: Boolean,
        default: "false"
    },
    parentDetails: [{
        relation: String,
        name: String,
        surname: String,
        mobile: String,
        email: String
    }],
    atheleteSchoolName: String,
    atheleteSchoolLocality: String,
    atheleteSchoolContact: String,
    atheleteSchoolIdImage: String,
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
    university: String,
    faculty: String,
    degree: String,
    collegeYear: String,
    course: String,
    verifiedDate: Date,
    remarks: String,
    accessToken: String,
    isSelected: Boolean,
    utm_medium: String,
    utm_source: String,
    utm_campaign: String,
    isBib: Boolean,
    oldId: {
        type: Schema.Types.ObjectId,
        ref: 'OldAthelete',
        index: true
    },
    refundAmount: Number,
});

schema.plugin(deepPopulate, {});
schema.plugin(uniqueValidator);
schema.plugin(timestamps);
module.exports = mongoose.model('Athelete', schema);

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
                    sfaId: {
                        $regex: data.keyword,
                        $options: "i"
                    }
                }, {
                    firstName: {
                        $regex: data.keyword,
                        $options: "i"
                    }
                },
                {
                    middleName: {
                        $regex: data.keyword,
                        $options: "i"
                    }
                },
                {
                    surname: {
                        $regex: data.keyword,
                        $options: "i"
                    }
                }
            ]
        };
        // Athelete.aggregate(
        //     [ // Stage 1
        //         {
        //             $project: {
        //                 fullName: {
        //                     $concat: ["$firstName", " ", "$middleName", " ", "$surname"]
        //                 },
        //                 sfaId: "$sfaId",
        //                 firstName: "$firstName",
        //                 middleName: "$middleName",
        //                 surname: "$surname",
        //                 mobile: "$mobile",
        //                 email: "$email",
        //             }
        //         },

        //         // Stage 2
        //         {
        //             $match: {
        //                 $or: [{
        //                     sfaId: {
        //                         $regex: data.keyword,
        //                         $options: "i"
        //                     }
        //                 }, {
        //                     fullName: {
        //                         $regex: data.keyword,
        //                         $options: "i"
        //                     }
        //                 }]
        //             }
        //         },

        //         {
        //             $sort: {
        //                 "createdAt": -1
        //             }
        //         },
        //     ],
        //     function (err, returnReq) {
        //         console.log("returnReq : ", returnReq);
        //         if (err) {
        //             console.log(err);
        //             callback(null, err);
        //         } else {
        //             if (_.isEmpty(returnReq)) {
        //                 var count = returnReq.length;
        //                 console.log("count", count);

        //                 var data = {};
        //                 data.options = options;

        //                 data.results = returnReq;
        //                 data.total = count;
        //                 callback(null, data);
        //             } else {
        //                 var count = returnReq.length;
        //                 console.log("count", count);

        //                 var data = {};
        //                 data.options = options;

        //                 data.results = returnReq;
        //                 data.total = count;
        //                 callback(null, data);

        //             }
        //         }
        //     });

        Athelete.find(matchObj, 'sfaId firstName middleName surname mobile email _id')
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
        var maxRow = 20;

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
        if (data.keyword == "") {
            Athelete.find({
                    sfaId: {
                        $ne: ""
                    }
                }, 'sfaId firstName middleName surname mobile email _id')
                .order(options)
                .keyword(options)
                .page(options, function (err, found) {
                    if (err) {
                        callback(err, null);
                    } else {
                        callback(null, found);
                    }
                });
        } else {
            var count = 0;
            var pipeLine = Athelete.getAggregatePipeline(data);
            var newPipeLine = _.cloneDeep(pipeLine);
            Athelete.aggregate(pipeLine, function (err, matchData) {
                if (err) {
                    callback(err, null);
                } else {
                    newPipeLine.push({
                        $skip: options.start
                    }, {
                        $limit: options.count
                    });
                    Athelete.aggregate(newPipeLine, function (err, returnReq) {
                        if (err) {
                            console.log(err);
                            callback(err, "error in mongoose");
                        } else {
                            if (_.isEmpty(returnReq)) {
                                callback(null, []);
                            } else {
                                count = matchData.length;
                                console.log("count", count);
                                var data = {};
                                data.options = options;
                                data.results = returnReq;
                                data.total = count;
                                callback(null, data);
                            }
                        }
                    });
                }
            });
        }
    },

    getAthlete: function (data, callback) {
        async.waterfall([
            function (err) {
                Athelete.findOne({
                    _id: data._id
                }).lean().exec(function (err, found) {
                    if (err || _.isEmpty(found)) {
                        callback(null, {
                            error: "no data found",
                            data: data
                        });
                    } else {
                        callback(null, found);
                    }
                });
            },
            function (found, callback) {
                if (found.photoImageCheck == true) {
                    found.photoImage = undefined;
                }
                if (found.birthImageCheck) {
                    found.birthImage = undefined;
                }
                if (found.photographCheck) {
                    found.photographCheck = undefined
                }
                callback(null, found);
            }

        ], function (err, complete) {
            if (err) {
                callback(err, null);
            } else {
                callback(null, complete);
            }
        })
    },

    filterAthlete: function (data, callback) {
        console.log("date", data.startDate);
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
                    fields: ['firstName', 'sfaId', 'surname'],
                    term: data.keyword
                }
            },
            sort: {
                asc: 'createdAt'
            },
            start: (page - 1) * maxRow,
            count: maxRow
        };
        var matchObj = {};
        if (data.type == "Date") {
            var endOfDay = moment(data.endDate).endOf("day").toDate();
            matchObj = {
                createdAt: {
                    $gt: data.startDate,
                    $lt: endOfDay,
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

        } else if (data.type == "SFA-ID") {
            matchObj = {
                sfaId: {
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
        } else if (data.type == "Athlete Name") {
            matchObj = {
                firstName: {
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
            } else if (data.input == "sponsor" || data.input == "Sponsor") {
                matchObj = {
                    'registrationFee': "Sponsor",
                    paymentStatus: {
                        $ne: "Pending"
                    }
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
                    }],
                };
            }
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
            } else {
                matchObj = {
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
                }],
            };
        }
        if (data.type == "School Name") {
            Athelete.aggregate(
                [{
                        $lookup: {
                            "from": "schools",
                            "localField": "school",
                            "foreignField": "_id",
                            "as": "schoolData"
                        }
                    },
                    // Stage 2
                    {
                        $unwind: {
                            path: "$schoolData",
                            preserveNullAndEmptyArrays: true // optional
                        }
                    },
                    // Stage 3
                    {
                        $match: {

                            $or: [{
                                    "schoolData.name": {
                                        $regex: data.input,
                                        // $options: 'i'
                                    }
                                },
                                {
                                    "atheleteSchoolName": {
                                        $regex: data.input,
                                        // $options: 'i'
                                    }
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
        } else if (data.keyword !== "") {
            Athelete.aggregate(
                [{
                        $match: {

                            $or: [{
                                    "firstName": {
                                        $regex: data.keyword,
                                        $options: "i"
                                    }
                                }, {
                                    "surname": {
                                        $regex: data.keyword,
                                        $options: "i"
                                    }
                                },
                                {
                                    "sfaId": data.keyword
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
            Athelete.find(matchObj)
                .sort({
                    createdAt: -1
                })
                .order(options)
                .keyword(options)
                .page(options, function (err, found) {
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

    getAggregatePipeline: function (data) {
        var pipeline = [ // Stage 1
            {
                $project: {
                    fullName: {
                        $concat: ["$firstName", " ", "$middleName", " ", "$surname"]
                    },
                    sfaId: "$sfaId",
                    firstName: "$firstName",
                    middleName: "$middleName",
                    surname: "$surname",
                    mobile: "$mobile",
                    email: "$email",
                }
            },

            // Stage 2
            {
                $match: {
                    $or: [{
                        sfaId: {
                            $ne: "",
                            $regex: data.keyword,
                            $options: "i"
                        }
                    }, {
                        fullName: {
                            $regex: data.keyword,
                            $options: "i"
                        }
                    }]
                }
            },

            {
                $sort: {
                    "createdAt": -1
                }
            },
        ];
        return pipeline;
    },


    excelFilterAthlete: function (data, callback) {
        // console.log('insied filter', data);
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
                    fields: ['firstName', 'sfaId'],
                    term: data.keyword
                }
            },
            sort: {
                asc: 'createdAt'
            },
            start: (page - 1) * maxRow,
            count: maxRow
        };
        var matchObj = {};
        if (data.type == "Date") {
            if (data.endDate == data.startDate) {
                matchObj = {
                    createdAt: data.startDate,
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
                matchObj = {
                    createdAt: {
                        $gt: data.startDate,
                        $lt: data.endDate,
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
            }
        } else if (data.type == "SFA-ID") {
            matchObj = {
                sfaId: {
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
        } else if (data.type == "Athlete Name") {
            matchObj = {
                // $or: [{
                //     firstName: {
                //         $regex: data.input,
                //         $options: "i"
                //     }
                // }, {
                //     surname: {
                //         $regex: data.input,
                //         $options: "i"
                //     }
                // }, {
                //     middleName: {
                //         $regex: data.input,
                //         $options: "i"
                //     }
                // }],
                firstName: {
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
            //-----------for sponsered--------- 
            else if (data.input == "sponsor" || data.input == "Sponsor") {
                matchObj = {
                    'registrationFee': "Sponsor",
                    paymentStatus: {
                        $ne: "Pending"
                    }
                };

            }
            //-----------for sponsered---------
            else {
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

            }

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
                    }],

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
                }],

            };
        }
        if (data.type == "School Name") {
            Athelete.aggregate(
                [{
                        $lookup: {
                            "from": "schools",
                            "localField": "school",
                            "foreignField": "_id",
                            "as": "school"
                        }
                    },
                    // Stage 2
                    {
                        $unwind: {
                            path: "$school",
                            preserveNullAndEmptyArrays: true // optional
                        }
                    },
                    // Stage 3
                    {
                        $match: {

                            $or: [{
                                    "school.name": {
                                        $regex: data.input
                                    }
                                },
                                {
                                    "atheleteSchoolName": {
                                        $regex: data.input
                                    }
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
                            callback(null, returnReq);
                        } else {
                            var count = returnReq.length;
                            console.log("count", count);

                            var data = {};
                            data.options = options;

                            data.results = returnReq;
                            data.total = count;
                            callback(null, returnReq);

                        }
                    }
                });
        } else if (data.keyword !== "" && data.type !== "") {
            Athelete.aggregate(
                [{
                        $match: {

                            $or: [{
                                    "firstName": {
                                        $regex: data.keyword,
                                        $options: "i"
                                    }
                                },
                                {
                                    "sfaId": data.keyword
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
                        $lookup: {
                            "from": "schools",
                            "localField": "school",
                            "foreignField": "_id",
                            "as": "school"
                        }
                    },
                    // Stage 2
                    {
                        $unwind: {
                            path: "$school",
                            preserveNullAndEmptyArrays: true // optional
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
                            callback(null, returnReq);
                        } else {
                            var count = returnReq.length;
                            callback(null, returnReq);

                        }
                    }
                });
        } else {
            Athelete.find(matchObj).lean().deepPopulate("school")
                .sort({
                    createdAt: -1
                }).exec(function (err, found) {
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

    generateExcel: function (data, res) {
        Athelete.excelFilterAthlete(data, function (err, complete) {
            if (err) {
                callback(err, null);
            } else {
                if (_.isEmpty(complete)) {
                    callback(null, complete);
                } else {
                    var excelData = [];
                    _.each(complete, function (n) {
                        var obj = {};
                        obj.sfaID = n.sfaId;
                        // obj.receiptNo = "SFA" + n.receiptId;
                        // if (n.atheleteSchoolName) {
                        //     obj.school = n.atheleteSchoolName;
                        // } else {
                        //     if (n.school !== null) {
                        //         obj.school = n.school.name;
                        //     } else {
                        //         obj.school = "";
                        //     }
                        // }
                        if (n.school !== null && !n.atheleteSchoolName) {
                            obj.school = n.school.name;
                        } else {
                            obj.school = "";
                        }
                        if (n.atheleteSchoolName) {
                            obj.addedSchool = n.atheleteSchoolName;
                        } else {
                            obj.addedSchool = "";
                        }
                        // if (n.university) {
                        //     obj.university = n.university;
                        // } else {
                        //     obj.university = "";
                        // }
                        // if (n.faculty) {
                        //     obj.faculty = n.faculty;
                        // } else {
                        //     obj.faculty = "";
                        // }
                        // if (n.course) {
                        //     obj.course = n.course;
                        // } else {
                        //     obj.course = "";
                        // }
                        // if (n.year) {
                        //     obj.collegeYear = n.collegeYear;
                        // } else {
                        //     obj.collegeYear = "";
                        // }
                        // if (n.degree) {
                        //     obj.degree = n.degree;
                        // } else {
                        //     obj.degree = "";
                        // }

                        // var parentInfo;
                        // var countParent = 0;
                        // var levelInfo;
                        // var countLevel = 0;
                        // _.each(n.parentDetails, function (details) {
                        //     var name = details.name + details.surname;
                        //     var email = details.email;
                        //     var mobile = details.mobile;
                        //     var relation = details.relation;
                        //     if (countParent === 0) {
                        //         parentInfo = "{ Name:" + name + "," + "Relation:" + relation + "," + "Email:" + email + "," + "Mobile:" + mobile + "}";
                        //     } else {
                        //         parentInfo = parentInfo + "{ Name:" + name + "," + "Relation:" + relation + "," + "Email:" + email + "," + "Mobile:" + mobile + "}";
                        //     }
                        //     countParent++;
                        //     // console.log("parentDetails", parentInfo);
                        // });
                        // obj.parentDetails = parentInfo;
                        // _.each(n.sportLevel, function (details) {
                        //     var level = details.level;
                        //     var sport = details.sport;
                        //     if (countLevel === 0) {
                        //         levelInfo = "{ Level:" + level + "," + "Sport:" + sport + "}";
                        //     } else {
                        //         levelInfo = levelInfo + "{ Level:" + level + "," + "Sport:" + sport + "}";
                        //     }
                        //     countLevel++;
                        // });
                        // obj.sportLevel = levelInfo;
                        // var dateTime = moment.utc(n.createdAt).utcOffset("+05:30").format('YYYY-MM-DD HH:mm');
                        // obj.date = dateTime;
                        // obj.idProof = n.idProof;
                        obj.surname = n.surname;
                        obj.firstName = n.firstName;
                        obj.middleName = n.middleName;
                        obj.gender = n.gender;
                        // obj.standard = n.standard;
                        // obj.bloodGroup = n.bloodGroup;
                        // obj.photograph = n.photograph;
                        obj.dob = n.dob;
                        obj.age = n.age;
                        // obj.ageProof = n.ageProof;
                        // obj.photoImage = n.photoImage;
                        // obj.birthImage = n.birthImage;
                        // obj.playedTournaments = n.playedTournaments;
                        obj.mobile = n.mobile;
                        obj.email = n.email;
                        // obj.smsOTP = n.smsOTP;
                        // obj.emailOTP = n.emailOTP;
                        // obj.address = n.address;
                        // obj.addressLine2 = n.addressLine2;
                        // obj.state = n.state;
                        // obj.district = n.district;
                        // obj.city = n.city;
                        // obj.pinCode = n.pinCode;
                        obj.status = n.status;
                        // obj.password = n.password;
                        // obj.year = n.year;
                        // obj.registrationFee = n.registrationFee;
                        // obj.paymentStatus = n.paymentStatus;
                        // obj.transactionID = n.transactionID;
                        // obj.remarks = n.remarks;

                        // obj.utm_medium = n.utm_medium;
                        // obj.utm_source = n.utm_source;
                        // obj.utm_campaign = n.utm_campaign;
                        // if (n.utm_medium) {
                        //     obj.utm_medium = n.utm_medium;
                        // } else {
                        //     obj.utm_medium = "";
                        // }

                        // if (n.utm_campaign) {
                        //     obj.utm_campaign = n.utm_campaign;
                        // } else {
                        //     obj.utm_campaign = "";
                        // }
                        // if (n.utm_source) {
                        //     obj.utm_source = n.utm_source;
                        // } else {
                        //     obj.utm_source = "";
                        // }
                        // if (n.isBib == true) {
                        //     obj.BIB = "YES";
                        // } else {
                        //     obj.BIB = "NO";
                        // }
                        // if (n.Document_Status) {
                        //     obj.Document_Status = n.Document_Status;
                        // } else {
                        //     obj.Document_Status = "";
                        // }
                        // if (n.Photo_ID) {
                        //     obj.Photo_ID = n.Photo_ID;
                        // } else {
                        //     obj.Photo_ID = "";
                        // }

                        // if (n.School_Id) {
                        //     obj.School_Id = n.School_Id;
                        // } else {
                        //     obj.School_Id = "";
                        // }

                        // if (n.Age_Proof) {
                        //     obj.Age_Proof = n.Age_Proof;
                        // } else {
                        //     obj.Age_Proof = "";
                        // }
                        if (n.refundAmount) {
                            obj.refundAmount = n.refundAmount;
                        } else {
                            obj.refundAmount = "";
                        }
                        if (n.photographCheck) {
                            obj.photographCheck = n.photographCheck;
                        } else {
                            obj.photographCheck = "";
                        }
                        if (n.photoImageCheck) {
                            obj.photoImageCheck = n.photoImageCheck;
                        } else {
                            obj.photoImageCheck = "";
                        }
                        if (n.birthImageCheck) {
                            obj.birthImageCheck = n.birthImageCheck;
                        } else {
                            obj.birthImageCheck = "";
                        }
                        excelData.push(obj);
                    });
                    Config.generateExcel("Athlete", excelData, res);
                }
            }
        });
    },


};
module.exports = _.assign(module.exports, exports, model);