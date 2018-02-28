'use strict';

/* jasmine specs for controllers go here */

describe('services', function(){
  beforeEach(module('contasPagarRateio.module'));
  
  describe('ContasPagarRateio', function(){
	var $httpBackend, ContasPagarRateio, restURL;
	  
    beforeEach(inject(function($injector) {
    	$httpBackend = $injector.get('$httpBackend');
    	ContasPagarRateio = $injector.get('ContasPagarRateio');
        restURL = $injector.get('restURL');
    }));

    afterEach(function() {
    	$httpBackend.verifyNoOutstandingExpectation();
    	$httpBackend.verifyNoOutstandingRequest();
    });
    
	it('getAllAsListItems', function() {
		$httpBackend.when('GET', restURL+'/items/contasPagarRateio').respond("test");
    	ContasPagarRateio.getAllAsListItems().then(function(response) {
        	expect(response.status).toBe(200);
    		expect(response.data).toBe("test");
    	});
    	$httpBackend.flush();
	});

    it('getAll', function() {
    	$httpBackend.when('GET', restURL+'/contasPagarRateio').respond("test");
    	ContasPagarRateio.getAll().then(function(response) {
        	expect(response.status).toBe(200);
    		expect(response.data).toBe("test");
    	});
    	$httpBackend.flush();
    });
    
    it('get', function() {
    	$httpBackend.when('GET', restURL+'/contasPagarRateio/1').respond("test");
    	ContasPagarRateio.get('1').then(function(response) {
        	expect(response.status).toBe(200);
    		expect(response.data).toBe("test");
    	});
    	$httpBackend.flush();
    });
    
    it('create throws exception : id not defined', function() {
    	try{
    		ContasPagarRateio.create({oidContasPagarRateio:null,name:'contasPagarRateio'});
    		$httpBackend.flush();
    	} catch(errors) {
    		expect(errors[0]).toBe('contasPagarRateio.id.not.defined');
    	}
    });
    
    it('create', function() {
    	$httpBackend.when('POST', restURL+'/contasPagarRateio').respond("test");
    	ContasPagarRateio.create({oidContasPagarRateio:'1',name:'contasPagarRateio'}).then(function(response) {
        	expect(response.status).toBe(200);
    		expect(response.data).toBe("test");
    	});
    	$httpBackend.flush();
    });
    
    it('update throws exception : id not defined', function() {
    	try{
    		ContasPagarRateio.update({oidContasPagarRateio:null,name:'contasPagarRateio'});
    		$httpBackend.flush();
    	} catch(errors) {
    		expect(errors[0]).toBe('contasPagarRateio.id.not.defined');
    	}
    });
    
    it('update', function() {
    	$httpBackend.when('PUT', restURL+'/contasPagarRateio/1').respond("test");
    	ContasPagarRateio.update({oidContasPagarRateio:'1',name:'contasPagarRateio'}).then(function(response) {
        	expect(response.status).toBe(200);
    		expect(response.data).toBe("test");
    	});
    	$httpBackend.flush();
    });
    
    it('delete', function() {
    	$httpBackend.when('DELETE', restURL+'/contasPagarRateio/1').respond("test");
    	ContasPagarRateio.delete('1').then(function(response) {
        	expect(response.status).toBe(200);
    		expect(response.data).toBe("test");
    	});
    	$httpBackend.flush();
    });
  });
});