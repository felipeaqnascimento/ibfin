'use strict';

/**
 * Factory for ContasReceber
 */
contasReceberModule.factory('ContasReceber', ['$http', 'restURL', function ($http, restURL) {

	// REST Service URL to manage contasReceber
	var entityURL = restURL + '/contasReceber';

	/**
     * Validate contasReceber
     * @param contasReceber contasReceber
     * @throws validation exception
     */
	var validate = function (contasReceber) {
		var errors = [];
		/*
		if( contasReceber.oidContasReceber == null || contasReceber.oidContasReceber == '' ) {
			errors.push('contasReceber.id.not.defined');
		}
		if(errors.length > 0) {
			throw errors;
		}
		*/
	};

	return {
        /**
         * Get all contasRecebers as list items
         * @return all contasRecebers as list items
         */
		getAllAsListItems: function () {
			return $http.get(restURL + '/items/contasReceber');
		},

        /**
         * Get all contasRecebers
         * @return all contasRecebers
         */
		getAll: function () {
			return $http.get(entityURL);
		},

        /**
         * Get contasReceber
         * @param oidContasReceber oidContasReceber
         * @return contasReceber
         */
		get: function (oidContasReceber) {
			var url = entityURL + '/' + oidContasReceber;
			return $http.get(url);
		},

        /**
         * Create a new contasReceber
         * @param contasReceber contasReceber
         * @return contasReceber saved
         */
		create: function (contasReceber) {
			validate(contasReceber)
			var url = entityURL;
			return $http.post(url, contasReceber);
		},

        /**
         * Update contasReceber
         * @param contasReceber contasReceber
         * @return contasReceber saved
         */
		update: function (contasReceber) {
			validate(contasReceber)
			var url = entityURL + '/' + contasReceber.oidContasReceber;
			return $http.put(url, contasReceber);
		},

		/**
         * Delete contasReceber
         * @param oidContasReceber oidContasReceber
         */
		delete: function (oidContasReceber) {
			var url = entityURL + '/' + oidContasReceber;
			return $http.delete(url);
		}
	};
	return $this;
}]);

