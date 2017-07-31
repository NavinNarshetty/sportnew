myApp.controller('SchoolLandingCtrl', function ($scope, $state, $stateParams, TemplateService, NavigationService, $timeout, toastr, $http) {
  $scope.template = TemplateService.getHTML("content/schoollanding.html");
  TemplateService.title = "School Landing"; //This is the Title of the Website
  $scope.navigation = NavigationService.getNavigation();
  // INITIALSE VARIABLES
  $scope.viewSchool = 3;
  // INITIALSE VARIABLES END

  // VIEW MORE SCHOOLS
  $scope.viewMoreSchools = function (city) {
    if (city.viewSchool == 3) {
      city.viewSchool = 10;
    } else {
      city.viewSchool = 3;
    }
  }
  // VIEW MORE SCHOOLS  END


  // SFA CHAMPIONS

  $scope.sfachampions = [{
    city: 'Mumbai',
    topschool: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
  }, {
    city: 'hyderabad',
    topschool: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
  }, {
    city: 'AHMEDABAD',
    topschool: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
  }]
  // END SFA CHAMPIONS


  // MEDALS CARDS 
  $scope.maxmedals = [{
    medal: 'gold',

  }, {
    medal: 'silver',
  }, {
    medal: 'bronze'
  }]

  $scope.dummy = [1, 2, 3]

  // END MEDALS CARDS
})