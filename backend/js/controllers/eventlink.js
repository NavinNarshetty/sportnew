myApp.controller('EventLinkCtrl', function ($scope, TemplateService, NavigationService, $timeout, $stateParams, $state, toastr, $uibModal, deleteService, crudService) {
  //Used to name the .html file
  $scope.template = TemplateService.changecontent("eventlink");
  $scope.menutitle = NavigationService.makeactive("Event Link");
  TemplateService.title = $scope.menutitle;
  $scope.navigation = NavigationService.getnav();
  // CODE START
  // VARIABLES
  $scope.formData = {};
  $scope.form = {};
  $scope.form.page = 1;
  $scope.form.type = '';
  $scope.form.keyword = '';
  var url = 'EventLink';
  var state = 'eventlink';
  // VARIABLES END
  // VARIABLES END
  // FUNCTION
  // FUNCTION END
  // API
  // GET DATA
  $scope.contactSearch = function(){
    $scope.url = 'EventLink/search';
    $scope.form.page = $scope.form.page++;
    $scope.form.filter = {}
    NavigationService.apiCall($scope.url, $scope.form, function(data){
      if (data.value == true) {
        if (data.data.results.length != 0) {
          $scope.formData = data.data.results[0];
        } else {
          $scope.formData = {};
        }
        TemplateService.scrollTo('heading-sec', 'class');
      } else {
        toaster.error("Data failed", "Error");
      }
    });
  }
  $scope.contactSearch();
  // GET DATA END
  // API END
  // CODE END
});
