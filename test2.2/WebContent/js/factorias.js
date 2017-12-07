
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
		num1 : 0,
		num2 : 0,
		sumar : function() {
			return this.num1 + this.num2;
		},
		restar : function() {
			return this.num1 - this.num2;
		},
		multiplicar : function() {
			return this.num1 * this.num2;
		},
		dividir : function() {
			return this.num1 / this.num2;
		}
	};
});