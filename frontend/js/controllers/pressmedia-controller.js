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
  };

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
      console.log("$scope.filter", $scope.filter);
      if (data.data.data.result.length > 0 && $scope.pressReleaseData.length <= data.data.data.total) {
        _.each(data.data.data.result, function (value) {
          console.log("value", value);
          value._id.monthyear = value._id.month + ' ' + value._id.year;
          $scope.pressReleaseData.push(value);
          $scope.busy = false;

        });

      }
      if ($scope.filter.page == 1 && data.data.data.result.length == 0) {
        $scope.showMessage = true;
      } else {
        $scope.showMessage = false;
      }
    });
  };


  $scope.myPagingFunction = function () {
    $scope.busy = false;
    // ++$scope.filter.page;
    $scope.pressRelease();
  };
  // FUNCTIONS END

  // PRESS RELEASE
  $scope.yearData = ' ';
  $scope.cityName = ' ';
  $scope.yearFilter = function (data, type) {
    $scope.busy = false;
    $scope.filter.page = 0;
    $scope.pressReleaseData = [];
    if (type == 'Year') {
      $scope.yearData = data;
    }
    if (type == 'City') {
      $scope.cityName = data;
    }

    if (!$scope.yearData && $scope.yearData == '' && $scope.cityName && $scope.cityName != '') {
      $scope.filter.year = '';
      $scope.filter.city = $scope.cityName;
    } else if ($scope.yearData && $scope.yearData != '' && !$scope.cityName && $scope.cityName == '') {
      $scope.filter.year = $scope.yearData;
      $scope.filter.city = '';
    } else if ($scope.yearData && $scope.yearData != '' && $scope.cityName && $scope.cityName != '') {
      $scope.filter.year = $scope.yearData;
      $scope.filter.city = $scope.cityName;

    }
    $scope.pressRelease();
  };
  // PRESS RELEASE END

  // PRESS NEWS START
  $scope.filterInPressNews = {};
  $scope.pressNewsData = [];
  $scope.filterInPressNews.page = 0;
  $scope.scroll = {};
  $scope.scroll.busy = false;

  $scope.getPressnews = function () {
    $scope.url = 'Pressnews/getPressNews';
    ++$scope.filterInPressNews.page;
    if ($scope.scroll.busy) return;
    $scope.scroll.busy = true;
    console.log("$scope.filterInPressNews", $scope.filterInPressNews);
    NavigationService.getDataApiCall($scope.filterInPressNews, $scope.url, function (data) {
      if (data.data.value) {
        console.log("data of PressNews", data.data);
        if (data.data.data.result.length > 0 && $scope.pressNewsData.length <= data.data.data.total) {
          _.each(data.data.data.result, function (obj) {
            $scope.pressNewsData.push(obj);
            $scope.scroll.busy = false;
          });
        }
        if ($scope.filterInPressNews.page == 1 && data.data.data.result.length == 0) {
          $scope.noPressNews = true;
        } else {
          $scope.noPressNews = false;
        }
      }
    });

  };

  //FILTER PRESSNEWS DATA CITY OR YEAR WISE

  $scope.newsYear = ' ';
  $scope.newsCity = ' ';
  $scope.yearNews = '';
  $scope.cityNews = '';
  $scope.filterPressnews = function (data, type) {

    // console.log("i am in", data, type);
    $scope.scroll.busy = false;
    $scope.filterInPressNews.page = 0;
    $scope.pressNewsData = [];
    if (type == 'Year') {
      $scope.yearNews = data;
    }
    if (type == 'City') {
      $scope.cityNews = data;
    }

    if (!$scope.yearNews && $scope.yearNews == '' && $scope.cityNews && $scope.cityNews != '') {
      $scope.filterInPressNews.year = '';
      $scope.filterInPressNews.city = $scope.cityNews;
    } else if ($scope.yearNews && $scope.yearNews != '' && !$scope.cityNews && $scope.cityNews == '') {
      $scope.filterInPressNews.year = $scope.yearNews;
      $scope.filterInPressNews.city = '';
    } else if ($scope.yearNews && $scope.yearNews != '' && $scope.cityNews && $scope.cityNews != '') {
      $scope.filterInPressNews.year = $scope.yearNews;
      $scope.filterInPressNews.city = $scope.cityNews;

    }

    $scope.getPressnews();


  };
  // PRESS NEWS END


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
      $scope.getPressnews();
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
        console.log("im in case 0");
        url = "inthenews";
        $scope.pressmedia.active = "inthenews";
        $scope.getPressnews();
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