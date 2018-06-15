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
                  round: {
                    "$in": ["Final", "Time Trial"]
                  },

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

                  "sportlistsubcatInfo.name": {
                    $regex: data.sportName,
                    $options: "i"
                  }
                }
              },
              // Stage 9
              {


                $match: {
                  "video": {
                    "$exists": true,
                    "$ne": null
                  },
                  "videoType": {
                    "$exists": true,
                    "$ne": null
                  }
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

            ],
            function (err, found) {
              if (err) {
                callback(err, null);
              } else if (_.isEmpty(found)) {
                callback(null, []);
              } else {
                if (client.accessToken) {
                  lib.access_token = client.accessToken;
                  var finalData = [];
                  var finalArr = [];
                  found = found.filter(o => Object.keys(o.video).length);
                  async.concatLimit(found, 1, function (n, callback) {
                    if (client.accessToken) {
                      lib.access_token = client.accessToken;
                      var urlData = {};
                      var tempObj = {};
                      urlData.videoId = n.video;
                      if (finalArr.length < 10) {
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
                                finalArr.push(tempObj);

                              }
                              callback(null, body);
                            }
                          });
                      } else {
                        callback(null, "");
                      }

                    } else {
                      callback(null, "Access Token Not Found");
                    }

                  },
                    function (err, files) {
                      if (err) {
                        callback(err, null);
                      } else {
                        console.log("finalArr", finalArr.length);
                        finalArr = _.shuffle(finalArr);
                        finalArr = _.take(finalArr, 5);
                        console.log("file.length", files.length);
                        callback(null, finalArr);
                      }
                    });
                  // callback(null, finalArr);
                } else {
                  callback(null, "Access Token Not Found");
                }
              }
            });
        }
      }
    ],
      function (err, result) {
        if (err) {
          callback(err, null);
        } else if (_.isEmpty(result)) {
          callback(null, []);
        } else {
          callback(null, result);
        }

      });
  },

  sortSportwiseMatchVideos: function (data, callback) {
    Allmatchvideos.remove({}).exec(function (err, deleted) {
      if (err) {
        console.log("Error", err);
      } else {
        console.log("All documents removed");
      }

    });
    Topmatchvideos.remove({}).exec(function (err, deleted) {
      if (err) {
        console.log("Error", err);
      } else {
        console.log("All documents removed");
      }

    });
    var tempObj = {};
    var tempObj1 = {};
    tempObj.matchVideos = [];
    tempObj.allmatchvideos = [];
    async.waterfall([
      function (callback) {
        Match.aggregate(
          // Pipeline
          [
            // Stage 1
            {
              $match: {
                'round': {
                  $in: ['Final', 'Time Trial']
                },
                $and: [{ video: { $ne: "" } }, { video: { $ne: null } }]
              }
            },

            // Stage 2
            {
              $project: {
                "sport": 1,
                "round": 1,
                "video": 1

              }
            },

            // Stage 3
            {
              $lookup: {
                "from": "sports",
                "localField": "sport",
                "foreignField": "_id",
                "as": "sport"
              }
            },

            // Stage 4
            {
              $unwind: {
                path: "$sport",
                includeArrayIndex: "arrayIndex", // optional
                preserveNullAndEmptyArrays: true // optional
              }
            },

            // Stage 5
            {
              $lookup: {
                "from": "sportslists",
                "localField": "sport.sportslist",
                "foreignField": "_id",
                "as": "sportslistsData"
              }
            },

            // Stage 6
            {
              $unwind: {
                path: "$sportslistsData",
                includeArrayIndex: "arrayIndex", // optional
                preserveNullAndEmptyArrays: true // optional
              }
            },

            // Stage 7
            {
              $lookup: {
                "from": "sportslistsubcategories",
                "localField": "sportslistsData.sportsListSubCategory",
                "foreignField": "_id",
                "as": "sportslistsubcataData"
              }
            },

            // Stage 8
            {
              $unwind: {
                path: "$sportslistsubcataData",
                includeArrayIndex: "arrayIndex", // optional
                preserveNullAndEmptyArrays: true // optional
              }
            },

            // Stage 9
            {
              $lookup: {
                "from": "matchvideos",
                "localField": "sportslistsubcataData._id",
                "foreignField": "sportsListSubCategory",
                "as": "matchvideosData"
              }
            },

            // Stage 10
            {
              $unwind: {
                path: "$matchvideosData",
                includeArrayIndex: "arrayIndex", // optional
                preserveNullAndEmptyArrays: true // optional
              }
            },

            // Stage 11
            {
              $group: {
                _id: "$sportslistsubcataData.name",
                sportListSubCat: { $addToSet: '$sportslistsubcataData' },
                round: { $addToSet: '$round' },
                video: { $addToSet: '$video' },
                matchvideosData: { $addToSet: '$matchvideosData' }




              }
            },

            // Stage 12
            {
              $unwind: {
                path: "$matchvideosData",
                includeArrayIndex: "arrayIndex", // optional
                preserveNullAndEmptyArrays: true // optional
              }
            },

            // Stage 13
            {
              $unwind: {
                path: "$sportListSubCat",
                includeArrayIndex: "arrayIndex", // optional
                preserveNullAndEmptyArrays: true // optional
              }
            },

            // Stage 14
            {
              $unwind: {
                path: "$round",
                includeArrayIndex: "arrayIndex", // optional
                preserveNullAndEmptyArrays: true // optional
              }
            },

          ], function (err, found) {
            if (err) {
              callback(err, null);
            } else if (_.isEmpty(found)) {
              callback(null, []);
            } else {
              _.each(found, function (file) {
                var sportsToMerge = ['Tennis', 'Badminton', 'Table Tennis', 'Athletics', 'Swimming', 'Karate'];
                _.each(sportsToMerge, function (sportName) {
                  if (file._id != null && file._id.indexOf(sportName) != -1 && !file._id.indexOf(sportName) > 0 && file._id.indexOf(sportName) != null) {
                    file.sportName = sportName;
                  }
                });
                if (!file.sportName) {
                  file.sportName = file._id;
                }
              });
              var finalData = _(found)
                .groupBy('sportName')
                .map(function (items, name) {
                  // console.log("items", items);
                  console.log("name", name);
                  return {
                    sportName: name,
                    dataArr: items,
                  };
                }).value();
              callback(null, finalData);
            }
          });


      },
      function (data, callback) {
        var dataTosend = [];
        async.eachSeries(data, function (file, callback1) { //Loop through data array
          //process file
          file.videoArr = _.map(file.dataArr, 'video');
          file.videoArr = _.flattenDeep(file.videoArr);
          file.videoArr = _.uniq(file.videoArr);
          file.videoArr = _.compact(file.videoArr);
          file.allmatchvideosArr = file.videoArr;
          if (file.videoArr.length > 4) {
            file.viwemore = true;
          } else {
            file.viwemore = false;
          }
          file.matchVideoArr = _.map(file.dataArr, 'matchvideosData.matchVideos');
          file.matchVideoArr = _.flattenDeep(file.matchVideoArr);
          file.matchVideoArr = _.uniq(file.matchVideoArr);
          file.matchVideoArr = _.compact(file.matchVideoArr);
          file.matchVideoArr = _.map(file.matchVideoArr, 'videoId');
          if (file.matchVideoArr.length > 0) {
            file.matchVideoArr = _.shuffle(file.matchVideoArr);
            file.allmatchvideosArr = _.concat(file.matchVideoArr, file.allmatchvideosArr);
            if (file.matchVideoArr.length >= 2) {
              file.matchVideoArr = _.take(file.matchVideoArr, 2);
              file.videoArr = _.shuffle(file.videoArr);
              file.videoArr = _.take(file.videoArr, 2);

            } else {
              file.matchVideoArr = _.take(file.matchVideoArr, 1);
              file.videoArr = _.shuffle(file.videoArr);
              file.videoArr = _.take(file.videoArr, 3);
            }
          } else {

            file.videoArr = _.shuffle(file.videoArr);
            file.videoArr = _.take(file.videoArr, 4);
          }

          if (file.sportName != null) {
            tempObj.sportName = file.sportName;
            tempObj.viwemore = file.viwemore;
          }
          file.matchVideoArr = _.concat(file.videoArr, file.matchVideoArr);
          file.matchVideoArr = _.shuffle(file.matchVideoArr);
          _.each(file.matchVideoArr, function (obj) {
            tempObj1.video = obj;
            tempObj.matchVideos.push(tempObj1);
            tempObj1 = {};
          });
          _.each(file.allmatchvideosArr, function (obj) {
            tempObj1.video = obj;
            tempObj.allmatchvideos.push(tempObj1);
            tempObj1 = {};
          });

          //****Fucntion for saving all match videos from matches as well MatchVideos
          Allmatchvideos.saveData(tempObj, function (err, saved) {

          });
          //****Function for saving only topmatch match videos from Match.js as well as from MatchVideos.js */
          Topmatchvideos.saveData(tempObj, function (err, saved) {
            dataTosend.push(tempObj);
            tempObj = {};
            tempObj.matchVideos = [];
            tempObj.allmatchvideos = [];
            callback1();
          });

        }, function () {
          callback(null, dataTosend);
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