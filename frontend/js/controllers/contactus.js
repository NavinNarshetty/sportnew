myApp.controller('ContactUsCtrl', function ($scope, TemplateService, NavigationService, $timeout) {
  $scope.template = TemplateService.getHTML("content/contactus.html");
  TemplateService.title = "Contact Us"; //This is the Title of the Website
  $scope.navigation = NavigationService.getNavigation();
  // CODE START
  // VARIABLES
  $scope.form = {};
  $scope.form.page = 1;
  $scope.form.type = '';
  $scope.form.keyword = '';
  $scope.url = 'ContactUs/search';
  // VARIABLES END
  // FUNCTIONS
  // FUNCTIONS END
  // API CALLS
  NavigationService.search($scope.form, $scope.url, function(data){
    data = data.data;
    console.log("data", data);
    if (data.value == true) {
      if (data.data.results.length != 0) {
        $scope.formData = data.data.results[0];
        $scope.headoffice = $scope.formData.headoffice;
        $scope.cities = $scope.formData.cities;
        $scope.enquiries = $scope.formData.enquiries;
      } else {
        toaster.error("Error");
      }
    } else {
      toaster.error("Data failed", "Error");
    }
  });
  // API CALLS END
  // JSONS
  $scope.headoffices = {
    title: 'Head Office',
    city: 'Mumbai',
    // note: '<p>SFA SPORTING SERVICES PVT LTD </br>17A, Raviraj House,6th Floor, Saraswati Road,</br>Off Linking Road, Santacruz (West) - 400053</p>',
    email: ['sfa@sfa.in'],
    phone: ['9999999999'],
    link: 'https://goo.gl/maps/XqS4sz6QmnG2'
  };
  $scope.citiess = [{
    city: 'Mumbai',
    email: ['sfa@sfa.in','sfa@sfa.in'],
    phone: ['9999999999', '9999999999']
  }, {
    city: 'Hyderabad',
    email: ['sfa@sfa.in','sfa@sfa.in'],
    phone: ['9999999999', '9999999999']
  }];
  $scope.enquiriess = [{
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
  }];
  // JSONS END
  // CODE END
});
