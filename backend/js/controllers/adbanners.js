// TABLE AD GALLERY
// TABLE GALLERY
myApp.controller('AdGalleryCtrl', function ($scope, TemplateService, NavigationService, $timeout, $stateParams, $state, toastr, $uibModal) {
  //Used to name the .html file
  $scope.template = TemplateService.changecontent("adbanner/gallery/tableadgallery");
  $scope.menutitle = NavigationService.makeactive("Ad Gallery");
  TemplateService.title = $scope.menutitle;
  $scope.navigation = NavigationService.getnav();

});
// TABLE AD GALLERY END

// DETAIL AD BANNER
myApp.controller('DetailAdGalleryCtrl', function ($scope, TemplateService, NavigationService, $timeout, $stateParams, $state, toastr, $uibModal) {
  //Used to name the .html file
  $scope.template = TemplateService.changecontent("adbanner/gallery/detailadgallery");
  $scope.menutitle = NavigationService.makeactive("DetailAdGallery");
  TemplateService.title = $scope.menutitle;
  $scope.navigation = NavigationService.getnav();

  $scope.formData = {};
  $scope.formData.pageType = 'gallery';
});
// DETAIL AD BANNER END

// TABLE VIDEO 
myApp.controller('AdVideoCtrl', function ($scope, TemplateService, NavigationService, $timeout, $stateParams, $state, toastr, $uibModal) {
  //Used to name the .html file
  $scope.template = TemplateService.changecontent("adbanner/video/tableadvideo");
  $scope.menutitle = NavigationService.makeactive("Ad Video");
  TemplateService.title = $scope.menutitle;
  $scope.navigation = NavigationService.getnav();

});
// TABLE VIDEO  END

// DETAIL VIDEO 
myApp.controller('DetailAdVideoCtrl', function ($scope, TemplateService, NavigationService, $timeout, $stateParams, $state, toastr, $uibModal) {
  //Used to name the .html file
  $scope.template = TemplateService.changecontent("adbanner/video/detailadvideo");
  $scope.menutitle = NavigationService.makeactive("Detail Ad Video");
  TemplateService.title = $scope.menutitle;
  $scope.navigation = NavigationService.getnav();
  $scope.formData = {};
  $scope.formData.pageType = 'video';


  $scope.saveData = function (data) {
    console.log(data, "inside save")
  }
})
// DETAIL VIDEO  END