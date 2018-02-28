'use strict';

/* jasmine specs for controllers go here */

describe('controllers', function(){
  beforeEach(module('contasPagarRateio.module'));
  
  describe('ContasPagarRateioCtrl', function(){
    var ContasPagarRateioCtrl, ContasPagarRateio,$rootScope, $scope, $routeParams, $httpBackend, $location, MessageHandler, $q, $controller;
	  
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

    	// ContasPagarRateio service
    	ContasPagarRateio = {
    		getAll: function() {
    			var deferred = $q.defer();
    			deferred.resolve({data:'contasPagarRateio1'});
    			return deferred.promise;
    		}
    	};
		
				ContasPagarRateioCtrl = $controller('ContasPagarRateioCtrl', {
    		'ContasPagarRateio': ContasPagarRateio,
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
    	expect($scope.contasPagarRateio).toBeNull();
    	expect($scope.contasPagarRateios).toBe('contasPagarRateio1');
    	expect(Object.keys($scope.items).length).toBe(0);
    	expect(MessageHandler.cleanMessage).toHaveBeenCalled();
    });
    
    it('refreshContasPagarRateioList', function() {
    	// given
    	ContasPagarRateio.getAll = function() {
			var deferred = $q.defer();
			deferred.resolve({data:'contasPagarRateio2'});
			return deferred.promise;
		}
    	
    	// when
    	$scope.refreshContasPagarRateioList();
    	$scope.$apply();

    	// then
    	$rootScope.$apply();
    	expect($scope.contasPagarRateios).toBe('contasPagarRateio2');
    });
    
    it('refreshContasPagarRateio', function() {
    	// given
    	ContasPagarRateio.get = function(oidContasPagarRateio) {
			var deferred = $q.defer();
			deferred.resolve({data:'contasPagarRateio'+oidContasPagarRateio});
			return deferred.promise;
		}
    	
    	// when
    	$scope.refreshContasPagarRateio('1');
    	$scope.$apply();
    	
    	// then
    	expect($scope.contasPagarRateio).toBe('contasPagarRateio'+'1');
    });
    
	it('goToContasPagarRateioList', function() {
    	// given
    	spyOn($scope, "refreshContasPagarRateioList");
    	
    	// when
    	$scope.goToContasPagarRateioList();
    	$scope.$apply();
    	
    	// then
    	expect($scope.refreshContasPagarRateioList).toHaveBeenCalled();
    	expect($location.path).toHaveBeenCalledWith('/contasPagarRateio');
    });
    
    it('goToContasPagarRateio', function() {
    	// given
    	spyOn($scope, "refreshContasPagarRateio");
    	var oidContasPagarRateio = 1;
    	
    	// when
    	$scope.goToContasPagarRateio(oidContasPagarRateio);
    	$scope.$apply();
    	
    	// then
    	expect($scope.refreshContasPagarRateio).toHaveBeenCalledWith(oidContasPagarRateio);
    	expect($location.path).toHaveBeenCalledWith('/contasPagarRateio'+'/'+oidContasPagarRateio);
    });
    
    it('save : create', function() {
    	// given
    	$scope.contasPagarRateio = {oidContasPagarRateio:'1', name:'contasPagarRateio'};
    	
    	$scope.mode = 'create';
    	ContasPagarRateio.create = function() {
			var deferred = $q.defer();
			deferred.resolve({data:'contasPagarRateioSaved'});
			return deferred.promise;
		}
    	
    	// when
    	$scope.save();
    	$scope.$apply();
    	
    	// then
    	expect(MessageHandler.cleanMessage).toHaveBeenCalled();
    	expect($scope.contasPagarRateio).toBe('contasPagarRateioSaved');
    	expect(MessageHandler.addSuccess).toHaveBeenCalledWith('save ok');
    });
    
    it('save : update', function() {
    	// given
    	$scope.contasPagarRateio = {oidContasPagarRateio:'1', name:'contasPagarRateio'};
    	
    	$scope.mode = 'update';
    	ContasPagarRateio.update = function() {
			var deferred = $q.defer();
			deferred.resolve({data:'contasPagarRateioSaved'});
			return deferred.promise;
		}
    	
    	// when
    	$scope.save();
    	$scope.$apply();
    	
    	// then
    	expect(MessageHandler.cleanMessage).toHaveBeenCalled();
    	expect($scope.contasPagarRateio).toBe('contasPagarRateioSaved');
    	expect(MessageHandler.addSuccess).toHaveBeenCalledWith('save ok');
    });
    
    it('delete', function() {
    	// given
    	ContasPagarRateio.delete = function() {
			var deferred = $q.defer();
			deferred.resolve(null);
			return deferred.promise;
		}
    	spyOn($scope, "goToContasPagarRateioList");
    	
    	// when
    	$scope.delete('1');
    	$scope.$apply();
    	
    	// then
    	expect($scope.goToContasPagarRateioList).toHaveBeenCalled();
    	expect(MessageHandler.cleanMessage).toHaveBeenCalled();
    });
    
    it('init : contasPagarRateio create page', function() {
    	// given
		$location.path.andCallFake(function() {
        	return "/contasPagarRateio/new";
       	});

		// when
		$scope.$apply();
		
		// then
    	expect($scope.mode).toBeNull();
    	expect($scope.contasPagarRateio).toBeNull();
    	expect($scope.contasPagarRateios).toBe('contasPagarRateio1');
    	expect(Object.keys($scope.items).length).toBe(0);
    	expect(MessageHandler.cleanMessage).toHaveBeenCalled();
    });
	
  });
});