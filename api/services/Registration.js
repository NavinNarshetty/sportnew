var schema = new Schema({
    registerID: Number,
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

};
module.exports = _.assign(module.exports, exports, model);