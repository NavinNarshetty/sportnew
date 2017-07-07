myApp.controller('SchoolProfileCtrl', function ($scope, $state, $stateParams, TemplateService, NavigationService, $timeout, toastr, $http) {
    $scope.template = TemplateService.getHTML("content/schoolprofile.html");
    TemplateService.title = "School Profile"; //This is the Title of the Website
    $scope.navigation = NavigationService.getNavigation();
    // $(window).load(function () {
    //     $('.flexslider').flexslider({
    //         animation: "slide",
    //         animationLoop: false,
    //         itemWidth: 358,
    //         itemMargin: 5,
    //         minItems: 2
    //     });
    // });
    $scope.schoolRankTable = [{
            name: "Jamnabai Narsee International School",
            gold: "20",
            silver: "18",
            bronze: "19",
            points: "30"
        }, {
            name: "Jamnabai Narsee International School",
            gold: "20",
            silver: "18",
            bronze: "19",
            points: "30"
        }, {
            name: "Jamnabai Narsee International School",
            gold: "20",
            silver: "18",
            bronze: "19",
            points: "30"
        },
        {
            name: "Jamnabai Narsee International School",
            gold: "20",
            silver: "18",
            bronze: "19",
            points: "30"
        }, {
            name: "Jamnabai Narsee International School",
            gold: "20",
            silver: "18",
            bronze: "19",
            points: "30"
        }, {
            name: "Jamnabai Narsee International School",
            gold: "20",
            silver: "18",
            bronze: "19",
            points: "30"
        }, {
            name: "Jamnabai Narsee International School",
            gold: "20",
            silver: "18",
            bronze: "19",
            points: "30"
        }
    ]

    $scope.schoolTrackTable = [{

    }]

    $scope.mySlides = [
        '/img/day-03.png',
        '/img/day-04.png',
        '/img/oldSfa/bg-draw.jpg',
        '/img/day-04.png'
    ];

    $scope.customCards = [{
        img: '/img/bl-inner.jpg'
    }, {
        img: '/img/bl-inner.jpg'
    }, {
        img: '/img/bl-inner.jpg'
    }, {
        img: '/img/bl-inner.jpg'
    }, {
        img: '/img/bl-inner.jpg'
    }];

    var allSchoolProfile = ["frontend/views/content/schoolprofile/highlights.html", "frontend/views/content/schoolprofile/trackrecord.html",
        "frontend/views/content/schoolprofile/team.html",
        "frontend/views/content/schoolprofile/statistics.html",
        "frontend/views/content/schoolprofile/achievements.html", "frontend/views/content/schoolprofile/videos.html"
    ];
    $scope.schoolprofile = {
        innerView: allSchoolProfile[0],
        active: 'highlights'
    };
    $scope.viewTab = 1;
    // DIRECT LINK
    switch ($state.params.name) {
        case "highlights":
            $scope.schoolprofile.innerView = allSchoolProfile[0];
            break;
        case "trackrecord":
            $scope.schoolprofile.innerView = allSchoolProfile[1];
            $scope.schoolprofile.active = 'trackrecord';
            break;
        case "team":
            $scope.schoolprofile.innerView = allSchoolProfile[2];
            $scope.schoolprofile.active = 'team';
            break;
        case "statistics":
            $scope.schoolprofile.innerView = allSchoolProfile[3];
            $scope.schoolprofile.active = 'statistics';
            break;
        case "achievements":
            $scope.schoolprofile.innerView = allSchoolProfile[3];
            $scope.schoolprofile.active = 'achievements';
            break;
        case "videos":
            $scope.schoolprofile.innerView = allSchoolProfile[3];
            $scope.schoolprofile.active = 'video';
            break;

        default:
            $scope.schoolprofile.innerView = allSchoolProfile[0];
            $scope.schoolprofile.active = 'highlights';
            break;
    }
    // DIRECT LINK END

    // ON CLICK
    $scope.getTab = function (view) {
        $scope.schoolprofile.innerView = allSchoolProfile[view];
        var url = "highlights";

        switch (view) {
            case 0:
                url = "highlights";
                $scope.schoolprofile.active = 'highlights';
                break;
            case 1:
                url = "trackrecord";
                $scope.schoolprofile.active = 'trackrecord';
                break;
            case 2:
                url = "team";
                $scope.schoolprofile.active = 'team';
                break;
            case 3:
                url = "statistics";
                $scope.schoolprofile.active = 'statistics';
                break;
            case 4:
                url = "achievements";
                $scope.schoolprofile.active = 'achievements';
                break;
            case 5:
                url = "videos";
                $scope.schoolprofile.active = 'video';
                break;
            default:
                url = "highlights";
                $scope.schoolprofile.active = 'highlights';
                break;
        }

        $state.go("schoolprofile", {
            name: url
        }, {
            notify: false
        })
    }
    // ON CLICK END

})