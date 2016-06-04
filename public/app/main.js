angular.module('app.main', []

).controller('MainController', function($scope, Snippets) {

  $scope.snippets = [
    'some collection  of snippets',
    'preexisting in database',
    'searchable/filterable',
    'paginated probably'
  ];

});
