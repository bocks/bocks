angular.module('app.main', []

).controller('MainController', function($scope) {

  $scope.snippets = [
    'some collection  of snippets',
    'preexisting in database',
    'searchable/filterable',
    'paginated probably'
  ];
 
});
