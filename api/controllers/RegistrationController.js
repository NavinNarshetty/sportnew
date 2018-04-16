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
    }
};
module.exports = _.assign(module.exports, controller);