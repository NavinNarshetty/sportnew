var schema = new Schema({
    gender: String,
    maxTeam: Number,
    minTeamPlayers: Number,
    maxTeamPlayers: Number,
    sportslist: {
        type: Schema.Types.ObjectId,
        ref: 'SportsList',
        index: true
    },
    ageGroup: {
        type: Schema.Types.ObjectId,
        ref: 'AgeGroup',
        index: true
    },
    weight: {
        type: Schema.Types.ObjectId,
        ref: 'Weight',
        index: true
    },
    fromDate: Date,
    toDate: Date,
    eventPdf: String,
    matchPrefix: String
});

schema.plugin(deepPopulate, {
    populate: {
        'sportslist': {
            select: '_id name sportsListSubCategory drawFormat inactiveimage image'
        },
        'sportslist.sportsListSubCategory': {
            select: '_id name isTeam'
        },
        "sportslist.drawFormat": {
            select: ''
        },
        'ageGroup': {
            select: '_id name'
        },
        'weight': {
            select: '_id name'
        }

    }
});

schema.plugin(uniqueValidator);
schema.plugin(timestamps);
module.exports = mongoose.model('Sport', schema);

var exports = _.cloneDeep(require("sails-wohlig-service")(schema));
var model = {};
module.exports = _.assign(module.exports, exports, model);