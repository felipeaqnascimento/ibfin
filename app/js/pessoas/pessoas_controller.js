'use strict';

/**
 * Controller for Pessoas
 **/
pessoasModule.controller('PessoasCtrl', ['Pessoas',  '$scope', '$routeParams', '$http', '$location', '$cookies', 'MessageHandler', 'restURL', function(Pessoas, $scope, $routeParams, $http, $location, $cookies, MessageHandler, restURL) {
	    // edition mode
    $scope.mode = null;
    
	// list of pessoass
    $scope.pessoass = [];
	// pessoas to edit
    $scope.pessoas = null;

	// referencies entities
	$scope.items = {};
	
    /**
     * Load all referencies entities
     */
	$scope.loadAllReferencies = function() {
    };
    
    /**
     * Refresh pessoass list
     */
    $scope.refreshPessoasList = function() {
    	try {
			$scope.pessoass = [];
        	Pessoas.getAll().then(
				function(success) {
        	        $scope.pessoass = success.data;
        	        
        	        for(var i = 0; i < $scope.pessoass.length; i++){
        	    		var dados = $scope.pessoass[i];
        	    		dados.vrPercDeducaoIrpj = formataRetornoNumero(dados.vrPercDeducaoIrpj.toString());
        	    		dados.vrPercDeducaoPis = formataRetornoNumero(dados.vrPercDeducaoPis.toString());
        	    		dados.vrPercDeducaoCofins = formataRetornoNumero(dados.vrPercDeducaoCofins.toString());
        	    		dados.vrPercDeducaoCsll = formataRetornoNumero(dados.vrPercDeducaoCsll.toString());
        	    		dados.vrPercDeducaoInss = formataRetornoNumero(dados.vrPercDeducaoInss.toString());
        	    		dados.vrPercDeducaoIssqn = formataRetornoNumero(dados.vrPercDeducaoIssqn.toString());
        	    		
        	    		if ( dados.nrTelefone.length == 11 ) {
        	    			dados.nrTelefone = dados.nrTelefone.replace(/(\d{2})\-?(\d{5})\-?(\d{4})/,'($1) $2-$3');
        	    		} else {
        	    			dados.nrTelefone = dados.nrTelefone.replace(/(\d{2})\-?(\d{4})\-?(\d{4})/,'($1) $2-$3');
        	    		}
        	    	}
            	}, 
	            MessageHandler.manageError);
    	} catch(ex) {
    		MessageHandler.manageException(ex);
    	}
    }
    /**
     * Refresh pessoas
     */
    $scope.refreshPessoas = function(oidPessoas) {
    	try {
        	$scope.pessoas = null;
	        Pessoas.get(oidPessoas).then(
				function(success) {
        	        $scope.pessoas = success.data;
        	        $scope.pessoas.vrPercDeducaoIrpj = formataRetornoNumero($scope.pessoas.vrPercDeducaoIrpj.toString());
        	        $scope.pessoas.vrPercDeducaoPis = formataRetornoNumero($scope.pessoas.vrPercDeducaoPis.toString());
        	        $scope.pessoas.vrPercDeducaoCofins = formataRetornoNumero($scope.pessoas.vrPercDeducaoCofins.toString());
        	        $scope.pessoas.vrPercDeducaoCsll = formataRetornoNumero($scope.pessoas.vrPercDeducaoCsll.toString());
        	        $scope.pessoas.vrPercDeducaoInss = formataRetornoNumero($scope.pessoas.vrPercDeducaoInss.toString());
        	        $scope.pessoas.vrPercDeducaoIssqn = formataRetornoNumero($scope.pessoas.vrPercDeducaoIssqn.toString());
            	}, 
	            MessageHandler.manageError);
    	  } catch(ex) {
        	MessageHandler.manageException(ex);
    	}
	}
    /**
     * Go to the pessoass list page
     */
    $scope.goToPessoasList = function() {
        $scope.refreshPessoasList();
        $location.path('/pessoas');
    }
    /**
     * Go to the pessoas edit page
     */
    $scope.goToPessoas = function(oidPessoas) {
        $scope.refreshPessoas(oidPessoas);
        $location.path('/pessoas/'+oidPessoas);
    }

    // Actions

    /**
     * Save pessoas
     */
    $scope.save = function() {
    	try {
			MessageHandler.cleanMessage();
			var save;
			
			$scope.pessoas.nrTelefone = $scope.pessoas.nrTelefone.replace(/[^0-9]/g,'');
			
			if ( typeof $scope.pessoas.vrPercDeducaoIrpj != "undefined" ) {
				$scope.pessoas.vrPercDeducaoIrpj = $scope.pessoas.vrPercDeducaoIrpj.toString().replace('.','');
			} 
			if ( typeof $scope.pessoas.vrPercDeducaoPis != "undefined" ){
				$scope.pessoas.vrPercDeducaoPis = $scope.pessoas.vrPercDeducaoPis.toString().replace('.','');
			} 
			if ( typeof $scope.pessoas.vrPercDeducaoCofins != "undefined" ){
				$scope.pessoas.vrPercDeducaoCofins = $scope.pessoas.vrPercDeducaoCofins.toString().replace('.','');
			} 
			if ( typeof $scope.pessoas.vrPercDeducaoCsll != "undefined" ){
				$scope.pessoas.vrPercDeducaoCsll = $scope.pessoas.vrPercDeducaoCsll.toString().replace('.','');
			}
			if ( typeof $scope.pessoas.vrPercDeducaoInss != "undefined" ){
				$scope.pessoas.vrPercDeducaoInss = $scope.pessoas.vrPercDeducaoInss.toString().replace('.','');
			} 
			if ( typeof $scope.pessoas.vrPercDeducaoIssqn != "undefined" ){
				$scope.pessoas.vrPercDeducaoIssqn = $scope.pessoas.vrPercDeducaoIssqn.toString().replace('.','');
			}
			
			if( $scope.mode === 'create' ) {
        		save = Pessoas.create;
			} else {
				save = Pessoas.update;
			}
			save($scope.pessoas).then(
    	        function(success) {
	                MessageHandler.addSuccess('save ok');
                	$scope.pessoas = success.data;
                	$scope.pessoas.vrPercDeducaoIrpj = formataRetornoNumero($scope.pessoas.vrPercDeducaoIrpj.toString());
        	        $scope.pessoas.vrPercDeducaoPis = formataRetornoNumero($scope.pessoas.vrPercDeducaoPis.toString());
        	        $scope.pessoas.vrPercDeducaoCofins = formataRetornoNumero($scope.pessoas.vrPercDeducaoCofins.toString());
        	        $scope.pessoas.vrPercDeducaoCsll = formataRetornoNumero($scope.pessoas.vrPercDeducaoCsll.toString());
        	        $scope.pessoas.vrPercDeducaoInss = formataRetornoNumero($scope.pessoas.vrPercDeducaoInss.toString());
        	        $scope.pessoas.vrPercDeducaoIssqn = formataRetornoNumero($scope.pessoas.vrPercDeducaoIssqn.toString());
            	},
        	    MessageHandler.manageError);
    	} catch(ex) {
        	MessageHandler.manageException(ex);
    	}
    };
    /**
     * Delete pessoas
     */
    $scope.delete = function(oidPessoas) {
	    try {
			MessageHandler.cleanMessage();
    	    Pessoas.delete(oidPessoas).then(
				function(success) {
                	$scope.goToPessoasList();
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
        $scope.pessoas = {};
        $scope.mode = 'create';
		$scope.loadAllReferencies();
        $scope.bookorderitem = null;
    } else if( $routeParams.oidPessoas != null ) {
        // Edit page
		$scope.loadAllReferencies();
		$scope.refreshPessoas($routeParams.oidPessoas);
    } else {
        // List page
        $scope.refreshPessoasList();
    }
    
    
}]);
