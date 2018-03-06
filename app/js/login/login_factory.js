'use strict';

/**
 * Factory for Login
 */
loginModule.factory('LoginFact', ['$http', 'FinanceiroService', '$window', 'RestService', 'restURL', function($http, FinanceiroService, $window, RestService, restURL) {
	
	return {
		fazerLogin: function(usuario){
			debugger;
			var obj = JSON.stringify(usuario);
			return FinanceiroService.doPost('login', obj, false);
		},		
	};
	return $this;
}]);

