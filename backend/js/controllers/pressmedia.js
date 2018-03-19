// TABLE MEDIA CONTACT
// TABLE GALLERY
myApp.controller('mediaContactCtrl', function ($scope, TemplateService, NavigationService, $timeout, $stateParams, $state, toastr, $uibModal, deleteService, crudService) {
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
  $scope.crudService = crudService;
  var url = "Mediacontact/delete";
  $scope.confirmDelete = function (data) {
    crudService.confirmDelete(data, url, $scope);
  }
  // DELETE END
});
// TABLE MEDIA CONTACT END

// DETAIL MEDIA CONTACT
myApp.controller('detailMediaContactCtrl', function ($scope, TemplateService, NavigationService, $timeout, $stateParams, $state, toastr, $uibModal, deleteService, saveService, crudService) {
  //Used to name the .html file
  $scope.template = TemplateService.changecontent("pressmedia/mediacontact/detailmediacontact");
  $scope.menutitle = NavigationService.makeactive("Media Contact");
  TemplateService.title = $scope.menutitle;
  $scope.navigation = NavigationService.getnav();
  $scope.title = 'Create';
  var url = 'Mediacontact';


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
  var state = 'mediacontact'
  $scope.saveData = function (data) {
    crudService.saveData(data, url, state);
  }
  // SAVE FUNCTION END
});
// DETAIL MEDIA CONTACT END

// TABLE PRESS RELEASES
myApp.controller('pressReleasesCtrl', function ($scope, TemplateService, NavigationService, $timeout, $stateParams, $state, toastr, $uibModal, deleteService, crudService) {
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
  $scope.crudService = crudService;
  var url = "Pressrelease/delete";
  $scope.confirmDelete = function (data) {
    crudService.confirmDelete(data, url, $scope);
  }
  // DELETE END
})
// TABLE PRESS RELEASES END


// DETAIL PRESS RELEASES
myApp.controller('detailPressReleasesCtrl', function ($scope, TemplateService, NavigationService, $timeout, $stateParams, $state, toastr, $uibModal, deleteService, saveService, crudService) {
  //Used to name the .html file
  $scope.template = TemplateService.changecontent("pressmedia/pressreleases/detailpressreleases");
  $scope.menutitle = NavigationService.makeactive("Press Releases");
  TemplateService.title = $scope.menutitle;
  $scope.navigation = NavigationService.getnav();
  $scope.title = 'Create';
  var url = 'Pressrelease';

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
  $scope.saveData = function (data) {
    $scope.url = 'Pressrelease/savePressrelease'
    NavigationService.apiCall($scope.url, data, function (data) {
      console.log("savedata api", data);
      if (data.value) {
        if (data.data.nModified) {
          toastr.success("Data Modified Successfully", "Success");
        } else {
          toastr.success("Data Saved Successfully", "Success");
        }
        $state.go('pressreleases');

      } else {
        toastr.error("Something went wrong", "Error");
      }
    })
  }
  // SAVE FUNCTION END

})
// DETAIL PRESS RELEASES END


// TABLE PRESS NEWS
myApp.controller('pressNewsCtrl', function ($scope, TemplateService, NavigationService, $timeout, $stateParams, $state, toastr, $uibModal, deleteService, crudService) {
  //Used to name the .html file
  $scope.template = TemplateService.changecontent("pressmedia/pressnews/tablepressnews");
  $scope.menutitle = NavigationService.makeactive("Press News");
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
    $scope.url = "Pressnews/search";
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
  $scope.crudService = crudService;
  var url = "Pressnews/delete";
  $scope.confirmDelete = function (data) {
    crudService.confirmDelete(data, url, $scope);
  }
  // DELETE END
});
// TABLE PRESS NEWS END

// DETAIL PRESS NEWS
myApp.controller('DetailPressNewsCtrl', function ($scope, TemplateService, NavigationService, $timeout, $stateParams, $state, toastr, $uibModal, deleteService, crudService) {
  //Used to name the .html file
  $scope.template = TemplateService.changecontent("pressmedia/pressnews/detailpressnews");
  $scope.menutitle = NavigationService.makeactive("Press News");
  TemplateService.title = $scope.menutitle;
  $scope.navigation = NavigationService.getnav();

  $scope.formData = {};
  $scope.formData.mediaType = 'press-photo';
  $scope.formData.newsDate = ''

  // UI DATE PICKER
  $scope.dateOptions = {
    dateFormat: "dd/mm/yy",
    changeYear: true,
    changeMonth: true,
    yearRange: "1900:2050"
  };

  $scope.dateSet = function (data) {
    console.log(data);
    $scope.formData.newsDate = data;
  }
  // UI DATE PICKER END

  $scope.title = 'Create';
  var url = 'Pressnews';

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
  var state = 'pressnews'
  $scope.saveData = function (data) {
    crudService.saveData(data, url, state);
  }
  // SAVE FUNCTION END
});
// DETAIL PRESS NEWS END