var schema = new Schema({
    city: String,
    year: Number,
    link: String,
    startDate:Date,
    endDate:Date
});

schema.plugin(deepPopulate, {});
schema.plugin(uniqueValidator);
schema.plugin(timestamps);
module.exports = mongoose.model('EventLink', schema);

var exports = _.cloneDeep(require("sails-wohlig-service")(schema));
var model = {
    liveOrPastEvent:function(data,callback){
        async.waterfall([
            function(callback){
                EventLink.findOne({
                    "city":data.city
                }).exec(function(err,event){
                    if(err){
                        callback(err,null);
                    }else if(!_.isEmpty(event)){
                        callback(null,{
                            "data":event,
                            "location":"live",
                            "value":true
                        });
                    }else{
                        callback(null,{
                            "data":"No Live Events Found",
                            "value":false
                        });
                    }
                });
            },
            function(liveRes,callback){
                
            }
        ],function(err,final){
            if(err){
                callback(err,null);
            }else{
                callback(null,final);                
            }
        });
    }
};
module.exports = _.assign(module.exports, exports, model);
