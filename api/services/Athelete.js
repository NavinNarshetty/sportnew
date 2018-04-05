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
    }
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

        ], function (err, complete) {
            if (err) {
                callback(err, null);
            } else {
                callback(null, complete);
            }
        })
    }


};
module.exports = _.assign(module.exports, exports, model);