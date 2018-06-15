module.exports = _.cloneDeep(require("sails-wohlig-controller"));
var controller = {

  getVideosPerSport: function (req, res) {
    console.log("req", req.body);
    if (req.body && req.body.sportName && req.body.index) {
      Allmatchvideos.getVideosPerSport(req.body, res.callback);
    } else {
      console.log("imin else");
      res.json({
        data: "Please provide parameters",
        value: false
      });
    }

  }


};
module.exports = _.assign(module.exports, controller);