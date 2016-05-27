angular.module('app', [
  'app.main',
  'app.services',
  'ngRoute'
]).config(function ($routeProvider) {
  $routeProvider
    .when('/main', {
      templateUrl: 'app/main.html',
      controller: 'MainController',
      // authenticate: false
    })
    .otherwise('/main');
});

console.log('app.js loaded');