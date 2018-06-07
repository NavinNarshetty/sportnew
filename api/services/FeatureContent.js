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
        description: 'String',
        videoThumbnail: []

    }]
});

schema.plugin(deepPopulate, {});
schema.plugin(uniqueValidator);
schema.plugin(timestamps);
module.exports = mongoose.model('FeatureContent', schema);

var exports = _.cloneDeep(require("sails-wohlig-service")(schema));
var model = {
    saveVideoArchive: function (data, callback) {
        async.waterfall([
            function (callback) {
                async.each(data.featuredContentVideo, function (n, callback) {
                    if (n.source === 'vimeo') {
                        var urlData = {};
                        urlData.videoId = n.link;
                        Vimeo.getThumnailsFromVimeo(urlData, function (err, pictures) {
                            if (err || _.isEmpty(pictures)) {
                                var err = "All wrong values";
                                callback(null, {
                                    error: err,
                                    success: vimeoData
                                });
                            } else {
                                n.videoThumbnail = pictures.sizes;
                                callback();
                            }
                        });
                    } else {
                        callback();
                    }
                }, function (err) {
                    callback(null, data);
                });

            },
            function (data, callback) {
                FeatureContent.saveData(data, function (err, complete) {
                    if (err || _.isEmpty(complete)) {
                        callback(err, null);
                    } else {
                        callback(null, {
                            error: err,
                            success: complete
                        });
                    }
                });
            }
        ], function (err, complete) {
            if (err) {
                callback(err, callback);
            } else {
                callback(null, complete);
            }
        });
    }
};
module.exports = _.assign(module.exports, exports, model);