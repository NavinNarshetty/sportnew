myApp.controller('SchoolProfileCtrl', function ($scope, TemplateService, NavigationService, $timeout, toastr, $http) {
    $scope.template = TemplateService.getHTML("content/schoolprofile.html");
    TemplateService.title = "School Profile"; //This is the Title of the Website
    $scope.navigation = NavigationService.getNavigation();

})