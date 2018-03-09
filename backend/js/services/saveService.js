myApp.service('saveService', function ($http, TemplateService, $state, toastr, $uibModal, NavigationService, $timeout) {

  this.saveData = function (data, url, state) {
    // console.log(data, url, state, "iam in save");
    NavigationService.apiCall(url, data, function (data) {
      if (data.value) {
        toastr.success("Data Saved Successfully", "Success");
        $state.go(state);
      } else {
        toastr.error("Something went wrong", "Error");
      }
    })
  }

});