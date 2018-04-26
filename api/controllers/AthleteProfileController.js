module.exports = _.cloneDeep(require("sails-wohlig-controller"));
var controller = {
    getHeader: function (req, res) {
        if (req.body.sfaId) {
            asyn.waterfall([
                //get One from ReportCard
                function (callback) {
                    var obj = {
                        "sfaId": req.body.sfaId
                    }
                    Reportcard.getOne(obj, callback);
                },

                //get One from Rank
                // function () {

                // }
            ], res.callback);
        } else {
            res.json({
                "data": "Invalid Params",
                "value": false
            });
        }
    }
};
module.exports = _.assign(module.exports, controller);