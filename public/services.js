angular.module('app.services', [])
.factory('Auth', function($http, $route, $window) {

  var user = null;
  var username;

  var getUserStatus = function() {
    return $http({
      method: 'GET',
      url: '/user/status'
    }).success( function(data) {
      if (data !== 'false') {
        user = JSON.parse(data);
      } else {
        user = false;
      }
    }).error(function(err) {
      console.log('error in getUserStatus');
      user = false;
    });
  };

  var isLoggedIn = function() {
    return user ? true : false;
  };

  var getUserName = function() {
    return user;
  };

  var logUserOut = function() {
    $http({
      method: 'GET',
      url: '/user/logout'
    }).success( function() {
      user = false;
    }).error( function(err) {
      console.log('error in logUserOut');
    });
  };

  var reloadPage = function($route) {
    $window.location.reload();
  };

  return {
    getUserStatus: getUserStatus,
    getUserName: getUserName,
    isLoggedIn: isLoggedIn,
    logUserOut: logUserOut,
    reloadPage: reloadPage
  };
})

.factory('Snippets', function($http) {
  var retrieveSnippet = function(id) {
    return $http({
      method: 'GET',
      url: '/snippets/' + id
    })
    .then(function(res) {
      return res;
    });
  };

  var retrieveSnippets = function(options) {
    skip = parseInt(options.skip) || 0;
    limit = parseInt(options.limit) || 5;
    username = options.username || null;

    return $http({
      method: 'GET',
      url: '/snippets',
      params: {
        skip: skip,
        limit: limit,
        username: username
      }
    })
    .then(function(res) {
      return res;
    });
  };

  var deleteSnippet = function(id) {
    return $http({
      method: "DELETE",
      url: "/snippets/" + id
    })
    .then(function(res) {
      return res;
    })
  };

  var exportImage = function(title) {
    // replace non-alphanumeric with dashes
    var escapedTitle = title.replace(/\W/g, '-');

    html2canvas($(".editor-wrap"), {
      onrendered: function(canvas) {
        var theCanvas = canvas;
        theCanvas.style.width = "800px";

        var img = theCanvas.toDataURL("image/png");

        var a = $("<a>")
            .attr("href", img)
            .attr("download", "myBock-" + escapedTitle + ".png")
            .appendTo("body");
            // use the native DOM trigger rather than jQuery
            a[0].click();

            a.remove();
      }
    });
  };

  return {
    exportImage: exportImage,
    retrieveSnippet: retrieveSnippet,
    retrieveSnippets: retrieveSnippets,
    deleteSnippet: deleteSnippet
  };
});
