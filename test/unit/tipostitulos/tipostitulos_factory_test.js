'use strict';

/* jasmine specs for controllers go here */

describe('services', function(){
  beforeEach(module('tiposTitulos.module'));
  
  describe('TiposTitulos', function(){
	var $httpBackend, TiposTitulos, restURL;
	  
    beforeEach(inject(function($injector) {
    	$httpBackend = $injector.get('$httpBackend');
    	TiposTitulos = $injector.get('TiposTitulos');
        restURL = $injector.get('restURL');
    }));

    afterEach(function() {
    	$httpBackend.verifyNoOutstandingExpectation();
    	$httpBackend.verifyNoOutstandingRequest();
    });
    
	it('getAllAsListItems', function() {
		$httpBackend.when('GET', restURL+'/items/tiposTitulos').respond("test");
    	TiposTitulos.getAllAsListItems().then(function(response) {
        	expect(response.status).toBe(200);
    		expect(response.data).toBe("test");
    	});
    	$httpBackend.flush();
	});

    it('getAll', function() {
    	$httpBackend.when('GET', restURL+'/tiposTitulos').respond("test");
    	TiposTitulos.getAll().then(function(response) {
        	expect(response.status).toBe(200);
    		expect(response.data).toBe("test");
    	});
    	$httpBackend.flush();
    });
    
    it('get', function() {
    	$httpBackend.when('GET', restURL+'/tiposTitulos/1').respond("test");
    	TiposTitulos.get('1').then(function(response) {
        	expect(response.status).toBe(200);
    		expect(response.data).toBe("test");
    	});
    	$httpBackend.flush();
    });
    
    it('create throws exception : id not defined', function() {
    	try{
    		TiposTitulos.create({oidTiposTitulos:null,name:'tiposTitulos'});
    		$httpBackend.flush();
    	} catch(errors) {
    		expect(errors[0]).toBe('tiposTitulos.id.not.defined');
    	}
    });
    
    it('create', function() {
    	$httpBackend.when('POST', restURL+'/tiposTitulos').respond("test");
    	TiposTitulos.create({oidTiposTitulos:'1',name:'tiposTitulos'}).then(function(response) {
        	expect(response.status).toBe(200);
    		expect(response.data).toBe("test");
    	});
    	$httpBackend.flush();
    });
    
    it('update throws exception : id not defined', function() {
    	try{
    		TiposTitulos.update({oidTiposTitulos:null,name:'tiposTitulos'});
    		$httpBackend.flush();
    	} catch(errors) {
    		expect(errors[0]).toBe('tiposTitulos.id.not.defined');
    	}
    });
    
    it('update', function() {
    	$httpBackend.when('PUT', restURL+'/tiposTitulos/1').respond("test");
    	TiposTitulos.update({oidTiposTitulos:'1',name:'tiposTitulos'}).then(function(response) {
        	expect(response.status).toBe(200);
    		expect(response.data).toBe("test");
    	});
    	$httpBackend.flush();
    });
    
    it('delete', function() {
    	$httpBackend.when('DELETE', restURL+'/tiposTitulos/1').respond("test");
    	TiposTitulos.delete('1').then(function(response) {
        	expect(response.status).toBe(200);
    		expect(response.data).toBe("test");
    	});
    	$httpBackend.flush();
    });
  });
});