angular.module('app.main', []

).controller('MainController', function($scope, Snippets) {

  // $scope.snippets = [
  //   'some collection  of snippets',
  //   'preexisting in database',
  //   'searchable/filterable',
  //   'paginated probably'
  // ];

  $scope.snippets = [];

  $scope.init = function() {
    Snippets.retrieveSnippets()
      .then(function(snippets) {
        console.log('MainController snippets', snippets);

        // set up snippets
        $scope.snippets = snippets.data;

        // set up editor to display each snippet
        var editors = [];

        snippets.data.forEach(function(snippet) {
          editors[snippet._id] = ace.edit('editor-' + snippet._id);
          editors[snippet._id].setTheme('ace/theme/solarized_dark');
          editors[snippet._id].session.setMode('ace/mode/javascript');

        });

      })
  }();

});
