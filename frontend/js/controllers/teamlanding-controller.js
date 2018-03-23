myApp.controller('TeamLandingCtrl', function ($scope, $state, $stateParams, TemplateService, NavigationService, $timeout, toastr, $http) {
  $scope.template = TemplateService.getHTML("content/teamlanding.html");
  TemplateService.title = "Team Landing Page"; //This is the Title of the Website
  $scope.navigation = NavigationService.getNavigation();




  // INITIALSE VARIABLES
  $scope.viewSchool = 3;
  $scope.showCityFilter = false;
  $scope.defaultCity = 'all';
  $scope.selectcity = '';
  // INITIALSE VARIABLES END


  // SELECT CITY
  $scope.viewCity = function () {
    if ($scope.showCityFilter == false) {
      $scope.showCityFilter = true;
    } else {
      $scope.showCityFilter = false;
    }
  }

  $scope.selectCity = function (city) {
    if (city == 'all') {
      $scope.selectCity = '';
    } else {
      $scope.selectcity = city;
    }
    $scope.defaultCity = city;
    $scope.viewCity();
    console.log($scope.selectcity, 'test');
  }

  // END SELECT CITY

  // VIEW MORE SCHOOLS
  $scope.viewMoreSchools = function (city) {
    if (city.viewSchool == 3) {
      city.viewSchool = 6;
    } else {
      city.viewSchool = 3;
    }
  }
  // VIEW MORE SCHOOLS  END


  $scope.cityList = ['mumbai', 'ahmedabad', 'hyderabad'];
  var allTeamLanding = ["../views/content/teamlanding/school.html", "../views/content/teamlanding/college.html"];

  $scope.teamlanding = {
    innerView: allTeamLanding[0],
    active: "school"
  };
  $scope.viewTab = 1;
  // DIRECT LINK
  switch ($state.params.name) {
    case "school":
      $scope.teamlanding = {
        innerView: allTeamLanding[0],
        active: "school"
      };
      break;
    case "college":
      $scope.teamlanding = {
        innerView: allTeamLanding[1],
        active: "college"
      };
      break;
    default:
      $scope.teamlanding = {
        innerView: allTeamLanding[0],
        active: "school"
      };
      break;
  }
  // DIRECT LINK END
  // ON CLICK
  $scope.getTab = function (view) {
    $scope.teamlanding.innerView = allTeamLanding[view];
    var url = "school";
    switch (view) {
      case 0:
        url = "school";
        $scope.teamlanding.active = "school";
        break;
      case 1:
        url = "college";
        $scope.teamlanding.active = "college";
        break;
      default:
        url = "school";
        $scope.teamlanding.active = "school";
        break;
    }
    $state.go("teamlanding", {
      name: url
    }, {
      notify: false
    })
  }
  // ON CLICK END

  // ATHLETE SCHOOL JSON
  $scope.athleteSchool = [{
    name: 'football',
    city: [{
      name: 'Mumbai',
      athletes: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10']
    }, {
      name: 'Hyderabad',
      athletes: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10']
    }, {
      name: 'Ahmedabad',
      athletes: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10']
    }]
  }, {
    name: 'Tennis',
    city: [{
      name: 'Mumbai',
      athletes: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10']
    }, {
      name: 'Hyderabad',
      athletes: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10']
    }, {
      name: 'Ahmedabad',
      athletes: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10']
    }]
  }, {
    name: 'archery',
    city: [{
      name: 'Mumbai',
      athletes: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10']
    }, {
      name: 'Hyderabad',
      athletes: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10']
    }, {
      name: 'Ahmedabad',
      athletes: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10']
    }]
  }];

  $scope.buttonlist = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10'];
})
