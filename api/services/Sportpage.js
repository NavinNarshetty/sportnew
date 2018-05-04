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
    sportName: String,
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
var model = {

    getSportGallery: function (data, callback) {
        Gallery.aggregate(
            // Pipeline
            [
                // Stage 1
                {
                    $match: {
                        "folderType": {
                            $regex: "sport",
                            $options: "i"
                        },
                        "folderName": {
                            $regex: data.sportName,
                            $options: "i"
                        }
                    }

                },

            ],
            function (err, found) {
                if (err) {
                    callback(err, null);
                } else if (_.isEmpty(found)) {
                    callback(null, []);
                } else {
                    callback(null, found);
                }
            });


    }
};
module.exports = _.assign(module.exports, exports, model);