var horizontal, columna, mar = new Array(10);

for (var i = 0; i < 10; i++) {
	mar[i] = new Array(10);

for (var i = 0; i < 10; i++) {
	for (var j = 0; j < 10; j++) {
		mar[i][j] = 0;
	}
}

horizontal = parseInt( prompt("\n\nFavor ingresar la horizontal a ubicar el barco [1_10]: ") );

if (horizontal >= 1 && horizontal <=10 ) {
	columna = Math.round( Math.random()*6 );
	for (var i = 0; i < 4; i++) {
		mar[horizontal - 1][columna + i] - 1;

	for (var i = 0; i < 10; i++) {
		for(var j = 0; j < 10; j++)
			console.log(mar[i][j] + "\t" );
			console.log("\n");
	}
	}else{
		console.log("\n Ingresar un rango valido [1_10]");
	}
}