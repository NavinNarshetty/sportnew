var schema = new Schema({
  // sportName: {
  //   type: Schema.Types.ObjectId,
  //   ref: 'SportsListSubCategory'
  // },
  sportsListSubCategory: {
    type: Schema.Types.ObjectId,
    ref: 'SportsListSubCategory',
    index: true
  },

  matchVideos: [{
    videoId: 'String',
    source: String
  }],



});

schema.plugin(deepPopulate, {
  populate: {
    'sportsListSubCategory': {
      select: '_id name isTeam sportsListCategory'
    }
  }
});
schema.plugin(uniqueValidator);
schema.plugin(timestamps);
module.exports = mongoose.model('Matchvideos', schema);

var exports = _.cloneDeep(require("sails-wohlig-service")(schema, "sportsListSubCategory", "sportsListSubCategory"));
var model = {



};
module.exports = _.assign(module.exports, exports, model);