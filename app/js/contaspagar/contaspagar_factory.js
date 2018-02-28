'use strict';

/**
 * Factory for ContasPagar
 */
contasPagarModule.factory('ContasPagar', ['$http', 'restURL', function($http, restURL) {

	// REST Service URL to manage contasPagar
    var entityURL = restURL + '/contasPagar';
	
	/**
	 * Validate contasPagar
	 * 
	 * @param contasPagar
	 *            contasPagar
	 * @throws validation
	 *             exception
	 */
	var validate = function (contasPagar) {
		var errors = [];
		/*
		 * if( contasPagar.oidContasPagar == null || contasPagar.oidContasPagar == '' ) {
		 * errors.push('contasPagar.id.not.defined'); } if(errors.length > 0) {
		 * throw errors; }
		 */
    };
	
	return {
        /**
		 * Get all contasPagars as list items
		 * 
		 * @return all contasPagars as list items
		 */
    	getAllAsListItems: function() {
        	return $http.get(restURL + '/items/contasPagar');
    	},

        /**
		 * Get all contasPagars
		 * 
		 * @return all contasPagars
		 */
    	getAll: function() {
        	return $http.get(entityURL);
    	},

        /**
		 * Get contasPagar
		 * 
		 * @param oidContasPagar
		 *            oidContasPagar
		 * @return contasPagar
		 */
    	get: function(oidContasPagar) {
    	    var url = entityURL + '/' + oidContasPagar;
        	return $http.get(url);
    	},

        /**
		 * Create a new contasPagar
		 * 
		 * @param contasPagar
		 *            contasPagar
		 * @return contasPagar saved
		 */
		create: function(contasPagar) {
			validate(contasPagar)
			var url = entityURL;
			return $http.post(url, contasPagar);
    	},

        /**
		 * Update contasPagar
		 * 
		 * @param contasPagar
		 *            contasPagar
		 * @return contasPagar saved
		 */
    	update: function(contasPagar) {
			validate(contasPagar)
			var url = entityURL + '/' + contasPagar.oidContasPagar;
			return $http.put(url, contasPagar);
    	},

		/**
		 * Delete contasPagar
		 * 
		 * @param oidContasPagar
		 *            oidContasPagar
		 */
    	delete: function(oidContasPagar) {
        	var url = entityURL + '/' + oidContasPagar;
        	return $http.delete(url);
    	}
	};
	return $this;
}]);

