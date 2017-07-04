myApp.controller('AthleteProfileCtrl', function ($scope, $state, $stateParams, TemplateService, NavigationService, $timeout, toastr, $http) {
    $scope.template = TemplateService.getHTML("content/athleteprofile.html");
    TemplateService.title = "Athlete Profile"; //This is the Title of the Website
    $scope.navigation = NavigationService.getNavigation();

    var allAgentProfile = [ "frontend/views/content/athleteprofile/highlights.html", "frontend/views/content/athleteprofile/statistics.html", "frontend/views/content/athleteprofile/achievements.html", "frontend/views/content/athleteprofile/videos.html"];
    $scope.athleteprofile = {
      innerView: allAgentProfile[0]
    };
    $scope.viewTab = 1;
    // DIRECT LINK
    switch($state.params.name){
      case "highlights":
        $scope.athleteprofile.innerView = allAgentProfile[0];
      break;
      case "statistics":
        $scope.athleteprofile.innerView = allAgentProfile[1];
      break;
      case "achievements":
        $scope.athleteprofile.innerView = allAgentProfile[2];
      break;
      case "videos":
        $scope.athleteprofile.innerView = allAgentProfile[3];
      break;
      default:
        $scope.athleteprofile.innerView = allAgentProfile[0];
      break;
    }
    // DIRECT LINK END

    // ON CLICK
    $scope.getTab = function(view){
      $scope.athleteprofile.innerView = allAgentProfile[view];
      var url = "highlights";

      switch (view) {
        case 0:
          url = "highlights";
        break;
        case 1 :
          url = "statistics";
        break;
        case 2:
          url = "achievements";
        break;
        case 3:
          url = "videos";
        break;
        default:
          url = "highlights";
        break;
      }
      $state.go("athleteprofile",{
        name: url
      },{
        notify: false
      })
    }
    // ON CLICK END

})
