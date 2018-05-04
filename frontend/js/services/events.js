myApp.service('eventService', function ($http, TemplateService, $state, toastr, $uibModal, NavigationService) {


  this.eventSearch = function (yearData, callback) {
    console.log(yearData, "in event service")
    var url = "Event/search";
    var parameters = {};
    parameters.page = 1;
    parameters.type = '';
    parameters.keyword = '';
    parameters.filter = {};
    parameters.filter.city = 'Mumbai';
    parameters.filter.year = yearData - 1;
    console.log(parameters, "params");
    NavigationService.getDataApiCall(parameters, url, function (data) {
      // console.log(data, "event data in frontend");
      eventData = data.data.data.results[0];
      callback(eventData);

      // return eventData;
    });
  }
});