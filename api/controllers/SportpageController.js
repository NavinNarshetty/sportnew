module.exports = _.cloneDeep(require("sails-wohlig-controller"));
var controller = {
  getSportGallery: function (req, res) {
    if (req.body) {
      Sportpage.getSportGallery(req.body, res.callback);
    } else {
      res.json({
        data: "Invalid Request",
        value: false
      });
    }
  }
};
module.exports = _.assign(module.exports, controller);
