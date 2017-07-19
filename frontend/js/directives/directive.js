myApp.directive('img', function($compile, $parse) {
    return {
        restrict: 'E',
        replace: false,
        link: function($scope, element, attrs) {
            var $element = $(element);
            if (!attrs.noloading) {
                $element.after("<img src='img/loading.gif' class='loading' />");
                var $loading = $element.next(".loading");
                $element.load(function() {
                    $loading.remove();
                    $(this).addClass("doneLoading");
                });
            } else {
                $($element).addClass("doneLoading");
            }
        }
    };
})

.directive('hideOnScroll', function($document) {
    return {
        restrict: 'EA',
        replace: false,
        link: function(scope, element, attr) {
            var $element = $(element);
            var lastScrollTop = 0;
            $(window).scroll(function(event) {
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


.directive('fancybox', function($compile, $parse) {
    return {
        restrict: 'EA',
        replace: false,
        link: function($scope, element, attrs) {
            $element = $(element);
            console.log("Checking Fancybox");
            setTimeout(function() {
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

.directive('fancyboxBox', function($document) {
    return {
        restrict: 'EA',
        replace: false,
        link: function(scope, element, attr) {
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
                helpers: {
                    media: {}
                }
            });
        }
    };
})

.directive('autoHeight', function($compile, $parse) {
    return {
        restrict: 'EA',
        replace: false,
        link: function($scope, element, attrs) {
            var $element = $(element);
            var windowHeight = $(window).height();
            $element.css("min-height", windowHeight);
        }
    };
})


.directive('replace', function() {
        return {
            require: 'ngModel',
            scope: {
                regex: '@replace',
                with: '@with'
            },
            link: function(scope, element, attrs, model) {
                model.$parsers.push(function(val) {
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
    .directive('schoolProfileCard', function() {
        return {
            restrict: 'E',
            scope: {},
            templateUrl: 'views/directive/schoolprofile-card.html',
            link: function() {}
        }
    })
    // end schoolprofile-card
    // profileathlete-card
    .directive('profileAthleteCard', function() {
        return {
            restrict: 'E',
            scope: {},
            templateUrl: 'views/directive/profileathlete-card.html',
            link: function() {}
        }
    })
    // end profileathlete-card

// team-card
.directive('teamCard', function() {
        return {
            restrict: 'E',
            scope: {
                // item: "=value"
            },
            templateUrl: 'views/directive/team-card.html',
            link: function() {}
        }
    })
    // end team-card
    // medal-card
    .directive('medalCard', function() {
        return {
            restrict: 'E',
            scope: {},
            templateUrl: 'views/directive/medal-card.html',
            link: function() {}
        }
    })
    // end medal-card
    // sport-card
    .directive('sportCard', function() {
        return {
            restrict: 'E',
            scope: {},
            templateUrl: 'views/directive/sport-card.html',
            link: function() {}
        }
    })
    // end sport-card
    // video-card
    .directive('videoCard', function() {
      return {
        restrict: 'E',
        scope: {
          'description': '=description'
        },
        templateUrl: 'views/directive/video-card.html',
        link: function($scope) {
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
              portrait:0
            }
          });
        }
      }
    })
    // end video-card
    .directive('teamSlider', function(profileAthleteCard) {
        return {
            restrict: 'E',
            scope: {},
            templateUrl: 'views/directive/team-slider.html',
            link: function() {}
        }
    })

;
