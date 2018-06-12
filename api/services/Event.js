var schema = new Schema({
    institutionType: {
        type: String,
    },
    city: String,
    state: String,
    venue: String,
    year: String,
    school: Boolean,
    college: Boolean,
    toMonth: String,
    fromMonth: String,
    eventYear: String,
    isExected: Boolean
});




schema.plugin(deepPopulate, {});
schema.plugin(uniqueValidator);
schema.plugin(timestamps);
module.exports = mongoose.model('Event', schema);

var exports = _.cloneDeep(require("sails-wohlig-service")(schema));
var model = {

    //returns last executed events of cities 
    getExecutedEvents: function (callback) {
        Event.aggregate([{
            $match: {
                "isExecuted": true
            }
        }, {
            $sort: {
                year: -1
            }
        },{
            $group: {
                "_id": "$city",
                "lastExecutedYear": {
                    $max: "$year"
                },
                "eventId": {
                    $first: "$_id"
                }
            }
        }], callback);
    }
    
};
module.exports = _.assign(module.exports, exports, model);