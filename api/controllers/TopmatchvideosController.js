module.exports = _.cloneDeep(require("sails-wohlig-controller"));
var controller = {


  getTopMatchVideos: function (req, res) {
    if (req.body && req.body.page) {
      Topmatchvideos.getTopMatchVideos(req.body, res.callback);
    } else {
      res.json({
        data: "Please provide parameters",
        value: false
      });
    }

  }

};
module.exports = _.assign(module.exports, controller);