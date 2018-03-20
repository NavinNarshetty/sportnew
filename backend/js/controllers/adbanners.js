// TABLE AD GALLERY
// TABLE GALLERY
myApp.controller('AdGalleryCtrl', function ($scope, TemplateService, NavigationService, $timeout, $stateParams, $state, toastr, $uibModal, deleteService, crudService) {
  //Used to name the .html file
  $scope.template = TemplateService.changecontent("adbanner/gallery/tableadgallery");
  $scope.menutitle = NavigationService.makeactive("Ad Gallery");
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
    $scope.url = "AdBanners/search";
    $scope.formData.page = $scope.formData.page++;
    $scope.formData.filter = {};
    $scope.formData.filter.pageType = 'gallery';
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
  $scope.crudService = crudService;
  var url = "AdBanners/delete";
  $scope.confirmDelete = function (data) {
    crudService.confirmDelete(data, url, $scope);
  }
  // DELETE END




});
// TABLE AD GALLERY END

// DETAIL AD BANNER
myApp.controller('DetailAdGalleryCtrl', function ($scope, TemplateService, NavigationService, $timeout, $stateParams, $state, toastr, $uibModal, saveService, crudService) {
  //Used to name the .html file
  $scope.template = TemplateService.changecontent("adbanner/gallery/detailadgallery");
  $scope.menutitle = NavigationService.makeactive("DetailAdGallery");
  TemplateService.title = $scope.menutitle;
  $scope.navigation = NavigationService.getnav();

  $scope.title = 'Create';
  $scope.formData = {};
  $scope.formData.pageType = 'gallery';

  var url = 'AdBanners'
  // GET ONE
  // GET ONE
  if ($stateParams.id) {
    $scope.title = 'Edit';
    var id = $stateParams.id;
    crudService.getOneData(url, id, function (data) {
      if (data) {
        $scope.formData = data;
      }
    })
  }
  // GET ONE END
  // GET ONE END


  // SAVE FUNCTION
  var state = 'adgallery'
  $scope.saveData = function (data) {
    crudService.saveData(data, url, state);
  }
  // SAVE FUNCTION END


});
// DETAIL AD BANNER END

// TABLE VIDEO 
myApp.controller('AdVideoCtrl', function ($scope, TemplateService, NavigationService, $timeout, $stateParams, $state, toastr, $uibModal, deleteService, crudService) {
  //Used to name the .html file
  $scope.template = TemplateService.changecontent("adbanner/video/tableadvideo");
  $scope.menutitle = NavigationService.makeactive("Ad Video");
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
    $scope.url = "AdBanners/search";
    $scope.formData.page = $scope.formData.page++;
    $scope.formData.filter = {};
    $scope.formData.filter.pageType = 'video';
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
  $scope.crudService = crudService;
  var url = "AdBanners/delete";
  $scope.confirmDelete = function (data) {
    crudService.confirmDelete(data, url, $scope);
  }
  // DELETE END



});
// TABLE VIDEO  END

// DETAIL VIDEO 
myApp.controller('DetailAdVideoCtrl', function ($scope, TemplateService, NavigationService, $timeout, $stateParams, $state, toastr, $uibModal, saveService, crudService) {
  //Used to name the .html file
  $scope.template = TemplateService.changecontent("adbanner/video/detailadvideo");
  $scope.menutitle = NavigationService.makeactive("Detail Ad Video");
  TemplateService.title = $scope.menutitle;
  $scope.navigation = NavigationService.getnav();


  $scope.title = 'Create'
  $scope.formData = {};
  $scope.formData.pageType = 'video';

  var url = 'AdBanners'
  // GET ONE
  if ($stateParams.id) {
    $scope.title = 'Edit';
    var id = $stateParams.id;
    crudService.getOneData(url, id, function (data) {
      if (data) {
        $scope.formData = data;
      }
    })
  }
  // GET ONE END


  // SAVE FUNCTION
  var state = 'advideo'
  $scope.saveData = function (data) {
    crudService.saveData(data, url, state);
  }
  // SAVE FUNCTION END
})
// DETAIL VIDEO  END