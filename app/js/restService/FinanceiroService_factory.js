'use strict';

/**
 * Factory for FinanceiroServices
 */
financeiroServiceModule.factory('FinanceiroService', ['$http', 'FinanceiroServiceURL', '$window', function($http, financeiroServiceURL, $window) {

	//variables
	
	return {
    	doGet: function(caminho, parametros) {
			var cabecalho = {
				"X-Session-Data": JSON.parse(localStorage.getItem("loginUsr")).token
			};
			var url = financeiroServiceURL + '/' + caminho;
        	return $http.get(url, {params: parametros, headers: cabecalho});
    	},

		doPost: function(caminho, corpo, comToken) {
			debugger;
			comToken = (typeof comToken !== 'undefined') ? comToken : true;
			var cabecalho;
			if(comToken){
				cabecalho = {
					"X-Session-Data": JSON.parse(localStorage.getItem("loginUsr")).token
				};
			}
			 
			var url = financeiroServiceURL + '/' + caminho;
        	return $http.post(url, corpo, {headers: cabecalho});
    	},

		doPut: function(caminho, parametros, corpo) {
			var cabecalho = {
				"X-Session-Data": JSON.parse(localStorage.getItem("loginUsr")).token
			};
			var url = financeiroServiceURL + '/' + caminho;
			return $http.put(url, corpo, {params: parametros, headers: cabecalho});
    	},

		doDelete: function(caminho, parametros) {
			var cabecalho = {
				"X-Session-Data": JSON.parse(localStorage.getItem("loginUsr")).token
			};
        	var url = financeiroServiceURL + '/' + caminho;
			return $http.delete(url, {params: parametros, headers: cabecalho});
    	},

		
	};
	return $this;
}]);

