myApp.controller('CityruleCtrl', function ($scope, TemplateService, NavigationService, $timeout, $stateParams, $state, toastr, $uibModal) {
  //Used to name the .html file
  $scope.template = TemplateService.changecontent("cityrule/tablecityrule");
  $scope.menutitle = NavigationService.makeactive("City Rule");
  TemplateService.title = $scope.menutitle;
  $scope.navigation = NavigationService.getnav();



});

myApp.controller('DetailCityRuleCtrl', function ($scope, TemplateService, NavigationService, $timeout, $stateParams, $state, toastr, $uibModal) {
  //Used to name the .html file
  $scope.template = TemplateService.changecontent("cityrule/detailcityrule");
  $scope.menutitle = NavigationService.makeactive("City Rule Detail");
  TemplateService.title = $scope.menutitle;
  $scope.navigation = NavigationService.getnav();



});