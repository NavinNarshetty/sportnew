var mySwiper;
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

    // swiper
    $scope.initSwiper = function(){
      console.log('yoyoyoyo');
      // $scope.$on('$viewContentLoaded', function (event) {
          $timeout(function () {
            console.log('in ');
              mySwiper = new Swiper('.swiper-container', {
                  pagination: '.swiper-pagination',
                  slidesPerView: 3,
                  paginationClickable: true,
                  loop: true,
                  autoplay: 2500,
                  grabCursor: true,
                  spaceBetween: 10,
                  nextButton: '.swiper-button-next',
                  prevButton: '.swiper-button-prev',
                  touchEventsTarget: 'container',
                  breakpoints: {
                      992: {
                          slidesPerView: 3
                      },
                      768: {
                          slidesPerView: 2

                      },
                      481: {
                          slidesPerView: 1
                      },
                      320: {
                          slidesPerView: 1
                      }
                  }
              })
          }, 100);
      // });
    }
    // swiper
    // flex-slider
    setTimeout(function () {
        $('.highlightschool-slider .flexslider').flexslider({
            animation: "slide",
            animationLoop: true,
            reverse: false,
            slideshow: true,
            slideshowSpeed: 6000,
            controlNav: false,
            directionNav: true,
            prevText: "",
            nextText: "",
            itemWidth: 380,
            itemMargin: 10
        });
    }, 100);

    setTimeout(function () {
        $('.performanceathlete-slider .flexslider').flexslider({
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
            itemWidth: 370,
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

    // HIGHLIGHT SCHOOL TABLE
    $scope.schoolRankTable = [{
            rank: "120",
            name: "Jamnabai Narsee International School",
            gold: "202",
            silver: "181",
            bronze: "191",
            points: "301"
        },
        {
            rank: "121",
            name: "Jamnabai Narsee International School",
            gold: "201",
            silver: "181",
            bronze: "191",
            points: "301"
        },
        {
            rank: "122",
            name: "Dnyan Pushpa Vidya Niketan & Jr. College",
            gold: "201",
            silver: "182",
            bronze: "191",
            points: "301"
        },
        {
            rank: "123",
            name: "St. Xaviers High School (Airoli)",
            gold: "201",
            silver: "181",
            bronze: "191",
            points: "301"
        },
        {
            rank: "124",
            name: "Dnyan Pushpa Vidya Niketan & Jr. College",
            gold: "201",
            silver: "181",
            bronze: "119",
            points: "301"
        },
        {
            rank: "125",
            name: "Dr. Sarvepalli Radhakrishnan Hindi Secondary School (Andheri)",
            gold: "111",
            silver: "112",
            bronze: "172",
            points: "281"
        }
    ];
    // END HIGHLIGHT SCHOOL TABLE

    $scope.summaryTable = [{
        name: 'archery',
        year: '2017',
        match: '10',
        win: '10',
        loss: '10',
        draw: '10',
        show: true,
        wper: '10'

    }, {
        name: 'boxing',
        year: '2016',
        match: '10',
        win: '10',
        loss: '10',
        draw: '10',
        show: true,
        wper: '10'

    }, {
        name: 'carrom',
        year: '2015',
        match: '10',
        win: '10',
        loss: '10',
        draw: '10',
        show: true,
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

    $scope.teamAccor = [{
        gender: 'Boys',
        agegroup: 'U-10',
        event: '100M',
        img: ['/img/day-03.png',
            '/img/day-04.png',
            '/img/oldSfa/bg-draw.jpg',
            '/img/day-03.png',
            '/img/day-04.png',
            '/img/oldSfa/bg-draw.jpg',
            '/img/oldSfa/bg-draw.jpg',
            '/img/oldSfa/bg-draw.jpg',
            '/img/oldSfa/bg-draw.jpg',
            '/img/oldSfa/bg-draw.jpg',
            '/img/oldSfa/bg-draw.jpg',
            '/img/oldSfa/bg-draw.jpg',
            '/img/oldSfa/bg-draw.jpg',
            '/img/oldSfa/bg-draw.jpg',
            '/img/oldSfa/bg-draw.jpg'
        ]
    }]


    $scope.myAccord = [{
        name: 'Swimming',
        gold: '999',
        silver: '999',
        bronze: '999',
        rank: '999/1000',
        event: [{
            gender: 'Boys',
            age: 'U-8',
            gold: '999',
            silver: '999',
            bronze: '999',
            cat: [{
                    name: '50M',
                    ath: [1, 2, 3, 4, 5, 6]
                },
                {
                    name: 'LONG JUMP',
                    ath: [1, 2, 3, 4, 5, 6]
                }, {
                    name: 'HIGH JUMP',
                    ath: [1, 2, 3, 4, 5, 6]
                }
            ]
        }, {
            gender: 'Girls',
            age: 'U-10',
            gold: '999',
            silver: '999',
            bronze: '999',
            cat: [{
                    name: '50M',
                    ath: [1, 2, 3, 4, 5, 6]
                },
                {
                    name: 'LONG JUMP',
                    ath: [1, 2, 3, 4, 5, 6]
                }, {
                    name: 'HIGH JUMP',
                    ath: [1, 2, 3, 4, 5, 6]
                }
            ]
        }, {
            gender: 'Boys',
            age: 'U-10',
            gold: '999',
            silver: '999',
            bronze: '999',
            cat: [{
                    name: '50M',
                    ath: [1, 2, 3, 4, 5, 6]
                },
                {
                    name: 'LONG JUMP',
                    ath: [1, 2, 3, 4, 5, 6]
                }, {
                    name: 'HIGH JUMP',
                    ath: [1, 2, 3, 4, 5, 6]
                }
            ]
        }]
    }, {
        name: 'Volleyball',
        gold: '999',
        silver: '999',
        bronze: '999',
        rank: '999/1000',
        event: [{
            gender: 'Boys',
            age: 'U-8',
            gold: '999',
            silver: '999',
            bronze: '999',
            cat: [{
                name: 'Singles',
                ath: [1, 2, 3, 4, 5, 6, 7, 8, 9]
            }]
        }]
    }, {
        name: 'Archery',
        gold: '999',
        silver: '999',
        bronze: '999',
        rank: '999/1000',
        event: [{
            gender: 'Boys',
            age: 'U-8',
            gold: '999',
            silver: '999',
            bronze: '999',
            cat: [{
                name: 'Compound Bow',
                ath: [1, 2, 3, 4, 5, 6]
            }]
        }]
    }];

    // VIDEO PAGE jSON
    $scope.videoArray = [{
        year: '2017',
        totalVideos: '100',
        sport: [{
            name: 'Basketball',
            videoCount: '50',
            videos: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10']
        }, {
            name: 'Swimming',
            videoCount: '60',
            videos: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10']
        }]
    }, {
        year: '2016',
        totalVideos: '150',
        sport: [{
            name: 'Tennis',
            videoCount: '40',
            videos: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10']
        }, {
            name: 'Taekwondo',
            videoCount: '50',
            videos: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10']
        }, {
            name: 'Kho Kho',
            videoCount: '60',
            videos: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10']
        }]
    }];
    // VIDEO PAGE jSON END

    $scope.ySlides = [1, 2, 3];

    $scope.mySlides = [
        '/img/day-03.png',
        '/img/day-04.png',
        '/img/oldSfa/bg-draw.jpg',
        '/img/day-03.png',
        '/img/day-04.png',
        '/img/oldSfa/bg-draw.jpg'
    ];

    $scope.videos = [1, 2, 3, 4, 5];

    $scope.sumRank = [{
        schoolrank: '180',
        total: '999'
    }, {
        schoolrank: '180',
        total: '999'
    }, {
        schoolrank: '180',
        total: '999'
    }];

    $scope.corName = [{
        name: 'Manan Vora'
    }, {
        name: 'Aadil Mehta'
    }, {
        name: 'Viraj Kale'
    }]

    $scope.yearTable = [{
        year: '2017',
    }, {
        year: '2016',
    }, {
        year: '2015'
    }];

    $scope.contentT = [{
        total: '3000',
        male: '600',
        female: '400'
    }, {
        total: '3000',
        male: '600',
        female: '400'
    }, {
        total: '3000',
        male: '600',
        female: '400'
    }];
    $scope.SumTable = ['football', 'football', 'football', 'football', 'football', 'football', 'football', 'football', 'football', 'football', 'football', 'football', 'football'];

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

    $scope.Sumsportstable = [{
        name: 'archery'
    }, {
        name: 'basketball'
    }, {
        name: 'fencing'
    }, {
        name: 'carrom'
    }, {
        name: 'karate'
    }, {
        name: 'shooting'
    }]

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
        "frontend/views/content/schoolprofile/achievements.html", "frontend/views/content/schoolprofile/test.html"
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
            $scope.schoolprofile.innerView = allSchoolProfile[4];
            $scope.schoolprofile.active = 'achievements';
            break;
        case "videos":
            $scope.schoolprofile.innerView = allSchoolProfile[5];
            $scope.schoolprofile.active = 'video';
            $scope.initSwiper();
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
                $scope.initSwiper();
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
