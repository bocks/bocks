angular.module('app.view', [])
.controller('ViewController', function($scope, $http, $route, $routeParams, Snippets, Auth) {
  $scope.displayEditor = false;

  var editor = ace.edit("editor");
  editor.setTheme("ace/theme/solarized_dark");
  editor.session.setMode("ace/mode/javascript");

  // use Ace's Range instead of the window's
  var Range = ace.require('ace/range').Range;

  // stop the browser's warning message
  editor.$blockScrolling = Infinity;

  $scope.fontSize = 16;
  editor.setFontSize($scope.fontSize);

  // make editor read only
  editor.setReadOnly(true);

  $scope.convertTime = function (mongoTime) {
    date = new Date(mongoTime);
    return (date.getMonth() + 1) + '.' + date.getDate() + '.' + date.getFullYear();
  };

  $scope.init = function() {
    Snippets.retrieveSnippet($routeParams.id)
    .then(function(snippet) {
      if (snippet !== false) {
        // set editor to display
        $scope.displayEditor = true;

        // set snippet data
        $scope.id = snippet.data._id;
        $scope.title = snippet.data.title;
        $scope.username = snippet.data.userName;
        $scope.createdAt = snippet.data.createdAt;
        $scope.highlights = snippet.data.highlights;
        $scope.tags = snippet.data.tags;

        // determine if user has edit permissions
        $scope.editAccess = (snippet.data.userName === Auth.getUserName()) ? true : false;

        // add code to editor
        editor.setValue(snippet.data.code);

        snippet.data.highlights.forEach(function(highlight) {
          // set markers for highlighted code
          var range = new Range(highlight.start.row, highlight.start.column, highlight.end.row, highlight.end.column);
          editor.session.addMarker(range, "highlighter-" + highlight.color);
        });
      }
    });
  }();

  // download an editor screenshot
  $scope.exportImage = function() {
    Snippets.exportImage($scope.title);
  };
});
