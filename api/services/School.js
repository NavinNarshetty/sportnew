var schema = new Schema({
    institutionType: String,
    deleteStatus: Boolean,
    timestamp: Date,
    sfaid: String,
    name: String,
    board: String,
    status: Boolean,
    address: String,
    location: String,
    email: String,
    contact: String,
    department: [{
        email: String,
        contact: String,
        designation: String,
        name: String,
        year: String,
    }],
    image: [{
        type: String
    }],
    video: [{
        type: String
    }],
    contingentLeader: [{
        type: String
    }],
    sports: [{
        year: String,
        sporttype: String,
        name: String,
    }],
    principal: String,
    paymentType: String,
    numberOfSports: String,
    representative: String,
    notpaidfor: String,
    year: [{
        type: String
    }],
    totalPoints: Number,
    totalPoints2015: Number,
    totalPoints2016: Number,
    totalPoints2017: Number,
    isRegistered: {
        type: Boolean,
        default: false
    },
    screenName: String,
});

schema.plugin(deepPopulate, {});
schema.plugin(uniqueValidator);
schema.plugin(timestamps);
module.exports = mongoose.model('School', schema);

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
                    fields: ['sfaid', 'name', 'institutionType'],
                    term: data.keyword
                }
            },
            sort: {
                asc: 'createdAt'
            },
            start: (page - 1) * maxRow,
            count: maxRow
        };
        async.waterfall([
                function (callback) {
                    ConfigProperty.find().lean().exec(function (err, property) {
                        if (err) {
                            callback(err, null);
                        } else {
                            if (_.isEmpty(property)) {
                                callback(null, []);
                            } else {
                                callback(null, property);
                            }
                        }
                    });
                },
                function (property, callback) {
                    console.log("property", property[0].institutionType);
                    console.log("keyword", data.keyword);
                    var type = property[0].institutionType;
                    if (data.keyword == undefined) {
                        var matchObj = {
                            $or: [{
                                institutionType: type
                            }]
                        };
                    } else {
                        var matchObj = {
                            institutionType: type,
                            $or: [{
                                sfaid: {
                                    $regex: data.keyword,
                                    $options: "i"
                                },
                            }, {
                                name: {
                                    $regex: data.keyword,
                                    $options: "i"
                                },
                            }]
                        };

                    }
                    var Search = Model.find(matchObj)

                        .order(options)
                        .keyword(options)
                        .page(options, callback);

                }
            ],
            function (err, data2) {
                if (err) {
                    console.log(err);
                    callback(err, null);
                } else {
                    callback(null, data2);
                }

            });



    },
};
module.exports = _.assign(module.exports, exports, model);