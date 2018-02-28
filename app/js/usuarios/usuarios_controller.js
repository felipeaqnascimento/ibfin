'use strict';

/**
 * Controller for Usuarios
 **/
usuariosModule.controller('UsuariosCtrl', ['Usuarios',  '$scope', '$routeParams', '$http', '$location', '$cookies', 'MessageHandler', 'restURL', function(Usuarios, $scope, $routeParams, $http, $location, $cookies, MessageHandler, restURL) {
	    // edition mode
    $scope.mode = null;
    
	// list of usuarioss
    $scope.usuarioss = [];
	// usuarios to edit
    $scope.usuarios = null;

	// referencies entities
	$scope.items = {};

    /**
     * Load all referencies entities
     */
	$scope.loadAllReferencies = function() {
    };
    
    /**
     * Refresh usuarioss list
     */
    $scope.refreshUsuariosList = function() {
    	try {
			$scope.usuarioss = [];
        	Usuarios.getAll().then(
				function(success) {
        	        $scope.usuarioss = success.data;
            	}, 
	            MessageHandler.manageError);
    	} catch(ex) {
    		MessageHandler.manageException(ex);
    	}
    }
    /**
     * Refresh usuarios
     */
    $scope.refreshUsuarios = function(oidUsuarios) {
    	try {
        	$scope.usuarios = null;
	        Usuarios.get(oidUsuarios).then(
				function(success) {
        	        $scope.usuarios = success.data;
            	}, 
	            MessageHandler.manageError);
    	  } catch(ex) {
        	MessageHandler.manageException(ex);
    	}
    }

    /**
     * Go to the usuarioss list page
     */
    $scope.goToUsuariosList = function() {
        $scope.refreshUsuariosList();
        $location.path('/usuarios');
    }
    /**
     * Go to the usuarios edit page
     */
    $scope.goToUsuarios = function(oidUsuarios) {
        $scope.refreshUsuarios(oidUsuarios);
        $location.path('/usuarios/'+oidUsuarios);
    }

    // Actions

    /**
     * Save usuarios
     */
    $scope.save = function() {
    	try {
			MessageHandler.cleanMessage();
			var save;
			if( $scope.mode === 'create' ) {
        		save = Usuarios.create;
			} else {
				save = Usuarios.update;
			}
			save($scope.usuarios).then(
    	        function(success) {
	                MessageHandler.addSuccess('save ok');
                	$scope.usuarios = success.data;
            	},
        	    MessageHandler.manageError);
    	} catch(ex) {
        	MessageHandler.manageException(ex);
    	}
    };
    /**
     * Delete usuarios
     */
    $scope.delete = function(oidUsuarios) {
	    try {
			MessageHandler.cleanMessage();
    	    Usuarios.delete(oidUsuarios).then(
				function(success) {
                	$scope.goToUsuariosList();
            	}, 
                MessageHandler.manageError);
        } catch(ex) {
            MessageHandler.manageException(ex);
        }
    };
    
    // Main
	MessageHandler.cleanMessage();
    if( $location.path().endsWith('/new') ) {
        // Creation page
        $scope.usuarios = {};
        $scope.mode = 'create';
		$scope.loadAllReferencies();
        $scope.bookorderitem = null;
    } else if( $routeParams.oidUsuarios != null ) {
        // Edit page
		$scope.loadAllReferencies();
		$scope.refreshUsuarios($routeParams.oidUsuarios);
    } else {
        // List page
        $scope.refreshUsuariosList();
    }
    
    
}]);
