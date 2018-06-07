myApp.controller('EventLinkCtrl', function ($scope, TemplateService, NavigationService, $timeout, $stateParams, $state, toastr, $uibModal, deleteService, crudService) {
  //Used to name the .html file
  $scope.template = TemplateService.changecontent("eventlink");
  $scope.menutitle = NavigationService.makeactive("Event Link");
  TemplateService.title = $scope.menutitle;
  $scope.navigation = NavigationService.getnav();
  // CODE START
  // VARIABLES
  $scope.table;
  $scope.disable = false;
  $scope.formData = {};
  $scope.form = {};
  $scope.form.page = 1;
  $scope.form.type = '';
  $scope.form.keyword = '';
  $scope.crudService = crudService;
  var url = 'LiveEvent';
  var state = 'eventlink';
  // VARIABLES END
  // VARIABLES END
  // FUNCTION
  // NEW ENQUIRY
  $scope.createEntry = function(entry, flag){
    if (flag == 'edit') {
      $scope.formData = entry;
    } else {
      $scope.formData = {};
    }
    $scope.enquiryStatus = flag;
    $scope.entryPop = $uibModal.open({
      animation: $scope.animationsEnabled,
      templateUrl: 'views/modal/new-eventlink.html',
      backdrop: 'static',
      keyboard: false,
      size: 'md',
      scope: $scope
    });
  }
  // NEW ENQUIRY END
  // SAVE EVENT LINK
  $scope.saveEventLink = function(data){
    $scope.disable = true;
    console.log("data", data);
    crudService.saveData(data, url, state);
    $timeout(function () {
      $scope.entryPop.close();
      $scope.search();
      $scope.disable = false;
      $scope.formData = {};
    }, 1000);
  }
  // SAVE EVENT LINK END
  // DELETE EVENT LINK END
  $scope.deleteEntry = function(data){
    var delUrl = "LiveEvent/delete";
    crudService.confirmDelete(data, delUrl, $scope);
  }
  // DELETE EVENT LINK END
  // FUNCTION END
  // API
  // GET DATA
  $scope.search = function(){
    $scope.url = 'LiveEvent/search';
    $scope.form.page = $scope.form.page++;
    $scope.form.filter = {}
    NavigationService.apiCall($scope.url, $scope.form, function(data){
      if (data.value == true) {
          $scope.table = data.data.results;
          console.log("table", $scope.table);
      } else {
        toaster.error("Data failed", "Error");
      }
    });
  }
  $scope.search();
  // GET DATA END
  // API END
  // CODE END
});
