myApp.controller('AthleteLandingCtrl', function ($scope, $state, $stateParams, TemplateService, NavigationService, $timeout, toastr, $http, $uibModal, $rootScope, MediaPopupService) {
  $scope.template = TemplateService.getHTML("content/athletelanding.html");
  TemplateService.title = "Athlete Landing Page"; //This is the Title of the Website
  $scope.navigation = NavigationService.getNavigation();

  // INITIALSE VARIABLES
  $scope.viewSchool  = 3;
  $scope.showCityFilter = false;
  $scope.defaultCity = 'all';
  $scope.selectcity = '';
  // INITIALSE VARIABLES END

  // SELECT CITY FILTER
  $scope.viewCity = function(){
    if($scope.showCityFilter == false){
      $scope.showCityFilter = true;
    } else {
      $scope.showCityFilter = false;
    }
  }
  $scope.selectCity = function(city){
    if(city == 'all'){
      $scope.selectcity = '';
    } else {
      $scope.selectcity = city;
    }
    $scope.defaultCity = city;
    $scope.viewCity();
    console.log($scope.selectcity, 'selected city');
  }
  // SELECT CITY FILTER END

  // VIEW MORE SCHOOLS
  $scope.viewMoreSchools = function(city){
    if (city.viewSchool == 3){
      city.viewSchool = 6;
    } else {
      city.viewSchool = 3;
    }
  }
  // VIEW MORE SCHOOLS  END

  var allAthleteLanding = ["frontend/views/content/athletelanding/school.html", "frontend/views/content/athletelanding/college.html"];

  $scope.athletelanding = {
    innerView: allAthleteLanding[0],
    active : "school"
  };
  $scope.viewTab = 1;
  // DIRECT LINK
  switch($state.params.name){
    case "school":
      $scope.athletelanding = {
        innerView: allAthleteLanding[0],
        active : "school"
      };
    break;
    case "college":
      $scope.athletelanding = {
        innerView: allAthleteLanding[1],
        active : "college"
      };
    break;
    default:
      $scope.athletelanding = {
        innerView: allAthleteLanding[0],
        active : "school"
      };
    break;
  }
  // DIRECT LINK END
  // ON CLICK
  $scope.getTab = function(view){
    $scope.athletelanding.innerView = allAthleteLanding[view];
    var url = "school";
    switch (view) {
      case 0:
        url = "school";
        $scope.athletelanding.active = "school";
      break;
      case 1 :
        url = "college";
        $scope.athletelanding.active = "college";
      break;
      default:
        url = "school";
        $scope.athletelanding.active = "school";
      break;
    }
    $state.go("athletelanding",{
      name: url
    },{
      notify: false
    })
  }
  // ON CLICK END

  // ATHLETE SCHOOL JSON
  $scope.cityList = ['mumbai', 'ahmedabad', 'hyderabad'];
  $scope.athleteSchool = [{
    name: 'football',
    city: [{
      name: 'Mumbai',
      athletes: ['1','2','3','4','5','6','7','8','9','10']
    },{
      name: 'Hyderabad',
      athletes: ['1','2','3','4','5','6','7','8','9','10']
    },{
      name: 'Ahmedabad',
      athletes: ['1','2','3','4','5','6','7','8','9','10']
    }]
  },{
    name: 'Tennis',
    city: [{
      name: 'Mumbai',
      athletes: ['1','2','3','4','5','6','7','8','9','10']
    },{
      name: 'Hyderabad',
      athletes: ['1','2','3','4','5','6','7','8','9','10']
    },{
      name: 'Ahmedabad',
      athletes: ['1','2','3','4','5','6','7','8','9','10']
    }]
  },{
    name: 'Karate',
    city: [{
      name: 'Mumbai',
      athletes: ['1','2','3','4','5','6','7','8','9','10']
    },{
      name: 'Hyderabad',
      athletes: ['1','2','3','4','5','6','7','8','9','10']
    },{
      name: 'Ahmedabad',
      athletes: ['1','2','3','4','5','6','7','8','9','10']
    }]
  }];
  // ATHLETE SCHOOL JSON END

  var photoPopUp;
  $scope.showPopup = function(){
    MediaPopupService.openMediaPopup($scope);
  }
  $scope.nextSlides = function(){
    MediaPopupService.nextSlide();
  }
  $scope.prevSlides = function(){
    MediaPopupService.prevSlide();
  }
})
