myApp.controller('PressArticleCtrl', function ($scope, TemplateService, NavigationService, $timeout, toastr, $http) {
    $scope.template = TemplateService.getHTML("content/pressmedia/pressarticle.html");
    TemplateService.title = "Press Article"; //This is the Title of the Website
    $scope.navigation = NavigationService.getNavigation();

})
