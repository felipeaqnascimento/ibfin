'use strict';

/**
 * Controller for CentrosCustos
 **/
centrosCustosModule.controller('CentrosCustosCtrl', ['CentrosCustos',  '$scope', '$routeParams', '$http', '$location', '$cookies', 'MessageHandler', 'restURL', function(CentrosCustos, $scope, $routeParams, $http, $location, $cookies, MessageHandler, restURL) {
	    // edition mode
    $scope.mode = null;
    
	// list of centrosCustoss
    $scope.centrosCustoss = [];
	// centrosCustos to edit
    $scope.centrosCustos = null;

	// referencies entities
	$scope.items = {};

    /**
     * Load all referencies entities
     */
	$scope.loadAllReferencies = function() {
    };
    
    /**
     * Refresh centrosCustoss list
     */
    $scope.refreshCentrosCustosList = function() {
    	try {
			$scope.centrosCustoss = [];
        	CentrosCustos.getAll().then(
				function(success) {
        	        $scope.centrosCustoss = success.data;
            	}, 
	            MessageHandler.manageError);
    	} catch(ex) {
    		MessageHandler.manageException(ex);
    	}
    }
    /**
     * Refresh centrosCustos
     */
    $scope.refreshCentrosCustos = function(oidCentrosCustos) {
    	try {
        	$scope.centrosCustos = null;
	        CentrosCustos.get(oidCentrosCustos).then(
				function(success) {
        	        $scope.centrosCustos = success.data;
            	}, 
	            MessageHandler.manageError);
    	  } catch(ex) {
        	MessageHandler.manageException(ex);
    	}
    }

    /**
     * Go to the centrosCustoss list page
     */
    $scope.goToCentrosCustosList = function() {
        $scope.refreshCentrosCustosList();
        $location.path('/centrosCustos');
    }
    /**
     * Go to the centrosCustos edit page
     */
    $scope.goToCentrosCustos = function(oidCentrosCustos) {
        $scope.refreshCentrosCustos(oidCentrosCustos);
        $location.path('/centrosCustos/'+oidCentrosCustos);
    }

    // Actions

    /**
     * Save centrosCustos
     */
    $scope.save = function() {
    	try {
			MessageHandler.cleanMessage();
			var save;
			if( $scope.mode === 'create' ) {
        		save = CentrosCustos.create;
			} else {
				save = CentrosCustos.update;
			}
			save($scope.centrosCustos).then(
    	        function(success) {
	                MessageHandler.addSuccess('save ok');
                	$scope.centrosCustos = success.data;
            	},
        	    MessageHandler.manageError);
    	} catch(ex) {
        	MessageHandler.manageException(ex);
    	}
    };
    /**
     * Delete centrosCustos
     */
    $scope.delete = function(oidCentrosCustos) {
	    try {
			MessageHandler.cleanMessage();
    	    CentrosCustos.delete(oidCentrosCustos).then(
				function(success) {
                	$scope.goToCentrosCustosList();
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
        $scope.centrosCustos = {};
        $scope.mode = 'create';
		$scope.loadAllReferencies();
        $scope.bookorderitem = null;
    } else if( $routeParams.oidCentrosCustos != null ) {
        // Edit page
		$scope.loadAllReferencies();
		$scope.refreshCentrosCustos($routeParams.oidCentrosCustos);
    } else {
        // List page
        $scope.refreshCentrosCustosList();
    }
    
    
}]);
