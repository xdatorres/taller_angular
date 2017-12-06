var app = angular.module('app_test', []);
app.controller('controlador_principal', function($scope, test_factoria, $rootScope) {
	$scope.saludar = function() {
		test_factoria.nombre = 'Luis';
		test_factoria.mostrar_nombre();
		test_factoria.mostrar_frutas();
		$rootScope.global = 'Soy una variable global';
		// alert('Controlador principal');
	}
	$rootScope
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

app.controller('controlador_2', function($scope, test_factoria ,$rootScope) {
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


app.factory('test_factoria', function() {
	return {
		nombre : '',
		frutas : [ 'Piña', 'Manzana', 'Uvas', 'Frutillas' ],
		mostrar_nombre : function() {
			alert(this.nombre);
		},
		mostrar_frutas : function() {
			for (var i = 0; i < this.frutas.length; i++) {
				console.log(this.frutas[i]);
			}
		}
	};		
});

app.factory('calculadora', function() {
	return {
		num1:0,
		num2:0,
		sumar:function() {
			return this.num1+this.num2;
		},
		restar:function() {
			return this.num1-this.num2;
		},
		multiplicar:function() {
			return this.num1*this.num2;
		},
		dividir:function() {
			return this.num1/this.num2;
		}
	};		
});