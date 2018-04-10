myApp.controller('aboutChampionshipCtrl', function ($scope, $sce, $state, $stateParams, TemplateService, NavigationService, $timeout, toastr, $http) {
  $scope.template = TemplateService.getHTML("content/aboutchampionship.html");
  TemplateService.title = "About Championship"; //This is the Title of the Website
  $scope.navigation = NavigationService.getNavigation();

  // VAR
  $scope.formData = {};
  $scope.formData.page = 1;
  $scope.formData.type = '';
  $scope.formData.keyword = '';


  // VIEW TABLE
  $scope.getChampionshipData = function () {
    $scope.url = "Aboutchampionship/search";
    $scope.formData.page = $scope.formData.page++;
    NavigationService.getDataApiCall($scope.formData, $scope.url, function (data) {
      console.log("data.value", data);
      $scope.championshipData = data.data.data.results[0];
      $scope.championshipData.contentData = $sce.trustAsHtml(data.data.data.results[0].contentData)
      $scope.championshipData.mediaLink = $sce.$sce.trustAsResourceUrl(data.data.data.results[0].mediaLink)
      $scope.totalItems = data.data.total;
      $scope.maxRow = data.data.options.count;
    });
  }
  $scope.getChampionshipData();
  // VIEW TABLE


})