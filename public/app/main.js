angular.module('app.main', []

).controller('MainController', function($scope) {
  
  $scope.init = function() {
    console.log('hello from MainController');
  }();

  $scope.snippets = [
    'some collection  of snippets',
    'preexisting in database',
    'searchable/filterable',
    'paginated probably'
  ];
 
});
