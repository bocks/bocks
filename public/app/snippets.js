angular.module('app.snippets', [])

.controller('SnippetsController', function($scope, $location, $routeParams, Snippets) {
  // snippets
  $scope.snippets = [];
  $scope.highlights = {};

  var editors = [];
  var Range = ace.require('ace/range').Range;

  // pagination
  $scope.paginateIsNewer = false;
  $scope.paginateIsOlder = true;
  $scope.page = $routeParams.page || 0;
  var limit = $routeParams.limit || 5;
  var skip = $scope.page * limit;

  $scope.goToSnippet = function (id) {
    $location.path('/snippet/' + id);
  };

  $scope.convertTime = function (mongoTime) {
    date = new Date(mongoTime);
    return (date.getMonth() + 1) + '.' + date.getDate() + '.' + date.getFullYear();
  };

  var retrieveSnippets = function() {
    console.log('retrieveSnippets', {
      skip: skip,
      limit: limit,
      username: $routeParams.username
    });

    Snippets.retrieveSnippets({
      skip: skip,
      limit: limit,
      username: $routeParams.username
    })
    .then(function(snippets) {
      $scope.snippets = snippets.data;

      $scope.snippets.forEach(function(snippet) {
        console.log(snippet.title, snippet.modifiedAt);
      });
    });
  };

  $scope.paginateNewer = function() {
    console.log('Paginate Newer');
    // if (!$scope.paginateIsNewer) { return; }
    // if ($scope.page > 0) { $scope.page--; }
    // updatePagination();

    if ($scope.page < 1) { return; }
    $scope.page--;
    skip = $scope.page * limit;
    // $scope.paginateIsNewer = ($scope.page > 0) ? true : false;
    retrieveSnippets();
    // updatePagination();
  };

  $scope.paginateOlder = function() {
    console.log('Paginate Older');
    // if (!$scope.paginateIsOlder) { return; }
    // if ($scope.paginateIsOlder) { $scope.page++; }
    // updatePagination();

    if ($scope.snippets.length < limit) { return; }
    $scope.page++;
    skip = $scope.page * limit;
    // $scope.paginateIsOlder = ($scope.snippets.length >= limit) ? true : false;
    retrieveSnippets();
    // updatePagination();
  };

  var updatePagination = function() {
    // skip = $scope.page * limit;
    // $scope.paginateIsNewer = ($scope.page > 0) ? true : false;
    // $scope.paginateIsOlder = ($scope.snippets.length > 0) ? true : false;
    // retrieveSnippets();

    $scope.paginateIsNewer = ($scope.page > 0) ? true : false;
    $scope.paginateIsOlder = ($scope.snippets.length >= limit) ? true : false;
    console.log('page', $scope.page, 'skip', skip);
    console.log('length', $scope.snippets.length, 'limit', limit);
  };

  $scope.init = function() {
    retrieveSnippets();
    // updatePagination();
  }();

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

    // update pagination
    updatePagination();
  });

});
