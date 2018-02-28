'use strict';

/* jasmine specs for controllers go here */

describe('services', function(){
  beforeEach(module('contasPagar.module'));
  
  describe('ContasPagar', function(){
	var $httpBackend, ContasPagar, restURL;
	  
    beforeEach(inject(function($injector) {
    	$httpBackend = $injector.get('$httpBackend');
    	ContasPagar = $injector.get('ContasPagar');
        restURL = $injector.get('restURL');
    }));

    afterEach(function() {
    	$httpBackend.verifyNoOutstandingExpectation();
    	$httpBackend.verifyNoOutstandingRequest();
    });
    
	it('getAllAsListItems', function() {
		$httpBackend.when('GET', restURL+'/items/contasPagar').respond("test");
    	ContasPagar.getAllAsListItems().then(function(response) {
        	expect(response.status).toBe(200);
    		expect(response.data).toBe("test");
    	});
    	$httpBackend.flush();
	});

    it('getAll', function() {
    	$httpBackend.when('GET', restURL+'/contasPagar').respond("test");
    	ContasPagar.getAll().then(function(response) {
        	expect(response.status).toBe(200);
    		expect(response.data).toBe("test");
    	});
    	$httpBackend.flush();
    });
    
    it('get', function() {
    	$httpBackend.when('GET', restURL+'/contasPagar/1').respond("test");
    	ContasPagar.get('1').then(function(response) {
        	expect(response.status).toBe(200);
    		expect(response.data).toBe("test");
    	});
    	$httpBackend.flush();
    });
    
    it('create throws exception : id not defined', function() {
    	try{
    		ContasPagar.create({oidContasPagar:null,name:'contasPagar'});
    		$httpBackend.flush();
    	} catch(errors) {
    		expect(errors[0]).toBe('contasPagar.id.not.defined');
    	}
    });
    
    it('create', function() {
    	$httpBackend.when('POST', restURL+'/contasPagar').respond("test");
    	ContasPagar.create({oidContasPagar:'1',name:'contasPagar'}).then(function(response) {
        	expect(response.status).toBe(200);
    		expect(response.data).toBe("test");
    	});
    	$httpBackend.flush();
    });
    
    it('update throws exception : id not defined', function() {
    	try{
    		ContasPagar.update({oidContasPagar:null,name:'contasPagar'});
    		$httpBackend.flush();
    	} catch(errors) {
    		expect(errors[0]).toBe('contasPagar.id.not.defined');
    	}
    });
    
    it('update', function() {
    	$httpBackend.when('PUT', restURL+'/contasPagar/1').respond("test");
    	ContasPagar.update({oidContasPagar:'1',name:'contasPagar'}).then(function(response) {
        	expect(response.status).toBe(200);
    		expect(response.data).toBe("test");
    	});
    	$httpBackend.flush();
    });
    
    it('delete', function() {
    	$httpBackend.when('DELETE', restURL+'/contasPagar/1').respond("test");
    	ContasPagar.delete('1').then(function(response) {
        	expect(response.status).toBe(200);
    		expect(response.data).toBe("test");
    	});
    	$httpBackend.flush();
    });
  });
});