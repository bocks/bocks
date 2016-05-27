angular.module('app.services', [])
.factory('Auth', function($http) {
  
  var user = null;

  var getUserStatus = function() {
    console.log('in getUserStatus Service');
    return $http({
      method: 'GET',
      url: '/user/status'
    }).success( function(data) {
      console.log('data', data);
      if (data === 'true') {
        user = true;
      } else {
        user = false;
      }
    }).error(function(err) {
      console.log('error in getUserStatus', err);
      user = false;
    });
  };

  var isLoggedIn = function() {
    return user ? true : false;
  };

  return {
    getUserStatus: getUserStatus,
    isLoggedIn: isLoggedIn
  };
});
