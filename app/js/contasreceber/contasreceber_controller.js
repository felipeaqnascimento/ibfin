'use strict';

/**
 * Controller for ContasReceber
 **/
contasReceberModule.controller('ContasReceberCtrl', ['ContasReceber', 'Pessoas', 'TiposTitulos', 'Bancos', 'CentrosCustos', '$scope', '$routeParams', '$http', '$location', '$cookies', 'MessageHandler', 'restURL', function(ContasReceber, Pessoas, TiposTitulos, Bancos, CentrosCustos, $scope, $routeParams, $http, $location, $cookies, MessageHandler, restURL) {
	'Pessoas', 'TiposTitulos', 'Bancos', 'CentrosCustos' // edition mode
	$scope.mode = null;

	// list of contasRecebers
	$scope.contasRecebers = [];
	// contasReceber to edit
	$scope.contasReceber = null;

	// referencies entities
	$scope.items = {};

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
     * Refresh contasRecebers list
     */
	$scope.refreshContasReceberList = function () {
		try {
			$scope.contasRecebers = [];
			ContasReceber.getAll().then(
				function (success) {
					$scope.contasRecebers = success.data;
				/** 
					for(var i = 0; i < $scope.contasRecebers.length; i++){
        	    		var dados = $scope.contasRecebers[i];
        	    		dados.vrBruto = formataRetornoNumero(dados.vrBruto.toString());
        	    		dados.vrJuros = formataRetornoNumero(dados.vrJuros.toString());
						dados.vrDesconto = formataRetornoNumero(dados.vrDesconto.toString());
						dados.vrBaseInss = formataRetornoNumero(dados.vrBaseInss.toString());
						dados.vrDeducaoInss = formataRetornoNumero(dados.vrDeducaoInss.toString());
						dados.vrBaseIssqn = formataRetornoNumero(dados.vrBaseIssqn.toString());
						dados.vrDeducaoIssqn = formataRetornoNumero(dados.vrDeducaoIssqn.toString());
						dados.vrBaseCsll = formataRetornoNumero(dados.vrBaseCsll.toString());
						dados.vrDeducaoCsll = formataRetornoNumero(dados.vrDeducaoCsll.toString());
						dados.vrBasePis = formataRetornoNumero(dados.vrBasePis.toString());
						dados.vrDeducaoPis = formataRetornoNumero(dados.vrDeducaoPis.toString());
						dados.vrBaseCofins = formataRetornoNumero(dados.vrBaseCofins.toString());
						dados.vrDeducaoCofins = formataRetornoNumero(dados.vrDeducaoCofins.toString());
						dados.vrBaseIrpj = formataRetornoNumero(dados.vrBaseIrpj.toString());
						dados.vrDeducaoIrpj = formataRetornoNumero(dados.vrDeducaoIrpj.toString());
						dados.vrOutrasDeducoes = formataRetornoNumero(dados.vrOutrasDeducoes.toString());
					}
					*/
				},
				MessageHandler.manageError);
		} catch (ex) {
			MessageHandler.manageException(ex);
		}
	}
    /**
     * Refresh contasReceber
     */
	$scope.refreshContasReceber = function (oidContasReceber) {
		try {
			$scope.contasReceber = null;
			ContasReceber.get(oidContasReceber).then(
				function (success) {
					$scope.contasReceber = success.data;
					/** 
					$scope.contasReceber.vrBruto = formataRetornoNumero($scope.contasReceber.vrBruto.toString());
        	        $scope.contasReceber.vrJuros = formataRetornoNumero($scope.contasReceber.vrJuros.toString());
					$scope.contasReceber.vrDesconto = formataRetornoNumero($scope.contasReceber.vrDesconto.toString());
					$scope.contasReceber.vrBaseInss = formataRetornoNumero($scope.contasReceber.vrBaseInss.toString());
					$scope.contasReceber.vrDeducaoInss = formataRetornoNumero($scope.contasReceber.vrDeducaoInss.toString());
					$scope.contasReceber.vrBaseIssqn = formataRetornoNumero($scope.contasReceber.vrBaseIssqn.toString());
					$scope.contasReceber.vrDeducaoIssqn = formataRetornoNumero($scope.contasReceber.vrDeducaoIssqn.toString());
					$scope.contasReceber.vrBaseCsll = formataRetornoNumero($scope.contasReceber.vrBaseCsll.toString());
					$scope.contasReceber.vrDeducaoCsll = formataRetornoNumero($scope.contasReceber.vrDeducaoCsll.toString());
					$scope.contasReceber.vrBasePis = formataRetornoNumero($scope.contasReceber.vrBasePis.toString());
					$scope.contasReceber.vrDeducaoPis = formataRetornoNumero($scope.contasReceber.vrDeducaoPis.toString());
					$scope.contasReceber.vrBaseCofins = formataRetornoNumero($scope.contasReceber.vrBaseCofins.toString());
					$scope.contasReceber.vrDeducaoCofins = formataRetornoNumero($scope.contasReceber.vrDeducaoCofins.toString());
					$scope.contasReceber.vrBaseIrpj = formataRetornoNumero($scope.contasReceber.vrBaseIrpj.toString());
					$scope.contasReceber.vrDeducaoIrpj = formataRetornoNumero($scope.contasReceber.vrDeducaoIrpj.toString());
					$scope.contasReceber.vrOutrasDeducoes = formataRetornoNumero($scope.contasReceber.vrOutrasDeducoes.toString());
					*/
				},
				MessageHandler.manageError);
		} catch (ex) {
			MessageHandler.manageException(ex);
		}
	}

    /**
     * Go to the contasRecebers list page
     */
	$scope.goToContasReceberList = function () {
		$scope.refreshContasReceberList();
		$location.path('/contasReceber');
	}
    /**
     * Go to the contasReceber edit page
     */
	$scope.goToContasReceber = function (oidContasReceber) {
		$scope.refreshContasReceber(oidContasReceber);
		$location.path('/contasReceber/' + oidContasReceber);
	}

	// Actions
	$scope.saveTabularReceb = function (contasReceber) {
		try {
			var save = ContasReceber.update;
			//	$scope.contasPagar.vrBruto = $scope.contasPagar.vrBruto.toFixed(2).toString().replace('.','');
			//	$scope.contasPagar.vrJuros = $scope.contasPagar.vrJuros.toFixed(2).toString().replace('.','');
			//	$scope.contasPagar.vrDesconto = $scope.contasPagar.vrDesconto.toFixed(2).toString().replace('.','');
			save(contasReceber).then(
				function (success) {
					MessageHandler.addSuccess('save ok');
					$scope.contasReceber = success.data;
				},
				MessageHandler.manageError);
		} catch (ex) {
			MessageHandler.manageException(ex);
		}
	}

    /**
     * Save contasReceber
     */
	$scope.save = function (contasReceber) {
		try {
			MessageHandler.cleanMessage();
			var save;
		//	$scope.contasReceber.vrBruto = $scope.contasReceber.vrBruto.toFixed(2).toString().replace('.','');
		//	$scope.contasReceber.vrJuros = $scope.contasReceber.vrJuros.toFixed(2).toString().replace('.','');
		//	$scope.contasReceber.vrDesconto = $scope.contasReceber.vrDesconto.toFixed(2).toString().replace('.','');
		//  $scope.contasReceber.vrBaseInss = $scope.contasReceber.vrBaseInss.toFixed(2).toString().replace('.','');
		//  $scope.contasReceber.vrDeducaoInss = $scope.contasReceber.vrDeducaoInss.toFixed(2).toString().replace('.','');
		//  $scope.contasReceber.vrBaseIssqn = $scope.contasReceber.vrBaseIssqn.toFixed(2).toString().replace('.','');
		//  $scope.contasReceber.vrDeducaoIssqn = $scope.contasReceber.vrDeducaoIssqn.toFixed(2).toString().replace('.','');
		//  $scope.contasReceber.vrBaseCsll = $scope.contasReceber.vrBaseCsll.toFixed(2).toString().replace('.','');
		//  $scope.contasReceber.vrDeducaoCsll = $scope.contasReceber.vrDeducaoCsll.toFixed(2).toString().replace('.','');
		//  $scope.contasReceber.vrBasePis = $scope.contasReceber.vrBasePis.toFixed(2).toString().replace('.','');
		//  $scope.contasReceber.vrDeducaoPis = $scope.contasReceber.vrDeducaoPis.toFixed(2).toString().replace('.','');
		//  $scope.contasReceber.vrBaseCofins = $scope.contasReceber.vrBaseCofins.toFixed(2).toString().replace('.','');
		//  $scope.contasReceber.vrDeducaoCofins = $scope.contasReceber.vrDeducaoCofins.toFixed(2).toString().replace('.','');
		//  $scope.contasReceber.vrBaseIrpj = $scope.contasReceber.vrBaseIrpj.toFixed(2).toString().replace('.','');
		//  $scope.contasReceber.vrDeducaoIrpj = $scope.contasReceber.vrDeducaoIrpj.toFixed(2).toString().replace('.','');
		//  $scope.contasReceber.vrOutrasDeducoes = $scope.contasReceber.vrOutrasDeducoes.toFixed(2).toString().replace('.','');
			
		if ($scope.mode === 'create') {
				save = ContasReceber.create;
			} else {
				save = ContasReceber.update;
			}
			save($scope.contasReceber).then(
				function (success) {
					MessageHandler.addSuccess('save ok');
					$scope.contasReceber = success.data;
			    //	$scope.contasReceber.vrBruto = $scope.contasReceber.vrBruto.toFixed(2).toString().replace('.','');
		     	//	$scope.contasReceber.vrJuros = $scope.contasReceber.vrJuros.toFixed(2).toString().replace('.','');
		    	//	$scope.contasReceber.vrDesconto = $scope.contasReceber.vrDesconto.toFixed(2).toString().replace('.','');
		     	//  $scope.contasReceber.vrBaseInss = $scope.contasReceber.vrBaseInss.toFixed(2).toString().replace('.','');
			    //  $scope.contasReceber.vrDeducaoInss = $scope.contasReceber.vrDeducaoInss.toFixed(2).toString().replace('.','');
			    //  $scope.contasReceber.vrBaseIssqn = $scope.contasReceber.vrBaseIssqn.toFixed(2).toString().replace('.','');
		    	//  $scope.contasReceber.vrDeducaoIssqn = $scope.contasReceber.vrDeducaoIssqn.toFixed(2).toString().replace('.','');
			    //  $scope.contasReceber.vrBaseCsll = $scope.contasReceber.vrBaseCsll.toFixed(2).toString().replace('.','');
			    //  $scope.contasReceber.vrDeducaoCsll = $scope.contasReceber.vrDeducaoCsll.toFixed(2).toString().replace('.','');
			    //  $scope.contasReceber.vrBasePis = $scope.contasReceber.vrBasePis.toFixed(2).toString().replace('.','');
			    //  $scope.contasReceber.vrDeducaoPis = $scope.contasReceber.vrDeducaoPis.toFixed(2).toString().replace('.','');
			    //  $scope.contasReceber.vrBaseCofins = $scope.contasReceber.vrBaseCofins.toFixed(2).toString().replace('.','');
			    //  $scope.contasReceber.vrDeducaoCofins = $scope.contasReceber.vrDeducaoCofins.toFixed(2).toString().replace('.','');
			    //  $scope.contasReceber.vrBaseIrpj = $scope.contasReceber.vrBaseIrpj.toFixed(2).toString().replace('.','');
			    //  $scope.contasReceber.vrDeducaoIrpj = $scope.contasReceber.vrDeducaoIrpj.toFixed(2).toString().replace('.','');
			    //  $scope.contasReceber.vrOutrasDeducoes = $scope.contasReceber.vrOutrasDeducoes.toFixed(2).toString().replace('.','');
				},
				MessageHandler.manageError);
		} catch (ex) {
			MessageHandler.manageException(ex);
		}
	};
    /**
     * Delete contasReceber
     */
	$scope.delete = function (oidContasReceber) {
		try {
			MessageHandler.cleanMessage();
			ContasReceber.delete(oidContasReceber).then(
				function (success) {
					$scope.goToContasReceberList();
				},
				MessageHandler.manageError);
		} catch (ex) {
			MessageHandler.manageException(ex);
		}
	};

	// Main
	MessageHandler.cleanMessage();
	if ($location.path().endsWith('/new')) {
		// Creation page
		$scope.contasReceber = {};
		$scope.mode = 'create';
		$scope.loadAllReferencies();
		$scope.bookorderitem = null;
	} else if ($routeParams.oidContasReceber != null) {
		// Edit page
		$scope.loadAllReferencies();
		$scope.refreshContasReceber($routeParams.oidContasReceber);
	} else {
		// List page
		$scope.refreshContasReceberList();
	}


}]);
