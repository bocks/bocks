'use strict';

describe('SnippetController', function () {
	var $scope, $rootScope, createController, Snippets, $httpBackend;

	// using angular mocks, we can inject the injector
	// to retrieve our dependencies
	beforeEach(module('app'));
	beforeEach(inject(function ($injector) {

	  // mock out our dependencies
	  $rootScope = $injector.get('$rootScope');
	  $httpBackend = $injector.get('$httpBackend');
	  Snippets = $injector.get('Snippets');
	  $scope = $rootScope.$new();

	  var $controller = $injector.get('$controller');

	  createController = function () {
	    return $controller('SnippetController', {
	      $scope: $scope,
	      Snippets: Snippets
	    });
	  };

	}));

	it('should have a ranges property on the $scope', function () {
	  createController();
	  expect($scope.ranges).to.be.an('array');
	});
});