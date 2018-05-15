myApp.controller('SportPageCtrl', function ($scope, TemplateService, NavigationService, $timeout, toastr, $stateParams, $http, eventService) {
    $scope.template = TemplateService.getHTML("content/sportpage.html");
    TemplateService.title = "Sport"; //This is the Title of the Website
    $scope.navigation = NavigationService.getNavigation();

    $scope.dummydata = [1, 2, 3];

    // VARIABLES
    $scope.currentYear = new Date().getFullYear();
    $scope.readvariable = false;
    $scope.showRead = false;
    $scope.eventData = {};
    $scope.sportPageData = {};
    $scope.allGallery = {};
    $scope.gallerySlides = [];
    $scope.allGallery = {
        'slidePhotos': []
    };







    // console.log($stateParams.id, "adsa");
    // *************API CALLING ***************

    if ($stateParams.id) {
        $scope.getOneSport = function () {
            $scope.url = 'Sportpage/getOne';
            $scope.constraints = {};
            $scope.constraints._id = $stateParams.id;
            NavigationService.getDataApiCall($scope.constraints, $scope.url, function (data) {
                // console.log(data, "full data");
                if (data) {
                    $scope.sportPageData = data.data.data;

                    $scope.getsportGallery($scope.sportPageData.sportName);
                    $scope.getEventData($scope.currentYear);
                }

            });
        }
        $scope.getOneSport();
    }

    $scope.getsportGallery = function (data) {
        $scope.url = 'Sportpage/getSportGallery'
        $scope.constraints = {};
        $scope.constraints.sportName = data;
        NavigationService.getDataApiCall($scope.constraints, $scope.url, function (data) {
            // console.log(data, "gallery data");
            $scope.sportGallery = data.data.data;
            $scope.gallerySlides = _.chunk($scope.sportGallery, 6);
            // console.log($scope.gallerySlides, "slides");
            _.each($scope.gallerySlides, function (n, nkey) {
                // console.log(nkey, "nnnn");
                // console.log(n, "each");
                $scope.allGallery.slidePhotos[nkey] = _.chunk(n, 3);
            });
            // console.log("picslide", $scope.allGallery);

        });
    }



    $scope.getEventData = function (currentYear) {
        eventService.eventSearch(currentYear, function (data) {
            // console.log(data, "event data");
            $scope.eventId = data._id;
            $scope.eventYear = data.eventYear;
            $scope.eventCity = data.city;
            $scope.yearEvent = data.year;



            // console.log($scope.eventCity, "city");
            // console.log($scope.eventId, "event id");
            if (data) {
                if ($scope.eventId && $stateParams.name) {
                    $scope.url = "Rank/getRanksBySport";
                    $scope.eventconstraints = {};
                    $scope.eventconstraints.eventId = $scope.eventId;
                    $scope.eventconstraints.sportName = $stateParams.name;
                    NavigationService.getDataApiCall($scope.eventconstraints, $scope.url, function (data) {
                        $scope.sportRankingTable = data.data.data;
                        // console.log($scope.sportRankingTable, "rankingtable");
                    });
                }
                // SPORT AD BANNERS NEED EVENT CITY ie:Mumbai and sportName
                $scope.sportAdBanner($scope.eventCity, $stateParams.name);


                // GET ATHLETES NEED YEAR EVNT ie:2017 also sportName fetched from params
                $scope.getAthletes($scope.yearEvent);


                // console.log("get athlete api");


            }



        });
    }

    $scope.getAthletes = function (yearEvent) {
        $scope.athleteConstraints = {};
        $scope.url = "SportsListSubCategory/getSportWiseMedalWinners"
        $scope.athleteConstraints.sportName = $stateParams.name;
        $scope.athleteConstraints.eventYear = yearEvent;
        NavigationService.getDataApiCall($scope.athleteConstraints, $scope.url, function (data) {
            // console.log("data in athlete medals", data)
            $scope.athleteMedalData = data.data.data;
            _.each($scope.athleteMedalData, function (key) {
                if (key.teamName) {
                    key.isTeam = true;
                }
                if (key.middleName) {
                    key.fullName = key.firstName + ' ' + key.middleName + ' ' + key.surname;
                } else {
                    key.fullName = key.firstName + ' ' + key.surname;
                }
            })
            // console.log("data in athlete medals", data)
        });
    };


    $scope.sportAdBanner = function (eventCity, sportName) {
        $scope.url = "Sportadbanner/search";
        $scope.sportParameter = {};
        $scope.sportParameter.page = 1;
        $scope.sportParameter.type = '';
        $scope.sportParameter.keyword = '';
        $scope.sportParameter.filter = {};
        $scope.sportParameter.filter.city = $scope.eventCity;
        $scope.sportParameter.filter.sportName = $stateParams.name;
        NavigationService.getDataApiCall($scope.sportParameter, $scope.url, function (data) {
            // console.log(data, "Ad Banner data");
            $scope.sportAdBannerData = data.data.data.results[0];
            $scope.bannerData = $scope.sportAdBannerData.banner;
            $scope.sideAdSpaceData = $scope.sportAdBannerData.sideAdSpace;
        });

    }

    $scope.sportpageMatchVideos = function () {
        $scope.url = 'Match/getMatchVideos';
        $scope.constraints = {};
        $scope.constraints.sportName = $stateParams.name;
        NavigationService.getDataApiCall($scope.constraints, $scope.url, function (data) {
            if (data) {
                // console.log(data, "match videos");
                $scope.matchVideoData = data.data.data;
            }
        });
    }
    $scope.sportpageMatchVideos();
    // ************API CALLING END ************

    $scope.swiperInit = function () {
        $timeout(function () {
            var gallerySlide = new Swiper('.sfa3card-galleryslider .swiper-container', {
                slidesPerView: 1,
                paginationClickable: true,
                loop: true,
                grabCursor: true,
                spaceBetween: 10,
                nextButton: '.sfa3card-galleryslider .swiper-button-next',
                prevButton: '.sfa3card-galleryslider .swiper-button-prev',
                touchEventsTarget: 'container',
                preloadImages: true
            })
        }, 3000);
    }


    $scope.$on('$viewContentLoaded', function (event) {
        $scope.swiperInit();
    })

    // READ MORE
    $scope.setReadMore = function () {
        $timeout(function () {
            $scope.readHeight = $(".sportpage-contentholder").height();
            // console.log($scope.readHeight, 'height');
            if ($scope.readHeight < 100) {
                $scope.showRead = false;
            } else {
                $scope.showRead = true;
            }
        }, 200)
    }

    $scope.setReadMore();

    // READ MORE
    $scope.readMore = function () {
        $scope.readvariable = !$scope.readvariable;
    }



    // TABLE HEIGHT
    // $scope.setReadMore = function () {

    // }
    // TABLE HEIGHT END



    // READ MORE END
    // READ MORE END

    // GALLERY CHUCK


    // GALLERY CHUCK END

    $scope.videoCard = [{
        videoImage: 'img/featuredthumbnail.jpg',
        title: 'Badminton',
        description: 'Boys | U-8 | Final'
    }, {
        videoImage: 'img/featuredthumbnail.jpg',
        title: 'Badminton',
        description: 'Boys | U-8 | Final'
    }, {
        videoImage: 'img/featuredthumbnail.jpg',
        title: 'Badminton',
        description: 'Boys | U-8 | Final'
    }, {
        videoImage: 'img/featuredthumbnail.jpg',
        title: 'Badminton',
        description: 'Boys | U-8 | Final'
    }, {
        videoImage: 'img/featuredthumbnail.jpg',
        title: 'Badminton',
        description: 'Boys | U-8 | Final'
    }, {
        videoImage: 'img/featuredthumbnail.jpg',
        title: 'Badminton',
        description: 'Boys | U-8 | Final'
    }]

    $scope.sportRankingTable = [{
        rank: '01',
        name: 'Jamnabai Narsee International School',
        gold: '10',
        silver: '20',
        bronze: '30',
        points: '50'
    }, {
        rank: '02',
        name: 'St. Xaviers High School (Airoli)',
        gold: '11',
        silver: '21',
        bronze: '31',
        points: '40'
    }, {
        rank: '03',
        name: 'Dnyan Pushpa Vidya Niketan & Jr. College',
        gold: '12',
        silver: '22',
        bronze: '32',
        points: '30'
    }, {
        rank: '04',
        name: 'Dnyan Pushpa Vidya Niketan & Jr. College',
        gold: '13',
        silver: '23',
        bronze: '33',
        points: '20'
    }, {
        rank: '05',
        name: 'Dnyan Pushpa Vidya Niketan & Jr. College',
        gold: '14',
        silver: '24',
        bronze: '34',
        points: '10'
    }, {
        rank: '06',
        name: 'Dr. Sarvepalli Radhakrishnan HindiSecondary School (Andheri)',
        gold: '15',
        silver: '25',
        bronze: '35',
        points: '09'
    }];

    $scope.sportAcademy = [{
        name: 'Celebration sport club',
        place: 'Andheri West',
        sports: ['basketball', 'cricket', 'badminton', 'swimming', 'tennis', 'abcd'],
        rating: '4'
    }, {
        name: 'South united school',
        place: 'Worli',
        sports: ['basketball', 'cricket', 'badminton', 'swimming', 'tennis'],
        rating: '5'
    }, {
        name: '360 degree sport management',
        place: 'Kharghar',
        sports: ['basketball', 'cricket', 'badminton', 'swimming', 'tennis'],
        rating: '3'
    }];


    $scope.matchVideoDatas = [{
            "uri": "/videos/249905542",
            "video": "249905542",
            "name": "50 meter Final U-10 Final boys",
            "link": "https://vimeo.com/249905542",
            "description": null,
            "thumbnail": "https://i.vimeocdn.com/video/675852297_640x360.jpg?r=pad"
        },
        {
            "uri": "/videos/250100069",
            "video": "250100069",
            "name": "2000 meter final U-16",
            "link": "https://vimeo.com/250100069",
            "description": null,
            "thumbnail": "https://i.vimeocdn.com/video/676098658_640x360.jpg?r=pad"
        },
        {
            "uri": "/videos/250075723",
            "video": "250075723",
            "name": "100 meter Final U-18 Final boys",
            "link": "https://vimeo.com/250075723",
            "description": null,
            "thumbnail": "https://i.vimeocdn.com/video/676066974_640x360.jpg?r=pad"
        },
        {
            "uri": "/videos/249915260",
            "video": "249915260",
            "name": "U-8 Girls-3049",
            "link": "https://vimeo.com/249915260",
            "description": null,
            "thumbnail": "https://i.vimeocdn.com/video/675864144_640x360.jpg?r=pad"
        },
        {
            "uri": "/videos/250256973",
            "video": "250256973",
            "name": "100 meter Final U-10 Girls",
            "link": "https://vimeo.com/250256973",
            "description": null,
            "thumbnail": "https://i.vimeocdn.com/video/676300600_640x360.jpg?r=pad"
        }
    ]






})