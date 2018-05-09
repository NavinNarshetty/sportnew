module.exports = _.cloneDeep(require("sails-wohlig-controller"));
var controller = {
    search: function (req, res) {
        if (req.body) {
            Athelete.search(req.body, res.callback);
        } else {
            res.json({
                value: false,
                data: "Invalid Request"
            });
        }
    },
    getSearch: function (req, res) {
        if (req.body) {
            Athelete.getSearch(req.body, res.callback);
        } else {
            res.json({
                value: false,
                data: "Invalid Request"
            });
        }
    },
    filterAthlete: function (req, res) {
        if (req.body) {
            Athelete.filterAthlete(req.body, res.callback);
        } else {
            res.json({
                value: false,
                data: "Invalid Request"
            });
        }
    },

    getAthlete: function (req, res) {
        if (req.body) {
            Athelete.getAthlete(req.body, res.callback);
        } else {
            res.json({
                value: false,
                data: "Invalid Request"
            });
        }
    },
    generateExcel: function (req, res) {
        res.connection.setTimeout(200000000);
        req.connection.setTimeout(200000000);
        if (req.body) {
            console.log(req.body);
            Athelete.generateExcel(req.body, res);
        } else {
            res.json({
                value: false,
                data: "Invalid Request"
            });
        }
    }
};
module.exports = _.assign(module.exports, controller);