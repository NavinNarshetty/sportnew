var mongoose = require('mongoose');
var deepPopulate = require('mongoose-deep-populate')(mongoose);
var uniqueValidator = require('mongoose-unique-validator');
// var timestamps = require('mongoose-timestamp');
var validators = require('mongoose-validators');
var monguurl = require('monguurl');
// var autoIncrement = require('mongoose-auto-increment');
var objectid = require("mongodb").ObjectID;
var moment = require('moment');
var request = require("request");
// autoIncrement.initialize(mongoose);
var vimeo = require('../../vimeoLibrary/vimeo').Vimeo;

var schema = new Schema({
  sportName: {
    type: String
  },
  viwemore: Boolean,
  matchVideos: [{
    uri: String,
    video: String,
    name: String,
    link: String,
    description: String,
    thumbnail: String

  }]






});

schema.plugin(deepPopulate, {

});
schema.plugin(uniqueValidator);
schema.plugin(timestamps);
module.exports = mongoose.model('Topmatchvideos', schema);

var exports = _.cloneDeep(require("sails-wohlig-service")(schema));
var model = {

  getTopMatchVideos: function (data, callback) {
    var finalData = {};
    var dataTosend = [];
    var finalObj = {};
    finalObj.matchVideos = [];
    var maxLimit = 4;
    var page = 1;
    if (data.page) {
      page = parseInt(data.page);
    }
    var options = {
      start: (page - 1) * maxLimit,
      count: maxLimit
    };
    async.waterfall([
      function (callback) {
        Vimeo.findOne().lean().exec(function (err, client) {
          if (err || _.isEmpty(client)) {
            callback(null, {
              error: "No Data"
            });
          } else {
            callback(null, client);
          }
        });
      },
      function (client, callback) {
        if (client.error) {
          callback(null, client);
        } else {

          Topmatchvideos.find({}).sort({
            "sportName": 1
          }).skip(options.start).limit(options.count).lean().exec(function (err, result) {
            if (err) {
              callback(err, null, null);
            } else {
              callback(null, result, client);
            }
          });

        }
      },
      function (finalData, client, callback) {
        CLIENT_ID = client.clientId;
        CLIENT_SECRET = client.clientSecret;
        var lib = new vimeo(CLIENT_ID, CLIENT_SECRET);
        if (client.accessToken) {
          lib.access_token = client.accessToken;
          async.concatLimit(finalData, 1, function (file, callback) {
            finalObj.sportName = file.sportName;
            finalObj._id = file._id;
            async.concat(file.matchVideos, function (n, callback) {
              if (client.accessToken) {
                lib.access_token = client.accessToken;
                var urlData = {};
                var tempObj = {};
                urlData.videoId = n.video;
                if (!n.name && n.name == undefined) {
                  lib.thumbnails(urlData,
                    function (err, body, status, headers) {
                      console.log(err);
                      if (err) {
                        // return console.log(err);
                        callback(null, "");
                      } else {
                        tempObj.uri = body.uri;
                        tempObj.video = n.video;
                        tempObj.name = body.name;
                        tempObj.link = body.link;
                        tempObj.description = body.description;
                        if (tempObj.name && tempObj.name != undefined && tempObj.uri && tempObj.uri != undefined) {
                          tempObj.thumbnail = body.pictures.sizes[3].link;
                          finalObj.matchVideos.push(tempObj);
                          Topmatchvideos.saveData(finalObj, function (err, saved) {
                          });

                        }
                        callback(null, body);
                      }
                    });
                } else {
                  tempObj.uri = n.uri;
                  tempObj.video = n.video;
                  tempObj.name = n.name;
                  tempObj.link = n.link;
                  tempObj.description = n.description;
                  tempObj.thumbnail = n.thumbnail;
                  finalObj.matchVideos.push(tempObj);
                  callback();
                }
              } else {
                callback(null, "Access Token Not Found");
              }
            },
              function (err, files) {
                dataTosend.push(finalObj);
                finalObj = {};
                finalObj.matchVideos = [];
                callback();
              });
          }, function (err) {
            callback(null, dataTosend);
          });
        } else {
          callback(null, "Access Token Not Found");
        }

      },
      function (result, callback) {
        finalData.result = result;
        finalData.page = data.page;
        Topmatchvideos.find({}).lean().count().exec(function (err, count) {
          if (err) {
            callback(err, null);
          } else {
            finalData.total = count;
            callback(null, finalData);
          }
        });

      }

    ], function (err, result) {
      if (err) {
        callback(err, null);
      } else if (_.isEmpty(result)) {
        callback(null, []);
      } else {
        callback(null, result);
      }
    });


  }





};
module.exports = _.assign(module.exports, exports, model);