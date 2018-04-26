// TABLE SPORT PAGE
myApp.controller('sportPageCtrl', function ($scope, TemplateService, NavigationService, $timeout, $stateParams, $state, toastr, $uibModal, deleteService, crudService) {
  //Used to name the .html file
  $scope.template = TemplateService.changecontent("sports/tablesportpage");
  $scope.menutitle = NavigationService.makeactive("Sports");
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
    $scope.url = "Sportpage/search";
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
  var url = "Sportpage/delete";
  $scope.confirmDelete = function (data) {
    crudService.confirmDelete(data, url, $scope);
  }
  // DELETE END

});
// TABLE SPORT PAGE END


// DETAIL SPORT PAGE 
myApp.controller('detailSportPageCtrl', function ($scope, TemplateService, NavigationService, $timeout, $stateParams, $state, toastr, $uibModal, deleteService, crudService) {
  //Used to name the .html file
  $scope.template = TemplateService.changecontent("sports/detailsportpage");
  $scope.menutitle = NavigationService.makeactive("Detail Sports");
  TemplateService.title = $scope.menutitle;
  $scope.navigation = NavigationService.getnav();

  // URL
  var url = 'Sportpage'


  // VARIABLES
  $scope.formData = {};
  $scope.title = 'Create';
  $scope.formData.pdfData = {};
  $scope.formData.pdfData.pdf = [];
  $scope.formData.eventCard = [];

  $scope.addRow = function (formData) {
    if (!formData) {
      $scope.formData.pdfData.pdf.push({
        "title": '',
        "link": ''
      })
    } else {
      formData.pdfData.pdf.push({
        "title": '',
        "link": ''
      })
    }


  }
  $scope.addRow();

  $scope.deleteRow = function (formData, index) {
    console.log("index", index);
    formData.pdfData.pdf.splice(index, 1);
  }


  // EVENT ROW
  $scope.addEventRow = function (formData) {
    if (!formData) {
      console.log("in this")
      $scope.formData.eventCard.push({
        "mediaType": '',
        "image": '',
        "linkType": '',
        "link": '',
        "title": ''
      })
    } else {
      formData.eventCard.push({
        "mediaType": '',
        "image": '',
        "linkType": '',
        "link": '',
        "title": ''
      })
    }


  }
  $scope.addEventRow();

  $scope.deleteEventRow = function (formData, index) {
    console.log("index", index);
    formData.eventCard.splice(index, 1);
  }
  // EVENT ROW END


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
  var state = 'tablesportpage'
  $scope.saveData = function (data) {
    crudService.saveData(data, url, state);
  }
  // SAVE FUNCTION END

});
// DETAIL SPORT PAGE  END