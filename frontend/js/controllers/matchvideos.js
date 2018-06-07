myApp.controller('MatchVideoCtrl', function ($scope, $state, $stateParams, TemplateService, NavigationService, $timeout, toastr, $http) {
  $scope.template = TemplateService.getHTML("content/matchvideo.html");
  TemplateService.title = "Match Video"; //This is the Title of the Website
  $scope.navigation = NavigationService.getNavigation();

  // VARIABLES
  $scope.formData = {};
  $scope.formData.mediaType = {};
  $scope.formData.mediaType.filter = 'video';
  // VARIABLES END


  $scope.getfeatureContent = function () {
    $scope.url = 'FeatureContent/search';
    NavigationService.search($scope.formData, $scope.url, function (data) {
      console.log(data, "video data");
      if (data.data.value) {
        $scope.featureVideosData = data.data.data.results;
        $scope.featureVideos = _.shuffle($scope.featureVideosData[0].featuredContentVideo);
        $scope.featureVideos = _.take($scope.featureVideos, 6);
        // console.log($scope.featureVideos, "after take")

        $scope.finalFeature = _.chunk($scope.featureVideos, 3);
        console.log($scope.finalFeature, "final array");
      }
    })
  }

  $scope.getfeatureContent();

  // FEATURED VIDEO JSON
  $scope.featured = [{
    featuredCard: [{
      thumbnail: 'img/featuredthumbnail.jpg',
      content: '10 Moments on Athletics',
      link: '235618360',
      type: 'vimeo'
    }, {
      thumbnail: 'img/featuredthumbnail.jpg',
      content: '10 Moments on Basketball',
      link: 'HCjNJDNzw8Y',
      type: 'youtube'
    }, {
      thumbnail: 'img/featuredthumbnail.jpg',
      content: '10 Moments on Tennis',
      link: '235618360',
      type: 'vimeo'
    }]

  }, {
    featuredCard: [{
      thumbnail: 'img/featuredthumbnail.jpg',
      content: '10 Moments on Tennis',
      link: 'HCjNJDNzw8Y',
      type: 'youtube'
    }, {
      thumbnail: 'img/featuredthumbnail.jpg',
      content: '10 Moments on Badminton',
      link: '235618360',
      type: 'vimeo'
    }, {
      thumbnail: 'img/featuredthumbnail.jpg',
      content: '10 Moments on Swimming',
      link: 'HCjNJDNzw8Y',
      type: 'youtube'
    }]
  }]
  // FEATURED VIDEO JSON END



  // TOP MATCH SPORT JSON
  $scope.topMatch = [{
    sportname: 'Archery',
    videos: [{
      thumbnail: 'img/featuredthumbnail.jpg',
      content: '10 Moments on the Archery Field',
      link: '235618360',
      type: 'vimeo'
    }, {
      thumbnail: 'img/featuredthumbnail.jpg',
      content: '10 Moments on the Archery Field',
      link: 'HCjNJDNzw8Y',
      type: 'youtube'
    }, {
      thumbnail: 'img/featuredthumbnail.jpg',
      content: '10 Moments on the Archery Field',
      link: '235618360',
      type: 'vimeo'
    }, {
      thumbnail: 'img/featuredthumbnail.jpg',
      content: '10 Moments on the Archery Field',
      link: 'HCjNJDNzw8Y',
      type: 'youtube'
    }]
  }, {
    sportname: 'Athletics',
    videos: [{
      thumbnail: 'img/featuredthumbnail.jpg',
      content: '10 Moments on the Athletics Field',
      link: '235618360',
      type: 'vimeo'
    }, {
      thumbnail: 'img/featuredthumbnail.jpg',
      content: '10 Moments on the Athletics Field',
      link: 'HCjNJDNzw8Y',
      type: 'youtube'
    }, {
      thumbnail: 'img/featuredthumbnail.jpg',
      content: '10 Moments on the Athletics Field',
      link: '235618360',
      type: 'vimeo'
    }, {
      thumbnail: 'img/featuredthumbnail.jpg',
      content: '10 Moments on the Athletics Field',
      link: 'HCjNJDNzw8Y',
      type: 'youtube'
    }]
  }, {
    sportname: 'Basketball',
    videos: [{
      thumbnail: 'img/featuredthumbnail.jpg',
      content: '10 Moments on the Basketball court',
      link: '235618360',
      type: 'vimeo'
    }, {
      thumbnail: 'img/featuredthumbnail.jpg',
      content: '10 Moments on the Basketball court',
      link: 'HCjNJDNzw8Y',
      type: 'youtube'
    }, {
      thumbnail: 'img/featuredthumbnail.jpg',
      content: '10 Moments on the Basketball court',
      link: '235618360',
      type: 'vimeo'
    }, {
      thumbnail: 'img/featuredthumbnail.jpg',
      content: '10 Moments on the Basketball court',
      link: 'HCjNJDNzw8Y',
      type: 'youtube'
    }]
  }]
  // TOP MATCH SPORT JSON END
});