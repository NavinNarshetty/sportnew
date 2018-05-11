// TABLE ATHLETE
myApp.controller('AthleteCtrl', function ($scope, TemplateService, excelService, NavigationService, $timeout, $stateParams, $state, toastr, $uibModal, deleteService, crudService) {
  //Used to name the .html file
  $scope.template = TemplateService.changecontent("registration/athlete/tableathlete");
  $scope.menutitle = NavigationService.makeactive("Athlete");
  TemplateService.title = $scope.menutitle;
  $scope.navigation = NavigationService.getnav();
  $scope.changeInput = function () {
    if ($scope.formData.input != '') {
      $scope.formData.input = '';
    } else {
      $scope.formData.input = $scope.formData.input;
    }
  };
  $scope.changeAll = function () {
    $scope.formData = {};
    $scope.formData.page = 1;
    $scope.formData.type = '';
    $scope.formData.keyword = '';
    $scope.filterAthlete();
  };
  $scope.formData = {};
  $scope.formData.page = 1;
  $scope.formData.type = 'Athlete Name';
  $scope.formData.input = '';
  $scope.formData.keyword = '';
  // $scope.selectedStatus = 'All';
  $scope.searchInAthlete = function (data) {
    $scope.formData.page = 1;
    if (data.length >= 2) {
      $scope.formData.keyword = data;
      $scope.filterAthlete();
    } else if (data.length == '') {
      $scope.formData.keyword = data;
      $scope.filterAthlete();
    }
  }
  // $scope.filterDelivery = function (data) {
  //     $scope.oConstraints.pagenumber = 1;
  //     $scope.oConstraints.pagesize = 10;
  //     $scope.oConstraints.deliveryStatus = data;
  //     $scope.selectedStatus = data;
  //     $scope.getMyOrders();
  // }
  $scope.filterAthlete = function () {

    // $stateParams.filter = $scope.formData;

    $scope.url = "Athelete/filterAthlete";
    $scope.search = $scope.formData.keyword;
    $scope.formData.page = $scope.formData.page++;


    NavigationService.apiCall($scope.url, $scope.formData, function (data) {
      $scope.items = data.data.results;
      $scope.totalItems = data.data.total;
      $scope.maxRow = data.data.options.count;
    });

  };
  $scope.filterAthlete();
  //raj function
  $scope.generateExcelOLD = function (formdata) {
    formdata.page = $scope.formData.page;
    console.log(formdata);
    NavigationService.generateAthleteExcelWithData(formdata, function (data) {
      // console.log('controller', data);
      // // $scope.zipCreate = function (data) {
      console.log('All', data);
      console.log('excel', data.data);
      console.log('info', data.config);
      $scope.zConstraint = {};
      // $scope.zConstraint.userName = data.firstName + '_' + data.lastName;
      // $scope.zConstraint.userStringId = data.userStringId;

      $scope.excelData = data.data;


      console.log($scope.zConstraint);
      // var zip = new xlsx();  
      var files = [];

      files.push($scope.excelData);
      // console.log("inside files", files);
      // var img = zip.folder(Athlete);  

      async.each(files, function (values, callback) {
        callback();
        // if (values.Image) {
        //     var value = values.Image;
        //     var extension = value.split(".").pop();
        //     extension = extension.toLowerCase();   
        //     if (extension == "jpeg") {    
        //         extension = "jpg";   
        //     }   
        //     var i = value.indexOf(".");   
        //     i--;   
        //     var name = values.Name;

        //     getBase64FromImageUrl(adminURL + "upload/readFile?file=" + value, function (imageData) {
        //         img.file(name + "." + extension, imageData, {
        //             createFolders: false,
        //             base64: true
        //         });  
        //         callback();
        //     }); 
        // } else {
        //     callback();
        // }
      }, function (err, data) {
        zip.generateAsync({
          type: "blob",
        }).then(function (content) {     // see FileSaver.js
          saveAs(content, Athlete + ".zip");
        });
      });
      // window.location.href = adminurl + 'Athelete/generateExcel';
    });
  }

  // OLD FUNCTIONS
  $scope.targetAthleteExcel = function () {
    var param = {};
    param.file = "targetAthlete"
    var url = "Athelete/getTargetAthlete"
    NavigationService.generateExcelWithoutData(url, param, function (data) {});
  }
  $scope.generateExcel = function (formdata) {
    if (_.isEmpty(formdata.type)) {
      console.log("else");
      NavigationService.generateAthleteExcelWithData(formdata, function (data) {});
    } else {
      console.log(formdata);
      NavigationService.generateAthleteExcelWithData(formdata, function (data) {});
    }
  }
  // OLD FUNCTIONS
  // INITIALISE VARIABLES
  // $scope.user = $.jStorage.get("user");
  $scope.login = {};
  var navigationUrl;
  var filename = 'Athlete';

  // INITIALISE VARIABLES END
  $scope.loginPopup = function (commonData, type) {
    if (type === 'excel') {
      navigationUrl = 'Athelete/generateExcel';
    } else if (type === 'targetexcel') {
      navigationUrl = "Athelete/getTargetAthlete";
    }
    console.log(commonData, "*********************");
    excelService.loginPopup(commonData, $scope, type);
  }
  $scope.loginSubmit = function (login) {
    console.log(login, "check")

    excelService.loginSubmit(login, navigationUrl, filename)

  }
  $scope.transferToWebsite = function (id) {
    $scope.constraints = {};
    $scope.constraints.athleteId = base64Service.encode(id);
    // window.location = 'http://sfa5.wohlig.co.in/sports-selection/' + 'athlete/' + $scope.constraints.athleteId;
    if (window.location.origin == 'http://mumbaischool.sfanow.in') {
      window.location = 'http://mumbaischool.sfanow.in/sports-selection/' + 'athlete/' + $scope.constraints.athleteId;
    } else if (window.location.origin == 'http://mumbaicollege.sfanow.in') {
      window.location = 'http://mumbaicollege.sfanow.in/sports-selection/' + 'athlete/' + $scope.constraints.athleteId;
    } else if (window.location.origin == 'http://hyderabadschool.sfanow.in') {
      window.location = 'http://hyderabadschool.sfanow.in/sports-selection/' + 'athlete/' + $scope.constraints.athleteId;
    } else if (window.location.origin == 'http://ahmedabadschool.sfanow.in') {
      window.location = 'http://ahmedabadschool.sfanow.in/sports-selection/' + 'athlete/' + $scope.constraints.athleteId;
    } else if (window.location.origin == 'http://hyderabadcollege.sfanow.in') {
      window.location = 'http://hyderabadcollege.sfanow.in/sports-selection/' + 'athlete/' + $scope.constraints.athleteId;
    } else if (window.location.origin == 'http://ahmedabadcollege.sfanow.in') {
      window.location = 'http://ahmedabadcollege.sfanow.in/sports-selection/' + 'athlete/' + $scope.constraints.athleteId;
    } else if (window.location.origin == 'http://testmumbaischool.sfanow.in') {
      window.location = 'http://testmumbaischool.sfanow.in/sports-selection/' + 'athlete/' + $scope.constraints.athleteId;
    } else if (window.location.origin == 'http://testhyderabadschool.sfanow.in') {
      window.location = 'http://testhyderabadschool.sfanow.in/sports-selection/' + 'athlete/' + $scope.constraints.athleteId;
    } else if (window.location.origin == 'http://testahmedabadschool.sfanow.in') {
      window.location = 'http://testahmedabadschool.sfanow.in/sports-selection/' + 'athlete/' + $scope.constraints.athleteId;
    } else if (window.location.origin == 'http://testmumbaicollege.sfanow.in') {
      window.location = 'http://testmumbaicollege.sfanow.in/sports-selection/' + 'athlete/' + $scope.constraints.athleteId;
    } else if (window.location.origin == 'http://testhyderabadcollege.sfanow.in') {
      window.location = 'http://testhyderabadcollege.sfanow.in/sports-selection/' + 'athlete/' + $scope.constraints.athleteId;
    } else if (window.location.origin == 'http://testahmedabadcollege.sfanow.in') {
      window.location = 'http://testahmedabadcollege.sfanow.in/sports-selection/' + 'athlete/' + $scope.constraints.athleteId;
    } else if (window.location.origin == 'http://localhost:8081') {
      window.location = 'http://localhost:8080/#/sports-selection/' + 'athlete/' + $scope.constraints.athleteId;
    }
    // $scope.url = "Login/editAccess"
    // NavigationService.apiCall($scope.url, $scope.constraints, function (data) {
    //     console.log(data);
    // });

    // For decode at frontend level
    // console.log(id);
    // console.log($scope.constraints);
    // $scope.constraintis = {};
    // $scope.constraintis._id =  .decode($scope.constraints._id);
    // console.log($scope.constraintis);

  }
  // for SPORTOPS LOGIN
  $scope.jAtheletOps = $.jStorage.get('athleteOps');
  if ($state.current.name == "athleteOps") {
    if ($.jStorage.get('athleteOps') == null) {
      excelService.loginPayuPopup($scope);
    }
  }

  $scope.submit = function (login) {
    excelService.submitPayuPopup(login, 'athleteOps', $state);
  }
  $scope.logout = function () {
    $.jStorage.deleteKey("athleteOps");
    toastr.success("Logout Successfully", 'Success Message');
    $state.reload();
  }

  if ($state.current.name == 'athleteOps') {
    $scope.showAccess = false;
  } else {
    $scope.showAccess = true;
  }
  // for SPORTOPS LOGIN END

  // SAVE REFUND AMOUNT
  $scope.saveRefund = function (athleteID, photoImageData, birthImageData, photoData, refundData) {
    console.log(athleteID, photoImageData, birthImageData, photoData, refundData, "data");
    $scope.constraints = {};
    $scope.constraints._id = athleteID;
    $scope.constraints.refundAmount = refundData;

    $scope.constraints.photoImageCheck = photoImageData;
    $scope.constraints.birthImageCheck = birthImageData

    if (photoData) {
      $scope.constraints.photographCheck = true
    }
    console.log($scope.constraints, "check");

    $scope.url = "Athelete/Save";
    NavigationService.apiCall($scope.url, $scope.constraints, function (data) {
      console.log(data, "save data");
      if (data.value) {
        if (data.data.nModified) {
          toastr.success("Data Saved Successfully", 'Save');
        } else {
          toastr.error("No Data to Update", 'Error');
        }
      }
    })
    $scope.filterAthlete();
  }
  // SAVE REFUND AMOUNT END
});
// TABLE ATHLETE END

// DETAIL ATHLETE 
myApp.controller('DetailAthleteCtrl', function ($scope, TemplateService, NavigationService, $timeout, $stateParams, $state, toastr, $uibModal, deleteService, crudService) {
  //Used to name the .html file
  $scope.template = TemplateService.changecontent("registration/athlete/detailathlete");
  $scope.menutitle = NavigationService.makeactive("Detail Athlete");
  TemplateService.title = $scope.menutitle;
  $scope.navigation = NavigationService.getnav();

  // VARIABLES
  var url = 'Athelete/Save';


  $scope.getOneAthleteById = function () {
    $scope.url = 'Athelete/getOne';
    $scope.constraints = {};
    $scope.constraints._id = $stateParams.id;
    NavigationService.apiCall($scope.url, $scope.constraints, function (data) {
      $scope.athlete = data.data;
      console.log($scope.athlete);
      if ($scope.athlete.school) {
        $scope.url1 = 'School/getOne';
        $scope.constraints = {};
        $scope.constraints._id = $scope.athlete.school;
        NavigationService.apiCall($scope.url1, $scope.constraints, function (data) {
          $scope.athlete.school = data.data.name;
        });
      }
    });
  };
  $scope.getOneAthleteById();

  // SAVE FUNCTION
  var state = 'tableathlete'
  $scope.saveData = function (athleteId, mobile, email) {
    // console.log(mobile, email);
    $scope.constraints = {},
      $scope.constraints._id = athleteId;
    $scope.constraints.mobile = mobile;
    $scope.constraints.email = email;
    // console.log($scope.constraints, "check this");
    crudService.saveData($scope.constraints, url, state);
  }
  // SAVE FUNCTION END
})

// DETAIL ATHLETE  END