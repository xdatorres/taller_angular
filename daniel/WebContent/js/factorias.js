app.factory('cubo_factoria', function() {
	return {
		init : function() {
			var arr = [ [] ];

			for (var i = 0; i < 3; i++) {

				arr[i] = [];

				arr[i] = new Array(3);

				for (var j = 0; j < 3; j++) {

					arr[i][j] = i;
				}
			}

			return arr;

		},
		init_empty : function() {
			var arr = [ [] ];

			for (var i = 0; i < 3; i++) {

				arr[i] = [];

				arr[i] = new Array(3);

				for (var j = 0; j < 3; j++) {

					arr[i][j] = "0";
				}
			}

			return arr;

		}
	};
});