// TABLE ATHLETE
myApp.controller('SchoolCtrl', function ($scope, TemplateService, NavigationService, $timeout, $stateParams, $state, toastr, $uibModal, deleteService, crudService) {
  //Used to name the .html file
  $scope.template = TemplateService.changecontent("registration/school/tableschool");
  $scope.menutitle = NavigationService.makeactive("School");
  TemplateService.title = $scope.menutitle;
  $scope.navigation = NavigationService.getnav();

  $scope.formData = {};
  $scope.formData.page = 1;
  $scope.formData.type = '';
  $scope.formData.keyword = '';
  $scope.changeInput = function () {
    $scope.filterSchool();
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
    $scope.filterSchool();
  };
  $scope.searchInSchool = function (data) {
    $scope.formData.page = 1;
    if (data.length >= 2) {
      $scope.formData.keyword = data;
      $scope.filterSchool();
    } else if (data.length == '') {
      $scope.formData.keyword = data;
      $scope.filterSchool();
    }
  }



  $scope.filterSchool = function () {
    $scope.url = "Registration/filterSchool";
    $scope.search = $scope.formData.keyword;
    $scope.formData.page = $scope.formData.page++;


    NavigationService.apiCall($scope.url, $scope.formData, function (data) {
      $scope.items = data.data.results;
      $scope.totalItems = data.data.total;
      $scope.maxRow = data.data.options.count;
    });
  };
  $scope.filterSchool();

  $scope.login = {};
  var navigationUrl;
  var filename = 'School';

  // INITIALISE VARIABLES END
  $scope.loginPopup = function (commonData, type) {
    if (type === 'excel') {
      navigationUrl = 'Registration/generateExcel';
    }
    console.log(commonData, "*********************");
    excelService.loginPopup(commonData, $scope, type);
  }
  $scope.loginSubmit = function (login) {
    console.log(login, "check")

    excelService.loginSubmit(login, navigationUrl, filename)

  }

  $scope.generateExcel = function (formData) {
    console.log("formdata", formData);
    NavigationService.generateSchoolExcelWithData(formData, function (data) {});
  }

  $scope.transferToWebsite = function (id) {
    console.log(id);
    $scope.constraints = {};
    $scope.constraints.schoolId = base64Service.encode(id);
    if (window.location.origin == 'http://mumbaischool.sfanow.in') {
      window.location = 'http://mumbaischool.sfanow.in/sports-selection/' + 'school/' + $scope.constraints.schoolId;
    } else if (window.location.origin == 'http://mumbaicollege.sfanow.in') {
      window.location = 'http://mumbaicollege.sfanow.in/sports-selection/' + 'school/' + $scope.constraints.schoolId;
    } else if (window.location.origin == 'http://hyderabadschool.sfanow.in') {
      window.location = 'http://hyderabadschool.sfanow.in/sports-selection/' + 'school/' + $scope.constraints.schoolId;
    } else if (window.location.origin == 'http://ahmedabadschool.sfanow.in') {
      window.location = 'http://ahmedabadschool.sfanow.in/sports-selection/' + 'school/' + $scope.constraints.schoolId;
    } else if (window.location.origin == 'http://hyderabadcollege.sfanow.in') {
      window.location = 'http://hyderabadcollege.sfanow.in/sports-selection/' + 'school/' + $scope.constraints.schoolId;
    } else if (window.location.origin == 'http://ahmedabadcollege.sfanow.in') {
      window.location = 'http://ahmedabadcollege.sfanow.in/sports-selection/' + 'school/' + $scope.constraints.schoolId;
    } else if (window.location.origin == 'http://testmumbaischool.sfanow.in') {
      window.location = 'http://testmumbaischool.sfanow.in/sports-selection/' + 'school/' + $scope.constraints.schoolId;
    } else if (window.location.origin == 'http://testhyderabadschool.sfanow.in') {
      window.location = 'http://testhyderabadschool.sfanow.in/sports-selection/' + 'school/' + $scope.constraints.schoolId;
    } else if (window.location.origin == 'http://testahmedabadschool.sfanow.in') {
      window.location = 'http://testahmedabadschool.sfanow.in/sports-selection/' + 'school/' + $scope.constraints.schoolId;
    } else if (window.location.origin == 'http://testmumbaicollege.sfanow.in') {
      window.location = 'http://testmumbaicollege.sfanow.in/sports-selection/' + 'school/' + $scope.constraints.schoolId;
    } else if (window.location.origin == 'http://testhyderabadcollege.sfanow.in') {
      window.location = 'http://testhyderabadcollege.sfanow.in/sports-selection/' + 'school/' + $scope.constraints.schoolId;
    } else if (window.location.origin == 'http://testahmedabadcollege.sfanow.in') {
      window.location = 'http://testahmedabadcollege.sfanow.in/sports-selection/' + 'school/' + $scope.constraints.schoolId;
    } else if (window.location.origin == 'http://localhost:8081') {
      window.location = 'http://localhost:8082/#/sports-selection/' + 'school/' + $scope.constraints.schoolId;
    }

    // window.location = 'http://sfa5.wohlig.co.in/sports-selection/' + 'school/' + $scope.constraints.schoolId;

    //  window.location = 'http://localhost:8080/#/sports-selection/' + 'school/' + $scope.constraints.schoolId;

    // window.location = 'http://localhost:8080/#/sports-selection/' + 'school/' + $scope.constraints.schoolId;


    // console.log($scope.constraints);
    // $scope.url = "Login/editAccess"
    // NavigationService.apiCall($scope.url, $scope.constraints, function (data) {
    //     console.log("dataaaaa", data);
    // });

    // For decode at frontend level
    // console.log(id);
    // console.log($scope.constraints);
    // $scope.constraintis = {};
    // $scope.constraintis._id = base64Service.decode($scope.constraints._id);
    // console.log($scope.constraintis);

  }

  // FOR SPORTOPS START
  if ($state.current.name == "schoolOps") {
    $scope.jSchoolops = $.jStorage.get('schoolOps');
    if ($.jStorage.get('schoolOps') == null) {
      excelService.loginPayuPopup($scope);
    }
  }
  $scope.submit = function (login) {
    excelService.submitPayuPopup(login, 'schoolOps', $state);
  }
  $scope.logout = function () {
    $.jStorage.deleteKey("schoolOps");
    toastr.success("Logout Successfully", 'Success Message');
    $state.reload();
  }
  if ($state.current.name == 'schoolOps') {
    $scope.showAccess = false;
  } else {
    $scope.showAccess = true;
  }

  // FOR SPORTOPS END

  // SAVE FUNCTION
  var url = 'Registration';
  var state = 'tableschool';
  $scope.saveData = function (schoolId, mobile, email) {
    // console.log(mobile, email);
    $scope.constraints = {},
      $scope.constraints._id = schoolId;
    $scope.constraints.mobile = mobile;
    $scope.constraints.email = email;
    console.log($scope.constraints, "check this");
    crudService.saveData($scope.constraints, url, state);
  }
  // SAVE FUNCTION END
});
// TABLE ATHLETE END

// DETAIL ATHLETE 
myApp.controller('DetailSchoolCtrl', function ($scope, TemplateService, NavigationService, $timeout, $stateParams, $state, toastr, $uibModal, deleteService, crudService) {
  //Used to name the .html file
  $scope.template = TemplateService.changecontent("registration/school/detailschool");
  $scope.menutitle = NavigationService.makeactive("Detail School");
  TemplateService.title = $scope.menutitle;
  $scope.navigation = NavigationService.getnav();

  $scope.getOneSchoolById = function () {
    $scope.url = 'Registration/getOne';
    $scope.constraints = {};
    $scope.constraints._id = $stateParams.id;
    NavigationService.apiCall($scope.url, $scope.constraints, function (data) {
      $scope.school = data.data;
    });
  };
  $scope.getOneSchoolById();


})

// DETAIL ATHLETE  END