myApp.controller('PressMediaCtrl', function ($scope, TemplateService, NavigationService, $timeout, toastr, $http, $state, $stateParams) {
    $scope.template = TemplateService.getHTML("content/pressmedia.html");
    TemplateService.title = "Press & Media"; //This is the Title of the Website
    $scope.navigation = NavigationService.getNavigation();

    // INITIALISE VARIABLES
    // INITIALISE VARIABLES END

    // MAIN PAGE
    // PAGE NAVIGATION
    var allPressMedia = ["frontend/views/content/pressmedia/inthenews.html", "frontend/views/content/pressmedia/pressreleases.html", "frontend/views/content/pressmedia/mediacontact.html"];

    $scope.pressmedia = {
      innerView: allPressMedia[0],
      active : "inthenews"
    };
    $scope.viewTab = 1;
    // DIRECT LINK
    switch($state.params.name){
      case "inthenews":
        $scope.pressmedia = {
          innerView: allPressMedia[0],
          active : "inthenews"
        };
      break;
      case "pressreleases":
        $scope.pressmedia = {
          innerView: allPressMedia[1],
          active : "pressreleases"
        };
      break;
      case "mediacontact":
        $scope.pressmedia = {
          innerView: allPressMedia[2],
          active : "mediacontact"
        };
      break;
      default:
        $scope.pressmedia = {
          innerView: allPressMedia[0],
          active : "inthenews"
        };
      break;
    }
    // DIRECT LINK END
    // ON CLICK
    $scope.getTab = function(view){
      $scope.pressmedia.innerView = allPressMedia[view];
      var url = "inthenews";
      switch (view) {
        case 0:
          url = "inthenews";
          $scope.pressmedia.active = "inthenews";
        break;
        case 1 :
          url = "pressreleases";
          $scope.pressmedia.active = "pressreleases";
        break;
        case 2 :
          url = "mediacontact";
          $scope.pressmedia.active = "mediacontact";
        break;
        default:
          url = "inthenews";
          $scope.pressmedia.active = "inthenews";
        break;
      }
      $state.go("pressmedia",{
        name: url
      },{
        notify: false
      })
    }
    // ON CLICK END
    // PAGE NAVIGATION END
    // MAIN PAGE END

})
