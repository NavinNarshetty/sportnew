var schema = new Schema({
    pdfData: {
        pdf: [{
            title: String,
            link: String
        }],
        header: String
    },
    eventCard: [{
        mediaType: String,
        image: String,
        linkType: String,
        link: String,
        linkStatus: String
    }],
    city: String,
    banner: {
        desktop: String,
        mobile: String
    },
    contentData: String,
    registrationData: {
        title: String,
        mediaType: String,
        linkType: String,
        image: String,
        link: String,
        linkStatus: String
    }

});

schema.plugin(deepPopulate, {});
schema.plugin(uniqueValidator);
schema.plugin(timestamps);
module.exports = mongoose.model('Sportpage', schema);

var exports = _.cloneDeep(require("sails-wohlig-service")(schema));
var model = {};
module.exports = _.assign(module.exports, exports, model);