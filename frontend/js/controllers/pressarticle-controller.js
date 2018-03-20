myApp.controller('PressArticleCtrl', function ($scope, TemplateService, NavigationService, $timeout, toastr, $http, $stateParams, $sce) {
    $scope.template = TemplateService.getHTML("content/pressmedia/pressarticle.html");
    TemplateService.title = "Press Article"; //This is the Title of the Website
    $scope.navigation = NavigationService.getNavigation();
    $scope.articleData = {};

    // console.log(, "check this")
    if ($stateParams.id) {
        //GET ONE FOR PRESSRELEASE 
        $scope.getOnePress = function () {
            $scope.url = "Pressrelease/getOne";
            $scope.parameters = {};
            $scope.parameters._id = $stateParams.id;
            NavigationService.getDataApiCall($scope.parameters, $scope.url, function (data) {
                console.log(data, "get one data");
                $scope.articleData = data.data.data;
                $scope.articleData.description = $sce.trustAsHtml(data.data.data.description)
                $scope.articleData.content = $sce.trustAsHtml(data.data.data.content)
            });
        }
        $scope.getOnePress();
        //GET ONE FOR PRESSRELEASE END

        // MEDIA CONTACT
        $scope.getMediaContact = function () {
            $scope.url = 'Mediacontact/search';
            NavigationService.apiCallWithoutParams($scope.url, function (data) {
                console.log("data of contact", data);
                $scope.mediaData = data.data.data.results;
            });
        }
        $scope.getMediaContact()
        // MEDIA CONTACT END
    }

})