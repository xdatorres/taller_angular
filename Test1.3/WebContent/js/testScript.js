app.controller('controlador_ejemplo_vista', function($scope, $rootScope) {

})

app.controller('controlador_principal',
		function($scope, $rootScope, $location) {
			$scope.cargar_vista = function() {
				$location.path('/ejemplo_vista');
			};
			$scope.cargar_contr1 = function() {
				$location.path('/controlador_1');
			};
			$scope.cargar_contr2 = function() {
				$location.path('/controlador_2');
			};
			$scope.cargar_contr3 = function() {
				$location.path('/controlador_3');
			};
			$scope.saludar = function() {
				alert('Hola soy el controlador principal');
			};
		});

app.controller('controlador_1', function($scope, test_factory, $rootScope) {
	$scope.saludar = function() {
		alert('Hola soy el controlador 1');
	};
	$scope.usuario = {
		nombre : "Juan",
		edad : 55
	};
	$scope.factoria = function() {
		test_factory.nombre = 'Pedro';
		test_factory.mostrar_nombre();
	}
	$rootScope.global = "soy una variable global";
	$scope.global = $rootScope.global;
});

app.controller('controlador_2', function($scope, test_factory, $rootScope) {
	$scope.global = $rootScope.global;
	$scope.saludar = function() {
		alert('Hola soy el controlador 2');
	};
	$scope.fruta = {

	};
	$scope.factoria = function() {
		test_factory.nombre = 'Juan';
		test_factory.mostrar_nombre();
	}
});

app.factory('test_factory', function() {
	return {
		nombre : '',
		mostrar_nombre : function() {
			alert(this.nombre);
		}
	};
});

app.controller('controlador_3', function($scope, calculadora, $rootScope) {
	$scope.global = $rootScope.global;
	$scope.calculadora = calculadora;
	$scope.sumar = function() {
		alert(calculadora.sumar());
	};
	$scope.restar = function() {
		alert(calculadora.restar());
	};
	$scope.multiplicar = function() {
		alert(calculadora.multiplicar());
	};
	$scope.dividir = function() {
		alert(calculadora.dividir());
	};
});

app.factory('calculadora', function() {
	return {
		num1 : 0,
		num2 : 0,
		sumar : function() {
			return (this.num1 + this.num2);
		},
		restar : function() {
			return (this.num1 - this.num2);
		},
		multiplicar : function() {
			return (this.num1 * this.num2);
		},
		dividir : function() {
			return (this.num1 / this.num2);
		}
	}
})
