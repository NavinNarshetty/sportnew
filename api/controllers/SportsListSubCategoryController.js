module.exports = _.cloneDeep(require("sails-wohlig-controller"));
var controller = {

  getSportByEvent: function (req, res) {
    //** Parameter value */
    // eventId:ObjectId("eventId")
    if (req.body && req.body.eventId) {
      SportsListSubCategory.getSportByEvent(req.body, res.callback);
    } else {
      res.json({
        data: "Please provide parameters",
        value: false
      });
    }
  },

  getSportWiseMedalWinners: function (req, res) {
    if (req.body.sportName && req.body.eventYear) {
      SportsListSubCategory.getSportWiseMedalWinners(req.body, res.callback);
    } else {
      res.json({
        data: "Please provide parameters",
        value: false
      });
    }

  },


};
module.exports = _.assign(module.exports, controller);
