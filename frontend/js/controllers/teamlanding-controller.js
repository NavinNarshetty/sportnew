myApp.controller('TeamLandingCtrl', function ($scope, $state, $stateParams, TemplateService, NavigationService, $timeout, toastr, $http) {
  $scope.template = TemplateService.getHTML("content/teamlanding.html");
  TemplateService.title = "Team Landing Page"; //This is the Title of the Website
  $scope.navigation = NavigationService.getNavigation();
})