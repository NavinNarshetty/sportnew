module.exports = _.cloneDeep(require("sails-wohlig-controller"));
var controller = {

    qwerty:function(req,res){
        IndividualSport.qwerty(res.callback);
    }

};
module.exports = _.assign(module.exports, controller);
