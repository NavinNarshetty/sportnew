myApp.controller('ContactUsCtrl', function ($scope, TemplateService, NavigationService, $timeout) {
  $scope.template = TemplateService.getHTML("content/contactus.html");
  TemplateService.title = "Contact Us"; //This is the Title of the Website
  $scope.navigation = NavigationService.getNavigation();
  // CODE START
  // VARIABLES
  // VARIABLES END
  // FUNCTIONS
  // FUNCTIONS END
  // API CALLS
  // API CALLS END
  // JSONS
  $scope.headoffice = {
    title: 'Head Office',
    city: 'Mumbai',
    // note: '<p>SFA SPORTING SERVICES PVT LTD </br>17A, Raviraj House,6th Floor, Saraswati Road,</br>Off Linking Road, Santacruz (West) - 400053</p>',
    email: ['sfa@sfa.in'],
    phone: ['9999999999'],
    link: 'https://goo.gl/maps/XqS4sz6QmnG2'
  }
  $scope.cities = [{
    city: 'Mumbai',
    email: ['sfa@sfa.in','sfa@sfa.in'],
    phone: ['9999999999', '9999999999']
  }, {
    city: 'Hyderabad',
    email: ['sfa@sfa.in','sfa@sfa.in'],
    phone: ['9999999999', '9999999999']
  }];
  $scope.enquiries = [{
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
