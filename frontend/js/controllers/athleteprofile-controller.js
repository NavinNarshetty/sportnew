myApp.controller('AthleteProfileCtrl', function ($scope, $state, $stateParams, TemplateService, NavigationService, $timeout, toastr, $http) {
    $scope.template = TemplateService.getHTML("content/athleteprofile.html");
    TemplateService.title = "Athlete Profile"; //This is the Title of the Website
    $scope.navigation = NavigationService.getNavigation();


    // VARIABLE INITIALISATIONS
    $scope.oneAtATime = true;
    $scope.backdrop = {
      class: "",
      click: ""
    }
    // VARIABLE INITIALISATIONS END

    // ARRAY OF SPORT NAMES
    $scope.sporticon = ['Handball','Basketball','Volleyball','Throwball',
    'Hockey','Kabaddi','Football','Badminton','Badminton Doubles', 'Tennis','Tennis Doubles','Tennis Mixed Doubles','Table Tennis','Table Tennis Doubles','Squash','Judo','Taekwondo','Boxing','Fencing','Karate','Karate Team Kumite','Sport MMA','Shooting','Shooting Air Rifle Peep Team','Shooting Air Rifle Open Team','Shooting Air Rifle Peep Team', 'Archery', 'Swimming', 'Swimming 4x50m Freestyle Relay', 'Swimming 4x50m Medley Relay', 'Water Polo', 'Carrom','Chess','Athletics','Athletics 4x100m Relay','Athletics 4x50m Relay','Athletics Medley Relay','Kho Kho'];
    // ARRAY OF SPORT NAMES END

    var allAgentProfile = [ "frontend/views/content/athleteprofile/highlights.html", "frontend/views/content/athleteprofile/statistics.html", "frontend/views/content/athleteprofile/achievements.html", "frontend/views/content/athleteprofile/videos.html", "frontend/views/content/athleteprofile/gallery.html"];
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
      case "gallery":
        $scope.athleteprofile.innerView = allAgentProfile[4];
        $scope.athleteprofile.active = "gallery";
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
        case 4:
          url = "gallery";
          $scope.athleteprofile.active = "gallery";
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
    $scope.ySlides = [1,2,3];

    $scope.gallery = ['/img/day-03.png','/img/day-04.png','/img/oldSfa/bg-draw.jpg','/img/oldSfa/banner2.jpg','/img/oldSfa/f4.jpg'];

    // $scope.$on('$viewContentLoaded', function () {
    //     setTimeout(function () {
    //       $('.highlight-knowflexslider .flexslider').flexslider({
    //         animation: "slide",
    //         animationLoop: true,
    //         reverse: false,
    //         slideshow: true,
    //         slideshowSpeed: 5000,
    //         controlNav: false,
    //         directionNav: true,
    //         prevText: "",
    //         nextText: "",
    //         itemWidth: 370,
    //         itemMargin: 10,
    //         pauseOnHover: true
    //       });
    //     }, 300);
    // });

    setTimeout(function () {
      $('.highlight-knowflexslider .flexslider').flexslider({
        animation: "slide",
        animationLoop: true,
        reverse: false,
        slideshow: true,
        slideshowSpeed: 5000,
        controlNav: false,
        directionNav: true,
        prevText: "",
        nextText: "",
        itemWidth: 370,
        itemMargin: 10,
        pauseOnHover: true
      });
    }, 100);

    $scope.schoolRankTable = [{
            name: "Jamnabai Narsee International School",
            gold: "20",
            silver: "18",
            bronze: "19",
            points: "30",
            ySlides : [1,2,3]
        }, {
            name: "Jamnabai Narsee International School",
            gold: "20",
            silver: "18",
            bronze: "19",
            points: "30",
            ySlides : [1,2,3]
        }, {
            name: "Jamnabai Narsee International School",
            gold: "20",
            silver: "18",
            bronze: "19",
            points: "30"
        },
        {
            name: "Jamnabai Narsee International School",
            gold: "20",
            silver: "18",
            bronze: "19",
            points: "30",
            ySlides : [1,2,3]
        }, {
            name: "Jamnabai Narsee International School",
            gold: "20",
            silver: "18",
            bronze: "19",
            points: "30",
            ySlides : [1,2,3]
        }, {
            name: "Jamnabai Narsee International School",
            gold: "20",
            silver: "18",
            bronze: "19",
            points: "30",
            ySlides : [1,2,3]
        }
    ];
    $scope.showTeam = false;
    $scope.showTeamClass = "";
    $scope.viewTeamSlider = function(){
      if($scope.showTeam == true){
        $scope.showTeam = false;
        $scope.showTeamClass = "";
        $scope.backdrop = {
          class: "",
          click: ""
        }
      }else{
        $scope.showTeam = true;
        $scope.showTeamClass = "viewteam-slidershow";
        $scope.backdrop = {
          class: "display-block",
          click: "viewTeamSlider()"
        }
        console.log($scope.showTeam,$scope.showTeamClass, "when false");
      }
    }

    $scope.customCards = [{
        img: '/img/bl-inner.jpg'
    }, {
        img: '/img/bl-inner.jpg'
    }, {
        img: '/img/bl-inner.jpg'
    }, {
        img: '/img/bl-inner.jpg'
    }, {
        img: '/img/bl-inner.jpg'
    }];

    $scope.summaryTable = [{
        year: '2017',
        match: '10',
        win: '10',
        loss: '10',
        draw: '10',
        wper: '10'

    }, {
        year: '2016',
        match: '10',
        win: '10',
        loss: '10',
        draw: '10',
        wper: '10'

    }, {
        year: '2015',
        match: '10',
        win: '10',
        loss: '10',
        draw: '10',
        wper: '10'

    }];

    // team-flex
    setTimeout(function () {
        $('.athletestatistics-summaryslider .flexslider').flexslider({
            animation: "slide",
            animationLoop: true,
            reverse: false,
            slideshow: true,
            slideshowSpeed: 4000,
            controlNav: false,
            directionNav: true,
            prevText: "",
            nextText: "",
            itemWidth: 370,
            itemMargin: 10
        });
    }, 100);
    // enflex
    $scope.selectedsportTable = [{
        round: 'Leauge match',
        schoolname: 'Jamnabai Narsee International School',
        score: '30-22',
        result: 'Won',
        videotext: 'match highlights'

    }, {
        round: 'Leauge match',
        schoolname: 'Jamnabai Narsee International School',
        score: '30-22',
        result: 'Won',
        videotext: 'You can also watch match highlights'

    }, {
        round: 'Leauge match',
        schoolname: 'Jamnabai Narsee International School',
        score: '30-22',
        result: 'Won',
        videotext: 'You can also watch match highlights'

    }, {
        round: 'Leauge match',
        schoolname: 'Jamnabai Narsee International School',
        score: '30-22',
        result: 'Won',
        videotext: 'You can also watch match highlights'

    }, {
        round: 'Leauge match',
        schoolname: 'Jamnabai Narsee International School',
        score: '30-22',
        result: 'Won',
        videotext: 'You can also watch match highlights'

    }, {
        round: 'Leauge match',
        schoolname: 'Jamnabai Narsee International School',
        score: '30-22',
        result: 'Won',
        videotext: 'You can also watch match highlights'

    }];

    $scope.gallery = ['img/oldSfa/banner1.jpg', 'img/oldSfa/banner2.jpg', 'img/oldSfa/cfjudo.jpg', 'img/oldSfa/cfcarrom.jpg', 'img/oldSfa/cfchess.jpg'];
})
