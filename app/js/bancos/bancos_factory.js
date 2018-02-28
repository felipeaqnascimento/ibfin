'use strict';

/**
 * Factory for Bancos
 */
bancosModule.factory('Bancos', ['$http', 'restURL', function($http, restURL) {

	// REST Service URL to manage bancos
    var entityURL = restURL + '/bancos';
	
	/**
     * Validate bancos
     * @param bancos bancos
     * @throws validation exception
     */
	var validate = function (bancos) {
		var errors = [];
        /*if( bancos.oidBancos == null || bancos.oidBancos == '' ) {
			errors.push('bancos.id.not.defined');
		}
		if(errors.length > 0) {
			throw errors;
		}*/
    };
	
	return {
        /**
         * Get all bancoss as list items
         * @return all bancoss as list items
         */
    	getAllAsListItems: function() {
        	return $http.get(restURL + '/items/bancos');
    	},

        /**
         * Get all bancoss
         * @return all bancoss
         */
    	getAll: function() {
        	return $http.get(entityURL);
    	},

        /**
         * Get bancos
         * @param oidBancos oidBancos
         * @return bancos
         */
    	get: function(oidBancos) {
    	    var url = entityURL + '/' + oidBancos;
        	return $http.get(url);
    	},

        /**
         * Create a new bancos
         * @param bancos bancos
         * @return bancos saved
         */
		create: function(bancos) {
			validate(bancos);
			var url = entityURL;
			return $http.post(url, bancos);
    	},

        /**
         * Update bancos
         * @param bancos bancos
         * @return bancos saved
         */
    	update: function(bancos) {
			validate(bancos)
			var url = entityURL + '/' + bancos.oidBancos;
			return $http.put(url, bancos);
    	},

		/**
         * Delete bancos
         * @param oidBancos oidBancos
         */
    	delete: function(oidBancos) {
        	var url = entityURL + '/' + oidBancos;
        	return $http.delete(url);
    	}
	};
	return $this;
}]);

