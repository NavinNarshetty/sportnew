// TABLE AD GALLERY
// TABLE GALLERY
myApp.controller('AdGalleryCtrl', function ($scope, TemplateService, NavigationService, $timeout, $stateParams, $state, toastr, $uibModal) {
  //Used to name the .html file
  $scope.template = TemplateService.changecontent("adbanner/gallery/tableadgallery");
  $scope.menutitle = NavigationService.makeactive("Ad Gallery");
  TemplateService.title = $scope.menutitle;
  $scope.navigation = NavigationService.getnav();



});
// TABLE AD GALLERY END

// DETAIL AD BANNER
myApp.controller('DetailAdGalleryCtrl', function ($scope, TemplateService, NavigationService, $timeout, $stateParams, $state, toastr, $uibModal) {
  //Used to name the .html file
  $scope.template = TemplateService.changecontent("adbanner/gallery/detailadgallery");
  $scope.menutitle = NavigationService.makeactive("DetailAdGallery");
  TemplateService.title = $scope.menutitle;
  $scope.navigation = NavigationService.getnav();

  $scope.formData = {};
  $scope.formData.pageType = 'gallery';
});
// DETAIL AD BANNER END

// TABLE VIDEO 
myApp.controller('AdVideoCtrl', function ($scope, TemplateService, NavigationService, $timeout, $stateParams, $state, toastr, $uibModal, deleteService) {
  //Used to name the .html file
  $scope.template = TemplateService.changecontent("adbanner/video/tableadvideo");
  $scope.menutitle = NavigationService.makeactive("Ad Video");
  TemplateService.title = $scope.menutitle;
  $scope.navigation = NavigationService.getnav();

  // VAR
  $scope.deleteService = deleteService;
  console.log("$scope.deleteService", $scope.deleteService);
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
    $scope.url = "AdBanners/search";
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
  var url = "AdBanners/delete";
  $scope.confirmDelete = function (data) {
    // $scope.confirmYes;
    deleteService.confirmDelete(data, url, $scope);

  }
  // DELETE END



});
// TABLE VIDEO  END

// DETAIL VIDEO 
myApp.controller('DetailAdVideoCtrl', function ($scope, TemplateService, NavigationService, $timeout, $stateParams, $state, toastr, $uibModal) {
  //Used to name the .html file
  $scope.template = TemplateService.changecontent("adbanner/video/detailadvideo");
  $scope.menutitle = NavigationService.makeactive("Detail Ad Video");
  TemplateService.title = $scope.menutitle;
  $scope.navigation = NavigationService.getnav();
  $scope.formData = {};
  $scope.formData.pageType = 'video';


  // SAVE FUNCTION
  $scope.saveData = function (data) {
    console.log(data, "inside save")
    $scope.url = "AdBanners/Save";
    NavigationService.apiCall($scope.url, data, function (data) {
      if (data.value) {
        toastr.success("Data saved successfully", 'Success');
        $state.go('advideo');
      } else {
        toastr.error("Something Went wrong", 'Error');
      }
    });
  }
  // SAVE FUNCTION END
})
// DETAIL VIDEO  END