module.exports = _.cloneDeep(require("sails-wohlig-controller"));
var controller = {

  savePressNews: function (req, res) {
    if (req.body) {
      Pressnews.savePressNews(req.body, res.callback);
    } else {
      res.json({
        data: "Invalid Request",
        value: false
      });
    }
  },
  getPressNews: function (req, res) {
    if (req.body) {
      Pressnews.getPressNews(req.body, res.callback);
    } else {
      res.json({
        data: 'Invalid Request',
        value: false
      });
    }
  },
  getAllCityYear: function (req, res) {
    if (req.body) {
      Pressnews.getAllCityYear(req.body, res.callback);
    } else {
      res.json({
        data: 'Invalid Request',
        value: false
      });
    }
  }

};
module.exports = _.assign(module.exports, controller);
