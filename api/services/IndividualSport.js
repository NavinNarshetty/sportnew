var schema = new Schema({
    sport: [{
        type: Schema.Types.ObjectId,
        ref: 'Sport',
        index: true
    }],
    athleteId: {
        type: Schema.Types.ObjectId,
        ref: 'Athelete',
        index: true
    },
    sportsListSubCategory: {
        type: Schema.Types.ObjectId,
        ref: 'SportsListSubCategory',
        index: true
    },
    perSportUnique: String,
    createdBy: String,
    nominatedName: String,
    nominatedSchoolName: String,
    nominatedContactDetails: String,
    nominatedEmailId: String,
    isVideoAnalysis: Boolean
});

schema.plugin(deepPopulate, {
    populate: {
        // 'athleteId': {
        //     select: '_id firstName middleName surname school atheleteSchoolName sfaId gender age dob city'
        // },
        // 'athleteId.school': {
        //     select: '_id name'
        // },
        // 'sportsListSubCategory': {
        //     select: '_id name inactiveimage image'
        // }
    }
});

schema.plugin(uniqueValidator);
schema.plugin(timestamps);
module.exports = mongoose.model('IndividualSport', schema);

var exports = _.cloneDeep(require("sails-wohlig-service")(schema));
var model = {

    qwerty:function(callback){
        IndividualSport.findOne().deepPopulate("athleteId sportsListSubCategory").exec(callback);
    }

};
module.exports = _.assign(module.exports, exports, model);