// JavaScript Document
var myApp = angular.module('myApp', [
    'ui.router',
    'pascalprecht.translate',
    'angulartics',
    'angulartics.google.analytics',
    'imageupload',
    "ngMap",
    "internationalPhoneNumber",
    'ui.bootstrap',
    'ui.select',
    // 'ngAnimate',
    'toastr',
    'textAngular',
    // 'ngSanitize',
    'angular-flexslider',
    'ngMap',
    'toggle-switch',
    'cfp.hotkeys',
    'ui.sortable',
    'ui.date'
]);

myApp.config(function ($stateProvider, $urlRouterProvider, $httpProvider, $locationProvider) {
    // for http request with session
    $httpProvider.defaults.withCredentials = true;
    $stateProvider

        .state('dashboard', {
            url: "/dashboard",
            templateUrl: "views/template.html",
            controller: 'DashboardCtrl',
        })

        .state('login', {
            url: "/login",
            templateUrl: "views/login.html",
            controller: 'LoginCtrl'
        })

        .state('page', {
            url: "/page/:id/{page:.*}/{keyword:.*}",
            templateUrl: "views/template.html",
            controller: 'PageJsonCtrl'
        })

        .state('loginapp', {
            url: "/login/:id",
            templateUrl: "views/login.html",
            controller: 'LoginCtrl'
        })

        .state('country-list', {
            url: "/country-list/{page:.*}/{keyword:.*}",
            templateUrl: "views/template.html",
            controller: 'CountryCtrl',
            params: {
                page: "1",
                keyword: ""
            }
        })

        .state('createcountry', {
            url: "/country-create",
            templateUrl: "views/template.html",
            controller: 'CreateCountryCtrl'
        })

        .state('editcountry', {
            url: "/country-edit/:id",
            templateUrl: "views/template.html",
            controller: 'EditCountryCtrl'
        })

        // ***************AD BANNERS**************
        .state('adgallery', {
            url: "/adgallery",
            templateUrl: "views/template.html",
            controller: 'AdGalleryCtrl'
        })

        .state('detailadgallery', {
            url: "/detailadgallery/:id",
            templateUrl: "views/template.html",
            controller: 'DetailAdGalleryCtrl'
        })

        .state('advideo', {
            url: "/advideo",
            templateUrl: "views/template.html",
            controller: 'AdVideoCtrl'
        })

        .state('detailadvideo', {
            url: "/detailadvideo/:id",
            templateUrl: "views/template.html",
            controller: 'DetailAdVideoCtrl'
        })
        // ***************AD BANNERS END**************


        // ***************FEATURED **************
        .state('featuredgallery', {
            url: "/featuredgallery",
            templateUrl: "views/template.html",
            controller: 'featuredGalleryCtrl'
        })
        .state('detailfeaturedgallery', {
            url: "/detailfeaturedgallery/:id",
            templateUrl: "views/template.html",
            controller: 'detailFeaturedGalleryCtrl'
        })
        .state('featuredvideo', {
            url: "/featuredvideo",
            templateUrl: "views/template.html",
            controller: 'featuredVideoCtrl'
        })
        .state('detailfeaturedvideo', {
            url: "/detailfeaturedvideo/:id",
            templateUrl: "views/template.html",
            controller: 'detailFeaturedVideoCtrl'
        })
        // ***************FEATURED  END**************

        // ***************CITY RULE**************
        .state('cityrule', {
            url: "/cityrule/:city/:type",
            templateUrl: "views/template.html",
            controller: 'CityruleCtrl'
        })

        .state('detailcityrule', {
            url: "/detailcityrule/:city/:type/:id",
            templateUrl: "views/template.html",
            controller: 'DetailCityRuleCtrl'
        })

        // ***************CITY RULE END**************


        // *************** YOU MAY ALSO LIKE **********
        .state('like', {
            url: "/like",
            templateUrl: "views/template.html",
            controller: 'MaylikeCtrl'
        })

        .state('detaillike', {
            url: "/detaillike/:id",
            templateUrl: "views/template.html",
            controller: 'DetailmaylikeCtrl'
        })


        // *************** YOU MAY ALSO LIKE END **********


        // *************** PRESS MEDIA *******************

        .state('mediacontact', {
            url: "/mediacontact",
            templateUrl: "views/template.html",
            controller: 'mediaContactCtrl'
        })

        .state('detailmediacontact', {
            url: "/detailmediacontact/:id",
            templateUrl: "views/template.html",
            controller: 'detailMediaContactCtrl'
        })

        .state('pressreleases', {
            url: "/pressreleases",
            templateUrl: "views/template.html",
            controller: 'pressReleasesCtrl'
        })

        .state('detailpressreleases', {
            url: "/detailpressreleases/:id",
            templateUrl: "views/template.html",
            controller: 'detailPressReleasesCtrl'
        })

        .state('pressnews', {
            url: "/pressnews",
            templateUrl: "views/template.html",
            controller: 'pressNewsCtrl'
        })

        .state('detailpressnews', {
            url: "/detailpressnews/:id",
            templateUrl: "views/template.html",
            controller: 'DetailPressNewsCtrl'
        })

        // *************** PRESS MEDIA END***************

        .state('schema-creator', {
            url: "/schema-creator",
            templateUrl: "views/template.html",
            controller: 'SchemaCreatorCtrl'
        })

        .state('excel-upload', {
            url: "/excel-upload/:model",
            templateUrl: "views/template.html",
            controller: 'ExcelUploadCtrl'
        })

        .state('jagz', {
            url: "/jagz",
            templateUrl: "views/jagz.html",
            controller: 'JagzCtrl'
        });

    $urlRouterProvider.otherwise("/dashboard");
    $locationProvider.html5Mode(isproduction);
});

myApp.config(function ($translateProvider) {
    $translateProvider.translations('en', LanguageEnglish);
    $translateProvider.translations('hi', LanguageHindi);
    $translateProvider.preferredLanguage('en');
});