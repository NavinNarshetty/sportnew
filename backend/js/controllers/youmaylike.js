// TABLE GALLERY
myApp.controller('MaylikeCtrl', function ($scope, TemplateService, NavigationService, $timeout, $stateParams, $state, toastr, $uibModal, deleteService) {
  //Used to name the .html file
  $scope.template = TemplateService.changecontent("youmaylike/tablelike");
  $scope.menutitle = NavigationService.makeactive("You May Like");
  TemplateService.title = $scope.menutitle;
  $scope.navigation = NavigationService.getnav();

  // VAR
  $scope.formData = {};
  $scope.formData.page = 1;
  $scope.formData.type = '';
  $scope.formData.keyword = '';

  // SEARCHTABLE
  $scope.searchInTable = function (data) {
    $scope.formData.page = 1;
    if (data.length >= 2) {
      $scope.formData.keyword = data;
      $scope.viewTable();
    } else if (data.length == '') {
      $scope.formData.keyword = data;
      $scope.viewTable();
    }
  }

  // VIEW TABLE
  $scope.viewTable = function () {
    $scope.url = "Youmaylike/search";
    $scope.formData.page = $scope.formData.page++;
    NavigationService.apiCall($scope.url, $scope.formData, function (data) {
      console.log("data.value", data);
      $scope.items = data.data.results;
      $scope.totalItems = data.data.total;
      $scope.maxRow = data.data.options.count;
    });
  }
  $scope.viewTable();
  // VIEW TABLE

  // DELETE
  $scope.deleteService = deleteService;
  var url = "Youmaylike/delete";
  $scope.confirmDelete = function (data) {
    deleteService.confirmDelete(data, url, $scope);
  }
  // DELETE END
});
// TABLE GALLERY END

// DETAIL GALLERY
myApp.controller('DetailmaylikeCtrl', function ($scope, TemplateService, NavigationService, $timeout, $stateParams, $state, toastr, $uibModal, deleteService, saveService) {
  //Used to name the .html file
  $scope.template = TemplateService.changecontent("youmaylike/detaillike");
  $scope.menutitle = NavigationService.makeactive("You May Like");
  TemplateService.title = $scope.menutitle;
  $scope.navigation = NavigationService.getnav();

  // VAR
  $scope.formData = {};
  $scope.formData.pageType = 'youmaylike';

  // GET ONE
  // GET ONE
  if ($stateParams.id != '') {
    $scope.title = 'Edit';
    $scope.url = "Youmaylike/getOne"
    $scope.constraints = {};
    $scope.constraints._id = $stateParams.id;
    $scope.getOneAdGallery = function () {
      NavigationService.apiCall($scope.url, $scope.constraints, function (data) {
        console.log(data, "get on data");
        $scope.formData = data.data;
      })
    }
    $scope.getOneAdGallery();
  }
  // GET ONE END
  // GET ONE END


  // SAVE FUNCTION
  var state = 'like'
  var url = 'Youmaylike/Save'
  $scope.saveData = function (data) {
    saveService.saveData(data, url, state);
  }
  // SAVE FUNCTION END


});
// DETAIL GALLERY END