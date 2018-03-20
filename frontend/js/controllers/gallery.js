myApp.controller('GalleryLandingCtrl', function ($scope, $state, $stateParams, TemplateService, $uibModal, NavigationService, $timeout, toastr, $http) {
  $scope.template = TemplateService.getHTML("content/gallerylanding.html");
  TemplateService.title = "Gallery Landing"; //This is the Title of the Website
  $scope.navigation = NavigationService.getNavigation();






  $scope.likeImage = [{
    img: '/img/dishapatani1.jpg'
  }, {
    img: '/img/day-03.png'
  }, {
    img: '/img/day-02.png'
  }, {
    img: '/img/day-04.png'
  }];

  $scope.formData = {};
  $scope.formData.filter = {};
  $scope.formData.filter.mediaType = 'gallery';
  $scope.objectFilter = {};
  $scope.objectFilterOne = {};
  $scope.objectFilter.city = 'mumbai';
  $scope.objectFilterOne.city = 'mumbai';
  // GET PHOTOS AND VIDEOS
  function getVideosAndPhotos() {
    $scope.url = 'Gallery/getPhotosAndVideos';
    NavigationService.getDataApiCall($scope.objectFilter, $scope.url, function (data) {
      if (data.data.value == true) {
        $scope.photosVideos = data.data.data;
        _.each($scope.photosVideos, function (key) {
          if (key.mediatype == 'video') {
            key.thumbnail = '../img/media-video-thumb.jpg';
            if (key.videotype === 'vimeo' && key.thumbnails.length > 0) {
              key.thumbnail = key.thumbnails[3].link;
            } else if (key.videotype === 'youtube') {
              key.thumbnail = "http://img.youtube.com/vi/" + key.medialink + "/hqdefault.jpg";
            }
          }
        });

      } else {
        toastr.error('No data found');
      }
    });

  }
  getVideosAndPhotos();
  // END OF GET PHOTOS AND VIDEOS

  //GET SCHOOL AND COLLEGE PHOTOS
  function getSchoolPhotos() {
    $scope.url = 'Gallery/getSchoolCollegeAlbums';
    $scope.objectFilter.institutionType = 'school';
    NavigationService.getDataApiCall($scope.objectFilter, $scope.url, function (data) {
      console.log("data", data);
      if (data.data.value) {
        $scope.schoolAlbums = data.data.data;
      } else {
        toastr.error('No data found');
      }
    });
  }

  getSchoolPhotos();

  function getCollegePhotos() {
    $scope.url = 'Gallery/getSchoolCollegeAlbums';
    $scope.objectFilterOne.institutionType = 'college';
    NavigationService.getDataApiCall($scope.objectFilterOne, $scope.url, function (data) {
      console.log("data", data);
      if (data.data.value) {
        $scope.collegeAlbums = data.data.data;
      } else {
        toastr.error('No data found');
      }
    });
  }

  getCollegePhotos();

  //GET SCHOOL AND COLLEGE PHOTOS END


  function getFeaturedPhotos() {
    $scope.url = 'FeatureContent/search';
    NavigationService.search($scope.formData, $scope.url, function (data) {
      if (data.data.value) {
        $scope.feturedPhotos = data.data.data.results;
        $scope.feturedPhotos = _.shuffle($scope.feturedPhotos);
        $scope.feturedPhotos = _.take($scope.feturedPhotos, 6);
        _.each($scope.feturedPhotos, function (value) {
          value.image = _.find(value.featuredContentGallery, 'thumbnail');
          if (value.image == undefined) {
            value.image = value.featuredContentGallery[0];
          }
        });

        $scope.feature = _.chunk($scope.feturedPhotos, 3);
        console.log(" $scope.feturedPhotos ", $scope.feature);
      }
    });
  }
  getFeaturedPhotos();



  // AD BANNERS
  function getAdBanners() {
    $scope.url = 'AdBanners/search';
    $scope.constraints = {};
    $scope.constraints.filter = {};
    $scope.constraints.filter.pageType = 'gallery';
    NavigationService.getDataApiCall($scope.constraints, $scope.url, function (data) {
      console.log(data, "ad data");
      $scope.adBanners = data.data.data.results;
      $scope.positionadBanners = _.each($scope.adBanners, function (key) {
        console.log(key, "inside key");
        if (key.adPlacement === '2ndbanner') {
          if (key.status == 'enable') {
            $scope.secondAdBanner = key;
          } else {
            $scope.secondAdBanner = ' ';
          }
        } else if (key.adPlacement === '1stbanner') {
          if (key.status === 'enable') {
            $scope.firstAdBanner = key;
          } else {
            $scope.firstAdBanner = ' ';
          }
        }
      })
    })

  }
  getAdBanners()
  // AD BANNERS END


  function getYoumaylike() {
    $scope.url = 'Youmaylike/search';
    NavigationService.apiCallWithoutParams($scope.url, function (data) {
      if (data.data.value) {
        console.log(data, "you may like");
        $scope.youMayLikeData = data.data.data.results;
        // console.log($scope.youMayLikeData, "see herere")
        $scope.youMayLikeData = _.shuffle($scope.youMayLikeData);
        // console.log($scope.youMayLikeData, "shuffle");
        $scope.youMayLikeData = _.take($scope.youMayLikeData, 4);
        // console.log($scope.youMayLikeData, "take");
        $scope.likeData = _.each($scope.youMayLikeData, function (key) {
          console.log(key, "maylike data")
        });
      }

    });
  }
  getYoumaylike();
  //SWIPER

  $scope.initSwiper = function () {
    $timeout(function () {
      var albumGallery = new Swiper('.albumview-gallery .swiper-container', {
        slidesPerView: 1,
        direction: 'horizontal',
        loop: false,
        centeredSlides: true,
        grabCursor: true,
        nextButton: '.albumview-next',
        prevButton: '.albumview-prev',
        touchEventsTarget: 'container',
      });

      var albumThumbs = new Swiper('.albumview-thumbs .swiper-container', {
        slidesPerView: 4,
        spaceBetween: 10,
        direction: 'horizontal',
        loop: false,
        centeredSlides: true,
        grabCursor: true,
        touchEventsTarget: 'container',
        slideToClickedSlide: true
      });
      albumGallery.params.control = albumThumbs;
      albumThumbs.params.control = albumGallery;
    }, 300);
  }

  $scope.$on('$viewContentLoaded', function () {
    $scope.initSwiper();
  });



  $scope.openAlbumView = function (album) {
    console.log('album', album);
    $scope.currentAlbum = album;
    var modalInstance = $uibModal.open({
      animation: $scope.animationsEnabled,
      templateUrl: 'views/modal/gallery-album.html',
      size: 'lg',
      scope: $scope,
      windowClass: "album-modal"
    });
    $scope.initSwiper();
  }
});