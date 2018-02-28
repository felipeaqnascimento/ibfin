'use strict';

/* jasmine specs for controllers go here */

describe('services', function(){
  beforeEach(module('bancos.module'));
  
  describe('Bancos', function(){
	var $httpBackend, Bancos, restURL;
	  
    beforeEach(inject(function($injector) {
    	$httpBackend = $injector.get('$httpBackend');
    	Bancos = $injector.get('Bancos');
        restURL = $injector.get('restURL');
    }));

    afterEach(function() {
    	$httpBackend.verifyNoOutstandingExpectation();
    	$httpBackend.verifyNoOutstandingRequest();
    });
    
	it('getAllAsListItems', function() {
		$httpBackend.when('GET', restURL+'/items/bancos').respond("test");
    	Bancos.getAllAsListItems().then(function(response) {
        	expect(response.status).toBe(200);
    		expect(response.data).toBe("test");
    	});
    	$httpBackend.flush();
	});

    it('getAll', function() {
    	$httpBackend.when('GET', restURL+'/bancos').respond("test");
    	Bancos.getAll().then(function(response) {
        	expect(response.status).toBe(200);
    		expect(response.data).toBe("test");
    	});
    	$httpBackend.flush();
    });
    
    it('get', function() {
    	$httpBackend.when('GET', restURL+'/bancos/1').respond("test");
    	Bancos.get('1').then(function(response) {
        	expect(response.status).toBe(200);
    		expect(response.data).toBe("test");
    	});
    	$httpBackend.flush();
    });
    
    it('create throws exception : id not defined', function() {
    	try{
    		Bancos.create({oidBancos:null,name:'bancos'});
    		$httpBackend.flush();
    	} catch(errors) {
    		expect(errors[0]).toBe('bancos.id.not.defined');
    	}
    });
    
    it('create', function() {
    	$httpBackend.when('POST', restURL+'/bancos').respond("test");
    	Bancos.create({oidBancos:'1',name:'bancos'}).then(function(response) {
        	expect(response.status).toBe(200);
    		expect(response.data).toBe("test");
    	});
    	$httpBackend.flush();
    });
    
    it('update throws exception : id not defined', function() {
    	try{
    		Bancos.update({oidBancos:null,name:'bancos'});
    		$httpBackend.flush();
    	} catch(errors) {
    		expect(errors[0]).toBe('bancos.id.not.defined');
    	}
    });
    
    it('update', function() {
    	$httpBackend.when('PUT', restURL+'/bancos/1').respond("test");
    	Bancos.update({oidBancos:'1',name:'bancos'}).then(function(response) {
        	expect(response.status).toBe(200);
    		expect(response.data).toBe("test");
    	});
    	$httpBackend.flush();
    });
    
    it('delete', function() {
    	$httpBackend.when('DELETE', restURL+'/bancos/1').respond("test");
    	Bancos.delete('1').then(function(response) {
        	expect(response.status).toBe(200);
    		expect(response.data).toBe("test");
    	});
    	$httpBackend.flush();
    });
  });
});