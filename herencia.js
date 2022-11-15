window.addEventListener("load",function(){
	class escuela{
		constructor(pizarron){
			this.pizarron = pizarron;
		}
		anuncio(){
			return " PROFESOR: El pizarron esta lleno ";
		}
	}
	class Profesor extends escuela{
		constructor(pizarron, copiar){
			super(pizarron);
			this.copiar = copiar;
		}
		anuncioCompleto(){
			return this.anuncio() + "favor de copiar todo lo que esta en el pizarron. ";
		}
	}
	class Alumno extends escuela{
		constructor(pizarron, copiar){
			super(pizarron);
			this.copiar = copiar;
		}
		anuncioCompleto(){
			return this.anuncio() + ", ALUMNOS: ya estamos copiando profesor";
		}
	}
	let miclase = new Profesor("COPIAR");
	let milibreta = new Alumno("COPIAR");
	mensaje.innerHTML = miclase.anuncioCompleto() + milibreta.anuncioCompleto();
},true);