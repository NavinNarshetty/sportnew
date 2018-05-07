var Schema = mongoose.Schema;

var schema = new Schema({
    headoffice: {
        title: String,
        city: String,
        address: String,
        note: String,
        email: [String],
        phone: [String],
        link: String
    },
    cities: [{
        title: String,
        city: String,
        note: String,
        email: [String],
        phone: [String],
        link: String
    }],
    enquiries: [{
        title: String,
        city: String,
        note: String,
        email: [String],
        phone: [String],
        link: String,
        logo: String
    }]
});

schema.plugin(deepPopulate, {});
schema.plugin(uniqueValidator);
schema.plugin(timestamps);
module.exports = mongoose.model('ContactUs', schema);

var exports = _.cloneDeep(require("sails-wohlig-service")(schema));
var model = {};
module.exports = _.assign(module.exports, exports, model);
