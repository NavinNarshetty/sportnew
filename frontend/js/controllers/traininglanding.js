myApp.controller('TrainingLandingCtrl', function ($scope, TemplateService, NavigationService, $timeout) {
  $scope.template = TemplateService.getHTML("content/training-landing.html");
  TemplateService.title = "Training Landing"; //This is the Title of the Website
  $scope.navigation = NavigationService.getNavigation();

  // VARIABLES INITIALISE
  // VARIABLES INITIALISE END
  // FUNCTIONS
  // FUNCTIONS END
  // API CALLS
  // API CALLS END
});
