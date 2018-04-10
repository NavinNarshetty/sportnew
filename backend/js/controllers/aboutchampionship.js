// ABOUT CHAMPIONSHIP
myApp.controller('aboutChampionshipCtrl', function ($scope, TemplateService, NavigationService, $timeout, $stateParams, $state, toastr, $uibModal, deleteService, crudService) {
  //Used to name the .html file
  $scope.template = TemplateService.changecontent("aboutchampionship/tablechampionship");
  $scope.menutitle = NavigationService.makeactive("About Championship");
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
    $scope.url = "Aboutchampionship/search";
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
  var url = "Aboutchampionship/delete";
  $scope.confirmDelete = function (data) {
    crudService.confirmDelete(data, url, $scope);
  }
  // DELETE END
})
// ABOUT CHAMPIONSHIP END

// DETAIL ABOUT CHAMPIONSHIP
myApp.controller('detailAboutChampionshipCtrl', function ($scope, TemplateService, NavigationService, $timeout, $stateParams, $state, toastr, $uibModal, deleteService, crudService) {
  //Used to name the .html file
  $scope.template = TemplateService.changecontent("aboutchampionship/detailchampionship");
  $scope.menutitle = NavigationService.makeactive("Detail About Championship");
  TemplateService.title = $scope.menutitle;
  $scope.navigation = NavigationService.getnav();

  // URL
  var url = 'Aboutchampionship'
  // VARIABLES
  $scope.title = 'Create';
  $scope.formData = {};
  $scope.formData.buttonData = [];


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
  var state = 'tableaboutchampionship'
  $scope.saveData = function (data) {
    crudService.saveData(data, url, state);
  }
  // SAVE FUNCTION END




  $scope.addRow = function (formData) {
    if (!formData) {
      $scope.formData.buttonData.push({
        "buttonTitle": '',
        "buttonLinkType": '',
        "buttonLink": '',
        "buttonStatus": ''
      })
    } else {
      formData.buttonData.push({
        "buttonTitle": '',
        "buttonLinkType": '',
        "buttonLink": '',
        "buttonStatus": ''
      })
    }


  }
  $scope.addRow();

  $scope.deleteRow = function (formData, index) {
    console.log("index", index);
    formData.buttonData.splice(index, 1);
  }
})
// DETAIL ABOUT CHAMPIONSHIP END