'use strict';

/**
 * Controller for ContasPagar
 */
contasPagarModule.controller('ContasPagarCtrl', ['ContasPagar', 'Pessoas', 'TiposTitulos', 'Bancos', 'CentrosCustos', '$scope', '$routeParams', '$http', '$location', '$cookies', 'MessageHandler', 'restURL', function(ContasPagar, Pessoas, TiposTitulos, Bancos, CentrosCustos, $scope, $routeParams, $http, $location, $cookies, MessageHandler, restURL) {
	    'Pessoas', 'TiposTitulos', 'Bancos', 'CentrosCustos' // edition mode
    $scope.mode = null;
    
	// list of contasPagars
    $scope.contasPagars = [];
	// contasPagar to edit
    $scope.contasPagar = null;

	// referencies entities
	$scope.items = {};
	
	// oidPessoass
	$scope.items.pessoass = [];
	
	// tiposTituloss
	$scope.items.tiposTituloss = [];
	
	// bancoss
	$scope.items.bancoss = [];
	
	// centrosCustoss
	$scope.centrosCustoss = [];

	$scope.teste;

	/**
	 * Load all referencies entities
	 */
	$scope.loadAllReferencies = function() {
		Pessoas.getAllAsListItems().then(
			function(success) {
    	        $scope.items.pessoass = success.data;
        	}, 
            MessageHandler.manageError);
		
		TiposTitulos.getAllAsListItems().then(
			function(success) {
    	        $scope.items.tiposTituloss = success.data;
        	}, 
            MessageHandler.manageError);
		
		Bancos.getAllAsListItems().then(
				function(success) {
	    	        $scope.items.bancoss = success.data;
	        	}, 
	            MessageHandler.manageError);
		
		CentrosCustos.getAllAsListItems().then(
				function(success) {
	    	        $scope.items.centrosCustoss = success.data;
	        	}, 
	            MessageHandler.manageError);
    };
    
    /**
	 * Refresh contasPagars list
	 */
    $scope.refreshContasPagarList = function() {
    	try {
			$scope.contasPagars = [];
        	ContasPagar.getAll().then(
				function(success) {
        	        $scope.contasPagars = success.data;
        	        
        	        for(var i = 0; i < $scope.contasPagars.length; i++){
        	    		var dados = $scope.contasPagars[i];
        	    		//dados.vrBruto = formataRetornoNumero(dados.vrBruto.toString());
        	    		//dados.vrJuros = formataRetornoNumero(dados.vrJuros.toString());
        	    		//dados.vrDesconto = formataRetornoNumero(dados.vrDesconto.toString());
        	    	}
        	        
            	}, 
	            MessageHandler.manageError);
    	} catch(ex) {
    		MessageHandler.manageException(ex);
    	}
    }
    /**
	 * Refresh contasPagar
	 */
    $scope.refreshContasPagar = function(oidContasPagar) {
    	try {
        	$scope.contasPagar = null;
	        ContasPagar.get(oidContasPagar).then(
				function(success) {
        	        $scope.contasPagar = success.data;
        	        //$scope.contasPagar.vrBruto = formataRetornoNumero($scope.contasPagar.vrBruto.toString());
        	        //$scope.contasPagar.vrJuros = formataRetornoNumero($scope.contasPagar.vrJuros.toString());
        	        //$scope.contasPagar.vrDesconto = formataRetornoNumero($scope.contasPagar.vrDesconto.toString());
            	}, 
	            MessageHandler.manageError);
    	  } catch(ex) {
        	MessageHandler.manageException(ex);
    	}
    }

    /**
	 * Go to the contasPagars list page
	 */
    $scope.goToContasPagarList = function() {
        $scope.refreshContasPagarList();
        $location.path('/contasPagar');
    }
    /**
	 * Go to the contasPagar edit page
	 */
    $scope.goToContasPagar = function(oidContasPagar) {
        $scope.refreshContasPagar(oidContasPagar);
        $location.path('/contasPagar/'+oidContasPagar);
    }

    // Actions
    $scope.saveTabular = function(contasPagar) {
    	try {
			debugger;
			var save = ContasPagar.update;
			save(contasPagar).then(
    	        function(success) {
					debugger;
	                MessageHandler.addSuccess('save ok');
                	$scope.contasPagar = success.data;
            	},
        	    MessageHandler.manageError);    		
    	} catch(ex) {
        	MessageHandler.manageException(ex);
    	}
    }

    /**
	 * Save contasPagar
	 */
    $scope.save = function(contasPagar) {
    	try {
			debugger;
			MessageHandler.cleanMessage();
			var save;
		//	$scope.contasPagar.vrBruto = $scope.contasPagar.vrBruto.toFixed(2).toString().replace('.','');
		//	$scope.contasPagar.vrJuros = $scope.contasPagar.vrJuros.toFixed(2).toString().replace('.','');
		//	$scope.contasPagar.vrDesconto = $scope.contasPagar.vrDesconto.toFixed(2).toString().replace('.','');
			
			if( $scope.mode === 'create' ) {
        		save = ContasPagar.create;
			} else {
				save = ContasPagar.update;
			}
			save($scope.contasPagar).then(
    	        function(success) {
    	        	MessageHandler.addSuccess('save ok');
                	$scope.contasPagar = success.data;
              //  	$scope.contasPagar.vrBruto = formataRetornoNumero($scope.contasPagar.vrBruto.toString());
              //  	$scope.contasPagar.vrJuros = formataRetornoNumero($scope.contasPagar.vrJuros.toString());
              //  	$scope.contasPagar.vrDesconto = formataRetornoNumero($scope.contasPagar.vrDesconto.toString());
            	},
        	    MessageHandler.manageError);
    	} catch(ex) {
			MessageHandler.manageException(ex);
    	}
	};

	/**
	 * Delete contasPagar
	 */
    $scope.delete = function(oidContasPagar) {
	    try {
			MessageHandler.cleanMessage();
    	    ContasPagar.delete(oidContasPagar).then(
				function(success) {
                	$scope.goToContasPagarList();
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
        $scope.contasPagar = {};
        $scope.mode = 'create';
		$scope.loadAllReferencies();
        $scope.bookorderitem = null;
    } else if( $routeParams.oidContasPagar != null ) {
        // Edit page
		$scope.loadAllReferencies();
		$scope.refreshContasPagar($routeParams.oidContasPagar);
    } else {
        // List page
        $scope.refreshContasPagarList();
    }
    
}]);
