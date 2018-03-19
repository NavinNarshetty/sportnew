myApp.controller('PressMediaCtrl', function ($scope, TemplateService, NavigationService, $timeout, toastr, $http, $state, $stateParams) {
  $scope.template = TemplateService.getHTML("content/pressmedia.html");
  TemplateService.title = "Press & Media"; //This is the Title of the Website
  $scope.navigation = NavigationService.getNavigation();
  $scope.filter = {}
  $scope.filter.page = 0;

  // INITIALISE VARIABLES
  // INITIALISE VARIABLES END


  $scope.newsData = [{
    mediaTitle: 'Andhra Jyothi',
    newsDate: '2018-03-08T18:30:00.000+0000',
    year: '2017',
    city: 'All',
    mediaType: 'press-photo',
    mediaLink: '/img/sa2.jpg'
  }, {
    mediaTitle: 'Andhra Jyothi',
    newsDate: '2018-03-08T18:30:00.000+0000',
    year: '2017',
    city: 'All',
    mediaType: 'press-photo',
    mediaLink: '/img/sa2.jpg'
  }, {
    mediaTitle: 'Andhra Jyothi',
    newsDate: '2018-03-08T18:30:00.000+0000',
    year: '2017',
    city: 'All',
    mediaType: 'press-photo',
    mediaLink: '/img/sa2.jpg'
  }, {
    mediaTitle: 'Andhra Jyothi',
    newsDate: '2018-03-08T18:30:00.000+0000',
    year: '2017',
    city: 'All',
    mediaType: 'press-photo',
    mediaLink: '/img/sa2.jpg'
  }, {
    mediaTitle: 'Andhra Jyothi',
    newsDate: '2018-03-08T18:30:00.000+0000',
    year: '2017',
    city: 'All',
    mediaType: 'press-photo',
    mediaLink: '/img/sa2.jpg'
  }, {
    mediaTitle: 'Andhra Jyothi',
    newsDate: '2018-03-08T18:30:00.000+0000',
    year: '2017',
    city: 'All',
    mediaType: 'press-photo',
    mediaLink: '/img/sa2.jpg'
  }, {
    mediaTitle: 'Andhra Jyothi',
    newsDate: '2018-03-08T18:30:00.000+0000',
    year: '2017',
    city: 'All',
    mediaType: 'press-photo',
    mediaLink: '/img/sa2.jpg'
  }, {
    mediaTitle: 'Andhra Jyothi',
    newsDate: '2018-03-08T18:30:00.000+0000',
    year: '2017',
    city: 'All',
    mediaType: 'press-photo',
    mediaLink: '/img/sa2.jpg'
  }]

  // FUNCTIONS
  $scope.getMediaContact = function () {
    $scope.url = 'Mediacontact/search';
    NavigationService.apiCallWithoutParams($scope.url, function (data) {
      console.log("data of contact", data);
      $scope.mediaData = data.data.data.results;
    });
  }
  $scope.pressReleaseData = [];
  $scope.busy = false;
  $scope.pressRelease = function () {
    if ($scope.busy) return;
    $scope.busy = true;
    $scope.url = 'Pressrelease/getPressMediaRelease';
    ++$scope.filter.page;
    NavigationService.getDataApiCall($scope.filter, $scope.url, function (data) {
      console.log("data of contact", data);
      console.log("length", $scope.pressReleaseData.length);

      if ($scope.pressReleaseData.length <= data.data.data.total) {
        _.each(data.data.data.result, function (value) {
          $scope.pressReleaseData.push(value);
          $scope.busy = false;

        })

      }

    });
  }


  $scope.myPagingFunction = function () {
    $scope.busy = false
    // ++$scope.filter.page;
    $scope.pressRelease();
  }
  // FUNCTIONS END

  // PRESS RELEASE
  $scope.yearFilter = function (data) {
    console.log(data, "ng-change");
    $scope.busy = false;
    $scope.filter.year = data;
    $scope.filter.city = '';
    $scope.filter.page = 0;
    $scope.pressReleaseData = [];
    $scope.pressRelease();
  }
  // PRESS RELEASE END

  // MAIN PAGE
  // PAGE NAVIGATION
  var allPressMedia = ["frontend/views/content/pressmedia/inthenews.html", "frontend/views/content/pressmedia/pressreleases.html", "frontend/views/content/pressmedia/mediacontact.html"];

  $scope.pressmedia = {
    innerView: allPressMedia[0],
    active: "inthenews"
  };
  $scope.viewTab = 1;
  // DIRECT LINK
  switch ($state.params.name) {
    case "inthenews":
      $scope.pressmedia = {
        innerView: allPressMedia[0],
        active: "inthenews"
      };
      break;
    case "pressreleases":
      $scope.pressmedia = {
        innerView: allPressMedia[1],
        active: "pressreleases"
      };
      $scope.pressRelease();

      break;
    case "mediacontact":
      $scope.pressmedia = {
        innerView: allPressMedia[2],
        active: "mediacontact"
      };
      $scope.getMediaContact();
      break;
    default:
      $scope.pressmedia = {
        innerView: allPressMedia[0],
        active: "inthenews"
      };
      break;
  }
  // DIRECT LINK END
  // ON CLICK
  $scope.getTab = function (view) {
    $scope.pressmedia.innerView = allPressMedia[view];
    var url = "inthenews";
    switch (view) {
      case 0:
        url = "inthenews";
        $scope.pressmedia.active = "inthenews";
        break;
      case 1:
        url = "pressreleases";
        $scope.pressmedia.active = "pressreleases";
        $scope.pressRelease();
        break;
      case 2:
        url = "mediacontact";
        $scope.pressmedia.active = "mediacontact";
        $scope.getMediaContact();
        break;
      default:
        url = "inthenews";
        $scope.pressmedia.active = "inthenews";
        break;
    }
    $state.go("pressmedia", {
      name: url
    }, {
      notify: false
    })
  }
  // ON CLICK END
  // PAGE NAVIGATION END
  // MAIN PAGE END

})