'use strict';

/* jasmine specs for controllers go here */

describe('controllers', function(){
  beforeEach(module('pessoas.module'));
  
  describe('PessoasCtrl', function(){
    var PessoasCtrl, Pessoas,$rootScope, $scope, $routeParams, $httpBackend, $location, MessageHandler, $q, $controller;
	  
    beforeEach(inject(function($injector) {
    	$controller = $injector.get('$controller');
    	$q = $injector.get('$q');
    	$rootScope = $injector.get('$rootScope');
    	$scope = $rootScope.$new();
    	$routeParams = $injector.get('$routeParams');
    	$httpBackend = $injector.get('$httpBackend');
    	
    	// location is mocked due to redirection in browser : karma does not support it
    	$location = {
    		path: jasmine.createSpy("path").andCallFake(function() {
        	    return "";
        	})
    	};
    	
    	// Messages
    	MessageHandler = {
    		cleanMessage: jasmine.createSpy("cleanMessage"),
    		addSuccess: jasmine.createSpy("addSuccess"),
    		manageError: jasmine.createSpy("manageError"),
    		manageException: jasmine.createSpy("manageException"),
    	};

    	// Pessoas service
    	Pessoas = {
    		getAll: function() {
    			var deferred = $q.defer();
    			deferred.resolve({data:'pessoas1'});
    			return deferred.promise;
    		}
    	};
		
				PessoasCtrl = $controller('PessoasCtrl', {
    		'Pessoas': Pessoas,
			    		'$scope': $scope,
    		'$routeParams': $routeParams,
    		'$http': $httpBackend,
    		'$location': $location,
    		'MessageHandler': MessageHandler
    	});
    }));

    afterEach(function() {
    	$httpBackend.verifyNoOutstandingExpectation();
    	$httpBackend.verifyNoOutstandingRequest();
    });
    
    it('init', function() {
    	$rootScope.$apply();
    	expect($scope.mode).toBeNull();
    	expect($scope.pessoas).toBeNull();
    	expect($scope.pessoass).toBe('pessoas1');
    	expect(Object.keys($scope.items).length).toBe(0);
    	expect(MessageHandler.cleanMessage).toHaveBeenCalled();
    });
    
    it('refreshPessoasList', function() {
    	// given
    	Pessoas.getAll = function() {
			var deferred = $q.defer();
			deferred.resolve({data:'pessoas2'});
			return deferred.promise;
		}
    	
    	// when
    	$scope.refreshPessoasList();
    	$scope.$apply();

    	// then
    	$rootScope.$apply();
    	expect($scope.pessoass).toBe('pessoas2');
    });
    
    it('refreshPessoas', function() {
    	// given
    	Pessoas.get = function(oidPessoas) {
			var deferred = $q.defer();
			deferred.resolve({data:'pessoas'+oidPessoas});
			return deferred.promise;
		}
    	
    	// when
    	$scope.refreshPessoas('1');
    	$scope.$apply();
    	
    	// then
    	expect($scope.pessoas).toBe('pessoas'+'1');
    });
    
	it('goToPessoasList', function() {
    	// given
    	spyOn($scope, "refreshPessoasList");
    	
    	// when
    	$scope.goToPessoasList();
    	$scope.$apply();
    	
    	// then
    	expect($scope.refreshPessoasList).toHaveBeenCalled();
    	expect($location.path).toHaveBeenCalledWith('/pessoas');
    });
    
    it('goToPessoas', function() {
    	// given
    	spyOn($scope, "refreshPessoas");
    	var oidPessoas = 1;
    	
    	// when
    	$scope.goToPessoas(oidPessoas);
    	$scope.$apply();
    	
    	// then
    	expect($scope.refreshPessoas).toHaveBeenCalledWith(oidPessoas);
    	expect($location.path).toHaveBeenCalledWith('/pessoas'+'/'+oidPessoas);
    });
    
    it('save : create', function() {
    	// given
    	$scope.pessoas = {oidPessoas:'1', name:'pessoas'};
    	
    	$scope.mode = 'create';
    	Pessoas.create = function() {
			var deferred = $q.defer();
			deferred.resolve({data:'pessoasSaved'});
			return deferred.promise;
		}
    	
    	// when
    	$scope.save();
    	$scope.$apply();
    	
    	// then
    	expect(MessageHandler.cleanMessage).toHaveBeenCalled();
    	expect($scope.pessoas).toBe('pessoasSaved');
    	expect(MessageHandler.addSuccess).toHaveBeenCalledWith('save ok');
    });
    
    it('save : update', function() {
    	// given
    	$scope.pessoas = {oidPessoas:'1', name:'pessoas'};
    	
    	$scope.mode = 'update';
    	Pessoas.update = function() {
			var deferred = $q.defer();
			deferred.resolve({data:'pessoasSaved'});
			return deferred.promise;
		}
    	
    	// when
    	$scope.save();
    	$scope.$apply();
    	
    	// then
    	expect(MessageHandler.cleanMessage).toHaveBeenCalled();
    	expect($scope.pessoas).toBe('pessoasSaved');
    	expect(MessageHandler.addSuccess).toHaveBeenCalledWith('save ok');
    });
    
    it('delete', function() {
    	// given
    	Pessoas.delete = function() {
			var deferred = $q.defer();
			deferred.resolve(null);
			return deferred.promise;
		}
    	spyOn($scope, "goToPessoasList");
    	
    	// when
    	$scope.delete('1');
    	$scope.$apply();
    	
    	// then
    	expect($scope.goToPessoasList).toHaveBeenCalled();
    	expect(MessageHandler.cleanMessage).toHaveBeenCalled();
    });
    
    it('init : pessoas create page', function() {
    	// given
		$location.path.andCallFake(function() {
        	return "/pessoas/new";
       	});

		// when
		$scope.$apply();
		
		// then
    	expect($scope.mode).toBeNull();
    	expect($scope.pessoas).toBeNull();
    	expect($scope.pessoass).toBe('pessoas1');
    	expect(Object.keys($scope.items).length).toBe(0);
    	expect(MessageHandler.cleanMessage).toHaveBeenCalled();
    });
	
  });
});