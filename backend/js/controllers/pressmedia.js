// TABLE MEDIA CONTACT
// TABLE GALLERY
myApp.controller('mediaContactCtrl', function ($scope, TemplateService, NavigationService, $timeout, $stateParams, $state, toastr, $uibModal, deleteService) {
  //Used to name the .html file
  $scope.template = TemplateService.changecontent("pressmedia/mediacontact/tablemediacontact");
  $scope.menutitle = NavigationService.makeactive("Media Contact");
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
    $scope.url = "Mediacontact/search";
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
  var url = "Mediacontact/delete";
  $scope.confirmDelete = function (data) {
    deleteService.confirmDelete(data, url, $scope);
  }
  // DELETE END
});
// TABLE MEDIA CONTACT END

// DETAIL MEDIA CONTACT
myApp.controller('detailMediaContactCtrl', function ($scope, TemplateService, NavigationService, $timeout, $stateParams, $state, toastr, $uibModal, deleteService, saveService) {
  //Used to name the .html file
  $scope.template = TemplateService.changecontent("pressmedia/mediacontact/detailmediacontact");
  $scope.menutitle = NavigationService.makeactive("Media Contact");
  TemplateService.title = $scope.menutitle;
  $scope.navigation = NavigationService.getnav();
  $scope.title = 'Create';


  // GET ONE
  if ($stateParams.id) {
    $scope.title = 'Edit';
    $scope.url = "Mediacontact/getOne"
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


  // SAVE FUNCTION
  var state = 'mediacontact'
  var url = 'Mediacontact/Save'
  $scope.saveData = function (data) {
    saveService.saveData(data, url, state);
  }
  // SAVE FUNCTION END
});
// DETAIL MEDIA CONTACT END

// TABLE PRESS RELEASES
myApp.controller('pressReleasesCtrl', function ($scope, TemplateService, NavigationService, $timeout, $stateParams, $state, toastr, $uibModal, deleteService) {
  //Used to name the .html file
  $scope.template = TemplateService.changecontent("pressmedia/pressreleases/tablepressreleases");
  $scope.menutitle = NavigationService.makeactive("Press Releases");
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
    $scope.url = "Pressrelease/search";
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
  var url = "Pressrelease/delete";
  $scope.confirmDelete = function (data) {
    deleteService.confirmDelete(data, url, $scope);
  }
  // DELETE END
})
// TABLE PRESS RELEASES END


// DETAIL PRESS RELEASES
myApp.controller('detailPressReleasesCtrl', function ($scope, TemplateService, NavigationService, $timeout, $stateParams, $state, toastr, $uibModal, deleteService, saveService) {
  //Used to name the .html file
  $scope.template = TemplateService.changecontent("pressmedia/pressreleases/detailpressreleases");
  $scope.menutitle = NavigationService.makeactive("Press Releases");
  TemplateService.title = $scope.menutitle;
  $scope.navigation = NavigationService.getnav();
  $scope.title = 'Create';

  $scope.formData = {};
  $scope.formData.releaseDate = ''

  // UI DATE PICKER
  $scope.dateOptions = {
    dateFormat: "dd/mm/yy",
    changeYear: true,
    changeMonth: true,
    yearRange: "1900:2050"
  };

  $scope.dateSet = function (data) {
    console.log(data);
    $scope.formData.releaseDate = data;
  }
  // UI DATE PICKER END


  // GET ONE
  if ($stateParams.id != '') {
    $scope.title = 'Edit';
    $scope.url = "Pressrelease/getOne"
    $scope.constraints = {};
    $scope.constraints._id = $stateParams.id;
    $scope.getOneData = function () {
      NavigationService.apiCall($scope.url, $scope.constraints, function (data) {
        console.log(data, "get on data");
        $scope.formData = data.data;
      })
    }
    $scope.getOneData();
  }
  // GET ONE END

  // SAVE FUNCTION
  var state = 'pressreleases'
  var url = 'Pressrelease/Save'
  $scope.saveData = function (data) {
    saveService.saveData(data, url, state);
  }
  // SAVE FUNCTION END
})
// DETAIL PRESS RELEASES END