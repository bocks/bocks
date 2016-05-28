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

  // upon index.html reload, decide which nav links to render
  $scope.init = function() {
    Auth.getUserStatus()
    .then( function() {
      $scope.display = Auth.isLoggedIn(); 
    });  
  }();
  
  // reset our nav links upon logout
  $scope.logUserOut = function() {
    Auth.logUserOut();
    Auth.reloadPage();
  };
})
.run(function($location, $route, $rootScope, Auth) {
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
