myApp.service('MediaPopupService', function($http, $uibModal, TemplateService, $state, NavigationService, $timeout){
  // SERVICE START
  // VARIABLE INITIATIALISATION
  var modalInstance;
  var firstSlide = false;
  var lastSlide = false;
  var page = this;
  var currentIndex, sliderArr;
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
  this.checkSlide = function(index, sliderArr){
    console.log(sliderArr);
    if (index == 0) {
      firstSlide = true;
    }
    if(index == sliderArr.length-1){
      lastSlide = true;
    }
    console.log("First", firstSlide);
    console.log("Last", lastSlide);
  }
  // OPEN POPUP
  this.openMediaPopup = function(index, slideArr, pageScope){
    // console.log("openMediaPopup");

        modalInstance = $uibModal.open({
          animation: true,
          scope: pageScope,
          size: 'lg',
          templateUrl: 'views/modal/photovideo-popup.html',
          windowClass: 'photovideo-modal'
        }).closed.then(function(){
          console.log("chahc");
          page.onkeydown = function(e) {
            $(page).off(e);
          };
        })


        console.log(index, slideArr);
        currentIndex = index;
        sliderArr = slideArr;
        page.checkSlide(currentIndex, sliderArr);

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
