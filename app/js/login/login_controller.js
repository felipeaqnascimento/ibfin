'use strict';

/**
 * Controller for Login
 **/
loginModule.controller('LoginCtrl', ['LoginFact', 'Menu', '$rootScope', '$scope', '$routeParams', '$http', '$location', '$cookies', 'MessageHandler', 'restURL', '$window', function(LoginFact,  Menu, $rootScope, $scope, $routeParams, $http, $location, $cookies, MessageHandler, restURL, $window) {
    
    $scope.usuario;
    
    /**
     * Faz Login
     */
	$scope.login = function() {
        
		debugger;
      
        if($scope.usuario.username != null && $scope.usuario.username != "" &&
        
        	$scope.usuario.password != null && $scope.usuario.password != ""){
			$scope.usuario.username = $scope.usuario.username.replace('-','');
			var Re = new RegExp("\\.","g");
			$scope.usuario.username = $scope.usuario.username.replace(Re,'');
			console.log($scope.usuario.username);	
            LoginFact.fazerLogin($scope.usuario).then(
            function(retorno){
                
            	
            	MessageHandler.cleanMessage();
                
                if(retorno.data.sucesso){
                    
                	MessageHandler.addSuccess(retorno.data.mensagem);
                
                    $window.localStorage.setItem("loginUsr", JSON.stringify(retorno.data));
                    
                    var loginUsr = $window.localStorage.getItem("loginUsr");
                	
        			if (localStorage.getItem("loginUsr") != null) {
        				
        				$rootScope.nomeUsuario = JSON.parse(localStorage.getItem("loginUsr")).informacoesUsuario.nmUsuario;
        				
        			}
                    
                    $location.path('/');
                }
                else{
                    MessageHandler.addError(retorno.data.mensagem);
                     }
                 }
            )
        }
        
        
    };

}]);