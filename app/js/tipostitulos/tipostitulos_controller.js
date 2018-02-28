'use strict';

/**
 * Controller for TiposTitulos
 **/
tiposTitulosModule.controller('TiposTitulosCtrl', ['TiposTitulos',  '$scope', '$routeParams', '$http', '$location', '$cookies', 'MessageHandler', 'restURL', function(TiposTitulos, $scope, $routeParams, $http, $location, $cookies, MessageHandler, restURL) {
	    // edition mode
    $scope.mode = null;
    
	// list of tiposTituloss
    $scope.tiposTituloss = [];
	// tiposTitulos to edit
    $scope.tiposTitulos = null;

	// referencies entities
	$scope.items = {};

    /**
     * Load all referencies entities
     */
	$scope.loadAllReferencies = function() {
    };
    
    /**
     * Refresh tiposTituloss list
     */
    $scope.refreshTiposTitulosList = function() {
    	try {
			$scope.tiposTituloss = [];
        	TiposTitulos.getAll().then(
				function(success) {
        	        $scope.tiposTituloss = success.data;
            	}, 
	            MessageHandler.manageError);
    	} catch(ex) {
    		MessageHandler.manageException(ex);
    	}
    }
    /**
     * Refresh tiposTitulos
     */
    $scope.refreshTiposTitulos = function(oidTiposTitulos) {
    	try {
        	$scope.tiposTitulos = null;
	        TiposTitulos.get(oidTiposTitulos).then(
				function(success) {
        	        $scope.tiposTitulos = success.data;
            	}, 
	            MessageHandler.manageError);
    	  } catch(ex) {
        	MessageHandler.manageException(ex);
    	}
    }

    /**
     * Go to the tiposTituloss list page
     */
    $scope.goToTiposTitulosList = function() {
        $scope.refreshTiposTitulosList();
        $location.path('/tiposTitulos');
    }
    /**
     * Go to the tiposTitulos edit page
     */
    $scope.goToTiposTitulos = function(oidTiposTitulos) {
        $scope.refreshTiposTitulos(oidTiposTitulos);
        $location.path('/tiposTitulos/'+oidTiposTitulos);
    }

    // Actions

    /**
     * Save tiposTitulos
     */
    $scope.save = function() {
    	try {
			MessageHandler.cleanMessage();
			var save;
			if( $scope.mode === 'create' ) {
        		save = TiposTitulos.create;
			} else {
				save = TiposTitulos.update;
			}
			save($scope.tiposTitulos).then(
    	        function(success) {
	                MessageHandler.addSuccess('save ok');
                	$scope.tiposTitulos = success.data;
            	},
        	    MessageHandler.manageError);
    	} catch(ex) {
        	MessageHandler.manageException(ex);
    	}
    };
    /**
     * Delete tiposTitulos
     */
    $scope.delete = function(oidTiposTitulos) {
	    try {
			MessageHandler.cleanMessage();
    	    TiposTitulos.delete(oidTiposTitulos).then(
				function(success) {
                	$scope.goToTiposTitulosList();
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
        $scope.tiposTitulos = {};
        $scope.mode = 'create';
		$scope.loadAllReferencies();
        $scope.bookorderitem = null;
    } else if( $routeParams.oidTiposTitulos != null ) {
        // Edit page
		$scope.loadAllReferencies();
		$scope.refreshTiposTitulos($routeParams.oidTiposTitulos);
    } else {
        // List page
        $scope.refreshTiposTitulosList();
    }
    
    
}]);
