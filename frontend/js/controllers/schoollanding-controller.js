myApp.controller('SchoolLandingCtrl', function ($scope, $state, $stateParams, TemplateService, NavigationService, $timeout, toastr, $http) {
  $scope.template = TemplateService.getHTML("content/schoollanding.html");
  TemplateService.title = "School Landing"; //This is the Title of the Website
  $scope.navigation = NavigationService.getNavigation();
  // ****************************** CODE START ******************************
  // INITIALSE VARIABLES
  $scope.viewSchool = 3;
  $scope.showCityFilter = false;
  $scope.defaultCity = 'all';
  $scope.selectcity = '';
  $scope.currentCity = 'mumbai';
  $scope.searchForm = {
    "page": 1,
    "city": "Hyderabad",
    "keyword": ""
  }
  $scope.results = [];
  $scope.scroll = {
    busy: false,
    stopCallingApi: false,
  };
  // INITIALSE VARIABLES END

  // FUNCTIONS
  // SELECT CITY
  $scope.viewCity = function () {
    if ($scope.showCityFilter == false) {
      $scope.showCityFilter = true;
    } else {
      $scope.showCityFilter = false
    }
  }

  $scope.selectCity = function (city) {
    if ($scope.city == 'all') {
      $scope.selectcity = '';
    } else {
      $scope.selectcity = city;
    }
    $scope.defaultCity = city;
    $scope.viewCity();
  }
  // END SELECT CITY
  // VIEW MORE SCHOOLS
  $scope.viewMoreSchools = function (city, index) {
    $scope.scrollId = 'school' + index;
    if (city.viewSchool == 3) {
      city.viewSchool = 10;
    } else {
      city.viewSchool = 3;
      TemplateService.scrollTo($scope.scrollId, 'id', 80);
    }
  }
  // VIEW MORE SCHOOLS  END
  // SEARCH FUNCTION
  $scope.searchSchool = function(){
    $scope.searchForm.page = 1;
    $scope.scroll.busy = false;
    $scope.scroll.stopCallingApi = false;
    $scope.url = "schoolProfile/search";
    $scope.searchSchoolMore();
  }
  // SEARCH FUNCTION END
  // SEARCH PAGINATION
  $scope.searchSchoolMore = function(){
    if ($scope.scroll.busy) {
      return;
    } else {
      if ($scope.scroll.stopCallingApi) {
        return;
      } else {
        $scope.scroll.busy = true;
        NavigationService.getDataApiCall($scope.searchForm, $scope.url, function(data){
          $scope.scroll.busy = false;
          data = data.data;
          console.log(data);
          if (data.value == true) {
            if (data.data.length == 0) {
              $scope.scroll.stopCallingApi = true;
              if ($scope.searchForm.page == 1 && $scope.searchForm.keyword != "") {
                toastr.error("Data not found", "Error");
              }
            }
            if ($scope.searchForm.page == 1) {
              $scope.results = data.data;
            } else {
              _.each(data.data, function (n) {
                  $scope.results.push(n);
              });
            }
          } else {
            toastr.error("Error");
          }
          $scope.searchForm.page++;
        });
      }
    }
  }
  // SEARCH PAGINATION END
  // FUNCTIONS END

  // API CALLS
  // GET RANKS LANDING
  $scope.schoolRank = {};
  var schoolRankUrl = "schoolProfile/getRanksLanding";
  NavigationService.getDataApiCall($scope.schoolRank, schoolRankUrl, function(data){
    data = data.data;
    if (data.value == true) {
      $scope.rankList = data.data;
      _.each($scope.rankList, function(n){
        _.each(n.ranks, function(m){
          m.totalSchools = n.totalSchools;
        })
        n.cityLow = n.city.toLowerCase();
      })
      console.log("schoolRank", $scope.rankList);
    } else {
      console.log("getRanksLanding Error", data);
    }
  });
  // GET RANKS LANDING END
  // GET CITY DATA
  $scope.schoolData = {
    "city": "hyderabad"
  };
  var schoolDataUrl = "schoolProfile/getCityLanding";
  NavigationService.getDataApiCall($scope.schoolData, schoolDataUrl, function(data){
    data = data.data;
    if (data.value == true) {
      $scope.schoolStats = data.data;
      $scope.maxContingent = $scope.schoolStats.maxContingent;
      $scope.maxMedalsWon = $scope.schoolStats.maxMedalsWon;
      $scope.maxParticipatedSport = $scope.schoolStats.maxParticipatedSport;
      $scope.maxWinPercentage = $scope.schoolStats.maxWinPercentage;
      console.log("schoolData", $scope.schoolStats);
    } else {
      console.log("getCityLanding Error", data);
    }
  });
  // GET CITY DATA END
  // API CALLS END

  // JSONS
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
  $scope.maxmedalslol = [{
    medal: 'gold',
  }, {
    medal: 'silver',
  }, {
    medal: 'bronze'
  }]

  $scope.dummylol = [1, 2, 3]

  // END MEDALS CARDS
  // JSONS END
  // ****************************** CODE END ******************************
})
