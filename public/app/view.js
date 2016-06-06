angular.module('app.view', [])

.controller('ViewController', function($scope, $http, $location, $route, $routeParams, Snippets, Delete, Auth) {
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

  $scope.editRoute = function (id) {
    $location.path('/snippet/' + id + '/edit');
  };
  
  $scope.deleteRoute = function (id) {
    if (confirm('Are you sure you want to delete this snippet?')) {
      Delete.deleteSnippet($routeParams.id)
        .then(function () {
          alert('Snippet successfully deleted');
          $location.path('/snippets');
        })
      ;
    }
  }

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
        editor.setValue(snippet.data.code, -1);
        editor.setFontSize(16);

        snippet.data.highlights.forEach(function(highlight) {
          // set markers for highlighted code
          var range = new Range(highlight.start.row, highlight.start.column, highlight.end.row, highlight.end.column);
          editor.session.addMarker(range, "highlighter-" + highlight.color);
        });
      }
    });
  }();

  // delete the snippet
  $scope.deleteSnippet = function() {
    console.log('ang deleteSnippet');
    if (confirm('Are you sure you want to delete this snippet?')) {
      Snippets.deleteSnippet($routeParams.id)
      .then(function(res) {
        $location.path('/snippets/' + Auth.getUserName());
      });
    }
  };

  // download an editor screenshot
  $scope.exportImage = function() {
    Snippets.exportImage($scope.title);
  };
});
