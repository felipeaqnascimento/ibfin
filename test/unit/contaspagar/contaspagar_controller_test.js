'use strict';

/* jasmine specs for controllers go here */

describe('controllers', function(){
  beforeEach(module('contasPagar.module'));
  
  describe('ContasPagarCtrl', function(){
    var ContasPagarCtrl, ContasPagar,$rootScope, $scope, $routeParams, $httpBackend, $location, MessageHandler, $q, $controller;
	  
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

    	// ContasPagar service
    	ContasPagar = {
    		getAll: function() {
    			var deferred = $q.defer();
    			deferred.resolve({data:'contasPagar1'});
    			return deferred.promise;
    		}
    	};
		
				ContasPagarCtrl = $controller('ContasPagarCtrl', {
    		'ContasPagar': ContasPagar,
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
    	expect($scope.contasPagar).toBeNull();
    	expect($scope.contasPagars).toBe('contasPagar1');
    	expect(Object.keys($scope.items).length).toBe(0);
    	expect(MessageHandler.cleanMessage).toHaveBeenCalled();
    });
    
    it('refreshContasPagarList', function() {
    	// given
    	ContasPagar.getAll = function() {
			var deferred = $q.defer();
			deferred.resolve({data:'contasPagar2'});
			return deferred.promise;
		}
    	
    	// when
    	$scope.refreshContasPagarList();
    	$scope.$apply();

    	// then
    	$rootScope.$apply();
    	expect($scope.contasPagars).toBe('contasPagar2');
    });
    
    it('refreshContasPagar', function() {
    	// given
    	ContasPagar.get = function(oidContasPagar) {
			var deferred = $q.defer();
			deferred.resolve({data:'contasPagar'+oidContasPagar});
			return deferred.promise;
		}
    	
    	// when
    	$scope.refreshContasPagar('1');
    	$scope.$apply();
    	
    	// then
    	expect($scope.contasPagar).toBe('contasPagar'+'1');
    });
    
	it('goToContasPagarList', function() {
    	// given
    	spyOn($scope, "refreshContasPagarList");
    	
    	// when
    	$scope.goToContasPagarList();
    	$scope.$apply();
    	
    	// then
    	expect($scope.refreshContasPagarList).toHaveBeenCalled();
    	expect($location.path).toHaveBeenCalledWith('/contasPagar');
    });
    
    it('goToContasPagar', function() {
    	// given
    	spyOn($scope, "refreshContasPagar");
    	var oidContasPagar = 1;
    	
    	// when
    	$scope.goToContasPagar(oidContasPagar);
    	$scope.$apply();
    	
    	// then
    	expect($scope.refreshContasPagar).toHaveBeenCalledWith(oidContasPagar);
    	expect($location.path).toHaveBeenCalledWith('/contasPagar'+'/'+oidContasPagar);
    });
    
    it('save : create', function() {
    	// given
    	$scope.contasPagar = {oidContasPagar:'1', name:'contasPagar'};
    	
    	$scope.mode = 'create';
    	ContasPagar.create = function() {
			var deferred = $q.defer();
			deferred.resolve({data:'contasPagarSaved'});
			return deferred.promise;
		}
    	
    	// when
    	$scope.save();
    	$scope.$apply();
    	
    	// then
    	expect(MessageHandler.cleanMessage).toHaveBeenCalled();
    	expect($scope.contasPagar).toBe('contasPagarSaved');
    	expect(MessageHandler.addSuccess).toHaveBeenCalledWith('save ok');
    });
    
    it('save : update', function() {
    	// given
    	$scope.contasPagar = {oidContasPagar:'1', name:'contasPagar'};
    	
    	$scope.mode = 'update';
    	ContasPagar.update = function() {
			var deferred = $q.defer();
			deferred.resolve({data:'contasPagarSaved'});
			return deferred.promise;
		}
    	
    	// when
    	$scope.save();
    	$scope.$apply();
    	
    	// then
    	expect(MessageHandler.cleanMessage).toHaveBeenCalled();
    	expect($scope.contasPagar).toBe('contasPagarSaved');
    	expect(MessageHandler.addSuccess).toHaveBeenCalledWith('save ok');
    });
    
    it('delete', function() {
    	// given
    	ContasPagar.delete = function() {
			var deferred = $q.defer();
			deferred.resolve(null);
			return deferred.promise;
		}
    	spyOn($scope, "goToContasPagarList");
    	
    	// when
    	$scope.delete('1');
    	$scope.$apply();
    	
    	// then
    	expect($scope.goToContasPagarList).toHaveBeenCalled();
    	expect(MessageHandler.cleanMessage).toHaveBeenCalled();
    });
    
    it('init : contasPagar create page', function() {
    	// given
		$location.path.andCallFake(function() {
        	return "/contasPagar/new";
       	});

		// when
		$scope.$apply();
		
		// then
    	expect($scope.mode).toBeNull();
    	expect($scope.contasPagar).toBeNull();
    	expect($scope.contasPagars).toBe('contasPagar1');
    	expect(Object.keys($scope.items).length).toBe(0);
    	expect(MessageHandler.cleanMessage).toHaveBeenCalled();
    });
	
  });
});