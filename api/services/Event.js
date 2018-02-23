var schema = new Schema({
    name: {
        type: String
    },

    institutionType: {
        type: String,
    },
    city: String,
    venue: String,
    year: String,
    month: String,
    eventYear: String

});




schema.plugin(deepPopulate, {});
schema.plugin(uniqueValidator);
schema.plugin(timestamps);
module.exports = mongoose.model('Event', schema);

var exports = _.cloneDeep(require("sails-wohlig-service")(schema));
var model = {};
module.exports = _.assign(module.exports, exports, model);

