var schema = new Schema({

    city: String,
    sportName: String,
    banner: {
        title: String,
        status: String,
        linkType: String,
        desktop: {
            adbanner: String,
            adlink: String
        },
        mobile: {
            adbanner: String,
            adlink: String
        }
    },
    sideAdSpace: {
        title: String,
        desktop: {
            banner: String,
            link: String
        },
        mobile: {
            banner: String,
            link: String
        },
        status: String,
        linkType: String
    }

});

schema.plugin(deepPopulate, {});
schema.plugin(uniqueValidator);
schema.plugin(timestamps);
module.exports = mongoose.model('Sportadbanner', schema);

var exports = _.cloneDeep(require("sails-wohlig-service")(schema));
var model = {};
module.exports = _.assign(module.exports, exports, model);