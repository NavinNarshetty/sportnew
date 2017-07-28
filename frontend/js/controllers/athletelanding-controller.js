myApp.controller('AthleteLandingCtrl', function ($scope, $state, $stateParams, TemplateService, NavigationService, $timeout, toastr, $http) {
  $scope.template = TemplateService.getHTML("content/athletelanding.html");
  TemplateService.title = "Athlete Landing Page"; //This is the Title of the Website
  $scope.navigation = NavigationService.getNavigation();
})