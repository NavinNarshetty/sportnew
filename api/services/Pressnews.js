var schema = new Schema({
    mediaTitle: String,
    newsDate: Date,
    year: String,
    city: String,
    mediaType: String,
    mediaLink: String
});

schema.plugin(deepPopulate, {});
schema.plugin(uniqueValidator);
schema.plugin(timestamps);
module.exports = mongoose.model('Pressnews', schema);

var exports = _.cloneDeep(require("sails-wohlig-service")(schema));
var model = {};
module.exports = _.assign(module.exports, exports, model);