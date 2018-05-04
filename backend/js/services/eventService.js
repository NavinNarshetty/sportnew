myApp.service('eventService', function ($http, TemplateService, $state, toastr, $uibModal, NavigationService) {


  this.eventSearch = function (cityData, yearData, callback) {
    console.log(yearData, "in event service")
    var url = "Event/search";
    var parameters = {};
    parameters.page = 1;
    parameters.type = '';
    parameters.keyword = '';
    parameters.filter = {};
    parameters.filter.city = cityData;
    parameters.filter.year = yearData - 1;
    console.log(parameters, "params");
    NavigationService.apiCall(url, parameters, function (data) {
      console.log(data, "event data in frontend");
      eventData = data.data.results[0];
      callback(eventData);

      // return eventData;
    });
  }
});