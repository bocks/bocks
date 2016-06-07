'use strict';

describe('Services', function () {
  beforeEach(module('app.services'));

  afterEach(inject(function ($httpBackend) {
    $httpBackend.verifyNoOutstandingExpectation();
    $httpBackend.verifyNoOutstandingRequest();
  }));

  describe('Snippets Factory', function () {
  	var $httpBackend, Snippets;

  	beforeEach(inject(function (_$httpBackend_, _Snippets_) {
  	  $httpBackend = _$httpBackend_;
  	  Snippets = _Snippets_;
  	}));

  	it('should exist', function () {
      expect(Snippets).to.exist;
    });

    it('should have a method `retrieveSnippet`', function () {
      expect(Snippets.retrieveSnippet).to.be.a('function');
    });

    it('should have a method `retrieveSnippets`', function () {
      expect(Snippets.retrieveSnippets).to.be.a('function');
    });

    it('should have a method `deleteSnippet`', function () {
      expect(Snippets.deleteSnippet).to.be.a('function');
    });

    it('should have a method `exportImage`', function () {
      expect(Snippets.exportImage).to.be.a('function');
    });

  });

});