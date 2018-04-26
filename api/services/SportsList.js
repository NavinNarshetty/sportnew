var schema = new Schema({
    name: String,
    sportsListSubCategory: {
        type: Schema.Types.ObjectId,
        ref: 'SportsListSubCategory',
        index: true
    },
    drawFormat: {
        type: Schema.Types.ObjectId,
        ref: 'DrawFormat',
        index: true
    }
});

schema.plugin(deepPopulate, {
    populate: {
        'drawFormat': {
            select: '_id name'
        },
        'sportsListSubCategory': {
            select: '_id name isTeam sportsListCategory'
        },
        "sportsListSubCategory.sportsListCategory": {
            select: ''
        }
    }
});
schema.plugin(uniqueValidator);
schema.plugin(timestamps);
module.exports = mongoose.model('SportsList', schema);

var exports = _.cloneDeep(require("sails-wohlig-service")(schema));
var model = {};
module.exports = _.assign(module.exports, exports, model);