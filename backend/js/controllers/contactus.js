myApp.controller('ContactUsCtrl', function ($scope, TemplateService, NavigationService, $timeout, $stateParams, $state, toastr, $uibModal, deleteService, crudService) {
  //Used to name the .html file
  $scope.template = TemplateService.changecontent("contactus");
  $scope.menutitle = NavigationService.makeactive("Contact Us");
  TemplateService.title = $scope.menutitle;
  $scope.navigation = NavigationService.getnav();
  // CODE START
  // VARIABLES
  $scope.formData = {};
  $scope.form = {};
  $scope.form.page = 1;
  $scope.form.type = '';
  $scope.form.keyword = '';
  var url = 'ContactUs';
  var state = 'contactus';
  // VARIABLES END
  // FUNCTIONS
  // ADD CITY ROW
  $scope.addCityRow = function (formData) {
    if (!$scope.formData.enquiries) {
      $scope.formData.enquiries = [];
    }
    if (!formData) {
      $scope.formData.cities.push({
        "city": '',
        "email": '',
        "phone": ''
      })
    } else {
      formData.cities.push({
        "city": '',
        "email": '',
        "phone": ''
      })
    }
  }
  // ADD CITY ROW END
  // DELETE CITY ROW
  $scope.deleteCityRow = function (formData, index) {
    console.log("index", index);
    formData.cities.splice(index, 1);
  }
  // DELETE CITY ROW END
  // NEW ENQUIRY
  $scope.enquiryNew = function(enquiry, flag){
    if (flag == 'edit') {
      $scope.newEnquiry = enquiry;
    } else {
      $scope.newEnquiry = {};
    }
    $scope.enquiryStatus = flag;
    $scope.enquiryPop = $uibModal.open({
      animation: $scope.animationsEnabled,
      templateUrl: 'views/modal/new-enquiry.html',
      backdrop: 'static',
      keyboard: false,
      size: 'md',
      scope: $scope
    });
  }
  // NEW ENQUIRY END
  // ADD ENQUIRY
  $scope.addEnquiry = function(){
    if ($scope.enquiryStatus == 'edit') {
      $scope.formData.enquiries[$scope.newEnquiry.order] = $scope.newEnquiry;
    } else {
      if (!$scope.formData.enquiries) {
        $scope.formData.enquiries = [];
      }
      $scope.formData.enquiries.push($scope.newEnquiry);
    }
    $scope.newEnquiry = {};
    $scope.enquiryPop.close();
  }
  // ADD ENQUIRY END
  // DELETE ENQUIRY
  $scope.deleteEnquiryRow = function (formData, index) {
    console.log("index", index);
    formData.enquiries.splice(index, 1);
  }
  // DELETE ENQUIRY END
  // SAVE DATA
  $scope.saveData = function(data){
    console.log("data", data);
    crudService.saveData(data, url, state);
  }
  // SAVE DATA END
  // FUNCTIONS END
  // API CALLS
  // GET DATA
  $scope.contactSearch = function(){
    $scope.url = 'ContactUs/search';
    $scope.form.page = $scope.form.page++;
    $scope.form.filter = {}
    NavigationService.apiCall($scope.url, $scope.form, function(data){
      if (data.value == true) {
        if (data.data.results.length != 0) {
          $scope.formData = data.data.results[0];
        } else {
          $scope.formData = {};
        }
        TemplateService.scrollTo('heading-sec', 'class');
      } else {
        toaster.error("Data failed", "Error");
      }
    });
  }
  $scope.contactSearch();
  // GET DATA END
  // API CALLS END
  // JSONS
  // JSONS END
  $scope.formDatasasa = {
    headoffice: {
      title: 'Head Office',
      city: 'Mumbai',
      address: '<p>SFA SPORTING SERVICES PVT LTD </br>17A, Raviraj House,6th Floor, Saraswati Road,</br>Off Linking Road, Santacruz (West) - 400053</p>',
      email: ['sfa@sfa.in'],
      phone: ['9999999999'],
      link: 'https://goo.gl/maps/XqS4sz6QmnG2'
    },
    cities: [{
      city: 'Mumbai',
      email: ['sfa@sfa.in','sfa@sfa.in'],
      phone: ['9999999999', '9999999999']
    }, {
      city: 'Hyderabad',
      email: ['sfa@sfa.in','sfa@sfa.in'],
      phone: ['9999999999', '9999999999']
    }],
    enquiries: [{
      title: 'Registration Queries',
      city: 'Mumbai',
      note: 'Hello there',
      email: ['sfa@sfa.in','sfa@sfa.in'],
      phone: ['9999999999', '9999999999'],
      logo: 'img/icon/sfa-ringlogo.png'
    }, {
      title: 'Registration Queries',
      city: 'Mumbai',
      note: 'Hello there',
      email: ['sfa@sfa.in','sfa@sfa.in'],
      phone: ['9999999999', '9999999999']
    }, {
      title: 'Registration Queries',
      city: 'Mumbai',
      note: 'Hello there',
      email: ['sfa@sfa.in','sfa@sfa.in'],
      phone: ['9999999999', '9999999999'],
      logo: 'img/icon/sfa-ringlogo.png'
    }, {
      title: 'Registration Queries',
      city: 'Mumbai',
      note: 'Hello there',
      email: ['sfa@sfa.in','sfa@sfa.in'],
      phone: ['9999999999', '9999999999']
    }, {
      title: 'Registration Queries',
      city: 'Mumbai',
      note: 'Hello there',
      email: ['sfa@sfa.in','sfa@sfa.in'],
      phone: ['9999999999', '9999999999']
    }]
  }
  // CODE END
});
