'use strict';

/**
 * Controller for Bancos
 **/

bancosModule.controller('BancosCtrl', ['Bancos',  '$scope', '$routeParams', '$http', '$location', '$cookies', 'MessageHandler', 'restURL', function(Bancos, $scope, $routeParams, $http, $location, $cookies, MessageHandler, restURL) {
	    // edition mode
    $scope.mode = null;
    
	// list of bancoss
    $scope.bancoss = [];
	// bancos to edit
    $scope.bancos = null;

	// referencies entities
	$scope.items = {};

    /**
     * Load all referencies entities
     */
	$scope.loadAllReferencies = function() {
    };
    
    /**
     * Refresh bancoss list
     */
    $scope.refreshBancosList = function() {
    	
    	try {
			$scope.bancoss = [];
        	Bancos.getAll().then(
				function(success) {
        	        $scope.bancoss = success.data;
            	}, 
	            MessageHandler.manageError);
    	} catch(ex) {
    		MessageHandler.manageException(ex);
    	}
    }
    /**
     * Refresh bancos
     */
    $scope.refreshBancos = function(oidBancos) {
    	
    	try {
        	$scope.bancos = null;
	        Bancos.get(oidBancos).then(
				function(success) {
        	        $scope.bancos = success.data;
            	}, 
	            MessageHandler.manageError);
    	  } catch(ex) {
        	MessageHandler.manageException(ex);
    	}
    }

    /**
     * Go to the bancoss list page
     */
    $scope.goToBancosList = function() {
        $scope.refreshBancosList();
        $location.path('/bancos');
    }
    /**
     * Go to the bancos edit page
     */
    $scope.goToBancos = function(oidBancos) {
    	$scope.refreshBancos(oidBancos);
        $location.path('/bancos/'+oidBancos);
    }

    // Actions
    
    /**
     * Save bancos
     */
    $scope.save = function() {
    	try {
			MessageHandler.cleanMessage();
			var save;
			if( $scope.mode === 'create' ) {
        		save = Bancos.create;
			} else {
				save = Bancos.update;
			}
			save($scope.bancos).then(
    	        function(success) {
	                MessageHandler.addSuccess('save ok');
                	$scope.bancos = success.data;
            	},
        	    MessageHandler.manageError);
    	} catch(ex) {
        	MessageHandler.manageException(ex);
    	}
    };
    /**
     * Delete bancos
     */
    $scope.delete = function(oidBancos) {
	    try {
			MessageHandler.cleanMessage();
    	    Bancos.delete(oidBancos).then(
				function(success) {
                	$scope.goToBancosList();
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
        $scope.bancos = {};
        $scope.mode = 'create';
		$scope.loadAllReferencies();
        $scope.bookorderitem = null;
    } else if( $routeParams.oidBancos != null ) {
        // Edit page
		$scope.loadAllReferencies();
		$scope.refreshBancos($routeParams.oidBancos);
    } else {
        // List page
        $scope.refreshBancosList();
    }
    
  
}]);

