myApp.controller('SchoolProfileCtrl', function ($scope, $state, $stateParams, TemplateService, NavigationService, $timeout, toastr, $http, $filter) {
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
    // COMMMON VARIABLES
    $scope.years = ["2017-18", "2016-17", "2015-16"];
    $scope.formHeader = {
      // "schoolName": "Niraj Public School (Ameerpet)",
      "schoolName": "The Hyderabad Public School (Begumpet)",
      "city": "Hyderabad",
      "year": $scope.years[0]
    };
    $scope.donutColors=  [{
      backgroundColor:"#0edb87",
      pointBackgroundColor:"#0edb87",
      pointBorderColor: "#fff",
      pointHoverBorderColor: "#fff"
    }, {
      backgroundColor:"#0edb87",
      pointBackgroundColor:"#0edb87",
      pointBorderColor: "#fff",
      pointHoverBorderColor: "#fff"
    }, {
      backgroundColor:"#0edb87",
      pointBackgroundColor:"#0edb87",
      pointBorderColor: "#fff",
      pointHoverBorderColor: "#fff"
    }, {
      backgroundColor:"#0edb87",
      pointBackgroundColor:"#0edb87",
      pointBorderColor: "#fff",
      pointHoverBorderColor: "#fff"
    }, {
      backgroundColor:"#0edb87",
      pointBackgroundColor:"#0edb87",
      pointBorderColor: "#fff",
      pointHoverBorderColor: "#fff"
    }, {
      backgroundColor:"#0edb87",
      pointBackgroundColor:"#0edb87",
      pointBorderColor: "#fff",
      pointHoverBorderColor: "#fff"
    }, {
      backgroundColor:"#0edb87",
      pointBackgroundColor:"#0edb87",
      pointBorderColor: "#fff",
      pointHoverBorderColor: "#fff"
    }, {
      backgroundColor:"#0edb87",
      pointBackgroundColor:"#0edb87",
      pointBorderColor: "#fff",
      pointHoverBorderColor: "#fff"
    },{
      backgroundColor:"#0edb87",
      pointBackgroundColor:"#0edb87",
      pointBorderColor: "#fff",
      pointHoverBorderColor: "#fff"
    },{
      backgroundColor:"#0edb87",
      pointBackgroundColor:"#0edb87",
      pointBorderColor: "#fff",
      pointHoverBorderColor: "#fff"
    },{
      backgroundColor:"#0edb87",
      pointBackgroundColor:"#0edb87",
      pointBorderColor: "#fff",
      pointHoverBorderColor: "#fff"
    }];

    // COMMMON VARIABLES END
    // *********************************************************
    // *********************************************************
    // HIGHLIGHTS PAGE
    // VARIABLES
    // VARIABLES END
    // FUNCTIONS
    // FUNCTIONS END
    // API CALLS
    // API CALLS END
    // HIGHLIGHTS PAGE END
    // *********************************************************
    // *********************************************************
    // TRACK RECORD PAGE
    // VARIABLES
    // VARIABLES END
    // FUNCTIONS
    // FUNCTIONS END
    // API CALLS
    // API CALLS END
    // TRACK RECORD PAGE END
    // *********************************************************
    // *********************************************************
    // TEAM PAGE
    // VARIABLES
    // VARIABLES END
    // FUNCTIONS
    // FUNCTIONS END
    // API CALLS
    // API CALLS END
    // TEAM PAGE END
    // *********************************************************
    // *********************************************************
    // STATISTICS PAGE
    // VARIABLES
    $scope.viewStatsSport = 6;
    // VARIABLES END
    // FUNCTIONS
    $scope.viewMoreStats = function(){
      if ($scope.viewStatsSport == 6) {
        $scope.viewStatsSport = $scope.schoolStats.sports.length;
      } else {
        $scope.viewStatsSport = 6;
        TemplateService.scrollTo('sportwise-statisticssection', 'class', 80);
      }
    }
    // FUNCTIONS END
    // API CALLS
    $scope.getStatsSchool = function(){
      var statsUrl = "schoolProfile/getStatistics";
      NavigationService.getDataApiCall($scope.formHeader, statsUrl, function(data){
        data = data.data;
        if (data.value == true) {
          $scope.schoolStats = data.data;
          $scope.schoolStats.medalsTally.noMedal = false;
          // SET MEDAL COUNTS
          if ($scope.schoolStats.medalsTally.medal) {
            if(!$scope.schoolStats.medalsTally.medal.gold || !$scope.schoolStats.medalsTally.medal.silver || !$scope.schoolStats.medalsTally.medal.bronze){
              $scope.schoolStats.medalsTally.noMedal = true;
            } else{
              if (!$scope.schoolStats.medalsTally.medal.gold || !$scope.schoolStats.medalsTally.medal.gold.count) {
                $scope.schoolStats.medalsTally.medal.gold.count = 0;
              }
              if (!$scope.schoolStats.medalsTally.medal.silver || !$scope.schoolStats.medalsTally.medal.silver.count) {
                $scope.schoolStats.medalsTally.medal.silver.count = 0;
              }
              if (!$scope.schoolStats.medalsTally.medal.bronze || !$scope.schoolStats.medalsTally.medal.bronze.count) {
                $scope.schoolStats.medalsTally.medal.bronze.count = 0;
              }
            }
          } else {
            $scope.schoolStats.medalsTally.noMedal = true;
          }
          // SET MEDAL COUNTS END
          // SET CONTINGENT PERCENTAGE
          if($scope.schoolStats.contingent.maleCount == $scope.schoolStats.contingent.femaleCount){
            $scope.schoolStats.contingent.malePercent = 50;
            $scope.schoolStats.contingent.femalePercent = 50;
          } else {
            var ratio = $scope.schoolStats.contingent.maleCount / $scope.schoolStats.contingent.totalStrength;
            var percent = ratio * 100;
            var percent = _.round(percent);
            $scope.schoolStats.contingent.malePercent = percent;
            $scope.schoolStats.contingent.femalePercent = 100 - $scope.schoolStats.contingent.malePercent;
          }
          // SET CONTINGENT PERCENTAGE END
          // MEDAL DONUT
          $scope.medalDonut = {
            labels: [],
            data: [],
            options: {
              cutoutPercentage: 75,
            }
          }
          $scope.medalList = $filter('orderBy')($scope.schoolStats.medalsTally.sportData, "name");
          _.each($scope.medalList, function(n){
            $scope.medalDonut.labels.push(n.name);
            $scope.medalDonut.data.push(n.totalCount);
          });
          console.log("ml", $scope.medalDonut);
          // MEDAL DONUT END
          // SET SPORT STATS
          $scope.schoolStats.sports = $scope.schoolStats.contingent.sport;
          _.each($scope.schoolStats.sports, function(n){
            n.winPercent = $filter('getpercent')(n.winCount, n.played);
            if (!n.noShowCount || n.noShowCount == undefined || n.noShowCount == undefined) {
              n.noShowCount = 0;
            }
            n.noShowPercent = $filter('getpercent')(n.noShowCount, n.played);
            if(n.maleCount == n.femaleCount){
              n.malePercent = 50;
              n.femalePercent = 50;
            } else {
              var ratio = n.maleCount / n.totalStrength;
              var percent = ratio * 100;
              var percent = _.round(percent);
              if(percent < 20){
                n.malePercent = 20;
              } else if(percent > 80){
                n.malePercent = 80;
              } else {
                n.malePercent = percent;
              }
              n.femalePercent = 100 - n.malePercent;
            }
          })
          // SET SPORT STATS
          console.log("Get Stats School", $scope.schoolStats);
        } else {
          console.log("Get Stats School Error", data);
        }
      });
    }
    // API CALLS END
    // STATISTICS PAGE END
    // *********************************************************
    // *********************************************************
    // ACHIEVEMENTS PAGE
    // VARIABLES
    // VARIABLES END
    // FUNCTIONS
    // FUNCTIONS END
    // API CALLS
    // API CALLS END
    // ACHIEVEMENTS PAGE END
    // *********************************************************
    // *********************************************************
    // VIDEOS PAGE
    // VARIABLES
    // VARIABLES END
    // FUNCTIONS
    // FUNCTIONS END
    // API CALLS
    // API CALLS END
    // VIDEOS PAGE END
    // *********************************************************
    // *********************************************************
    // COMMON SECTION
    // FUNCTIONS
    // SWIPER
    $scope.initSwiper = function () {
        // $scope.$on('$viewContentLoaded', function (event) {
        // HIGHLIGHT-PAGE-TEAM-SWIPER
        $timeout(function () {
            mySwiper = new Swiper('.performteam-slider .swiper-container', {
                slidesPerView: 3,
                paginationClickable: true,
                loop: true,
                autoplay: 2500,
                grabCursor: true,
                spaceBetween: 10,
                nextButton: '.performteam-swiper-next',
                prevButton: '.performteam-swiper-prev',
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
        //  HIGHLIGHT-PAGE-TEAM-SWIPER-END

        // HIGHLIGHT-PAGE-ATHLETE-SWIPER
        $timeout(function () {
            mySwiper2 = new Swiper('.performanceathlete-slider  .swiper-container', {
                slidesPerView: 3,
                paginationClickable: true,
                loop: true,
                autoplay: 1500,
                grabCursor: true,
                spaceBetween: 10,
                nextButton: '.performanceathlete-swiper-next',
                prevButton: '.performanceathlete-swiper-prev',
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


        // HIGHLIGHT-PAGE-ATHLETE-SWIPER-END
        // TEAM TABLE SWIPER
        $timeout(function () {
            mySwiper3 = new Swiper('.schoolprofile-tablelist  .swiper-container', {
                slidesPerView: 3,
                paginationClickable: true,
                loop: true,
                autoplay: 3500,
                grabCursor: true,
                spaceBetween: 10,
                nextButton: '.school-yearsummarytableswiper-next',
                prevButton: '.school-yearsummarytableswiper-prev',
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
        // END TEAM TABLE SWIPER
        // });
    }

    $scope.swiperInitialise = function (type) {
        if (type == 0) {
            $scope.$on('$viewContentLoaded', function (event) {
                $scope.initSwiper();
            })
        } else {
            $scope.initSwiper();
        }
    }
    $scope.swiperInitialise(0);
    // END-SWIPER
    // FUNCTIONS END
    // API CALLS
    $scope.getHeader = function(){
      // $scope.formHeader = {
      //   "schoolName": "Niraj Public School (Ameerpet)",
      //   "city": "Hyderabad"
      // };
      var headerLink = "schoolProfile/getHeader";
      NavigationService.getDataApiCall($scope.formHeader, headerLink, function(data){
        data = data.data;
        if (data.value == true) {
          $scope.profile = data.data;
          $scope.noMedal = false;
          // CHECK FOR MEDALS
          if ($scope.profile.medal) {
            if(!$scope.profile.medal.gold || !$scope.profile.medal.silver || !$scope.profile.medal.bronze){
              $scope.noMedal = true;
            } else{
              if (!$scope.profile.medal.gold) {
                $scope.profile.medal.gold = {};
                $scope.profile.medal.gold.count = 0;
              }
              if (!$scope.profile.medal.silver) {
                $scope.profile.medal.silver = {};
                $scope.profile.medal.silver.count = 0;
              }
              if (!$scope.profile.medal.bronze) {
                $scope.profile.medal.bronze = {};
                $scope.profile.medal.bronze.count = 0;
              }
            }
          } else {
            $scope.noMedal = true;
          }
          // CHECK FOR MEDALS END
          console.log("header",$scope.profile);
        } else {
          console.log("Header Error", data);
        }
      });
    }
    $scope.getHeader();
    // API CALLS END
    // COMMON SECTION END
    // *********************************************************
    // *********************************************************
    // flex-slider
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
    // endflex

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
        name: 'archery',

        played: '123',
        won: '456',
        lost: '789',
        draw: '012',
        strength: '300',
        male: '30',
        female: '70'
    }, {
        name: 'basketball',
        played: '123',
        won: '456',
        lost: '789',
        draw: '012',
        strength: '400',
        male: '70',
        female: '30'
    }, {
        name: 'fencing',
        played: '123',
        won: '456',
        lost: '789',
        draw: '012',
        strength: '500',
        male: '60',
        female: '40'
    }, {
        name: 'carrom',

        played: '123',
        won: '456',
        lost: '789',
        draw: '012',
        strength: '600',
        male: '20',
        female: '80'
    }, {
        name: 'karate',
        played: '123',
        won: '456',
        lost: '789',
        draw: '012',
        strength: '700',
        male: '50',
        female: '50'

    }, {
        name: 'shooting',

        played: '123',
        won: '456',
        lost: '789',
        draw: '012',
        strength: '800',
        male: '40',
        female: '60'

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

    var allSchoolProfile = ["../views/content/schoolprofile/highlights.html", "../views/content/schoolprofile/trackrecord.html",
        "../views/content/schoolprofile/team.html",
        "../views/content/schoolprofile/statistics.html",
        "../views/content/schoolprofile/achievements.html", "../views/content/schoolprofile/videos.html"
    ];
    $scope.schoolprofile = {
        innerView: allSchoolProfile[0],
        active: 'highlights'
    };
    $scope.viewTab = 1;
    // DIRECT LINK
    switch ($state.params.tab) {
        case "highlights":
            $scope.schoolprofile.innerView = allSchoolProfile[0];
            $scope.schoolprofile.active = 'highlights';
            $scope.swiperInitialise(0);
            break;
        case "trackrecord":
            $scope.schoolprofile.innerView = allSchoolProfile[1];
            $scope.schoolprofile.active = 'trackrecord';
            break;
        case "team":
            $scope.schoolprofile.innerView = allSchoolProfile[2];
            $scope.schoolprofile.active = 'team';
            $scope.swiperInitialise(0);
            break;
        case "statistics":
            $scope.schoolprofile.innerView = allSchoolProfile[3];
            $scope.schoolprofile.active = 'statistics';
            $scope.getStatsSchool();
            break;
        case "achievements":
            $scope.schoolprofile.innerView = allSchoolProfile[4];
            $scope.schoolprofile.active = 'achievements';
            break;
        case "videos":
            $scope.schoolprofile.innerView = allSchoolProfile[5];
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
        $scope.swiperInitialise(1);
        switch (view) {
            case 0:
                url = "highlights";
                $scope.schoolprofile.active = 'highlights';
                $scope.initSwiper();
                break;
            case 1:
                url = "trackrecord";
                $scope.schoolprofile.active = 'trackrecord';
                break;
            case 2:
                url = "team";
                $scope.schoolprofile.active = 'team';
                $scope.initSwiper();
                break;
            case 3:
                url = "statistics";
                $scope.schoolprofile.active = 'statistics';
                $scope.getStatsSchool();
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
            tab: url
        }, {
            notify: false
        })
    }
    // ON CLICK END
})
