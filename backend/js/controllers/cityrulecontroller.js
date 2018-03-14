myApp.controller('CityruleCtrl', function ($scope, TemplateService, NavigationService, $timeout, deleteService, $stateParams, $state, $rootScope, toastr, $uibModal) {
  //Used to name the .html file
  $scope.template = TemplateService.changecontent("cityrule/tablecityrule");
  $scope.menutitle = NavigationService.makeactive("City Rule");
  TemplateService.title = $scope.menutitle;
  $scope.navigation = NavigationService.getnav();

  $scope.city = $stateParams.city;
  $scope.institutionType = $stateParams.type;
  $scope.contentLoaded = false;
  $scope.formData = {};
  $scope.formData.page = 1;
  $scope.formData.type = '';
  $scope.formData.keyword = '';
  $scope.value = '';

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
  $scope.viewTable = function () {
    $scope.url = "cityRule/getAllRules";
    $scope.formData.page = $scope.formData.page++;
    $scope.formData.city = $stateParams.city;
    $scope.formData.institutionType = $stateParams.type;
    NavigationService.apiCall($scope.url, $scope.formData, function (data) {
      console.log("data.value", data.data);
      if (data.value) {
        if (_.isEmpty(data.data.data)) {
          $scope.cityrule = data.data.data;
          $scope.value = 'null';
        } else {
          $scope.contentLoaded = true;
          $scope.cityrule = data.data.data;
          $scope.totalItems = data.data.total;
          $scope.maxRow = 10;
        }
      }
    });

  }
  $scope.viewTable();
  $scope.deleteFunc = function (data) {
    console.log(data);
    $rootScope.id = data;
    $scope.modalInstance = $uibModal.open({
      animation: $scope.animationsEnabled,
      templateUrl: 'views/modal/delete.html',
      backdrop: 'static',
      keyboard: false,
      size: 'sm',
      scope: $scope

    });
  };

  $scope.noDelete = function () {
    $scope.modalInstance.close();
  }
  $scope.confDelete = function (data) {
    console.log(data);
    $scope.url = 'CityRule/delete';
    $scope.constraints = {};
    $scope.constraints._id = $rootScope.id;
    console.log($scope.constraints);
    NavigationService.delete($scope.url, $scope.constraints, function (data) {
      console.log("data.value", data);
      if (data.value) {
        toastr.success('Successfully Deleted', 'Rules Message');
        $scope.modalInstance.close();
        $scope.viewTable();
      } else {
        toastr.error('Something went wrong while Deleting', 'Rules Message');
      }
    });
  };



});

myApp.controller('DetailCityRuleCtrl', function ($scope, TemplateService, NavigationService, $timeout, $stateParams, saveService, $state, toastr, $uibModal) {
  //Used to name the .html file
  $scope.template = TemplateService.changecontent("cityrule/detailcityrule");
  $scope.menutitle = NavigationService.makeactive("City Rule Detail");
  TemplateService.title = $scope.menutitle;
  $scope.navigation = NavigationService.getnav();
  $scope.formData = {};
  $scope.formData.eligibilityTable = [];
  $scope.formData.city = $stateParams.city;
  $scope.formData.institutionType = $stateParams.type;

  // GET ONE
  if ($stateParams.id != '') {
    $scope.title = 'Edit';
    $scope.url = "CityRule/getOne"
    $scope.constraints = {};
    $scope.constraints._id = $stateParams.id;
    $scope.getOneRule = function () {
      NavigationService.apiCall($scope.url, $scope.constraints, function (data) {
        console.log(data, "get on data");
        $scope.formData = data.data;
      });
    };
    $scope.getOneRule();

  }


  if ($stateParams.id !== '') {
    //edit
    $scope.title = 'Edit';
    $scope.getOneRule = function () {
      NavigationService.apiCall($scope.url, $scope.constraints, function (data) {
        console.log(data, "get on data");
        $scope.formData = data.data;
      });
    };
    $scope.getOneRule();

    $scope.saveData = function (data) {
      if (data) {
        NavigationService.saveRules(data, function (data) {
          toastr.success(" Updated Successfully", "Rules Message");
          $state.go('cityrule', {
            city: $stateParams.city,
            type: $stateParams.type
          });

        });
      } else {
        toastr.error("invalid data", "Rules Message");
      }
    };
    //edit
  } else {
    $scope.title = "Create";
    $scope.saveData = function (data) {
      if (data) {
        console.log(data);
        NavigationService.saveRules(data, function (data) {
          console.log("data.value", data);
          if (data.value === true) {
            toastr.success(" Saved Successfully", "Rules Message");
            $state.go('cityrule', {
              city: $stateParams.city,
              type: $stateParams.type
            });
          }
        });
      } else {
        toastr.error("invalid data", "Rules Message");
      }
    };
  }

  // GET ONE END









  //cancel
  $scope.onCancel = function (sendTo) {
    $state.go(sendTo, {
      city: $stateParams.city,
      type: $stateParams.type
    });
  };
  $scope.addCont = function (crdv) {
    console.log('enter', crdv);
    if (!crdv.eligibilityTable) {
      crdv.eligibilityTable = [{
        "agegroup": "",
        "date": ""
      }];
    } else {
      crdv.eligibilityTable.push({
        "agegroup": "",
        "date": ""
      });
    }
  };
  $scope.addAge = function (crdv) {
    if (!crdv.ageGroupTable) {
      crdv.ageGroupTable = [{
        "agegroup": "",
        "weight": ""
      }];
    } else {
      crdv.ageGroupTable.push({
        "agegroup": "",
        "weight": ""
      });
    }
  };


  $scope.confDelete = function () {
    if ($scope.deleteVal === 1) {
      console.log("iimmin 1 ");

      $scope.formData.eligibilityTable.splice($.jStorage.get("deleteEligibilityTable"), 1);
      $scope.modalInstance.close();
    }
    else if ($scope.deleteVal === 4) {
      console.log("iimmin 4");
      $scope.formData.ageGroupTable.splice($.jStorage.get("deleteAgeGroupTable"), 1);
      $scope.modalInstance.close();
    }
  };

  $scope.deleteFunc = function (id, value) {
    if (value === 1) {
      $scope.deleteVal = 1;
      $.jStorage.set("deleteEligibilityTable", id);
    } else if (value === 4) {
      $scope.deleteVal = 4;
      $.jStorage.set("deleteAgeGroupTable", id);
    }
    $scope.modalInstance = $uibModal.open({
      animation: $scope.animationsEnabled,
      templateUrl: 'views/modal/delete.html',
      backdrop: 'static',
      keyboard: false,
      size: 'sm',
      scope: $scope

    });
  };
  $scope.noDelete = function () {
    $scope.modalInstance.close();
  };
  //end cancel

});