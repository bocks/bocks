angular.module('app.view', [])
.controller('ViewController', function($scope, $http, $routeParams, Snippets) {
  var editor = ace.edit("editor");
  editor.setTheme("ace/theme/solarized_dark");
  editor.session.setMode("ace/mode/javascript");

  // use Ace's Range instead of the window's
  // var Range = ace.require('ace/range').Range;

  // stop the browser's warning message
  editor.$blockScrolling = Infinity;

  $scope.init = function() {
    console.log($routeParams);
    Snippets.retrieveSnippet($routeParams.id)
    .then(function(snippet) {
      console.log(snippet);
      editor.setValue(snippet.data.code);
    });


  }();
})
