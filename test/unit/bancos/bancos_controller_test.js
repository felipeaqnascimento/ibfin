'use strict';

/* jasmine specs for controllers go here */

describe('controllers', function(){
  beforeEach(module('bancos.module'));
  
  describe('BancosCtrl', function(){
    var BancosCtrl, Bancos,$rootScope, $scope, $routeParams, $httpBackend, $location, MessageHandler, $q, $controller;
	  
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

    	// Bancos service
    	Bancos = {
    		getAll: function() {
    			var deferred = $q.defer();
    			deferred.resolve({data:'bancos1'});
    			return deferred.promise;
    		}
    	};
		
				BancosCtrl = $controller('BancosCtrl', {
    		'Bancos': Bancos,
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
    	expect($scope.bancos).toBeNull();
    	expect($scope.bancoss).toBe('bancos1');
    	expect(Object.keys($scope.items).length).toBe(0);
    	expect(MessageHandler.cleanMessage).toHaveBeenCalled();
    });
    
    it('refreshBancosList', function() {
    	// given
    	Bancos.getAll = function() {
			var deferred = $q.defer();
			deferred.resolve({data:'bancos2'});
			return deferred.promise;
		}
    	
    	// when
    	$scope.refreshBancosList();
    	$scope.$apply();

    	// then
    	$rootScope.$apply();
    	expect($scope.bancoss).toBe('bancos2');
    });
    
    it('refreshBancos', function() {
    	// given
    	Bancos.get = function(oidBancos) {
			var deferred = $q.defer();
			deferred.resolve({data:'bancos'+oidBancos});
			return deferred.promise;
		}
    	
    	// when
    	$scope.refreshBancos('1');
    	$scope.$apply();
    	
    	// then
    	expect($scope.bancos).toBe('bancos'+'1');
    });
    
	it('goToBancosList', function() {
    	// given
    	spyOn($scope, "refreshBancosList");
    	
    	// when
    	$scope.goToBancosList();
    	$scope.$apply();
    	
    	// then
    	expect($scope.refreshBancosList).toHaveBeenCalled();
    	expect($location.path).toHaveBeenCalledWith('/bancos');
    });
    
    it('goToBancos', function() {
    	// given
    	spyOn($scope, "refreshBancos");
    	var oidBancos = 1;
    	
    	// when
    	$scope.goToBancos(oidBancos);
    	$scope.$apply();
    	
    	// then
    	expect($scope.refreshBancos).toHaveBeenCalledWith(oidBancos);
    	expect($location.path).toHaveBeenCalledWith('/bancos'+'/'+oidBancos);
    });
    
    it('save : create', function() {
    	// given
    	$scope.bancos = {oidBancos:'1', name:'bancos'};
    	
    	$scope.mode = 'create';
    	Bancos.create = function() {
			var deferred = $q.defer();
			deferred.resolve({data:'bancosSaved'});
			return deferred.promise;
		}
    	
    	// when
    	$scope.save();
    	$scope.$apply();
    	
    	// then
    	expect(MessageHandler.cleanMessage).toHaveBeenCalled();
    	expect($scope.bancos).toBe('bancosSaved');
    	expect(MessageHandler.addSuccess).toHaveBeenCalledWith('save ok');
    });
    
    it('save : update', function() {
    	// given
    	$scope.bancos = {oidBancos:'1', name:'bancos'};
    	
    	$scope.mode = 'update';
    	Bancos.update = function() {
			var deferred = $q.defer();
			deferred.resolve({data:'bancosSaved'});
			return deferred.promise;
		}
    	
    	// when
    	$scope.save();
    	$scope.$apply();
    	
    	// then
    	expect(MessageHandler.cleanMessage).toHaveBeenCalled();
    	expect($scope.bancos).toBe('bancosSaved');
    	expect(MessageHandler.addSuccess).toHaveBeenCalledWith('save ok');
    });
    
    it('delete', function() {
    	// given
    	Bancos.delete = function() {
			var deferred = $q.defer();
			deferred.resolve(null);
			return deferred.promise;
		}
    	spyOn($scope, "goToBancosList");
    	
    	// when
    	$scope.delete('1');
    	$scope.$apply();
    	
    	// then
    	expect($scope.goToBancosList).toHaveBeenCalled();
    	expect(MessageHandler.cleanMessage).toHaveBeenCalled();
    });
    
    it('init : bancos create page', function() {
    	// given
		$location.path.andCallFake(function() {
        	return "/bancos/new";
       	});

		// when
		$scope.$apply();
		
		// then
    	expect($scope.mode).toBeNull();
    	expect($scope.bancos).toBeNull();
    	expect($scope.bancoss).toBe('bancos1');
    	expect(Object.keys($scope.items).length).toBe(0);
    	expect(MessageHandler.cleanMessage).toHaveBeenCalled();
    });
	
  });
});