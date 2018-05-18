module.exports = _.cloneDeep(require("sails-wohlig-controller"));
var controller = {
    search: function (req, res) {
        if (req.body) {
            Registration.search(req.body, res.callback);
        } else {
            res.json({
                value: false,
                data: "Invalid Request"
            });
        }
    },
    getSearch: function (req, res) {
        if (req.body) {
            Registration.getSearch(req.body, res.callback);
        } else {
            res.json({
                value: false,
                data: "Invalid Request"
            });
        }
    },
    filterSchool: function (req, res) {
        if (req.body) {
            Registration.filterSchool(req.body, res.callback);
        } else {
            res.json({
                value: false,
                data: "Invalid Request"
            });
        }
    },
    searchSchoolProfiles:function(req, res){
        if (req.body && _.has(req.body,'find')) {
            Registration.filterSchool(req.body, res.callback);
        } else {
            res.json({
                value: false,
                data: "Invalid Parameters"
            });
        }
    }

};
module.exports = _.assign(module.exports, controller);