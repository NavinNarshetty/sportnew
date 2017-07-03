myApp.controller('AtheleteProfileCtrl', function ($scope, TemplateService, NavigationService, $timeout, toastr, $http) {
    $scope.template = TemplateService.getHTML("content/atheleteprofile.html");
    TemplateService.title = "Athelete Profile"; //This is the Title of the Website
    $scope.navigation = NavigationService.getNavigation();

})
