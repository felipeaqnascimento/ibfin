'use strict';

/**
 * Factory for CentrosCustos
 */
centrosCustosModule.factory('CentrosCustos', ['$http', 'restURL', function($http, restURL) {

	// REST Service URL to manage centrosCustos
    var entityURL = restURL + '/centrosCustos';
	
	/**
     * Validate centrosCustos
     * @param centrosCustos centrosCustos
     * @throws validation exception
     */
	var validate = function (centrosCustos) {
		var errors = [];
        /*if( centrosCustos.oidCentrosCustos == null || centrosCustos.oidCentrosCustos == '' ) {
			errors.push('centrosCustos.id.not.defined');
		}
		if(errors.length > 0) {
			throw errors;
		}*/
    };
	
	return {
        /**
         * Get all centrosCustoss as list items
         * @return all centrosCustoss as list items
         */
    	getAllAsListItems: function() {
        	return $http.get(restURL + '/items/centrosCustos');
    	},

        /**
         * Get all centrosCustoss
         * @return all centrosCustoss
         */
    	getAll: function() {
        	return $http.get(entityURL);
    	},

        /**
         * Get centrosCustos
         * @param oidCentrosCustos oidCentrosCustos
         * @return centrosCustos
         */
    	get: function(oidCentrosCustos) {
    	    var url = entityURL + '/' + oidCentrosCustos;
        	return $http.get(url);
    	},

        /**
         * Create a new centrosCustos
         * @param centrosCustos centrosCustos
         * @return centrosCustos saved
         */
		create: function(centrosCustos) {
			validate(centrosCustos)
			var url = entityURL;
			return $http.post(url, centrosCustos);
    	},

        /**
         * Update centrosCustos
         * @param centrosCustos centrosCustos
         * @return centrosCustos saved
         */
    	update: function(centrosCustos) {
			validate(centrosCustos)
			var url = entityURL + '/' + centrosCustos.oidCentrosCustos;
			return $http.put(url, centrosCustos);
    	},

		/**
         * Delete centrosCustos
         * @param oidCentrosCustos oidCentrosCustos
         */
    	delete: function(oidCentrosCustos) {
        	var url = entityURL + '/' + oidCentrosCustos;
        	return $http.delete(url);
    	}
	};
	return $this;
}]);

