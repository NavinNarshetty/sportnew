myApp.controller('SportPageCtrl', function ($scope, TemplateService, NavigationService, $timeout, toastr, $http) {
    $scope.template = TemplateService.getHTML("content/sportpage.html");
    TemplateService.title = "Sport"; //This is the Title of the Website
    $scope.navigation = NavigationService.getNavigation();

    $scope.dummydata = [1, 2, 3];
    $scope.readvariable = false;
    $scope.showRead = false;

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
            console.log($scope.readHeight, 'height');
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






    // READ MORE END
    // READ MORE END

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
    }]


    // GALLERY JSON
    $scope.allGallery = {};
    $scope.allGallery.slidePhotos = [
        [
            [{
                    "title": "",
                    "mediaLink": "img/Indiagate.jpg",
                    "_id": "5adaf7aa3e814c2de205f20c"
                },
                {
                    "title": "",
                    "mediaLink": "img/featuredthumbnail.jpg",
                    "_id": "5adaf7aa3e814c2de205f20b"
                },
                {
                    "title": "",
                    "mediaLink": "img/Indiagate.jpg",
                    "_id": "5adaf7aa3e814c2de205f20a"
                }
            ],
            [{
                    "title": "",
                    "mediaLink": "img/featuredthumbnail.jpg",
                    "_id": "5adaf7aa3e814c2de205f209"
                },
                {
                    "title": "",
                    "mediaLink": "img/Indiagate.jpg",
                    "_id": "5adaf7aa3e814c2de205f208"
                },
                {
                    "title": "",
                    "mediaLink": "img/featuredthumbnail.jpg",
                    "_id": "5adaf7aa3e814c2de205f207"
                }
            ]
        ],
        [
            [{
                    "title": "",
                    "mediaLink": "img/Indiagate.jpg",
                    "_id": "5adaf7aa3e814c2de205f206"
                },
                {
                    "title": "",
                    "mediaLink": "img/featuredthumbnail.jpg",
                    "_id": "5adaf7aa3e814c2de205f205"
                },
                {
                    "title": "",
                    "mediaLink": "img/Indiagate.jpg",
                    "_id": "5adaf7aa3e814c2de205f204"
                }
            ],
            [{
                    "title": "",
                    "mediaLink": "img/Indiagate.jpg",
                    "_id": "5adaf7aa3e814c2de205f203"
                },
                {
                    "title": "",
                    "mediaLink": "img/Indiagate.jpg",
                    "_id": "5adaf7aa3e814c2de205f202"
                },
                {
                    "title": "",
                    "mediaLink": "img/featuredthumbnail.jpg",
                    "_id": "5adaf7aa3e814c2de205f201"
                }
            ]
        ],
        [
            [{
                    "title": "",
                    "mediaLink": "img/featuredthumbnail.jpg",
                    "_id": "5adaf7aa3e814c2de205f200"
                },
                {
                    "title": "",
                    "mediaLink": "img/Indiagate.jpg",
                    "_id": "5adaf7aa3e814c2de205f1ff"
                },
                {
                    "title": "",
                    "mediaLink": "img/Indiagate.jpg",
                    "_id": "5adaf7aa3e814c2de205f1fe"
                }
            ],
            [{
                    "title": "",
                    "mediaLink": "img/Indiagate.jpg",
                    "_id": "5adaf7aa3e814c2de205f1fd"
                },
                {
                    "title": "",
                    "mediaLink": "img/Indiagate.jpg",
                    "_id": "5adaf7aa3e814c2de205f1fc"
                },
                {
                    "title": "",
                    "mediaLink": "img/featuredthumbnail.jpg",
                    "_id": "5adaf7aa3e814c2de205f1fb"
                }
            ]
        ]
    ]

    // GALLERY JSON END

})