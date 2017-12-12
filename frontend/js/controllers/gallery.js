myApp.controller('GalleryLandingCtrl', function ($scope, $state, $stateParams, TemplateService, NavigationService, $timeout, toastr, $http) {
  $scope.template = TemplateService.getHTML("content/gallerylanding.html");
  TemplateService.title = "Gallery Landing"; //This is the Title of the Website
  $scope.navigation = NavigationService.getNavigation();


  // FEATURE JSON
  // $scope.featureCard = [1, 2, 3];

  $scope.feature = [{
    featureCard: [{
      img: 'day-04.png',
      content: '10 Moments of Basketball court you cannot miss abcd'
    }, {
      img: 'day-03.png',
      content: '10 Moments of Volleyball court you cannot miss abcd'
    }, {
      img: 'day-03.png',
      content: '10 Moments of Table-Tennis court you cannot miss abcd'
    }]
  }, {
    featureCard: [{
      img: 'day-04.png',
      content: '10 Moments of Volleyball court you cannot miss abcd'
    }, {
      img: 'day-04.png',
      content: '10 Moments of Tennis court you cannot miss abcd'
    }, {
      img: 'day-04.png',
      content: '10 Moments of Badminton court you cannot miss abcd'
    }]
  }]
  // FEATURE JSON END


  // SFA CHAMPIONS
  $scope.sfaChampions = [{
    name: 'School',
    sfaCards: [{
      img: '/img/day-04.png',
      title: 'Sfa Mumbai 2015-16',
      count: '11'
    }, {
      img: '/img/day-04.png',
      title: 'Sfa Mumbai 2015-17',
      count: '12'
    }, {
      img: '/img/day-04.png',
      title: 'Sfa Mumbai 2015-18',
      count: '13'
    }, {
      img: '/img/day-04.png',
      title: 'Sfa Mumbai 2015-18',
      count: '13'
    }]
  }, {
    name: 'College',
    sfaCards: [{
      img: '/img/day-03.png',
      title: 'Sfa Mumbai 2015-16',
      count: '11'
    }, {
      img: '/img/day-03.png',
      title: 'Sfa Mumbai 2015-17',
      count: '12'
    }]
  }]
  // SFA CHAMPIONS END

  $scope.Images = [{
    img: 'dishapatani1.jpg',
    type: 'photo'
  }, {
    thumbnail: 'mobweb-3.jpg',
    type: 'video'
  }, {
    img: 'sa2.jpg',
    type: 'photo'
  }, {
    thumbnail: 'sa3.jpg',
    type: 'video'
  }, {
    img: 'sa4.jpg',
    type: 'photo'
  }, {
    thumbnail: 'dishapatani1.jpg',
    type: 'video'
  }, {
    img: 'mobweb-3.jpg',
    type: 'photo'
  }, {
    img: 'sa4.jpg',
    type: 'photo'
  }, {
    img: 'sa2.jpg',
    type: 'photo'
  }]

  $scope.likeImage = [{
    img: '/img/dishapatani1.jpg'
  }, {
    img: '/img/day-03.png'
  }, {
    img: '/img/day-02.png'
  }, {
    img: '/img/day-04.png'
  }]
});