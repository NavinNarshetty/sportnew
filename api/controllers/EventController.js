module.exports = _.cloneDeep(require("sails-wohlig-controller"));
var controller = {

    getExecutedEvents:function(req,res){
        Event.getExecutedEvents(res.callback);
    }

};
module.exports = _.assign(module.exports, controller);
