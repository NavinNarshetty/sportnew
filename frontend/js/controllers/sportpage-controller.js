myApp.controller('SportPageCtrl', function ($scope, TemplateService, NavigationService, $timeout, toastr, $http) {
    $scope.template = TemplateService.getHTML("content/sportpage.html");
    TemplateService.title = "Sport"; //This is the Title of the Website
    $scope.navigation = NavigationService.getNavigation();

})
