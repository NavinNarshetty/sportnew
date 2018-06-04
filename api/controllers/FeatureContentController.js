module.exports = _.cloneDeep(require("sails-wohlig-controller"));
var controller = {
  saveVideoArchive: function (req, res) {
    if (req.body) {
      FeatureContent.saveVideoArchive(req.body, res.callback);
    } else {
      res.json({
        "data": "Not Found",
        "value": false
      });
    }
  },
};
module.exports = _.assign(module.exports, controller);
