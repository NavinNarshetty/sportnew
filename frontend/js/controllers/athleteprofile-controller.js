myApp.controller('AthleteProfileCtrl', function ($scope, $state, $stateParams, TemplateService, NavigationService, $timeout, toastr, $http) {
    $scope.template = TemplateService.getHTML("content/athleteprofile.html");
    TemplateService.title = "Athlete Profile"; //This is the Title of the Website
    $scope.navigation = NavigationService.getNavigation();

    var allAgentProfile = [ "frontend/views/content/athleteprofile/highlights.html", "frontend/views/content/athleteprofile/statistics.html", "frontend/views/content/athleteprofile/achievements.html", "frontend/views/content/athleteprofile/videos.html"];
    $scope.athleteprofile = {
      innerView: allAgentProfile[0],
      active : "highlights"
    };
    $scope.viewTab = 1;
    // DIRECT LINK
    switch($state.params.name){
      case "highlights":
        $scope.athleteprofile.innerView = allAgentProfile[0];
        $scope.athleteprofile.active = "highlights";
      break;
      case "statistics":
        $scope.athleteprofile.innerView = allAgentProfile[1];
        $scope.athleteprofile.active = "statistics";
      break;
      case "achievements":
        $scope.athleteprofile.innerView = allAgentProfile[2];
        $scope.athleteprofile.active = "achievements";
      break;
      case "videos":
        $scope.athleteprofile.innerView = allAgentProfile[3];
        $scope.athleteprofile.active = "videos";
      break;
      default:
        $scope.athleteprofile.innerView = allAgentProfile[0];
        $scope.athleteprofile.active = "highlights";
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
          $scope.athleteprofile.active = "highlights";
        break;
        case 1 :
          url = "statistics";
          $scope.athleteprofile.active = "statistics";
        break;
        case 2:
          url = "achievements";
          $scope.athleteprofile.active = "achievements";
        break;
        case 3:
          url = "videos";
          $scope.athleteprofile.active = "videos";
        break;
        default:
          url = "highlights";
          $scope.athleteprofile.active = "highlights";
        break;
      }
      $state.go("athleteprofile",{
        name: url
      },{
        notify: false
      })
    }
    // ON CLICK END

    $scope.mySlides = [1,2,3,4,5,6];

    $scope.gallery = ['/img/day-03.png','/img/day-04.png','/img/oldSfa/bg-draw.jpg','/img/oldSfa/banner2.jpg','/img/oldSfa/f4.jpg'];

})
