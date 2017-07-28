myApp.controller('SchoolLandingCtrl', function ($scope, $state, $stateParams, TemplateService, NavigationService, $timeout, toastr, $http) {
  $scope.template = TemplateService.getHTML("content/schoollanding.html");
  TemplateService.title = "School Landing"; //This is the Title of the Website
  $scope.navigation = NavigationService.getNavigation();
})