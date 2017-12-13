myApp.service('MediaPopupService', function($http, $uibModal, TemplateService, $state, NavigationService, $timeout){
  // SERVICE START
  // VARIABLE INITIATIALISATION
  var modalInstance;
  var page = this;
  // VARIABLE INITIATIALISATION END
  // FUNCTIONS
  // NEXT SLIDE FUNCTION
  this.nextSlide = function(){
    console.log("Next Slide");
  }
  // NEXT SLIDE FUNCTION END
  // PREVIOUS SLIDE FUNCTION
  this.prevSlide = function(){
    console.log("Prevous Slide");
  }
  // PREVIOUS SLIDE FUNCTION END
  // OPEN POPUP
  this.openMediaPopup = function(pop){
    // console.log("openMediaPopup");

        modalInstance = $uibModal.open({
          animation: true,
          scope: pop,
          size: 'lg',
          templateUrl: 'views/modal/photovideo-popup.html',
          windowClass: 'photovideo-modal'
        }).closed.then(function(){
          console.log("chahc");
          page.onkeydown = function(e) {
            $(page).off(e);
          };
        })

        $timeout(function () {
          page.onkeydown = function(e) {
            switch (e.keyCode) {
              case 37:
              case 38:
                e.preventDefault();
                page.prevSlide();
              break;
              case 39:
              case 40:
                e.preventDefault();
                page.nextSlide();
              break;
            }
          };
        }, 200);
  }
  // OPEN POPUP END
  // FUNCTIONS END
  // SERVICE END
});
