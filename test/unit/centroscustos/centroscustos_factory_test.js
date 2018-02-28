'use strict';

/* jasmine specs for controllers go here */

describe('services', function(){
  beforeEach(module('centrosCustos.module'));
  
  describe('CentrosCustos', function(){
	var $httpBackend, CentrosCustos, restURL;
	  
    beforeEach(inject(function($injector) {
    	$httpBackend = $injector.get('$httpBackend');
    	CentrosCustos = $injector.get('CentrosCustos');
        restURL = $injector.get('restURL');
    }));

    afterEach(function() {
    	$httpBackend.verifyNoOutstandingExpectation();
    	$httpBackend.verifyNoOutstandingRequest();
    });
    
	it('getAllAsListItems', function() {
		$httpBackend.when('GET', restURL+'/items/centrosCustos').respond("test");
    	CentrosCustos.getAllAsListItems().then(function(response) {
        	expect(response.status).toBe(200);
    		expect(response.data).toBe("test");
    	});
    	$httpBackend.flush();
	});

    it('getAll', function() {
    	$httpBackend.when('GET', restURL+'/centrosCustos').respond("test");
    	CentrosCustos.getAll().then(function(response) {
        	expect(response.status).toBe(200);
    		expect(response.data).toBe("test");
    	});
    	$httpBackend.flush();
    });
    
    it('get', function() {
    	$httpBackend.when('GET', restURL+'/centrosCustos/1').respond("test");
    	CentrosCustos.get('1').then(function(response) {
        	expect(response.status).toBe(200);
    		expect(response.data).toBe("test");
    	});
    	$httpBackend.flush();
    });
    
    it('create throws exception : id not defined', function() {
    	try{
    		CentrosCustos.create({oidCentrosCustos:null,name:'centrosCustos'});
    		$httpBackend.flush();
    	} catch(errors) {
    		expect(errors[0]).toBe('centrosCustos.id.not.defined');
    	}
    });
    
    it('create', function() {
    	$httpBackend.when('POST', restURL+'/centrosCustos').respond("test");
    	CentrosCustos.create({oidCentrosCustos:'1',name:'centrosCustos'}).then(function(response) {
        	expect(response.status).toBe(200);
    		expect(response.data).toBe("test");
    	});
    	$httpBackend.flush();
    });
    
    it('update throws exception : id not defined', function() {
    	try{
    		CentrosCustos.update({oidCentrosCustos:null,name:'centrosCustos'});
    		$httpBackend.flush();
    	} catch(errors) {
    		expect(errors[0]).toBe('centrosCustos.id.not.defined');
    	}
    });
    
    it('update', function() {
    	$httpBackend.when('PUT', restURL+'/centrosCustos/1').respond("test");
    	CentrosCustos.update({oidCentrosCustos:'1',name:'centrosCustos'}).then(function(response) {
        	expect(response.status).toBe(200);
    		expect(response.data).toBe("test");
    	});
    	$httpBackend.flush();
    });
    
    it('delete', function() {
    	$httpBackend.when('DELETE', restURL+'/centrosCustos/1').respond("test");
    	CentrosCustos.delete('1').then(function(response) {
        	expect(response.status).toBe(200);
    		expect(response.data).toBe("test");
    	});
    	$httpBackend.flush();
    });
  });
});