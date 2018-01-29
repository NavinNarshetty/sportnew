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
    };
});
