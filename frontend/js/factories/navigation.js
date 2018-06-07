myApp.factory('NavigationService', function ($http) {
    var navigation = [{
            name: "Home",
            classis: "active",
            anchor: "home",
            subnav: [{
                name: "Subnav1",
                classis: "active",
                anchor: "home"
            }]
        }, {
            name: "Form",
            classis: "active",
            anchor: "form",
            subnav: []
        },
        {
            name: "Grid",
            classis: "active",
            anchor: "grid",
            subnav: []
        }
    ];

    return {
        getNavigation: function () {
            return navigation;
        },
        // LIVE UPDATES PAGE
        getAllEnabledBanner: function (callback) {
            $http({
                url: adminurl + 'banner/getAllEnabledBanner',
                method: 'POST',
                withCredentials: true
            }).then(callback);
        },
        getAllLiveUpdatedData: function (url, callback) {
            $http({
                url: adminurl + url,
                method: 'POST'
            }).then(callback);
        },
        // LIVE UPDATES PAGE

        getDataApiCall: function (obj, url, callback) {
            $http({
                url: adminurl + url,
                data: obj,
                method: 'POST'
            }).then(callback);
        },
        apiCallWithoutParams: function (url, callback) {
            $http({
                url: adminurl + url,
                method: 'POST'
            }).then(callback);
        },
        search: function (filter, url, callback) {
            $http({
                url: adminurl + url,
                data: filter,
                method: 'POST'
            }).then(callback);
        },
        getSchoolByRanks: function (callback) {
            $http({
                url: adminurl + 'rank/getSchoolByRanks',
                method: 'POST',
            }).success(callback);
        },
        getAgeGroupsAndEvents: function (request, callback) {
            $http({
                url: adminurl + 'rank/getAgeGroupsAndEvents',
                method: 'POST',
                data: request
            }).then(function (data) {
                callback(data.data);
            });
        },
        getMedalWinners: function (request, callback) {
            $http({
                url: adminurl + 'rank/getMedalWinners',
                method: 'POST',
                data: request
            }).then(function (data) {
                callback(data.data);
            });
        },
        getSchoolBySport: function (formData, callback) {
            $http({
                url: adminurl + 'rank/getSchoolBySport',
                method: 'POST',
                data: formData
            }).then(callback);
        }
    };
});