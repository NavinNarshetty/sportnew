myApp.service('deleteService', function ($http, TemplateService, $state, toastr, $uibModal, NavigationService, $timeout) {

  // VARIABLES
  // var urlType;
  this.data;
  this.url;
  // VARIABLES
  console.log(this, "global variable");

  // OPEN MODAL FUNCTION
  this.confirmDelete = function (data, urlType, varScope) {
    this.data = data;
    this.url = urlType;
    console.log(data, urlType, "i am in service");
    modalInstance = $uibModal.open({
      animation: true,
      scope: varScope,
      backdrop: 'static',
      keyboard: false,
      templateUrl: 'views/modal/conf-delete.html',
      size: 'sm',
      windowClass: ''
    })
  }

  // CLICK YES ON MODAL
  this.confirmYes = function () {
    var constraints = {};
    constraints._id = this.data;
    console.log(constraints, "check this again");
    console.log(this.url, this.data, "check this");
    NavigationService.apiCall(this.url, constraints, function (data) {
      // if (data.value) {
      //   toastr.success("Successfully Deleted", 'Success');
      //   modalInstance.close();
      // } else {
      //   toastr.error("Something Went Wrong", 'Deleted');
      // }
    })
  }


  // CLICK NO ON MODAL
  this.confirmNo = function () {
    console.log("no click")
    modalInstance.close();
  }



});