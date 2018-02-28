'use strict';

/**
 * Factory for Pessoas
 */
pessoasModule.factory('Pessoas', ['$http', 'restURL', function($http, restURL) {

	// REST Service URL to manage pessoas
    var entityURL = restURL + '/pessoas';
	
	/**
     * Validate pessoas
     * @param pessoas pessoas
     * @throws validation exception
     */
	var validate = function (pessoas) {
		var errors = [];
		
		debugger;
		if ( typeof pessoas.nrEmail == "undefined" || pessoas.nrEmail.length > 0) {
			var valEmail = isValidEmailAddress(pessoas.nrEmail);
			if ( valEmail == false) {
				errors.push('pessoas.email.not.valid');
			}
		}
		
		if(errors.length > 0) {
			throw errors;
		}
    };
    
    function isValidEmailAddress(emailAddress) {
        var pattern = new RegExp(/^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i);
        return pattern.test(emailAddress);
    }
	
	return {
        /**
         * Get all pessoass as list items
         * @return all pessoass as list items
         */
    	getAllAsListItems: function() {
        	return $http.get(restURL + '/items/pessoas');
    	},

        /**
         * Get all pessoass
         * @return all pessoass
         */
    	getAll: function() {
        	return $http.get(entityURL);
    	},

        /**
         * Get pessoas
         * @param oidPessoas oidPessoas
         * @return pessoas
         */
    	get: function(oidPessoas) {
    	    var url = entityURL + '/' + oidPessoas;
        	return $http.get(url);
    	},

        /**
         * Create a new pessoas
         * @param pessoas pessoas
         * @return pessoas saved
         */
		create: function(pessoas) {
			validate(pessoas)
			var url = entityURL;
			return $http.post(url, pessoas);
    	},

        /**
         * Update pessoas
         * @param pessoas pessoas
         * @return pessoas saved
         */
    	update: function(pessoas) {
			validate(pessoas)
			var url = entityURL + '/' + pessoas.oidPessoas;
			return $http.put(url, pessoas);
    	},

		/**
         * Delete pessoas
         * @param oidPessoas oidPessoas
         */
    	delete: function(oidPessoas) {
        	var url = entityURL + '/' + oidPessoas;
        	return $http.delete(url);
    	}
	};
	return $this;
}]);

