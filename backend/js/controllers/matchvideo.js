// TABLE MATCH VIDEOS
myApp.controller('MatchvideosCtrl', function ($scope, TemplateService, NavigationService, $timeout, $stateParams, $state, toastr, $uibModal, deleteService, crudService) {
  //Used to name the .html file
  $scope.template = TemplateService.changecontent("matchvideos/tablematchvideos");
  $scope.menutitle = NavigationService.makeactive("Match Videos");
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
  };

  // VIEW TABLE
  $scope.viewTable = function () {
    $scope.url = "Matchvideos/search";
    $scope.formData.page = $scope.formData.page++;
    $scope.formData.filter = {};
    // $scope.formData.filter.pageType = 'gallery';
    NavigationService.apiCall($scope.url, $scope.formData, function (data) {
      if (data.value) {
        $scope.items = data.data.results;
        $scope.contentLoaded = true;
        $scope.totalItems = data.data.total;
        $scope.maxRow = data.data.options.count;
      }

    });
  };
  $scope.viewTable();
  // VIEW TABLE

  // DELETE
  $scope.crudService = crudService;
  var url = "Matchvideos/delete";
  $scope.confirmDelete = function (data) {
    crudService.confirmDelete(data, url, $scope);
  };
  // DELETE END




});
// TABLE AD GALLERY END

// DETAIL AD BANNER
myApp.controller('DetailmatchvideosCtrl', function ($scope, TemplateService, NavigationService, $timeout, $stateParams, $state, toastr, $uibModal, saveService, crudService) {
  //Used to name the .html file
  $scope.template = TemplateService.changecontent("matchvideos/detailmatchvideos");
  $scope.menutitle = NavigationService.makeactive("Detailmatchvideos");
  TemplateService.title = $scope.menutitle;
  $scope.navigation = NavigationService.getnav();
  $scope.title = 'Create';
  $scope.formData = {};
  $scope.formData.matchVideos = [];
  $scope.formData.pageType = 'gallery';
  // VAR
  $scope.getSportsData = {};
  $scope.getSportsData.page = 1;
  $scope.getSportsData.type = '';
  $scope.getSportsData.keyword = '';

  var url = 'Matchvideos';
  // GET ONE
  // GET ONE
  if ($stateParams.id) {
    $scope.title = 'Edit';
    var id = $stateParams.id;
    crudService.getOneData(url, id, function (data) {
      if (data) {
        $scope.formData = data;
        console.log("$scope.formData", $scope.formData);
      }
    });
  }
  // GET ONE END
  // GET ONE END


  // SAVE FUNCTION
  var state = 'matchvideos';
  $scope.saveData = function (data) {
    console.log("saveData", data);
    crudService.saveData(data, url, state);
  };
  // SAVE FUNCTION END

  $scope.addRow = function (formData) {
    if (!formData) {
      $scope.formData.matchVideos.push({
        "videoType": '',
        "videoId": '',
      });
    } else {
      formData.matchVideos.push({
        "videoType": '',
        "videoId": '',
      });
    }


  };
  $scope.addRow();


  // getAllSportName
  $scope.viewTable = function () {
    $scope.url = "SportsListSubCategory/search";
    $scope.getSportsData.page = $scope.getSportsData.page++;
    $scope.getSportsData.filter = {};
    // $scope.formData.filter.pageType = 'gallery';
    NavigationService.apiCall($scope.url, $scope.getSportsData, function (data) {
      console.log("data.value", data);
      $scope.sportlistcatitems = data.data.results;
      $scope.totalItems = data.data.total;
      $scope.maxRow = data.data.options.count;
    });
  };
  $scope.viewTable();

  $scope.searchsSport = function (keyword) {
    console.log("keywoed", keyword);
    $scope.getSportsData.keyword = keyword;
    $scope.viewTable();
  };


  $scope.deleteRow = function (formData, index) {
    console.log("index", index);
    formData.matchVideos.splice(index, 1);
  };

  // $scope.searchsSportListCategory = function (keyword) {

  // };

  // var sportsToMerge = ['Tennis', 'Badminton', 'Table Tennis', 'Athletics', 'Swimming'];
  // var sports = ['Tennis doubles'];
  // var matchedObjs;
  // _.each(sportsToMerge, function (sportName, k) {
  //   matchedObjs = _.filter(sports, function (sport) {
  //     if (sport.indexOf(sportName) != -1 && !sport.indexOf(sportName) > 0) {
  //       return sportName;
  //       console.log("matchedObjs", sportName);
  //     }

  //   });

  // });



});
// DETAIL AD BANNER END

