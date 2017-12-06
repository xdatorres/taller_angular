app.controller('controlador_principal', function($scope, test_factoria,
		$rootScope, $location) {
	$scope.saludar = function() {
		test_factoria.nombre = 'Luis';
		test_factoria.mostrar_nombre();
		test_factoria.mostrar_frutas();
		$rootScope.global = 'Soy una variable global';
		// alert('Controlador principal');
	};
	$scope.cargar_ctrl1 = function() {
		$location.path('/controlador_1');
	};
	$scope.cargar_ctrl2 = function() {
		$location.path('/controlador_2');
	};
	$scope.cargar_ctrl3 = function() {
		$location.path('/controlador_3');
	};
});

app.controller('controlador_1', function($scope, test_factoria, $rootScope) {
	$scope.saludar = function() {
		test_factoria.nombre = 'Frank';
		test_factoria.mostrar_nombre();
		test_factoria.frutas.push('Melón');
		test_factoria.mostrar_frutas();
		// alert('Controlador 1');
	}
});

app.controller('controlador_2', function($scope, test_factoria, $rootScope) {
	$scope.saludar = function() {
		test_factoria.nombre = 'María';
		test_factoria.mostrar_nombre();
		test_factoria.mostrar_frutas();
		// alert('Controlador 2');
	}
});

app.controller('controlador_3', function($scope, calculadora, $rootScope) {
	$scope.resultado = 0;
	$scope.calculadora = calculadora;
	$scope.sumar = function() {
		$scope.resultado = $scope.calculadora.sumar();
	}
	$scope.restar = function() {
		$scope.resultado = $scope.calculadora.restar();
	}
	$scope.multiplicar = function() {
		$scope.resultado = $scope.calculadora.multiplicar();
	}
	$scope.dividir = function() {
		$scope.resultado = $scope.calculadora.dividir();
	}
});