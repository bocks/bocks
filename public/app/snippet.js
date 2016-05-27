angular.module('app.snippet', []

).controller('SnippetController', function($scope) {
  $scope.init = function() {
    console.log('hello from SnippetController');
  }();
  
  $scope.hello = 'Hello from snippet.js!';
});

console.log('snippet.js loaded');
