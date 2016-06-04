angular.module('app.main', [])

.controller('MainController', function($scope, Snippets) {

  // $scope.snippets = [
  //   'some collection  of snippets',
  //   'preexisting in database',
  //   'searchable/filterable',
  //   'paginated probably'
  // ];

  $scope.snippets = [];
  var editors = [];

  $scope.init = function() {
    Snippets.retrieveSnippets()
      .then(function(snippets) {
        $scope.snippets = snippets.data;
      });
  }();

  $scope.$watch('snippets', function(snippets) {
    if (snippets.length === 0) { return; }

    console.log('watch');
    console.log(snippets);

    snippets.forEach(function(snippet) {
      editors[snippet._id] = ace.edit('editor-' + snippet._id);
      editors[snippet._id].setTheme('ace/theme/solarized_dark');
      editors[snippet._id].session.setMode('ace/mode/javascript');
    });
  });

  $scope.renderEditor = function(id) {
    console.log('renderEditor', id);
    editors[id] = ace.edit('editor-' + id);
    editors[id].setTheme('ace/theme/solarized_dark');
    editors[id].session.setMode('ace/mode/javascript');
  };

});
