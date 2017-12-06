		console.log("hola mundo");
		var app = angular.module("app_test", []);
		app.controller('controlador_principal', function($scope) {
			$scope.saludo = 'hola, soy el controlador principal';
			//alert('hola, soy el controlador principal');
			$scope.cambiar_saludo = function() {
				$scope.saludo = 'otro mensaje';
			}

			$scope.usuario = {
				nombre : "Frank",
				apellido : "Kismann",
				edad : 29
			};

			$scope.frutas = [ {
				nombre : 'manzana',
				calorias : '30'
			}, {
				nombre : 'uva',
				calorias : '100'
			}, {
				nombre : 'piña',
				calorias : '300'
			} ];

		});
