'use strict';

/* jasmine specs for controllers go here */

describe('services', function(){
  beforeEach(module('pessoas.module'));
  
  describe('Pessoas', function(){
	var $httpBackend, Pessoas, restURL;
	  
    beforeEach(inject(function($injector) {
    	$httpBackend = $injector.get('$httpBackend');
    	Pessoas = $injector.get('Pessoas');
        restURL = $injector.get('restURL');
    }));

    afterEach(function() {
    	$httpBackend.verifyNoOutstandingExpectation();
    	$httpBackend.verifyNoOutstandingRequest();
    });
    
	it('getAllAsListItems', function() {
		$httpBackend.when('GET', restURL+'/items/pessoas').respond("test");
    	Pessoas.getAllAsListItems().then(function(response) {
        	expect(response.status).toBe(200);
    		expect(response.data).toBe("test");
    	});
    	$httpBackend.flush();
	});

    it('getAll', function() {
    	$httpBackend.when('GET', restURL+'/pessoas').respond("test");
    	Pessoas.getAll().then(function(response) {
        	expect(response.status).toBe(200);
    		expect(response.data).toBe("test");
    	});
    	$httpBackend.flush();
    });
    
    it('get', function() {
    	$httpBackend.when('GET', restURL+'/pessoas/1').respond("test");
    	Pessoas.get('1').then(function(response) {
        	expect(response.status).toBe(200);
    		expect(response.data).toBe("test");
    	});
    	$httpBackend.flush();
    });
    
    it('create throws exception : id not defined', function() {
    	try{
    		Pessoas.create({oidPessoas:null,name:'pessoas'});
    		$httpBackend.flush();
    	} catch(errors) {
    		expect(errors[0]).toBe('pessoas.id.not.defined');
    	}
    });
    
    it('create', function() {
    	$httpBackend.when('POST', restURL+'/pessoas').respond("test");
    	Pessoas.create({oidPessoas:'1',name:'pessoas'}).then(function(response) {
        	expect(response.status).toBe(200);
    		expect(response.data).toBe("test");
    	});
    	$httpBackend.flush();
    });
    
    it('update throws exception : id not defined', function() {
    	try{
    		Pessoas.update({oidPessoas:null,name:'pessoas'});
    		$httpBackend.flush();
    	} catch(errors) {
    		expect(errors[0]).toBe('pessoas.id.not.defined');
    	}
    });
    
    it('update', function() {
    	$httpBackend.when('PUT', restURL+'/pessoas/1').respond("test");
    	Pessoas.update({oidPessoas:'1',name:'pessoas'}).then(function(response) {
        	expect(response.status).toBe(200);
    		expect(response.data).toBe("test");
    	});
    	$httpBackend.flush();
    });
    
    it('delete', function() {
    	$httpBackend.when('DELETE', restURL+'/pessoas/1').respond("test");
    	Pessoas.delete('1').then(function(response) {
        	expect(response.status).toBe(200);
    		expect(response.data).toBe("test");
    	});
    	$httpBackend.flush();
    });
  });
});