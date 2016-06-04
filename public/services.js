angular.module('app.services', [])
.factory('Auth', function($http, $route, $window) {

  var user = null;
  var username;

  var getUserStatus = function() {
    return $http({
      method: 'GET',
      url: '/user/status'
    }).success( function(data) {
      console.log('data', data);
      if (data !== 'false') {
        user = JSON.parse(data);
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

  var getUserName = function() {
    return user;
  };

  var logUserOut = function() {
    console.log('in logUserOut Service');
    $http({
      method: 'GET',
      url: '/user/logout'
    }).success( function() {
      console.log('in success callback');
      user = false;
    }).error( function(err) {
      console.log('error in logUserOut Service');
    });
  };

  var reloadPage = function($route) {
    console.log('running reload Page');
    console.log($window.location);
    $window.location.reload();
  };

  return {
    getUserStatus: getUserStatus,
    getUserName: getUserName,
    isLoggedIn: isLoggedIn,
    logUserOut: logUserOut,
    reloadPage: reloadPage
  };
})

.factory('Snippets', function($http) {
  var retrieveSnippet = function(id) {
    return $http({
      method: 'GET',
      url: '/snippets/' + id
    })
    .then(function(res) {
      console.log('Snippet Res', res);
      return res;
    })
  };

  var retrieveSnippets = function(offset, limit) {
    return $http({
      method: 'GET',
      url: '/snippets'
    })
    .then(function(res) {
      console.log('Snippets Res', res);
      return res;
    })
  };

  return {
    retrieveSnippet: retrieveSnippet,
    retrieveSnippets: retrieveSnippets
  };
});
