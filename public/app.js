angular.module('app', [
  'app.main',
  'app.snippet',
  'app.services',
  'ngRoute'
]).config(function ($routeProvider) {
  $routeProvider
    .when('/main', {
      templateUrl: 'app/main.html',
      controller: 'MainController',
      authenticate: false
    })
    .when('/snippet', {
      templateUrl: 'app/snippet.html',
      controller: 'SnippetController',
      authenticate: true
    })
    .otherwise('/main');
})
.controller('NavController', function($scope, Auth) {
  console.log('hello from NavController');
  $scope.isLoggedIn = function() {
    console.log('calling isLoggedIn');
    Auth.isLoggedIn();
  };
})
.run(function($rootScope, $location, $route, Auth) {
  $rootScope.$on('$routeChangeStart', 
    function(event, next, current) {
      Auth.getUserStatus()
      .then(function() {
        if (next.$$route && next.$$route.authenticate && !Auth.isLoggedIn()) {
          $location.path('/');
        }
      });
    });
});

console.log('app.js loaded');
