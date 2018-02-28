'use strict';

/**
 * Controller for ContasPagarRateio
 **/
contasPagarRateioModule.controller('ContasPagarRateioCtrl', ['ContasPagarRateio', 'CentrosCustos', '$scope', '$routeParams', '$http', '$location', '$cookies', 'MessageHandler', 'restURL', function(ContasPagarRateio, CentrosCustos, $scope, $routeParams, $http, $location, $cookies, MessageHandler, restURL) {
	    'CentrosCustos' // edition mode
    $scope.mode = null;
    
	// list of contasPagarRateios
    $scope.contasPagarRateios = [];
    
	// contasPagarRateio to edit
    $scope.contasPagarRateio = null;

	// referencies entities
	$scope.items = {};
	
	// centrosCustoss
	$scope.items.centrosCustoss = [];

    /**
     * Load all referencies entities
     */
	$scope.loadAllReferencies = function() {
		CentrosCustos.getAllAsListItems().then(
			function(success) {
    	        $scope.items.centrosCustoss = success.data;
        	}, 
            MessageHandler.manageError);
    };
    
    /**
     * Refresh contasPagarRateios list
     */
    $scope.refreshContasPagarRateioList = function() {
    	try {
			$scope.contasPagarRateios = [];
        	ContasPagarRateio.getAll().then(
				function(success) {
        	        $scope.contasPagarRateios = success.data;
            	}, 
	            MessageHandler.manageError);
    	} catch(ex) {
    		MessageHandler.manageException(ex);
    	}
    }
    /**
     * Refresh contasPagarRateio
     */
    $scope.refreshContasPagarRateio = function(oidContasPagarRateio) {
    	try {
        	$scope.contasPagarRateio = null;
	        ContasPagarRateio.get(oidContasPagarRateio).then(
				function(success) {
        	        $scope.contasPagarRateio = success.data;
            	}, 
	            MessageHandler.manageError);
    	  } catch(ex) {
        	MessageHandler.manageException(ex);
    	}
    }

    /**
     * Go to the contasPagarRateios list page
     */
    $scope.goToContasPagarRateioList = function() {
        $scope.refreshContasPagarRateioList();
        $location.path('/contasPagarRateio');
    }
    /**
     * Go to the contasPagarRateio edit page
     */
    $scope.goToContasPagarRateio = function(oidContasPagarRateio) {
        $scope.refreshContasPagarRateio(oidContasPagarRateio);
        $location.path('/contasPagarRateio/'+oidContasPagarRateio);
    }

    // Actions

    /**
     * Save contasPagarRateio
     */
    $scope.save = function() {
    	try {
			MessageHandler.cleanMessage();
			var save;
			if( $scope.mode === 'create' ) {
        		save = ContasPagarRateio.create;
			} else {
				save = ContasPagarRateio.update;
			}
			save($scope.contasPagarRateio).then(
    	        function(success) {
	                MessageHandler.addSuccess('save ok');
                	$scope.contasPagarRateio = success.data;
            	},
        	    MessageHandler.manageError);
    	} catch(ex) {
        	MessageHandler.manageException(ex);
    	}
    };
    /**
     * Delete contasPagarRateio
     */
    $scope.delete = function(oidContasPagarRateio) {
	    try {
			MessageHandler.cleanMessage();
    	    ContasPagarRateio.delete(oidContasPagarRateio).then(
				function(success) {
                	$scope.goToContasPagarRateioList();
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
        $scope.contasPagarRateio = {};
        $scope.mode = 'create';
		$scope.loadAllReferencies();
        $scope.bookorderitem = null;
    } else if( $routeParams.oidContasPagarRateio != null ) {
        // Edit page
		$scope.loadAllReferencies();
		$scope.refreshContasPagarRateio($routeParams.oidContasPagarRateio);
    } else {
        // List page
        $scope.refreshContasPagarRateioList();
    }
    
    
}]);
