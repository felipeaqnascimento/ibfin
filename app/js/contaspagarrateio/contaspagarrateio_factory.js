'use strict';

/**
 * Factory for ContasPagarRateio
 */
contasPagarRateioModule.factory('ContasPagarRateio', ['$http', 'restURL', function($http, restURL) {

	// REST Service URL to manage contasPagarRateio
    var entityURL = restURL + '/contasPagarRateio';
	
	/**
     * Validate contasPagarRateio
     * @param contasPagarRateio contasPagarRateio
     * @throws validation exception
     */
	var validate = function (contasPagarRateio) {
		var errors = [];
        if( contasPagarRateio.oidContasPagarRateio == null || contasPagarRateio.oidContasPagarRateio == '' ) {
			errors.push('contasPagarRateio.id.not.defined');
		}
		if(errors.length > 0) {
			throw errors;
		}
    };
	
	return {
        /**
         * Get all contasPagarRateios as list items
         * @return all contasPagarRateios as list items
         */
    	getAllAsListItems: function() {
        	return $http.get(restURL + '/items/contasPagarRateio');
    	},

        /**
         * Get all contasPagarRateios
         * @return all contasPagarRateios
         */
    	getAll: function() {
        	return $http.get(entityURL);
    	},

        /**
         * Get contasPagarRateio
         * @param oidContasPagarRateio oidContasPagarRateio
         * @return contasPagarRateio
         */
    	get: function(oidContasPagarRateio) {
    	    var url = entityURL + '/' + oidContasPagarRateio;
        	return $http.get(url);
    	},

        /**
         * Create a new contasPagarRateio
         * @param contasPagarRateio contasPagarRateio
         * @return contasPagarRateio saved
         */
		create: function(contasPagarRateio) {
			validate(contasPagarRateio)
			var url = entityURL;
			return $http.post(url, contasPagarRateio);
    	},

        /**
         * Update contasPagarRateio
         * @param contasPagarRateio contasPagarRateio
         * @return contasPagarRateio saved
         */
    	update: function(contasPagarRateio) {
			validate(contasPagarRateio)
			var url = entityURL + '/' + contasPagarRateio.oidContasPagarRateio;
			return $http.put(url, contasPagarRateio);
    	},

		/**
         * Delete contasPagarRateio
         * @param oidContasPagarRateio oidContasPagarRateio
         */
    	delete: function(oidContasPagarRateio) {
        	var url = entityURL + '/' + oidContasPagarRateio;
        	return $http.delete(url);
    	}
	};
	return $this;
}]);

