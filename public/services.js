angular.module('app.services', [])
.factory('Auth', function($http) {
  var isLoggedIn = function() {
    console.log('in Auth Service');
    return $http({
      method: 'GET',
      url: '/test'
      // url: '/auth/github'
    }).then( function(response) {
      console.log('response', response.data, response.session);
    });
  };

  return {
    isLoggedIn: isLoggedIn
  };
});
