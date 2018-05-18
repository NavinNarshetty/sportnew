module.exports = _.cloneDeep(require("sails-wohlig-controller"));
var controller = {

  getRanksBySport: function (req, res) {
    //    **Parameters**
    //  eventId->Event ID
    //   sportName->Sport Name
    if (req.body.eventId && req.body.sportName) {
      Rank.getRanksBySport(req.body, res.callback);
    } else {
      res.json({
        data: "Please provide parameters",
        value: false
      });
    }
  },
  
};
module.exports = _.assign(module.exports, controller);