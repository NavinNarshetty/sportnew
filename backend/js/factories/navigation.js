var imgurl = adminurl + "upload/";

var imgpath = imgurl + "readFile";
var uploadurl = imgurl;



myApp.factory('NavigationService', function ($http, $state) {
    var navigation = [];
    var data;
    if ($.jStorage.get('accessLevel')) {
        data = $.jStorage.get('accessLevel');
    }


    var admin = [{
            name: "Events",
            classis: "active",
            sref: "#!/page/viewEvent//",
            icon: "phone"
        }, {
            name: "Registration",
            classis: "activeColor",
            sref: "",
            icon: "phone",
            subnav: [{
                name: "Athlete",
                classis: "activeColor",
                sref: "#!/tableathlete",
                icon: "phone",
            }, {
                name: "School",
                classis: "activeColor",
                sref: "#!/tableschool",
                icon: "phone",
            }]
        },
        {
            name: "Ad Banners",
            classis: "activeColor",
            sref: "",
            icon: "phone",
            subnav: [{
                name: "Gallery",
                classis: "activeColor",
                sref: "#!/adgallery",
                icon: "phone",
            }, {
                name: "MtachVideo",
                classis: "activeColor",
                sref: "#!/advideo",
                icon: "phone",
            }, {
                name: "Sport Page",
                classis: "activeColor",
                sref: "#!/adsportpage",
                icon: "phone",
            }]
        }, {
            name: "Featured",
            classis: "activeColor",
            sref: "",
            icon: "phone",
            subnav: [{
                name: "FeaturedGallery",
                classis: "activeColor",
                sref: "#!/featuredgallery",
                icon: "phone",
            }, {
                name: "FeatureVideo",
                classis: "activeColor",
                sref: "#!/featuredvideo",
                icon: "phone",
            }]
        }, {
            name: "City Rule",
            classis: "activeColor",
            sref: "",
            icon: "phone",
            subnav: [{
                    name: "Mumbai School",
                    classis: "activeColor",
                    sref: "#!/cityrule/mumbai/school",
                    icon: "phone",
                }, {
                    name: "Mumbai College",
                    classis: "activeColor",
                    sref: "#!/cityrule/mumbai/college",
                    icon: "phone",
                },
                {
                    name: "Hyderabad School",
                    classis: "activeColor",
                    sref: "#!/cityrule/hyderabad/school",
                    icon: "phone",
                },
                {
                    name: "Hyderabad College",
                    classis: "activeColor",
                    sref: "#!/cityrule/hyderabad/college",
                    icon: "phone",
                }
            ]
        }, {
            name: "You May Like",
            classis: "active",
            sref: "#!/like",
            icon: "phone"
        }, {
            name: "Press Media",
            classis: "activeColor",
            sref: "",
            icon: "phone",
            subnav: [{
                name: "Press News",
                classis: "activeColor",
                sref: "#!/pressnews",
                icon: "phone",
            }, {
                name: "Press Releases",
                classis: "activeColor",
                sref: "#!/pressreleases",
                icon: "phone",
            }, {
                name: "Media Contact",
                classis: "activeColor",
                sref: "#!/mediacontact",
                icon: "phone",
            }]
        }, {
            name: "About Championship",
            classis: "active",
            sref: "#!/tableaboutchampionship",
            icon: "phone"
        },{
            name: "Contact Details",
            classis: "active",
            sref: "#!/contactus",
            icon: "phone"
        }, {
            name: "Sports",
            classis: "activeColor",
            sref: "",
            icon: "phone",
            subnav: [{
                name: "Sport Page",
                classis: "activeColor",
                sref: "#!/tablesportpage",
                icon: "phone",
            }]
        }
    ];

    var superAdmin = _.concat([{
        name: "Users",
        classis: "active",
        sref: "#!/users",
        icon: "phone"
    }], admin)

    switch (data) {
        case "Super Admin":
            navigation = superAdmin;
            break;

        case "Admin":
            navigation = admin;
            break;

        default:
            $.jStorage.flush();
            $state.go("login");
    }

    return {
        getnav: function () {
            return navigation;
        },

        makeactive: function (menuname) {
            for (var i = 0; i < navigation.length; i++) {
                if (navigation[i].name == menuname) {
                    navigation[i].classis = "active";
                } else {
                    navigation[i].classis = "";
                }
            }
            return menuname;
        },

        search: function (url, formData, i, callback) {
            $http.post(adminurl + url, formData).then(function (data) {
                data = data.data;
                callback(data, i);
            });
        },
        delete: function (url, formData, callback) {
            $http.post(adminurl + url, formData).then(function (data) {
                data = data.data;
                callback(data);
            });
        },
        countrySave: function (formData, callback) {
            $http.post(adminurl + 'country/save', formData).then(function (data) {
                data = data.data;
                callback(data);

            });
        },
        saveRules: function (formData, callback) {
            $http.post(adminurl + 'cityRule/save', formData).then(function (data) {
                data = data.data;
                callback(data);

            });
        },

        apiCall: function (url, formData, callback) {
            $http.post(adminurl + url, formData).then(function (data) {
                data = data.data;
                callback(data);

            });
        },
        searchCall: function (url, formData, i, callback) {
            $http.post(adminurl + url, formData).then(function (data) {
                data = data.data;
                callback(data, i);
            });
        },

        getOneCountry: function (id, callback) {
            $http.post(adminurl + 'country/getOne', {
                _id: id
            }).then(function (data) {
                data = data.data;
                callback(data);

            });
        },
        getLatLng: function (address, i, callback) {
            $http({
                url: "https://maps.googleapis.com/maps/api/geocode/json?address=" + address + "&key=AIzaSyC62zlixVsjaq4zDaL4cefNCubjCgxkte4",
                method: 'GET',
                withCredentials: false,
            }).then(function (data) {
                data = data.data;
                callback(data, i);
            });
        },
        uploadExcel: function (form, callback) {
            $http.post(adminurl + form.model + '/import', {
                file: form.file
            }).then(function (data) {
                data = data.data;
                callback(data);

            });
        },
        getAllUsers: function (callback) {
            $http({
                url: adminurl + 'user/getAllUsers',
                method: 'POST'

            }).then(callback);
        },
        getOneUser: function (data, callback) {
            $http({
                url: adminurl + 'user/getOneUser',
                data: data,
                method: 'POST'

            }).then(callback);
        },
        saveUser: function (data, callback) {
            $http({
                url: adminurl + 'user/save',
                data: data,
                method: 'POST'

            }).then(callback);
        }

    };
});