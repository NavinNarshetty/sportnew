myApp.directive('img', function ($compile, $parse) {
        return {
            restrict: 'E',
            replace: false,
            link: function ($scope, element, attrs) {
                var $element = $(element);
                if (!attrs.noloading) {
                    $element.after("<img src='img/loading.gif' class='loading' />");
                    var $loading = $element.next(".loading");
                    $element.load(function () {
                        $loading.remove();
                        $(this).addClass("doneLoading");
                    });
                } else {
                    $($element).addClass("doneLoading");
                }
                if(!attrs.alt || attrs.alt == ''){
                  $($element).attr("alt", "Sports For All Photos");
                  // console.log("attrs added");
                }
                // if(!attrs.title || attrs.title == ''){
                //   $($element).attr("title", "Sports For All");
                //   console.log("attrs added");
                // }
            }
        };
    })

    .directive('hideOnScroll', function ($document) {
        return {
            restrict: 'EA',
            replace: false,
            link: function (scope, element, attr) {
                var $element = $(element);
                var lastScrollTop = 0;
                $(window).scroll(function (event) {
                    var st = $(this).scrollTop();
                    if (st > lastScrollTop) {
                        $(element).addClass('nav-up');
                    } else {
                        $(element).removeClass('nav-up');
                    }
                    lastScrollTop = st;
                });
            }
        };
    })


    .directive('fancybox2', function ($compile, $parse) {
        return {
            restrict: 'EA',
            replace: false,
            link: function ($scope, element, attrs) {
                $element = $(element);
                console.log("Checking Fancybox");
                setTimeout(function () {
                    $(".various").fancybox({
                        maxWidth: 800,
                        maxHeight: 600,
                        fitToView: false,
                        overflow: 'hidden',
                        width: '80%',
                        height: '80%',
                        autoSize: false,
                        closeClick: false,
                        openEffect: 'none',
                        closeEffect: 'none'
                    });
                }, 100);
            }
        };
    })

    .directive('fancybox', function ($document) {
        return {
            restrict: 'EA',
            replace: false,
            link: function (scope, element, attr) {
                var $element = $(element);
                var target;
                if (attr.rel) {
                    target = $("[rel='" + attr.rel + "']");
                } else {
                    target = element;
                }

                target.fancybox({
                    openEffect: 'fade',
                    closeEffect: 'fade',
                    overflow: 'hidden',
                    closeBtn: true,
                    arrows : true,
                    keyboard : true,
                    protect : true,
                    helpers: {
                      media: {
                        youtube : {
                          autoplay : 1
                        }
                      }
                    },
                    buttons: [
                      // 'fullScreen',
                      //'download',
                      // 'thumbs',
                      'zoom',
                      // 'tag',
                      // 'share', //default share
                      // 'sharing', //custom share
                      'close',
                    ]
                });
            }
        };
    })

    .directive('autoHeight', function ($compile, $parse) {
        return {
            restrict: 'EA',
            replace: false,
            link: function ($scope, element, attrs) {
                var $element = $(element);
                var windowHeight = $(window).height();
                $element.css("min-height", windowHeight);
            }
        };
    })


    .directive('replace', function () {
        return {
            require: 'ngModel',
            scope: {
                regex: '@replace',
                with: '@with'
            },
            link: function (scope, element, attrs, model) {
                model.$parsers.push(function (val) {
                    if (!val) {
                        return;
                    }
                    var regex = new RegExp(scope.regex);
                    var replaced = val.replace(regex, scope.with);
                    if (replaced !== val) {
                        model.$setViewValue(replaced);
                        model.$render();
                    }
                    return replaced;
                });
            }
        };
    })
    // schoolprofile-card
    .directive('schoolProfileCard', function () {
        return {
            restrict: 'E',
            scope: {
                'school': '=school',
                'stats': '=stats',
                'contigent': '=contigent',
                'trophy': '=trophy'
            },
            templateUrl: 'views/directive/schoolprofile-card.html',
            link: function (scope) {
              scope.noMedal = false;
              scope.school.type='school';
              scope.noWinPercent = false;
              // console.log("school in card", scope.school);
              // CHECK FOR MEDALS
              if (scope.school.medal) {
                if(!scope.school.medal.gold || !scope.school.medal.silver || !scope.school.medal.bronze){
                  scope.noMedal = true;
                } else{
                  if (!scope.school.medal.gold) {
                    scope.school.medal.gold = {};
                    scope.school.medal.gold.count = 0;
                  }
                  if (!scope.school.medal.silver) {
                    scope.school.medal.silver = {};
                    scope.school.medal.silver.count = 0;
                  }
                  if (!scope.school.medal.bronze) {
                    scope.school.medal.bronze = {};
                    scope.school.medal.bronze.count = 0;
                  }
                }
              } else {
                scope.noMedal = true;
              }
              // CHECK FOR MEDALS END
              // CHECK FOR WIN PERCENT
              if (!scope.school.winPercent) {
                scope.noWinPercent = true;
              }
              // CHECK FOR WIN PERCENT END
            }
        }
    })
    // end schoolprofile-card
    // profileathlete-card
    .directive('profileAthleteCard', function () {
        return {
            restrict: 'E',
            scope: {},
            templateUrl: 'views/directive/profileathlete-card.html',
            link: function () {}
        }
    })
    // end profileathlete-card

    // team-card
    .directive('teamCard', function () {
        return {
            restrict: 'E',
            scope: {
                // item: "=value"
            },
            templateUrl: 'views/directive/team-card.html',
            link: function () {}
        }
    })
    // end team-card
    // medal-card
    .directive('medalCard', function () {
        return {
            restrict: 'E',
            scope: {},
            templateUrl: 'views/directive/medal-card.html',
            link: function () {}
        }
    })
    // end medal-card
    // sport-card
    .directive('sportCard', function () {
        return {
            restrict: 'E',
            scope: {},
            templateUrl: 'views/directive/sport-card.html',
            link: function () {}
        }
    })
    // end sport-card
    // video-card
    .directive('videoCard', function () {
        return {
            restrict: 'E',
            scope: {
                'description': '=description'
            },
            templateUrl: 'views/directive/video-card.html',
            link: function ($scope) {
                $('[data-fancybox]').fancybox({
                    youtube: {
                        showinfo: 0,
                        autoplay: 1,
                    },
                    vimeo: {
                        color: 'da495b',
                        autoplay: 1,
                        title: 0,
                        byline: 0,
                        portrait: 0
                    },
                    buttons: ['close']
                });
            }
        }
    })
    // end video-card
    .directive('teamSlider', function (profileAthleteCard) {
        return {
            restrict: 'E',
            scope: {},
            templateUrl: 'views/directive/team-slider.html',
            link: function () {}
        }
    })

    // SET HEIGHT OF TILE
    .directive('setHeight', function ($compile, $parse) {
        return {
            restrict: 'A',
            link: function ($scope, element, value) {
                if (value.setHeight == '') {
                    var multiple = 1;
                } else {
                    var multiple = value.setHeight;
                }
                var $element = $(element);
                var $width = $($element).width();
                var $width = $width * multiple;
                $($element).height($width);
            }
        }
    })
    // SET HEIGHT OF TILE END

    // UPLOAD IMAGE FILTER
    .directive('uploadImage', function ($http, $filter, $timeout) {
        return {
            templateUrl: 'views/directive/uploadFile.html',
            scope: {
                model: '=ngModel',
                type: "@type",
                ispdf: "@ispdf",
                callback: "&ngCallback"
            },
            link: function ($scope, element, attrs) {
                console.log($scope.model, attrs);
                $scope.showImage = function () {};
                $scope.check = true;
                if (!$scope.type) {
                    $scope.type = "image";
                }
                $scope.isMultiple = false;
                $scope.inObject = false;
                if (attrs.multiple || attrs.multiple === "") {
                    $scope.isMultiple = true;
                    $("#inputImage").attr("multiple", "ADD");
                }
                if (attrs.noView || attrs.noView === "") {
                    $scope.noShow = true;
                }
                // if (attrs.required) {
                //     $scope.required = true;
                // } else {
                //     $scope.required = false;
                // }

                $scope.$watch("image", function (newVal, oldVal) {
                    console.log(newVal, oldVal);
                    isArr = _.isArray(newVal);
                    if (!isArr && newVal && newVal.file) {
                        if ($scope.type === 'pdf' && $scope.ispdf == 'true') {
                            $scope.uploadStatus = '';
                            if (_.endsWith(newVal.file.name, ".pdf")) {
                                $scope.uploadNow(newVal);
                                console.log("pdf Successs");
                                $scope.incorrectFile = false;
                            } else {
                                console.log("Incorrect Filesssssss");
                                $scope.incorrectFile = true;
                            }
                        } else {

                            $scope.uploadNow(newVal);
                        }
                    } else if (isArr && newVal.length > 0 && newVal[0].file) {

                        $timeout(function () {
                            console.log(oldVal, newVal);
                            console.log(newVal.length);
                            _.each(newVal, function (newV, key) {
                                if (newV && newV.file) {
                                    $scope.uploadNow(newV);
                                }
                            });
                        }, 100);

                    }
                });

                if ($scope.model) {
                    if (_.isArray($scope.model)) {
                        $scope.image = [];
                        _.each($scope.model, function (n) {
                            $scope.image.push({
                                url: n
                            });
                        });
                    } else {
                        if (_.endsWith($scope.model, ".pdf")) {
                            $scope.type = "pdf";
                        }
                    }

                }
                if (attrs.inobj || attrs.inobj === "") {
                    $scope.inObject = true;
                }
                $scope.clearOld = function () {
                    $scope.model = [];
                };
                $scope.uploadNow = function (image) {
                    $scope.uploadStatus = "uploading";

                    var Template = this;
                    image.hide = true;
                    var formData = new FormData();
                    console.log(image, "upload");
                    console.log(image.file.name, "upload");
                    formData.append('file', image.file, image.file.name);
                    console.log(formData, "formdata");
                    $http.post(uploadurl, formData, {
                        headers: {
                            'Content-Type': undefined
                        },
                        transformRequest: angular.identity
                    }).then(function (data) {
                        console.log('data', data, $scope.model);
                        data = data.data;
                        $scope.uploadStatus = "uploaded";
                        if ($scope.isMultiple) {
                            if ($scope.inObject) {
                                $scope.model.push({
                                    "image": data.data[0]
                                });
                            } else {
                                if (!$scope.model) {
                                    $scope.clearOld();
                                }
                                $scope.model.push(data.data[0]);
                            }
                        } else {
                            if (_.endsWith(data.data[0], ".pdf")) {
                                $scope.type = "pdf";
                            } else {
                                $scope.type = "image";
                            }
                            $scope.model = data.data[0];
                            console.log($scope.model, 'model means blob')

                        }
                        $timeout(function () {
                            $scope.callback();
                        }, 100);

                    });
                };
            }
        };
    });
    // UPLOAD IMAGE FILTER END

;
