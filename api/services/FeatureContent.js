var schema = new Schema({
    mediaType: 'String',
    albumTitle: 'String',
    featuredContentGallery: [{
        image: 'String',
        title: 'String',
        thumbnail: Boolean
    }],
    featuredContentVideo: [{
        source: 'String',
        link: 'String',
        description: 'String'
    }]
});

schema.plugin(deepPopulate, {});
schema.plugin(uniqueValidator);
schema.plugin(timestamps);
module.exports = mongoose.model('FeatureContent', schema);

var exports = _.cloneDeep(require("sails-wohlig-service")(schema));
var model = {};
module.exports = _.assign(module.exports, exports, model);