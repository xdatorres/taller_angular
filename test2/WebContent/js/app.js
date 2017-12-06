		var app = angular.module('app_test2', []);
		app.controller('controlador_principal', function($scope) {
			//alert('Hola, soy el controlador principal');
			$scope.saludo = 'Hola, soy el controlador principal';
			$scope.cambiar_saludo = function() {
				//alert('cambiar_saludo');
				$scope.saludo = 'Otro mensaje';
			};
			$scope.usuario = {
				nombre : 'Frank',
				apellido : 'Kismann',
				dia : 2,
				mes : 9,
				ano : 1988
			};
			$scope.paises = [ 'Chile', 'Perú', 'Argentina', 'EE.UU.' ];
			$scope.frutas = [ {
				nombre : 'Manzana',
				calorias : 100
			}, {
				nombre : 'Naranja',
				calorias : 200
			}, {
				nombre : 'Piña',
				calorias : 300
			}, {
				nombre : 'Uva',
				calorias : 500
			} ];
			$scope.sudoku = [ [ 0, 0, 0 ], [ 0, 0, 0 ], [ 0, 0, 0 ] ];
		});