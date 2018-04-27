var schema = new Schema({
    name: {
        type: String,
    },
    sportsListCategory: {
        type: Schema.Types.ObjectId,
        ref: 'SportsListCategory',
        index: true
    },
    isTeam: Boolean,
    filter: [{
        name: String
    }],
    rules: {
        type: Schema.Types.ObjectId,
        ref: 'Rules',
        index: true
    },
    sportType: String,
    maxSelect: Number,
    inactiveimage: String,
    image: String,
    endDate: Date

});

schema.plugin(deepPopulate, {
    populate: {
        'sportsListCategory': {
            select: '_id name'
        },
        'rules': {
            select: '_id name tournamentFormat rulesAndRegulation ageGroupContent ageGroupTable eligibilityContent eligibilityTable tournamentCommittee'
        }
    }
});
schema.plugin(uniqueValidator);
schema.plugin(timestamps);
module.exports = mongoose.model('SportsListSubCategory', schema);

var exports = _.cloneDeep(require("sails-wohlig-service")(schema));
var model = {
    getSportByEvent: function (data, callback) {
        SportsListSubCategory.find({ eventId: { $in: [ObjectId(data.eventId)] } }, function (err, found) {
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