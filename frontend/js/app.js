// Link all the JS Docs here
var backgroundClick = {
  object: undefined,
  close: function (e) {
    console.log(backgroundClick.object.backgroundClick);
    // if the classes given below is not added in respective div elements, then it will work normally as it was previously
    if ($(e.target).parents().hasClass(backgroundClick.object.innerClass)) {
      return;
    } else if ($(e.target).hasClass(backgroundClick.object.outerClass)) {
      backgroundClick.object.backgroundClick = !backgroundClick.object.backgroundClick;
      backgroundClick.scope.$apply();
    } else {
      backgroundClick.object.backgroundClick = false;
      backgroundClick.object.backgroundClick = undefined;
      backgroundClick.scope.$apply();
    }
  }
};

$(document).ready(function () {
  $("body").click(function (e) {
    // console.log(backgroundClick.object);
    if (backgroundClick.object) {
      backgroundClick.close(e);
    }
  });
});

var myApp = angular.module('myApp', [
    'ui.router',
    'pascalprecht.translate',
    'angulartics',
    'angulartics.google.analytics',
    'ui.bootstrap',
    'ngAnimate',
    'ngSanitize',
    'angular-flexslider',
    'ui.swiper',
    'angularPromiseButtons',
    'toastr',
    'wu.masonry',
    'athleteprofile'
]);

// Define all the routes below
myApp.config(function ($stateProvider, $urlRouterProvider, $httpProvider, $locationProvider) {
    var tempateURL = "views/template/template.html"; //Default Template URL

    // for http request with session
    $httpProvider.defaults.withCredentials = true;
    $stateProvider
        .state('home', {
            url: "/",
            templateUrl: tempateURL,
            controller: 'HomeCtrl'
        })
        .state('form', {
            url: "/form",
            templateUrl: tempateURL,
            controller: 'FormCtrl'
        })
        .state('grid', {
            url: "/grid",
            templateUrl: tempateURL,
            controller: 'GridCtrl'
        })
        .state('athleteprofile-without', {
            url: "/athleteprofile",
            templateUrl: tempateURL,
            controller: 'AthleteProfileCtrl'
        })
        .state('athleteprofile', {
            url: "/athleteprofile/:name",
            templateUrl: tempateURL,
            controller: 'AthleteProfileCtrl',
            reloadOnSearch: false
        })
        .state('schoolprofile-without', {
            url: "/schoolprofile",
            templateUrl: tempateURL,
            controller: 'SchoolProfileCtrl'
        })
        .state('schoolprofile', {
            url: "/schoolprofile/:name",
            templateUrl: tempateURL,
            controller: 'SchoolProfileCtrl',
            reloadOnSearch: false
        });
    $urlRouterProvider.otherwise("/");
    $locationProvider.html5Mode(isproduction);
});

// For Language JS
myApp.config(function ($translateProvider) {
    $translateProvider.translations('en', LanguageEnglish);
    $translateProvider.translations('hi', LanguageHindi);
    $translateProvider.preferredLanguage('en');
});
