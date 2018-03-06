'use strict';

/**
 * 
 */
restServiceModule.factory('RestService', ['$http', 'restURL', '$window', function($http, restURL, $window) {

	//variables
	
	return {
    	doGet: function(caminho, parametros, comToken) {
			comToken = (typeof comToken !== 'undefined') ? comToken : true;
            var cabecalho;
            if(comToken){
                cabecalho = {
                    "X-Session-Data": JSON.parse(localStorage.getItem("loginUsr")).token
                };
            }
			var url = restURL + '/' + caminho;
        	return $http.get(url, {params: parametros, headers: cabecalho});
    	},

		doPost: function(caminho, corpo) {
			//debugger;
			var cabecalho = {
				"X-Session-Data": JSON.parse(localStorage.getItem("loginUsr")).token
			};
			var url = restURL + '/' + caminho;
        	return $http.post(url, corpo, {headers: cabecalho});
    	},

		doPut: function(caminho, parametros, corpo) {
			debugger;
			var cabecalho = {
				"X-Session-Data": JSON.parse(localStorage.getItem("loginUsr")).token
			};
			var url = restURL + '/' + caminho;
			return $http.put(url, corpo, {params: parametros, headers: cabecalho});
    	},

		doDelete: function(caminho, parametros) {
			//debugger;
			var cabecalho = {
				"X-Session-Data": JSON.parse(localStorage.getItem("loginUsr")).token
			};
        	var url = restURL + '/' + caminho;
			return $http.delete(url, {params: parametros, headers: cabecalho});
    	},

		
	};
	return $this;
}]);

