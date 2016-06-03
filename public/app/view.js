angular.module('app.view', [])
.controller('ViewController', function($scope, $http, $routeParams, Snippets) {
  var editor = ace.edit("editor");
  editor.setTheme("ace/theme/solarized_dark");
  editor.session.setMode("ace/mode/javascript");

  // use Ace's Range instead of the window's
  var Range = ace.require('ace/range').Range;

  // stop the browser's warning message
  editor.$blockScrolling = Infinity;

  // make editor read only
  editor.setReadOnly(true);

  $scope.init = function() {
    console.log($routeParams);
    Snippets.retrieveSnippet($routeParams.id)
    .then(function(snippet) {
      console.log(snippet);

      // add code to editor
      editor.setValue(snippet.data.code);

      // set markers for highlighted code
      snippet.data.highlights.forEach(function(highlight) {
        var range = new Range(highlight.start.row, highlight.start.column, highlight.end.row, highlight.end.column);
        editor.session.addMarker(range, "highlighter-" + highlight.color);
      });
    });


  }();
})
