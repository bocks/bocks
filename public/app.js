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
      // authenticate: false
    })
    .when('/snippet', {
      templateUrl: 'app/snippet.html',
      controller: 'SnippetController',
      // authenticate: true
    })
    .otherwise('/main');
})
.controller('NavController', function($scope, Auth) {
  console.log('hello from NavController');
  $scope.isLoggedIn = function() {
    console.log('calling isLoggedIn');
    Auth.isLoggedIn();
  };
});

console.log('app.js loaded');
