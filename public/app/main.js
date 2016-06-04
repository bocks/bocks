angular.module('app.main', [])

.controller('MainController', function($scope, Snippets) {

  // $scope.snippets = [
  //   'some collection  of snippets',
  //   'preexisting in database',
  //   'searchable/filterable',
  //   'paginated probably'
  // ];

  $scope.snippets = [];
  $scope.highligts = [];

  var editors = [];
  var Range = ace.require('ace/range').Range;

  $scope.init = function() {
    Snippets.retrieveSnippets()
      .then(function(snippets) {
        // set snippets data
        $scope.snippets = snippets.data;

        // set annotations/highlights
        $scope.highlights[snippets.data._id] = snippets.data.highlights;
      });
  }();

  // $scope.$watch('snippets', function(snippets) {
  //   if (snippets.length === 0) { return; }

  //   console.log('watch');
  //   console.log(snippets);

  //   snippets.forEach(function(snippet) {
  //     editors[snippet._id] = ace.edit('editor-' + snippet._id);
  //     editors[snippet._id].setTheme('ace/theme/solarized_dark');
  //     editors[snippet._id].session.setMode('ace/mode/javascript');
  //   });
  // });

  $scope.$on('ngRepeatFinished', function(ngRepeatFinishedEvent) {
    $scope.snippets.forEach(function(snippet) {
      // setup ace editor
      editors[snippet._id] = ace.edit('editor-' + snippet._id);
      editors[snippet._id].setTheme('ace/theme/solarized_dark');
      editors[snippet._id].session.setMode('ace/mode/javascript');

      // stop the browser's warning message
      editors[snippet._id].$blockScrolling = Infinity;

      // make editor read only
      editors[snippet._id].setReadOnly(true);

      // add code to editor
      editors[snippet._id].setValue(snippet.code);

      // add highlights to code
      snippet.highlights.forEach(function(highlight) {
        // set markers for highlighted code
        var range = new Range(highlight.start.row, highlight.start.column, highlight.end.row, highlight.end.column);
        editors[snippet._id].session.addMarker(range, "highlighter-" + highlight.color);
      });
    });
  });

  // $scope.renderEditor = function(id) {
  //   console.log('renderEditor', id);
  //   editors[id] = ace.edit('editor-' + id);
  //   editors[id].setTheme('ace/theme/solarized_dark');
  //   editors[id].session.setMode('ace/mode/javascript');
  // };

})
