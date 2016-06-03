angular.module('app.view', [])
.controller('ViewController', function($scope, $http, $routeParams, Snippets) {
  $scope.displayEditor = false;

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
      console.log('Viewcontroller snippet', snippet);

      if (snippet !== false) {
        // set editor to display
        $scope.displayEditor = true;
        console.log('Viewcontroller snippet not false')

        // set snippet title
        $scope.title = snippet.data.title;

        // add code to editor
        editor.setValue(snippet.data.code);

        snippet.data.highlights.forEach(function(highlight) {
          // set markers for highlighted code
          var range = new Range(highlight.start.row, highlight.start.column, highlight.end.row, highlight.end.column);
          editor.session.addMarker(range, "highlighter-" + highlight.color);

          // add annotations
          var elem = document.getElementById('annotations');
          var note = document.createElement('div');
          note.innerText = highlight.text;
          note.classList.add('highlighted-' + highlight.color);
          note.classList.add('note');
          elem.appendChild(note);
        });
      }
    });
  }();
})
