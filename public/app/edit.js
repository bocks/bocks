angular.module('app.edit', [])
.controller('EditController', function($scope, $http, $route, $routeParams, Snippets) {
  // a collection of highlighted ranges belonging to the current snippet
  $scope.ranges = [];
  $scope.rangeId = -1;
  $scope.colorCount = -1;

  // the ace editor instance
  var editor = ace.edit("editor");
  editor.setTheme("ace/theme/solarized_dark");
  editor.session.setMode("ace/mode/javascript");

  // use Ace's Range instead of the window's
  var Range = ace.require('ace/range').Range;

  // stop the browser's warning message
  editor.$blockScrolling = Infinity;

  // Adjust font size in editor when +/- button is clicked
  $scope.fontSize = 12;
  editor.setFontSize($scope.fontSize);

  $scope.enlargeText = function () {
    $scope.fontSize += 2;
    editor.setFontSize($scope.fontSize);
  };
  $scope.reduceText = function () {
    $scope.fontSize -= 2;
    editor.setFontSize($scope.fontSize);
  };

  // Remove annotations
  $scope.removeAnnotation = function() {
    // remove this range from the ranges collection
    var r = $scope.ranges.filter( function(range) {
      return range.id !== this.annotation.id;
    }.bind(this));
    $scope.ranges = r;
    editor.session.removeMarker(this.annotation.marker);

    // remove the annotation from the dom
    var el = document.getElementById('annotation-'+ this.annotation.id);
    el.parentNode.removeChild(el);
  };

  $scope.convertTime = function (mongoTime) {
    date = new Date(mongoTime);
    return (date.getMonth() + 1) + '.' + date.getDate() + '.' + date.getFullYear();
  }

  $scope.init = function() {
    Snippets.retrieveSnippet($routeParams.id)
    .then(function(snippet) {
      console.log(snippet);
      if (snippet !== false) {
        // set editor to display
        $scope.displayEditor = true;

        // set snippet data
        $scope.title = snippet.data.title;
        $scope.username = snippet.data.userName;
        $scope.createdAt = snippet.data.createdAt;
        $scope.highlights = snippet.data.highlights;

        $scope.tags = snippet.data.tags;

        // add code to editor
        editor.setValue(snippet.data.code);

        snippet.data.highlights.forEach(function(highlight) {
          // set markers for highlighted code
          var range = new Range(highlight.start.row, highlight.start.column, highlight.end.row, highlight.end.column);
          var marker = editor.session.addMarker(range, "highlighter-" + highlight.color);
          highlight.marker = marker; // overwrite store marker data with new marker

          // store range data
          range.id = ++$scope.rangeId;
          range.color = highlight.color;
          range.marker = marker;
          $scope.ranges.push(range);
        });
      }
    });
  }();
});
