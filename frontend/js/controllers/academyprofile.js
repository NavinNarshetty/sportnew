myApp.controller('AcademyProfileCtrl', function ($scope, TemplateService, NavigationService, $timeout, $state, $stateParams) {
  $scope.template = TemplateService.getHTML("content/academyprofile.html");
  TemplateService.title = "Training Landing"; //This is the Title of the Website
  $scope.navigation = NavigationService.getNavigation();

  // COMMON VARIABLES INITIALISE
  // COMMON VARIABLES INITIALISE END
  // COMMON FUNCTIONS
  // TAB REDIRECTION
  var allAcademyProfile = ["../views/content/academyprofile/highlights.html", "../views/content/academyprofile/coaches.html", "../views/content/academyprofile/batchfees.html", "../views/content/academyprofile/gallery.html" ];

  $scope.academyprofile = {
    innerView: allAcademyProfile[0],
    active : "highlights"
  };
  $scope.viewTab = 1;

  // DIRECT LINK
  switch($state.params.tab){
    case "highlights":
      $scope.academyprofile = {
        innerView: allAcademyProfile[0],
        active : "highlights"
      };
    break;
    case "coaches":
      $scope.academyprofile = {
        innerView: allAcademyProfile[1],
        active : "coaches"
      };
    break;
    case "batches":
      $scope.academyprofile = {
        innerView: allAcademyProfile[2],
        active : "batches"
      };
    break;
    case "gallery":
      $scope.academyprofile = {
        innerView: allAcademyProfile[3],
        active : "gallery"
      };
    break;
    default:
      $scope.academyprofile = {
        innerView: allAcademyProfile[0],
        active : "highlights"
      };
    break;
  }
  // DIRECT LINK END

  // ON CLICK
  $scope.getTab = function(view){
    $scope.academyprofile.innerView = allAcademyProfile[view];
    var url = "highlights";
    switch (view) {
      case 0:
        url = "highlights";
        $scope.academyprofile.active = "highlights";
      break;
      case 1 :
        url = "coaches";
        $scope.academyprofile.active = "coaches";
      break;
      case 2 :
        url = "batches";
        $scope.academyprofile.active = "batches";
      break;
      case 3 :
        url = "gallery";
        $scope.academyprofile.active = "gallery";
      break;
      default:
        url = "highlights";
        $scope.academyprofile.active = "highlights";
      break;
    }
    $state.go("academyprofile",{
      tab: url
    },{
      notify: false
    })
  }
  // ON CLICK END
  // TAB REDIRECTION END
  // COMMON FUNCTIONS END
  // COMMON API CALLS
  // COMMON API CALLS END
});
