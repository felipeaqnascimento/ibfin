'use strict';

/* jasmine specs for controllers go here */

describe('controllers', function(){
  beforeEach(module('tiposTitulos.module'));
  
  describe('TiposTitulosCtrl', function(){
    var TiposTitulosCtrl, TiposTitulos,$rootScope, $scope, $routeParams, $httpBackend, $location, MessageHandler, $q, $controller;
	  
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

    	// TiposTitulos service
    	TiposTitulos = {
    		getAll: function() {
    			var deferred = $q.defer();
    			deferred.resolve({data:'tiposTitulos1'});
    			return deferred.promise;
    		}
    	};
		
				TiposTitulosCtrl = $controller('TiposTitulosCtrl', {
    		'TiposTitulos': TiposTitulos,
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
    	expect($scope.tiposTitulos).toBeNull();
    	expect($scope.tiposTituloss).toBe('tiposTitulos1');
    	expect(Object.keys($scope.items).length).toBe(0);
    	expect(MessageHandler.cleanMessage).toHaveBeenCalled();
    });
    
    it('refreshTiposTitulosList', function() {
    	// given
    	TiposTitulos.getAll = function() {
			var deferred = $q.defer();
			deferred.resolve({data:'tiposTitulos2'});
			return deferred.promise;
		}
    	
    	// when
    	$scope.refreshTiposTitulosList();
    	$scope.$apply();

    	// then
    	$rootScope.$apply();
    	expect($scope.tiposTituloss).toBe('tiposTitulos2');
    });
    
    it('refreshTiposTitulos', function() {
    	// given
    	TiposTitulos.get = function(oidTiposTitulos) {
			var deferred = $q.defer();
			deferred.resolve({data:'tiposTitulos'+oidTiposTitulos});
			return deferred.promise;
		}
    	
    	// when
    	$scope.refreshTiposTitulos('1');
    	$scope.$apply();
    	
    	// then
    	expect($scope.tiposTitulos).toBe('tiposTitulos'+'1');
    });
    
	it('goToTiposTitulosList', function() {
    	// given
    	spyOn($scope, "refreshTiposTitulosList");
    	
    	// when
    	$scope.goToTiposTitulosList();
    	$scope.$apply();
    	
    	// then
    	expect($scope.refreshTiposTitulosList).toHaveBeenCalled();
    	expect($location.path).toHaveBeenCalledWith('/tiposTitulos');
    });
    
    it('goToTiposTitulos', function() {
    	// given
    	spyOn($scope, "refreshTiposTitulos");
    	var oidTiposTitulos = 1;
    	
    	// when
    	$scope.goToTiposTitulos(oidTiposTitulos);
    	$scope.$apply();
    	
    	// then
    	expect($scope.refreshTiposTitulos).toHaveBeenCalledWith(oidTiposTitulos);
    	expect($location.path).toHaveBeenCalledWith('/tiposTitulos'+'/'+oidTiposTitulos);
    });
    
    it('save : create', function() {
    	// given
    	$scope.tiposTitulos = {oidTiposTitulos:'1', name:'tiposTitulos'};
    	
    	$scope.mode = 'create';
    	TiposTitulos.create = function() {
			var deferred = $q.defer();
			deferred.resolve({data:'tiposTitulosSaved'});
			return deferred.promise;
		}
    	
    	// when
    	$scope.save();
    	$scope.$apply();
    	
    	// then
    	expect(MessageHandler.cleanMessage).toHaveBeenCalled();
    	expect($scope.tiposTitulos).toBe('tiposTitulosSaved');
    	expect(MessageHandler.addSuccess).toHaveBeenCalledWith('save ok');
    });
    
    it('save : update', function() {
    	// given
    	$scope.tiposTitulos = {oidTiposTitulos:'1', name:'tiposTitulos'};
    	
    	$scope.mode = 'update';
    	TiposTitulos.update = function() {
			var deferred = $q.defer();
			deferred.resolve({data:'tiposTitulosSaved'});
			return deferred.promise;
		}
    	
    	// when
    	$scope.save();
    	$scope.$apply();
    	
    	// then
    	expect(MessageHandler.cleanMessage).toHaveBeenCalled();
    	expect($scope.tiposTitulos).toBe('tiposTitulosSaved');
    	expect(MessageHandler.addSuccess).toHaveBeenCalledWith('save ok');
    });
    
    it('delete', function() {
    	// given
    	TiposTitulos.delete = function() {
			var deferred = $q.defer();
			deferred.resolve(null);
			return deferred.promise;
		}
    	spyOn($scope, "goToTiposTitulosList");
    	
    	// when
    	$scope.delete('1');
    	$scope.$apply();
    	
    	// then
    	expect($scope.goToTiposTitulosList).toHaveBeenCalled();
    	expect(MessageHandler.cleanMessage).toHaveBeenCalled();
    });
    
    it('init : tiposTitulos create page', function() {
    	// given
		$location.path.andCallFake(function() {
        	return "/tiposTitulos/new";
       	});

		// when
		$scope.$apply();
		
		// then
    	expect($scope.mode).toBeNull();
    	expect($scope.tiposTitulos).toBeNull();
    	expect($scope.tiposTituloss).toBe('tiposTitulos1');
    	expect(Object.keys($scope.items).length).toBe(0);
    	expect(MessageHandler.cleanMessage).toHaveBeenCalled();
    });
	
  });
});