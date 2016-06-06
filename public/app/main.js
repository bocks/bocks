angular.module('app.main', [])

.controller('MainController', function($scope, $location, Snippets) {
  $scope.snippets = [];
  $scope.highlights = {};

  var editors = [];
  var Range = ace.require('ace/range').Range;

  $scope.goToSnippet = function (id) {
    $location.path('/snippet/' + id);
  };

  $scope.convertTime = function (mongoTime) {
    date = new Date(mongoTime);
    return (date.getMonth() + 1) + '.' + date.getDate() + '.' + date.getFullYear();
  };

  $scope.init = function() {
    Snippets.retrieveSnippets({})
      .then(function(snippets) {
        // set snippets data
        $scope.snippets = snippets.data;
      });
  }();

  $scope.$on('ngRepeatFinished', function(ngRepeatFinishedEvent) {
    $scope.snippets.forEach(function(snippet) {
      // setup ace editor
      editors[snippet._id] = ace.edit('editor-' + snippet._id);
      editors[snippet._id].setTheme('ace/theme/solarized_dark');
      editors[snippet._id].session.setMode('ace/mode/javascript');

      // stop the browser's warning message
      editors[snippet._id].$blockScrolling = Infinity;

      editors[snippet._id].setFontSize(16);

      // make editor read only
      editors[snippet._id].setReadOnly(true);

      // add code to editor
      editors[snippet._id].setValue(snippet.code);

      // setup highlights/annotations array
      $scope.highlights[snippet._id] = [];

      // add highlights to code
      snippet.highlights.forEach(function(highlight) {
        // set markers for highlighted code
        var range = new Range(highlight.start.row, highlight.start.column, highlight.end.row, highlight.end.column);
        editors[snippet._id].session.addMarker(range, "highlighter-" + highlight.color);

        // set annotations
        $scope.highlights[snippet._id].push(highlight);
      });
    });
  });
});
