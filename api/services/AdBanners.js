var schema = new Schema({
    pageType: String,
    title: String,
    linkType: String,
    desktop: {
        adLink: String,
        adBanner: String,

    },
    mobile: {
        mobileLink: String,
        mobileAdBanner: String
    },
    adPlacement: String,
    status: String
});

schema.plugin(deepPopulate, {});
schema.plugin(uniqueValidator);
schema.plugin(timestamps);
module.exports = mongoose.model('AdBanners', schema);

var exports = _.cloneDeep(require("sails-wohlig-service")(schema));
var model = {};
module.exports = _.assign(module.exports, exports, model);