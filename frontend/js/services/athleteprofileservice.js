var athleteprofile = angular.module('athleteprofile', [])

.factory('Athleteprofile', function ($http) {

    return {
      getVideo: function(callback) {
        $http({
          url: "../json/athleteprofile.json",
          method: "GET"
        }).then(function (response) {
          console.log(response);
          callback(response);
            // angular.fromJson(response);
            // console.log(JSON.sringify(response));
            // $scope.videoArray = response.data.videoArray;
          });
        // .success(function (data) {
        //     console.log(data);
        // });
      }
    }
  });
