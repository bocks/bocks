angular.module('app', [
  'app.main',
  'app.snippet',
  'app.snippets',
  'app.view',
  'app.services',
  'ngRoute',
  'flash'
]).config(function ($routeProvider) {
  $routeProvider
    .when('/main', {
      templateUrl: 'app/main.html',
      controller: 'MainController',
      authenticate: false
    })
    .when('/snippet', {
      templateUrl: 'app/snippet.html',
      controller: 'SnippetController',
      authenticate: true
    })
    .when('/snippet/:id', {
      templateUrl: 'app/view.html',
      controller: 'ViewController',
      authenticate: false
    })
    .when('/snippet/:id/edit', {
      templateUrl: 'app/edit.html',
      controller: 'ViewController',
      edit: true,
      authenticate: true
    })
    .when('/snippets', {
      templateUrl: 'app/snippets.html',
      controller: 'SnippetsController',
      authenticate: false
    })
    .when('/snippets/:username', {
      templateUrl: 'app/snippets.html',
      controller: 'SnippetsController',
      authenticate: false
    })
    .otherwise('/main');
})
.controller('NavController', function($scope, Auth) {

  // upon index.html reload, decide which nav links to render
  $scope.init = function() {
    Auth.getUserStatus()
    .then( function() {
      $scope.display = Auth.isLoggedIn();
      $scope.username = Auth.getUserName();
    });
  }();

  // reset our nav links upon logout
  $scope.logUserOut = function() {
    Auth.logUserOut();
    Auth.reloadPage();
  };
})
.directive('spFlash', function() {
  return {
    restrict : 'A',
    replace : true,
    template : '<div class="flash" ng-show="{{ successMsg.length }}"><div class="flash-inner" data-ng-repeat="msg in successMsg">{{msg}}</div></div>',
    link : function($rootScope, scope, element, attrs) {
      $rootScope.$watch('successMsg', function(val) {
       if (val && val.length) {
        update();
       }
      }, true);

      function update() {
      $('.flash')
       .fadeIn(500).delay(3000)
       .fadeOut(500, function() {
         $rootScope.successMsg.splice(0, 1);
        });
      }
    } // end link
  }; // end return
})
.directive('onFinishRender', function ($timeout) {
  return {
    restrict: 'A',
    link: function (scope, element, attr) {
      if (scope.$last === true) {
        $timeout(function () {
          scope.$emit('ngRepeatFinished');
        });
      }
    }
  }
})
.run(function($location, $route, $rootScope, Auth) {
  $rootScope.$on('$routeChangeStart',
    function(event, next, current) {
      Auth.getUserStatus()
      .then(function() {
        if (next.$$route && next.$$route.authenticate && !Auth.isLoggedIn()) {
          $location.path('/');
        }
      });
    });
});
