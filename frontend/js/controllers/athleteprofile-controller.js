myApp.controller('AthleteProfileCtrl', function ($scope, $state, $stateParams, TemplateService, NavigationService, $timeout, toastr, $http, Athleteprofile) {
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
    // *********************************************************
    // *********************************************************
    // HIGHLIGHTS PAGE
    // VARIABLES
    // VARIABLES END
    // FUNCTIONS
    // FUNCTIONS END
    // API CALLS
    // API CALLS END
    // HIGHLIGHTS PAGE END
    // *********************************************************
    // *********************************************************
    // STATISTICS PAGE
    // FUNCTIONS
    // FUNCTIONS END
    // API CALLS
    // API CALLS END
    // STATISTICS PAGE END
    // *********************************************************
    // *********************************************************
    // ACHIEVEMENTS PAGE
    // FUNCTIONS
    // FUNCTIONS END
    // API CALLS
    // API CALLS END
    // ACHIEVEMENTS PAGE END
    // *********************************************************
    // *********************************************************
    // VIDEOS PAGE
    // FUNCTIONS
    // FUNCTIONS END
    // API CALLS
    // API CALLS END
    // VIDEOS PAGE END
    // *********************************************************
    // *********************************************************
    // COMMON SECTION
    // VARIABLES
    // ARRAY OF SPORT NAMES
    $scope.sporticon = ['Handball','Basketball','Volleyball','Throwball',
    'Hockey','Kabaddi','Football','Badminton','Badminton Doubles', 'Tennis','Tennis Doubles','Tennis Mixed Doubles','Table Tennis','Table Tennis Doubles','Squash','Judo','Taekwondo','Boxing','Fencing','Karate','Karate Team Kumite','Sport MMA','Shooting','Shooting Air Rifle Peep Team','Shooting Air Rifle Open Team','Shooting Air Rifle Peep Team', 'Archery', 'Swimming', 'Swimming 4x50m Freestyle Relay', 'Swimming 4x50m Medley Relay', 'Water Polo', 'Carrom','Chess','Athletics','Athletics 4x100m Relay','Athletics 4x50m Relay','Athletics Medley Relay','Kho Kho'];
    // ARRAY OF SPORT NAMES END
    // VARIABLES END
    // FUNCTIONS
    // SWIPER INITIALSE
    $scope.initSwiper = function(){
      $timeout(function () {
        // ATHLETES YOU MAY KNOW SWIPER
          var athleteKnow = new Swiper('.athletehighight-knowflexslider .swiper-container', {
              // pagination: '.swiper-pagination',
              slidesPerView: 3,
              paginationClickable: true,
              loop: true,
              autoplay: 2000,
              grabCursor: true,
              spaceBetween: 10,
              nextButton: '.athleteknow-next',
              prevButton: '.athleteknow-prev',
              touchEventsTarget: 'container',
              breakpoints: {
                  992: {
                      slidesPerView: 3
                  },
                  768: {
                      slidesPerView: 2

                  },
                  481: {
                      slidesPerView: 1
                  },
                  320: {
                      slidesPerView: 1
                  }
              }
          })
          // ATHLETES YOU MAY KNOW SWIPER END
          // TOP PERFORMING ATHLETES SWIPER
          var athleteTop = new Swiper('.athletehighight-topflexslider .swiper-container', {
              // pagination: '.swiper-pagination',
              slidesPerView: 3,
              paginationClickable: true,
              loop: true,
              autoplay: 2500,
              grabCursor: true,
              spaceBetween: 10,
              nextButton: '.athletetop-next',
              prevButton: '.athletetop-prev',
              touchEventsTarget: 'container',
              breakpoints: {
                  992: {
                      slidesPerView: 3
                  },
                  768: {
                      slidesPerView: 2

                  },
                  481: {
                      slidesPerView: 1
                  },
                  320: {
                      slidesPerView: 1
                  }
              }
          })
          // TOP PERFORMING ATHLETES SWIPER END
          // YEAR STATISTICS SWIPER
          var yearStats = new Swiper('.athletestatistics-summaryslider .swiper-container', {
              // pagination: '.swiper-pagination',
              slidesPerView: 3,
              paginationClickable: true,
              loop: true,
              autoplay: 2500,
              grabCursor: true,
              spaceBetween: 10,
              nextButton: '.yeatstats-next',
              prevButton: '.yearstats-prev',
              touchEventsTarget: 'container',
              breakpoints: {
                  992: {
                      slidesPerView: 3
                  },
                  768: {
                      slidesPerView: 2

                  },
                  481: {
                      slidesPerView: 1
                  },
                  320: {
                      slidesPerView: 1
                  }
              }
          })
          // YEAR STATISTICS SWIPER END
      }, 100);
    }
    $scope.swiperInitialise = function(type){
      if(type == 0){
        $scope.$on('$viewContentLoaded', function (event) {
          console.log("000");
          $scope.initSwiper();
        })
      } else{
        $scope.initSwiper();
        console.log("111");
      }
    }
    $scope.swiperInitialise(0);
    // SWIPER INITIALSE END
    // SELECT PAGE FUNCTION
    var allAthleteProfile = [ "frontend/views/content/athleteprofile/highlights.html", "frontend/views/content/athleteprofile/statistics.html", "frontend/views/content/athleteprofile/achievements.html", "frontend/views/content/athleteprofile/videos.html", "frontend/views/content/athleteprofile/gallery.html"];
    $scope.athleteprofile = {
      innerView: allAthleteProfile[0],
      active : "highlights"
    };
    $scope.viewTab = 1;
    // DIRECT LINK
    switch($state.params.name){
      case "highlights":
        $scope.athleteprofile.innerView = allAthleteProfile[0];
        $scope.athleteprofile.active = "highlights";
        $scope.swiperInitialise(0);
      break;
      case "statistics":
        $scope.athleteprofile.innerView = allAthleteProfile[1];
        $scope.athleteprofile.active = "statistics";
        $scope.swiperInitialise(0);
      break;
      case "achievements":
        $scope.athleteprofile.innerView = allAthleteProfile[2];
        $scope.athleteprofile.active = "achievements";
      break;
      case "videos":
      $scope.getVideo();
        $scope.athleteprofile.innerView = allAthleteProfile[3];
        $scope.athleteprofile.active = "videos";
      break;
      case "gallery":
        $scope.athleteprofile.innerView = allAthleteProfile[4];
        $scope.athleteprofile.active = "gallery";
      break;
      default:
        $scope.athleteprofile.innerView = allAthleteProfile[0];
        $scope.athleteprofile.active = "highlights";
      break;
    }
    // DIRECT LINK END

    // ON CLICK
    $scope.getTab = function(view){
      $scope.athleteprofile.innerView = allAthleteProfile[view];
      var url = "highlights";
      $scope.swiperInitialise(1);
      switch (view) {
        case 0:
          url = "highlights";
          $scope.athleteprofile.active = "highlights";
          // $scope.initSwiper();
        break;
        case 1 :
          url = "statistics";
          $scope.athleteprofile.active = "statistics";
          // $scope.initSwiper();
        break;
        case 2:
          url = "achievements";
          $scope.athleteprofile.active = "achievements";
        break;
        case 3:
          url = "videos";
          $scope.getVideo();
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
    // SELECT PAGE FUNCTION END
    // FUNCTIONS END
    // API CALLS
    // API CALLS END
    // COMMON SECTION END

    // API CALLS
    $scope.getVideo = function(){
        Athleteprofile.getVideo(function(data){
          $scope.videoArray = data.data.videoArray;
          console.log($scope.videoArray, 'array');
        });
    }
    // API CALLS END

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

    // YEAR WISE SUMMARY SLIDER
    $scope.sumSportsTable = [{
        name: 'archery',
        played: '123',
        won: '456',
        lost: '789',
        draw: '012',
        strength: '300',
        male: '30',
        female: '70'
    }, {
        name: 'basketball',
        played: '123',
        won: '456',
        lost: '789',
        draw: '012',
        strength: '400',
        male: '70',
        female: '30'
    }, {
        name: 'fencing',
        played: '123',
        won: '456',
        lost: '789',
        draw: '012',
        strength: '500',
        male: '60',
        female: '40'
    }, {
        name: 'carrom',
        played: '123',
        won: '456',
        lost: '789',
        draw: '012',
        strength: '600',
        male: '20',
        female: '80'
    }, {
        name: 'karate',
        played: '123',
        won: '456',
        lost: '789',
        draw: '012',
        strength: '700',
        male: '50',
        female: '50'
    }, {
        name: 'shooting',
        played: '123',
        won: '456',
        lost: '789',
        draw: '012',
        strength: '800',
        male: '40',
        female: '60'
    }];
    // YEAR WISE SUMMARY SLIDER END

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

})//END OF CONTROLLER
