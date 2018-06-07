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
    // 'ngAnimate',
    // 'ngSanitize',
    'angular-flexslider',
    // 'ui.swiper',
    'angularPromiseButtons',
    'toastr',
    'infinite-scroll',
    'athleteprofile',
    'wu.masonry',
    'angular-marquee',
    'angular-svg-round-progressbar',
    'chart.js'
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
            url: "/profile/player",
            templateUrl: tempateURL,
            controller: 'AthleteProfileCtrl'
        })
        .state('athleteprofile', {
            url: "/profile/player/:tab",
            templateUrl: tempateURL,
            controller: 'AthleteProfileCtrl',
            reloadOnSearch: false
        })
        .state('schoolprofile-without', {
            url: "/profile/school",
            templateUrl: tempateURL,
            controller: 'SchoolProfileCtrl'
        })
        .state('schoolprofile', {
            url: "/profile/school/:tab",
            templateUrl: tempateURL,
            controller: 'SchoolProfileCtrl',
            reloadOnSearch: false
        })
        .state('schoollanding', {
            url: "/search/school",
            templateUrl: tempateURL,
            controller: 'SchoolLandingCtrl',
            reloadOnSearch: false
        })
        .state('athletelanding-without', {
            url: "/search/player",
            templateUrl: tempateURL,
            controller: 'AthleteLandingCtrl',
            reloadOnSearch: false
        })
        .state('athletelanding', {
            url: "/search/player/:name",
            templateUrl: tempateURL,
            controller: 'AthleteLandingCtrl',
            reloadOnSearch: false
        })
        .state('teamlanding', {
            url: "/search/team",
            templateUrl: tempateURL,
            controller: 'TeamLandingCtrl',
            reloadOnSearch: false
        })
        .state('gallerylanding', {
            url: "/gallerylanding",
            templateUrl: tempateURL,
            controller: 'GalleryLandingCtrl',
            reloadOnSearch: false
        })
        .state('liveupdates', {
            url: "/liveupdates",
            templateUrl: tempateURL,
            controller: 'LiveUpdatesCtrl'
        })
        .state('matchvideo', {
            url: "/matchvideo",
            templateUrl: tempateURL,
            controller: 'MatchVideoCtrl'
        })
        .state('sportpage', {
            url: "/sport/:name/:id",
            templateUrl: tempateURL,
            controller: 'SportPageCtrl'
        })
        .state('pressmedia-without', {
            url: "/pressmedia",
            templateUrl: tempateURL,
            controller: 'PressMediaCtrl',
            reloadOnSearch: false
        })
        .state('pressmedia', {
            url: "/pressmedia/:name",
            templateUrl: tempateURL,
            controller: 'PressMediaCtrl',
            reloadOnSearch: false
        })
        .state('pressarticle', {
            url: "/pressmedia/pressreleases/article/:id",
            templateUrl: tempateURL,
            controller: 'PressArticleCtrl'
        })
        .state('aboutchampionship', {
            url: "/aboutchampionship/:city",
            templateUrl: tempateURL,
            controller: 'aboutChampionshipCtrl'
        })
        .state('contactus', {
            url: "/contactus",
            templateUrl: tempateURL,
            controller: 'ContactUsCtrl'
        })
        .state('results', {
            url: "/results",
            templateUrl: tempateURL,
            controller: 'ResultsCtrl'
        })
        // ACADEMY PROFILE
        .state('academyprofile-without', {
            url: "/profile/academy",
            templateUrl: tempateURL,
            controller: 'AcademyProfileCtrl',
            reloadOnSearch: false
        })
        .state('academyprofile', {
            url: "/profile/academy/:tab",
            templateUrl: tempateURL,
            controller: 'AcademyProfileCtrl',
            reloadOnSearch: false
        })
        // ACADEMY PROFILE END
        .state('traininglanding',{
          url: "/traininglanding",
          templateUrl: tempateURL,
          controller: "TrainingLandingCtrl"
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

// FOR Chart.js
myApp.config(['ChartJsProvider', function (ChartJsProvider) {
  // Configure all charts
  ChartJsProvider.setOptions({
    responsive: true
  });
  // Configure all doughnut charts
  ChartJsProvider.setOptions('doughnut', {
    chartColors: ['#0edb87', '#0edb87', '#0edb87', '#0edb87', '#0edb87', '#0edb87', '#0edb87'],
    hoverBackgroundColor: ['#0edb87', '#0edb87', '#0edb87', '#0edb87', '#0edb87', '#0edb87', '#0edb87'],
    showLines: false
  });
}])
