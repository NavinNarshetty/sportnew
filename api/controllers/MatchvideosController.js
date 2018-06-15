module.exports = _.cloneDeep(require("sails-wohlig-controller"));
var controller = {

  getMatchVideos: function (req, res) {
    if (req.body.sportName) {
      Match.getMatchVideos(req.body, res.callback);
    } else {
      res.json({
        data: "Please provide parameters",
        value: false
      });
    }
  }


};
module.exports = _.assign(module.exports, controller);