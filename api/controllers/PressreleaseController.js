module.exports = _.cloneDeep(require("sails-wohlig-controller"));
var controller = {



  savePressrelease: function (req, res) {
    if (req.body) {
      Pressrelease.savePressrelease(req.body, res.callback);
    } else {
      res.json({
        data: "Invalid Request",
        value: false
      });
    }
  },

  getPressMediaRelease: function (req, res) {
    if (req.body) {
      Pressrelease.getPressMediaRelease(req.body, res.callback);
    } else {
      res.json({
        data: "Invalid Request",
        value: false
      });
    }
  }

  // getformatedData: function (req, res) {
  //   async.waterfall([
  //     function (callback) {
  //       Pressrelease.find().lean().exec(function (err, found) {
  //         if (err) {

  //         } else {

  //           _.each(found, function (key) {
  //             key.year = moment(key.releaseDate).subtract(1, "days").format('YYYY');
  //             key.monthYear = moment(key.releaseDate).subtract(1, "days").format('MMMM YYYY');


  //           });

  //           async.forEachOf(found, function (value, key, callback) {

  //             console.log("value", value);
  //             Pressrelease.saveData(value, function (err, saved) {
  //               if (err) {


  //               } else {
  //                 callback(null, saved);
  //               }
  //             });
  //           }, function (err) {
  //             if (err) {

  //             } else {
  //               res.callback(null, found);
  //             }

  //           });


  //         }

  //       });
  //     }

  //   ], function (err, result) {

  //     res.callback(null, result);
  //   });


  // }



};
module.exports = _.assign(module.exports, controller);
