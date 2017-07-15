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

    // flex-slider
    setTimeout(function () {
        $('.highlightschool-slider .flexslider').flexslider({
            animation: "slide",
            animationLoop: true,
            reverse: false,
            slideshow: true,
            slideshowSpeed: 4000,
            controlNav: false,
            directionNav: true,
            prevText: "",
            nextText: "",
            itemWidth: 370,
            itemMargin: 10
        });
    }, 100);

    // end flex

    // team-flex
    setTimeout(function () {
        $('.schoolprofile-tablelist .flexslider').flexslider({
            animation: "slide",
            animationLoop: true,
            reverse: false,
            slideshow: true,
            slideshowSpeed: 4000,
            controlNav: false,
            directionNav: true,
            prevText: "",
            nextText: "",
            itemWidth: 380,
            itemMargin: 10
        });
    }, 100);
    // enflex

    $scope.performMedal = [{
        medal: "08",
        name: "gold"
    }, {
        medal: "09",
        name: "silver"
    }, {
        medal: "10",
        name: "bronze"
    }];
    $scope.topTable = [{
        schoolName: "Lady Ratanbai & Sir MathuradasVissanji Academy",
        criteria: "School Rank (Out of 652)",
        tperf: "1",
        yperf: "131"
    }, {
        schoolName: "Lady Ratanbai & Sir MathuradasVissanji Academy",
        criteria: "School Rank (Out of 652)",
        tperf: "1",
        yperf: "131"
    }, {
        schoolName: "Lady Ratanbai & Sir MathuradasVissanji Academy",
        criteria: "School Rank (Out of 652)",
        tperf: "1",
        yperf: "131"
    }, {
        schoolName: "Lady Ratanbai & Sir MathuradasVissanji Academy",
        criteria: "School Rank (Out of 652)",
        tperf: "1",
        yperf: "131"
    }, {
        schoolName: "Lady Ratanbai & Sir MathuradasVissanji Academy",
        criteria: "School Rank (Out of 652)",
        tperf: "1",
        yperf: "131"
    }, {
        schoolName: "Lady Ratanbai & Sir MathuradasVissanji Academy",
        criteria: "School Rank (Out of 652)",
        tperf: "1",
        yperf: "131"
    }, {
        schoolName: "Lady Ratanbai & Sir MathuradasVissanji Academy",
        criteria: "School Rank (Out of 652)",
        tperf: "1",
        yperf: "131"
    }]


    $scope.oneAtATime = true;
    $scope.status = {
        isCustomHeaderOpen: false,
        isFirstOpen: true,
        isFirstDisabled: false
    };
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
    $scope.summaryTable = [{
        year: '2017',
        match: '10',
        win: '10',
        loss: '10',
        draw: '10',
        wper: '10'

    }, {
        year: '2016',
        match: '10',
        win: '10',
        loss: '10',
        draw: '10',
        wper: '10'

    }, {
        year: '2015',
        match: '10',
        win: '10',
        loss: '10',
        draw: '10',
        wper: '10'

    }]

    $scope.selectedsportTable = [{
        round: 'Leauge match',
        schoolname: 'Jamnabai Narsee International School',
        score: '30-22',
        result: 'Won',
        videotext: 'You can also watch match highlights'

    }, {
        round: 'Leauge match',
        schoolname: 'Jamnabai Narsee International School',
        score: '30-22',
        result: 'Won',
        videotext: 'You can also watch match highlights'

    }, {
        round: 'Leauge match',
        schoolname: 'Jamnabai Narsee International School',
        score: '30-22',
        result: 'Won',
        videotext: 'You can also watch match highlights'

    }, {
        round: 'Leauge match',
        schoolname: 'Jamnabai Narsee International School',
        score: '30-22',
        result: 'Won',
        videotext: 'You can also watch match highlights'

    }, {
        round: 'Leauge match',
        schoolname: 'Jamnabai Narsee International School',
        score: '30-22',
        result: 'Won',
        videotext: 'You can also watch match highlights'

    }, {
        round: 'Leauge match',
        schoolname: 'Jamnabai Narsee International School',
        score: '30-22',
        result: 'Won',
        videotext: 'You can also watch match highlights'

    }]

    $scope.myAccordian = [{
        gender: 'Boys',
        agegroup: 'U-10',
        event: '100M',
        img: ['/img/day-03.png',
            '/img/day-04.png',
            '/img/oldSfa/bg-draw.jpg',
            '/img/day-03.png',
            '/img/day-04.png',
            '/img/oldSfa/bg-draw.jpg'
        ]
    }, {
        gender: 'Girls',
        agegroup: 'U-8',
        event: '200M',
        img: ['/img/day-03.png',
            '/img/day-04.png',
            '/img/oldSfa/bg-draw.jpg',
            '/img/day-03.png',
            '/img/day-04.png',
            '/img/oldSfa/bg-draw.jpg'
        ]
    }]

    $scope.mySlides = [
        '/img/day-03.png',
        '/img/day-04.png',
        '/img/oldSfa/bg-draw.jpg',
        '/img/day-03.png',
        '/img/day-04.png',
        '/img/oldSfa/bg-draw.jpg'
    ];

    $scope.videos = [1, 2, 3, 4, 5];

    $scope.SumTable = [{
            name: 'football'
        },
        {
            name: 'football'
        },
        {
            name: 'football'
        },
        {
            name: 'football'
        },
        {
            name: 'football'
        },
        {
            name: 'football'
        }, {
            name: 'football'
        },
        {
            name: 'football'
        },
        {
            name: 'football'
        }, {
            name: 'football'
        },
        {
            name: 'football'
        }, {
            name: 'football'
        }, {
            name: 'football'
        }, {
            name: 'football'
        }, {
            name: 'football'
        }, {
            name: 'football'
        }, {
            name: 'football'
        }, {
            name: 'football'
        }, {
            name: 'football'
        }, {
            name: 'football'
        }, {
            name: 'football'
        }, {
            name: 'football'
        }, {
            name: 'football'
        }, {
            name: 'football'
        }, {
            name: 'football'
        }
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

    $scope.teamCards = [{
        img: '/img/bl-inner.jpg'
    }, {
        img: '/img/bl-inner.jpg'
    }, {
        img: '/img/bl-inner.jpg'
    }, {
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

    $scope.sportDetail = [{
        games: '19',
        type: 'Played'
    }, {
        games: '18',
        type: 'Won'
    }, {
        games: '17',
        type: 'Lost'
    }, {
        games: '16',
        type: 'Draw'
    }]

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