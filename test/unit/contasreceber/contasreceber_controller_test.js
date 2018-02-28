'use strict';

/* jasmine specs for controllers go here */

describe('controllers', function(){
  beforeEach(module('contasReceber.module'));
  
  describe('ContasReceberCtrl', function(){
    var ContasReceberCtrl, ContasReceber,$rootScope, $scope, $routeParams, $httpBackend, $location, MessageHandler, $q, $controller;
	  
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

    	// ContasReceber service
    	ContasReceber = {
    		getAll: function() {
    			var deferred = $q.defer();
    			deferred.resolve({data:'contasReceber1'});
    			return deferred.promise;
    		}
    	};
		
				ContasReceberCtrl = $controller('ContasReceberCtrl', {
    		'ContasReceber': ContasReceber,
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
    	expect($scope.contasReceber).toBeNull();
    	expect($scope.contasRecebers).toBe('contasReceber1');
    	expect(Object.keys($scope.items).length).toBe(0);
    	expect(MessageHandler.cleanMessage).toHaveBeenCalled();
    });
    
    it('refreshContasReceberList', function() {
    	// given
    	ContasReceber.getAll = function() {
			var deferred = $q.defer();
			deferred.resolve({data:'contasReceber2'});
			return deferred.promise;
		}
    	
    	// when
    	$scope.refreshContasReceberList();
    	$scope.$apply();

    	// then
    	$rootScope.$apply();
    	expect($scope.contasRecebers).toBe('contasReceber2');
    });
    
    it('refreshContasReceber', function() {
    	// given
    	ContasReceber.get = function(oidContasReceber) {
			var deferred = $q.defer();
			deferred.resolve({data:'contasReceber'+oidContasReceber});
			return deferred.promise;
		}
    	
    	// when
    	$scope.refreshContasReceber('1');
    	$scope.$apply();
    	
    	// then
    	expect($scope.contasReceber).toBe('contasReceber'+'1');
    });
    
	it('goToContasReceberList', function() {
    	// given
    	spyOn($scope, "refreshContasReceberList");
    	
    	// when
    	$scope.goToContasReceberList();
    	$scope.$apply();
    	
    	// then
    	expect($scope.refreshContasReceberList).toHaveBeenCalled();
    	expect($location.path).toHaveBeenCalledWith('/contasReceber');
    });
    
    it('goToContasReceber', function() {
    	// given
    	spyOn($scope, "refreshContasReceber");
    	var oidContasReceber = 1;
    	
    	// when
    	$scope.goToContasReceber(oidContasReceber);
    	$scope.$apply();
    	
    	// then
    	expect($scope.refreshContasReceber).toHaveBeenCalledWith(oidContasReceber);
    	expect($location.path).toHaveBeenCalledWith('/contasReceber'+'/'+oidContasReceber);
    });
    
    it('save : create', function() {
    	// given
    	$scope.contasReceber = {oidContasReceber:'1', name:'contasReceber'};
    	
    	$scope.mode = 'create';
    	ContasReceber.create = function() {
			var deferred = $q.defer();
			deferred.resolve({data:'contasReceberSaved'});
			return deferred.promise;
		}
    	
    	// when
    	$scope.save();
    	$scope.$apply();
    	
    	// then
    	expect(MessageHandler.cleanMessage).toHaveBeenCalled();
    	expect($scope.contasReceber).toBe('contasReceberSaved');
    	expect(MessageHandler.addSuccess).toHaveBeenCalledWith('save ok');
    });
    
    it('save : update', function() {
    	// given
    	$scope.contasReceber = {oidContasReceber:'1', name:'contasReceber'};
    	
    	$scope.mode = 'update';
    	ContasReceber.update = function() {
			var deferred = $q.defer();
			deferred.resolve({data:'contasReceberSaved'});
			return deferred.promise;
		}
    	
    	// when
    	$scope.save();
    	$scope.$apply();
    	
    	// then
    	expect(MessageHandler.cleanMessage).toHaveBeenCalled();
    	expect($scope.contasReceber).toBe('contasReceberSaved');
    	expect(MessageHandler.addSuccess).toHaveBeenCalledWith('save ok');
    });
    
    it('delete', function() {
    	// given
    	ContasReceber.delete = function() {
			var deferred = $q.defer();
			deferred.resolve(null);
			return deferred.promise;
		}
    	spyOn($scope, "goToContasReceberList");
    	
    	// when
    	$scope.delete('1');
    	$scope.$apply();
    	
    	// then
    	expect($scope.goToContasReceberList).toHaveBeenCalled();
    	expect(MessageHandler.cleanMessage).toHaveBeenCalled();
    });
    
    it('init : contasReceber create page', function() {
    	// given
		$location.path.andCallFake(function() {
        	return "/contasReceber/new";
       	});

		// when
		$scope.$apply();
		
		// then
    	expect($scope.mode).toBeNull();
    	expect($scope.contasReceber).toBeNull();
    	expect($scope.contasRecebers).toBe('contasReceber1');
    	expect(Object.keys($scope.items).length).toBe(0);
    	expect(MessageHandler.cleanMessage).toHaveBeenCalled();
    });
	
  });
});