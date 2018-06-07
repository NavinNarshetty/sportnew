// TABLE FEATURED GALLERY

myApp.controller('featuredGalleryCtrl', function ($scope, TemplateService, NavigationService, $timeout, $stateParams, $state, toastr, $uibModal, deleteService, crudService) {
  //Used to name the .html file
  $scope.template = TemplateService.changecontent("feature/featuregallery/tablefeaturegallery");
  $scope.menutitle = NavigationService.makeactive("Featured Gallery");
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
    $scope.url = "FeatureContent/search";
    $scope.formData.page = $scope.formData.page++;
    $scope.formData.filter = {}
    $scope.formData.filter.mediaType = 'gallery';
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
  var url = "FeatureContent/delete";
  $scope.confirmDelete = function (data) {
    crudService.confirmDelete(data, url, $scope);
  }
  // DELETE END
});
// TABLE FEATURED GALLERY END


// DETAIL FEATURED GALLERY
myApp.controller('detailFeaturedGalleryCtrl', function ($scope, TemplateService, NavigationService, $timeout, $stateParams, $state, toastr, $uibModal, deleteService, saveService, crudService) {
  //Used to name the .html file
  $scope.template = TemplateService.changecontent("feature/featuregallery/detailfeaturegallery");
  $scope.menutitle = NavigationService.makeactive("Detail Featured Gallery");
  TemplateService.title = $scope.menutitle;
  $scope.navigation = NavigationService.getnav();
  var url = 'FeatureContent'


  $scope.title = 'Create';
  $scope.formData = {};
  $scope.formData.featuredContentGallery = [];


  // DEFAULT VARIABLES
  $scope.formData.mediaType = 'gallery';


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

  $scope.addRow = function (formData) {
    if (!formData) {
      $scope.formData.featuredContentGallery.push({
        "image": '',
        "title": '',
        "thumbnail": ''
      })
    } else {
      formData.featuredContentGallery.push({
        "image": '',
        "title": '',
        "thumbnail": ''
      })
    }


  }
  $scope.addRow();

  $scope.deleteRow = function (formData, index) {
    console.log("index", index);
    formData.featuredContentGallery.splice(index, 1);
  }

  // SAVE FUNCTION
  var state = 'featuredgallery'
  $scope.saveData = function (data) {
    crudService.saveData(data, url, state);
  }
  // SAVE FUNCTION END

});
// DETAIL FEATURED GALLERY END

// TABLE FEATURED VIDEO

myApp.controller('featuredVideoCtrl', function ($scope, TemplateService, NavigationService, $timeout, $stateParams, $state, toastr, $uibModal, deleteService, crudService) {
  //Used to name the .html file
  $scope.template = TemplateService.changecontent("feature/featurevideo/tablefeaturevideo");
  $scope.menutitle = NavigationService.makeactive("Featured Video");
  TemplateService.title = $scope.menutitle;
  $scope.navigation = NavigationService.getnav();

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
    $scope.url = "FeatureContent/search";
    $scope.formData.page = $scope.formData.page++;
    $scope.formData.filter = {}
    $scope.formData.filter.mediaType = 'video';
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
  var url = "FeatureContent/delete";
  $scope.confirmDelete = function (data) {
    crudService.confirmDelete(data, url, $scope);
  }
  // DELETE END
});

// TABLE FEATURED VIDEO END

// DETAIL FEATURED VIDEO

myApp.controller('detailFeaturedVideoCtrl', function ($scope, TemplateService, NavigationService, $timeout, $stateParams, $state, toastr, $uibModal, deleteService, saveService, crudService) {
  //Used to name the .html file
  $scope.template = TemplateService.changecontent("feature/featurevideo/detailfeaturevideo");
  $scope.menutitle = NavigationService.makeactive("Detail Featured Video");
  TemplateService.title = $scope.menutitle;
  $scope.navigation = NavigationService.getnav();
  var url = 'FeatureContent';

  // VARIABLES
  $scope.title = 'Create';
  $scope.formData = {};
  $scope.formData.featuredContentVideo = [];
  // DEFAULT VARIABLES
  $scope.formData.mediaType = 'video';

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
    console.log("data in save", data);
    $scope.url = "FeatureContent/saveVideoArchive";
    NavigationService.apiCall($scope.url, data, function (data) {
      console.log(data, "save data archive")
      if (data.value) {
        if (data.data.nModified === 1) {
          toastr.success("Successfully Updated", 'Updated');
          $state.go('featuredvideo')
        } else {
          toastr.success("Successfully Created", 'Saved');
          $state.go('featuredvideo')
        }

      } else {
        toastr.error("Something went Wrong", "Error");
      }

    })
  }
  // SAVE FUNCTION END


  $scope.addRow = function (formData) {
    if (!formData) {
      $scope.formData.featuredContentVideo.push({
        "source": '',
        "link": '',
      })
    } else {
      formData.featuredContentVideo.push({
        "source": '',
        "link": '',
      })
    }


  }
  $scope.addRow();

  $scope.deleteRow = function (formData, index) {
    console.log("index", index);
    formData.featuredContentVideo.splice(index, 1);
  }
});

// DETAIL FEATURED VIDEO END