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
  incrementalId: Number,
  matchId: String,
  sport: {
    type: Schema.Types.ObjectId,
    ref: 'Sport'
  },
  round: String,
  opponentsSingle: [{
    type: Schema.Types.ObjectId,
    ref: 'IndividualSport'
  }],
  opponentsTeam: [{
    type: Schema.Types.ObjectId,
    ref: 'TeamSport'
  }],
  prevMatch: [{
    type: Schema.Types.ObjectId,
    ref: 'Match'
  }],
  nextMatch: {
    type: Schema.Types.ObjectId,
    ref: 'Match'
  },
  scoreCard: Schema.Types.Mixed,
  resultsCombat: Schema.Types.Mixed,
  resultKumite: Schema.Types.Mixed,
  resultsRacquet: Schema.Types.Mixed,
  resultHeat: Schema.Types.Mixed,
  resultHockey: Schema.Types.Mixed,
  resultBasketball: Schema.Types.Mixed,
  resultVolleyball: Schema.Types.Mixed,
  resultHandball: Schema.Types.Mixed,
  resultWaterPolo: Schema.Types.Mixed,
  resultKabaddi: Schema.Types.Mixed,
  resultFootball: Schema.Types.Mixed,
  resultQualifyingRound: Schema.Types.Mixed,
  resultKnockout: Schema.Types.Mixed,
  resultShooting: Schema.Types.Mixed,
  resultSwiss: Schema.Types.Mixed,
  resultFencing: Schema.Types.Mixed,
  resultImages: Schema.Types.Mixed,
  resultThrowball: Schema.Types.Mixed,
  scheduleDate: Date,
  scheduleTime: String,
  video: String,
  videoType: String,
  thumbnails: [],
  matchCenter: String,
  excelType: String,
  heatNo: String,
  resultType: String,
  drawFormat: String,
});

schema.plugin(deepPopulate, {
  populate: {
    "sport": {
      select: '_id sportslist gender ageGroup maxTeamPlayers minTeamPlayers weight eventPdf'
    },
    "opponentsSingle": {
      select: '_id athleteId sportsListSubCategory createdBy'
    },
    "opponentsSingle.athleteId": {
      select: '_id sfaId firstName middleName surname school photograph dob city atheleteSchoolName'
    },
    "opponentsSingle.athleteId.school": {
      select: '_id sfaid name screenName'
    },
    "opponentsTeam": {
      select: '_id name teamId schoolName studentTeam createdBy sport school'
    },
    "opponentsTeam.studentTeam.studentId": {
      select: '_id sfaId firstName middleName surname school photograph dob city'
    },
    "opponentsTeam.studentTeam.studentId.school": {
      select: '_id sfaid name screenName'
    },
    "opponentsTeam.school": {
      select: '_id schoolLogo schoolName'
    },
    "prevMatch": {
      select: ''
    },
  }
});
schema.plugin(uniqueValidator);
schema.plugin(timestamps);
module.exports = mongoose.model('Match', schema);

var exports = _.cloneDeep(require("sails-wohlig-service")(schema, "sport", "sport"));
var model = {


  getMatchVideos: function (data, callback) {
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
          CLIENT_ID = client.clientId;
          CLIENT_SECRET = client.clientSecret;
          var lib = new vimeo(CLIENT_ID, CLIENT_SECRET);
          Match.aggregate(

            // Pipeline
            [
              // Stage 1
              {
                $lookup: {
                  "from": "sports",
                  "localField": "sport",
                  "foreignField": "_id",
                  "as": "sportInfo"
                }
              },

              // Stage 2
              {
                $match: {
                  round: "Final"
                }
              },

              // Stage 3
              {
                $unwind: {
                  path: "$sportInfo",
                  includeArrayIndex: "arrayIndex", // optional
                  preserveNullAndEmptyArrays: false // optional
                }
              },

              // Stage 4
              {
                $lookup: {
                  "from": "sportslists",
                  "localField": "sportInfo.sportslist",
                  "foreignField": "_id",
                  "as": "sportslistInfo"
                }
              },

              // Stage 5
              {
                $unwind: {
                  path: "$sportslistInfo",
                  includeArrayIndex: "arrayIndex", // optional
                  preserveNullAndEmptyArrays: false // optional
                }
              },

              // Stage 6
              {
                $lookup: {
                  "from": "sportslistsubcategories",
                  "localField": "sportslistInfo.sportsListSubCategory",
                  "foreignField": "_id",
                  "as": "sportlistsubcatInfo"
                }
              },

              // Stage 7
              {
                $unwind: {
                  path: "$sportlistsubcatInfo",
                  includeArrayIndex: "arrayIndex", // optional
                  preserveNullAndEmptyArrays: false // optional
                }
              },
              // Stage 8
              {
                $match: {

                  "sportlistsubcatInfo.name": { $regex: data.sportName, $options: "i" }
                }
              },
              // Stage 9
              {


                $match: {
                  "video": { "$exists": true, "$ne": null },
                  "videoType": { "$exists": true, "$ne": null }
                }

              },
              // Stage 10
              {
                $project: {
                  "video": 1,
                  "videoType": 1,
                  // "sportlistsubcatInfo": 1
                }
              }

            ], function (err, found) {
              if (err) {
                callback(err, null);
              } else if (_.isEmpty(found)) {
                callback(null, []);
              } else {
                if (client.accessToken) {
                  console.log("access token-----", client.accessToken);
                  lib.access_token = client.accessToken;
                  var finalData = [];
                  found = _.shuffle(found);
                  finalData = _.take(found, 5);
                  async.eachSeries(finalData, function (n, callback) {
                    // console.log("n in video", n);
                    var urlData = {};
                    urlData.videoId = n.video;
                    console.log('client.accessToken ', client.accessToken);
                    var formData = {
                      method: 'get',
                      // body: data, // Javascript object
                      // json: true, // Use,If you are sending JSON data
                      url: "https://api.vimeo.com/videos/" + '262611853',
                      beforeSend: function (xhr) {
                        xhr.setRequestHeader('Authorization', 'bearer[' + client.accessToken + ']');
                        xhr.setRequestHeader('consumer_key', '[' + CLIENT_ID + ']');
                        xhr.setRequestHeader('consumer_secret', '[' + CLIENT_SECRET + ']');
                        xhr.setRequestHeader('Accept', 'application/vnd.vimeo.*+json;version=3.0');
                        xhr.setRequestHeader('client_id', '[69338819]');
                      },

                    };
                    request(formData, function (err, res) {
                      if (err) {
                        console.log('Error :', err);
                        return;
                      }
                      console.log("****************************");
                      console.log("res", res.body);
                      console.log("****************************");
                      callback(null, res);
                    });


                  }, function (err) {
                    if (err) {
                      callback(err, null);
                    } else {
                      callback(null, finalData);
                    }
                  });
                } else {
                  callback(null, "Access Token Not Found");
                }
              }
            });
        }
      }], function (err, result) {
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










