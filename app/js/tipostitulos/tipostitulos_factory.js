'use strict';

/**
 * Factory for TiposTitulos
 */
tiposTitulosModule.factory('TiposTitulos', ['$http', 'restURL', function($http, restURL) {

	// REST Service URL to manage tiposTitulos
    var entityURL = restURL + '/tiposTitulos';
	
	/**
     * Validate tiposTitulos
     * @param tiposTitulos tiposTitulos
     * @throws validation exception
     */
	var validate = function (tiposTitulos) {
		var errors = [];
        /*if( tiposTitulos.oidTiposTitulos == null || tiposTitulos.oidTiposTitulos == '' ) {
			errors.push('tiposTitulos.id.not.defined');
		}
		if(errors.length > 0) {
			throw errors;
		}*/
    };
	
	return {
        /**
         * Get all tiposTituloss as list items
         * @return all tiposTituloss as list items
         */
    	getAllAsListItems: function() {
        	return $http.get(restURL + '/items/tiposTitulos');
    	},

        /**
         * Get all tiposTituloss
         * @return all tiposTituloss
         */
    	getAll: function() {
        	return $http.get(entityURL);
    	},

        /**
         * Get tiposTitulos
         * @param oidTiposTitulos oidTiposTitulos
         * @return tiposTitulos
         */
    	get: function(oidTiposTitulos) {
    	    var url = entityURL + '/' + oidTiposTitulos;
        	return $http.get(url);
    	},

        /**
         * Create a new tiposTitulos
         * @param tiposTitulos tiposTitulos
         * @return tiposTitulos saved
         */
		create: function(tiposTitulos) {
			validate(tiposTitulos)
			var url = entityURL;
			return $http.post(url, tiposTitulos);
    	},

        /**
         * Update tiposTitulos
         * @param tiposTitulos tiposTitulos
         * @return tiposTitulos saved
         */
    	update: function(tiposTitulos) {
			validate(tiposTitulos)
			var url = entityURL + '/' + tiposTitulos.oidTiposTitulos;
			return $http.put(url, tiposTitulos);
    	},

		/**
         * Delete tiposTitulos
         * @param oidTiposTitulos oidTiposTitulos
         */
    	delete: function(oidTiposTitulos) {
        	var url = entityURL + '/' + oidTiposTitulos;
        	return $http.delete(url);
    	}
	};
	return $this;
}]);

