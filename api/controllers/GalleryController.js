module.exports = _.cloneDeep(require("sails-wohlig-controller"));
var controller = {
  getPhotosAndVideos: function (req, res) {
    if (req.body) {
      Gallery.getPhotosAndVideos(req.body, res.callback);

    } else {
      res.json({
        data: "Invalid request",
        value: false
      });
    }
  },

  getSchoolCollegeAlbums: function (req, res) {
    if (req.body && req.body.city && req.body.institutionType) {
      Gallery.getSchoolCollegeAlbums(req.body, res.callback);
    } else {
      res.json({
        data: "Please provide parameters",
        value: false
      });
    }
  }
};
module.exports = _.assign(module.exports, controller);
