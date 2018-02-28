'use strict';

/**
 * Factory for Usuarios
 */
usuariosModule.factory('Usuarios', ['$http', 'restURL', function($http, restURL) {

	// REST Service URL to manage usuarios
    var entityURL = restURL + '/usuarios';
	
	/**
     * Validate usuarios
     * @param usuarios usuarios
     * @throws validation exception
     */
	var validate = function (usuarios) {
		var errors = [];
        if( usuarios.oidUsuarios == null || usuarios.oidUsuarios == '' ) {
			errors.push('usuarios.id.not.defined');
		}
		if(errors.length > 0) {
			throw errors;
		}
    };
	
	return {
        /**
         * Get all usuarioss as list items
         * @return all usuarioss as list items
         */
    	getAllAsListItems: function() {
        	return $http.get(restURL + '/items/usuarios');
    	},

        /**
         * Get all usuarioss
         * @return all usuarioss
         */
    	getAll: function() {
        	return $http.get(entityURL);
    	},

        /**
         * Get usuarios
         * @param oidUsuarios oidUsuarios
         * @return usuarios
         */
    	get: function(oidUsuarios) {
    	    var url = entityURL + '/' + oidUsuarios;
        	return $http.get(url);
    	},

        /**
         * Create a new usuarios
         * @param usuarios usuarios
         * @return usuarios saved
         */
		create: function(usuarios) {
			validate(usuarios)
			var url = entityURL;
			return $http.post(url, usuarios);
    	},

        /**
         * Update usuarios
         * @param usuarios usuarios
         * @return usuarios saved
         */
    	update: function(usuarios) {
			validate(usuarios)
			var url = entityURL + '/' + usuarios.oidUsuarios;
			return $http.put(url, usuarios);
    	},

		/**
         * Delete usuarios
         * @param oidUsuarios oidUsuarios
         */
    	delete: function(oidUsuarios) {
        	var url = entityURL + '/' + oidUsuarios;
        	return $http.delete(url);
    	}
	};
	return $this;
}]);

