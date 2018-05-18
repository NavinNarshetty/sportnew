var controller = {
    //params--{"city":"MUMBAI/AHMEDABAD/HYDERABAD/'ALL'"} Empty string to get Profiles of all cities 
    search: function (req, res) {
        if (req.body && req.body.city && _.has(req.body, 'keyword')) {
            if (req.body.keyword) {
                Registration.searchByCity(req.body, res.callback);
            } else {
                res.json({
                    value: true,
                    data: []
                });
            }
        } else {
            res.json({
                value: false,
                data: "Invalid Params-G"
            });
        }
    },

    getRanksLanding: function (req, res) {
        Rank.getRanksAsPerCity(req.body, res.callback);
    },

    getCityLanding: function (req, res) {
        if (req.body && req.body.city) {
            Rank.getCityLanding(req.body,res.callback);
        } else {
            res.json({
                value: false,
                data: "Invalid Params"
            });
        }
    },

    getHeader:function(req,res){

        if(req.body && req.body.city){
            async.waterfall([

                function (callback) {
                    
                },
    
                function(){
    
                }
            ],function(err,finalResult){
                if(err){
                    callback(err,null);
                }else{
                    
                }
            });
        }else{

        }
    }

}
module.exports = _.assign(module.exports, controller);