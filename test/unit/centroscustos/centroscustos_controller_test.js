'use strict';

/* jasmine specs for controllers go here */

describe('controllers', function(){
  beforeEach(module('centrosCustos.module'));
  
  describe('CentrosCustosCtrl', function(){
    var CentrosCustosCtrl, CentrosCustos,$rootScope, $scope, $routeParams, $httpBackend, $location, MessageHandler, $q, $controller;
	  
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

    	// CentrosCustos service
    	CentrosCustos = {
    		getAll: function() {
    			var deferred = $q.defer();
    			deferred.resolve({data:'centrosCustos1'});
    			return deferred.promise;
    		}
    	};
		
				CentrosCustosCtrl = $controller('CentrosCustosCtrl', {
    		'CentrosCustos': CentrosCustos,
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
    	expect($scope.centrosCustos).toBeNull();
    	expect($scope.centrosCustoss).toBe('centrosCustos1');
    	expect(Object.keys($scope.items).length).toBe(0);
    	expect(MessageHandler.cleanMessage).toHaveBeenCalled();
    });
    
    it('refreshCentrosCustosList', function() {
    	// given
    	CentrosCustos.getAll = function() {
			var deferred = $q.defer();
			deferred.resolve({data:'centrosCustos2'});
			return deferred.promise;
		}
    	
    	// when
    	$scope.refreshCentrosCustosList();
    	$scope.$apply();

    	// then
    	$rootScope.$apply();
    	expect($scope.centrosCustoss).toBe('centrosCustos2');
    });
    
    it('refreshCentrosCustos', function() {
    	// given
    	CentrosCustos.get = function(oidCentrosCustos) {
			var deferred = $q.defer();
			deferred.resolve({data:'centrosCustos'+oidCentrosCustos});
			return deferred.promise;
		}
    	
    	// when
    	$scope.refreshCentrosCustos('1');
    	$scope.$apply();
    	
    	// then
    	expect($scope.centrosCustos).toBe('centrosCustos'+'1');
    });
    
	it('goToCentrosCustosList', function() {
    	// given
    	spyOn($scope, "refreshCentrosCustosList");
    	
    	// when
    	$scope.goToCentrosCustosList();
    	$scope.$apply();
    	
    	// then
    	expect($scope.refreshCentrosCustosList).toHaveBeenCalled();
    	expect($location.path).toHaveBeenCalledWith('/centrosCustos');
    });
    
    it('goToCentrosCustos', function() {
    	// given
    	spyOn($scope, "refreshCentrosCustos");
    	var oidCentrosCustos = 1;
    	
    	// when
    	$scope.goToCentrosCustos(oidCentrosCustos);
    	$scope.$apply();
    	
    	// then
    	expect($scope.refreshCentrosCustos).toHaveBeenCalledWith(oidCentrosCustos);
    	expect($location.path).toHaveBeenCalledWith('/centrosCustos'+'/'+oidCentrosCustos);
    });
    
    it('save : create', function() {
    	// given
    	$scope.centrosCustos = {oidCentrosCustos:'1', name:'centrosCustos'};
    	
    	$scope.mode = 'create';
    	CentrosCustos.create = function() {
			var deferred = $q.defer();
			deferred.resolve({data:'centrosCustosSaved'});
			return deferred.promise;
		}
    	
    	// when
    	$scope.save();
    	$scope.$apply();
    	
    	// then
    	expect(MessageHandler.cleanMessage).toHaveBeenCalled();
    	expect($scope.centrosCustos).toBe('centrosCustosSaved');
    	expect(MessageHandler.addSuccess).toHaveBeenCalledWith('save ok');
    });
    
    it('save : update', function() {
    	// given
    	$scope.centrosCustos = {oidCentrosCustos:'1', name:'centrosCustos'};
    	
    	$scope.mode = 'update';
    	CentrosCustos.update = function() {
			var deferred = $q.defer();
			deferred.resolve({data:'centrosCustosSaved'});
			return deferred.promise;
		}
    	
    	// when
    	$scope.save();
    	$scope.$apply();
    	
    	// then
    	expect(MessageHandler.cleanMessage).toHaveBeenCalled();
    	expect($scope.centrosCustos).toBe('centrosCustosSaved');
    	expect(MessageHandler.addSuccess).toHaveBeenCalledWith('save ok');
    });
    
    it('delete', function() {
    	// given
    	CentrosCustos.delete = function() {
			var deferred = $q.defer();
			deferred.resolve(null);
			return deferred.promise;
		}
    	spyOn($scope, "goToCentrosCustosList");
    	
    	// when
    	$scope.delete('1');
    	$scope.$apply();
    	
    	// then
    	expect($scope.goToCentrosCustosList).toHaveBeenCalled();
    	expect(MessageHandler.cleanMessage).toHaveBeenCalled();
    });
    
    it('init : centrosCustos create page', function() {
    	// given
		$location.path.andCallFake(function() {
        	return "/centrosCustos/new";
       	});

		// when
		$scope.$apply();
		
		// then
    	expect($scope.mode).toBeNull();
    	expect($scope.centrosCustos).toBeNull();
    	expect($scope.centrosCustoss).toBe('centrosCustos1');
    	expect(Object.keys($scope.items).length).toBe(0);
    	expect(MessageHandler.cleanMessage).toHaveBeenCalled();
    });
	
  });
});