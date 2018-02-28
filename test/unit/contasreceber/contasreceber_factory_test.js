'use strict';

/* jasmine specs for controllers go here */

describe('services', function(){
  beforeEach(module('contasReceber.module'));
  
  describe('ContasReceber', function(){
	var $httpBackend, ContasReceber, restURL;
	  
    beforeEach(inject(function($injector) {
    	$httpBackend = $injector.get('$httpBackend');
    	ContasReceber = $injector.get('ContasReceber');
        restURL = $injector.get('restURL');
    }));

    afterEach(function() {
    	$httpBackend.verifyNoOutstandingExpectation();
    	$httpBackend.verifyNoOutstandingRequest();
    });
    
	it('getAllAsListItems', function() {
		$httpBackend.when('GET', restURL+'/items/contasReceber').respond("test");
    	ContasReceber.getAllAsListItems().then(function(response) {
        	expect(response.status).toBe(200);
    		expect(response.data).toBe("test");
    	});
    	$httpBackend.flush();
	});

    it('getAll', function() {
    	$httpBackend.when('GET', restURL+'/contasReceber').respond("test");
    	ContasReceber.getAll().then(function(response) {
        	expect(response.status).toBe(200);
    		expect(response.data).toBe("test");
    	});
    	$httpBackend.flush();
    });
    
    it('get', function() {
    	$httpBackend.when('GET', restURL+'/contasReceber/1').respond("test");
    	ContasReceber.get('1').then(function(response) {
        	expect(response.status).toBe(200);
    		expect(response.data).toBe("test");
    	});
    	$httpBackend.flush();
    });
    
    it('create throws exception : id not defined', function() {
    	try{
    		ContasReceber.create({oidContasReceber:null,name:'contasReceber'});
    		$httpBackend.flush();
    	} catch(errors) {
    		expect(errors[0]).toBe('contasReceber.id.not.defined');
    	}
    });
    
    it('create', function() {
    	$httpBackend.when('POST', restURL+'/contasReceber').respond("test");
    	ContasReceber.create({oidContasReceber:'1',name:'contasReceber'}).then(function(response) {
        	expect(response.status).toBe(200);
    		expect(response.data).toBe("test");
    	});
    	$httpBackend.flush();
    });
    
    it('update throws exception : id not defined', function() {
    	try{
    		ContasReceber.update({oidContasReceber:null,name:'contasReceber'});
    		$httpBackend.flush();
    	} catch(errors) {
    		expect(errors[0]).toBe('contasReceber.id.not.defined');
    	}
    });
    
    it('update', function() {
    	$httpBackend.when('PUT', restURL+'/contasReceber/1').respond("test");
    	ContasReceber.update({oidContasReceber:'1',name:'contasReceber'}).then(function(response) {
        	expect(response.status).toBe(200);
    		expect(response.data).toBe("test");
    	});
    	$httpBackend.flush();
    });
    
    it('delete', function() {
    	$httpBackend.when('DELETE', restURL+'/contasReceber/1').respond("test");
    	ContasReceber.delete('1').then(function(response) {
        	expect(response.status).toBe(200);
    		expect(response.data).toBe("test");
    	});
    	$httpBackend.flush();
    });
  });
});