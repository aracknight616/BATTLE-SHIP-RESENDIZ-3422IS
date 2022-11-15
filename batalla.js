const board = document.querySelector("#board");
const boardAttack = document.querySelector("#boardAttack");
const position = document.querySelectorAll(".position");
let matrix = [];
let matrixAttack = [];
const sizeShip = [5, 4, 3, 2];
const positionArray = ["horizontal", "vertical"]
let quantityShip = [1, 1, 1, 2];
let quantityShipPC =  [1, 1, 1, 2];
let ship = {};
let shipRandom = {};

//Función para creación de tableros
function createMatrix(boardType, matrixType, func, type){
    for(let i=0; i<15; i++){
        let list = []
        let row = document.createElement("div");
        boardType.appendChild(row);
        row.className = "myRow"
        for(let j=0; j<10; j++){
            let grid = document.createElement("div");
            row.appendChild(grid);
            grid.className = "grid";
            grid.id = i + "," + j + "," + type;
            grid.addEventListener("click", func);
            list.push("");
        }
        matrixType.push(list)
    }
}
//SELECCION DE BARCOS
function selectShip(event){
    shipData = event.target.className.split(" ");
    ship.position = shipData[0];
    ship.size = sizeShip[shipData[1]];
    ship.quantity = quantityShip[shipData[1]];
    ship.id = shipData[1];
}
//CREACION DEL TABLERO DE JUGADOR
createMatrix(board, matrix, selectPosition, "player");
//CREACION DE BARCOS
for(let i=0; i<position.length; i++){
    let horizontal = document.createElement("div");
    position[i].appendChild(horizontal);
    horizontal.className = "horizontal " + i;
    horizontal.addEventListener("click", selectShip)
    let vertical = document.createElement("div");
    position[i].appendChild(vertical);
    vertical.className = "vertical " + i;
    vertical.addEventListener("click", selectShip)
}
//SELECCIONAR POSICION DE BARCO
function selectPosition(event){
    if(ship.quantity > 0){
        let grid = event.target
        let gridID = grid.id.split(",");
        let x = parseInt(gridID[0]);
        let y = parseInt(gridID[1]);
        if(ship.position === "horizontal"){
            if((y + (ship.size - 1)) < 10){
                for(let i=y; i<(y + ship.size); i++){
                    matrix[x][i] = "ship";
                    document.getElementById(x + "," + i + "," + "player").className += " selected";
                }
                quantityShip[ship.id] -= 1;
                ship = {}
            }
            else{
                alert("Selecciona una posición válida");
            }
        }
        else if(ship.position === "vertical"){
            if((x + (ship.size - 1)) < 15){
                for(let i=x; i<(x + ship.size); i++){
                    matrix[i][y] = "ship";
                    document.getElementById(i + "," + y + "," + "player").className += " selected";
                }
                quantityShip[ship.id] -= 1;
                ship = {}
            }
            else{
                alert("Selecciona una posición válida");
            }
        }
    }
    else{
        alert("Debes seleccionar un barco disponible");
    }
}
//BOTON DE INICIO DE JUEGO
function startGame(){
    createMatrix(boardAttack, matrixAttack, checkShot, "pc");
    selectPositionRandom()
    document.querySelector("#button").disabled = true;
}
//POSICION RANDOM DE LOS BARCOS
function selectPositionRandom(){
    for(let i=0; i<quantityShipPC.length; i++){
        while(quantityShipPC[i] > 0){
            random(i);
            quantityShipPC[i] -= 1;
        }
    }
}
//POSICION VALIDA
function checkPosition(pos, axis, size){
    if(shipRandom.position  === pos){
        if((axis + (size - 1)) < 10){
            return true;
        }
        else{
            return false;
        }
    }
}
//CREAR BARCOS DE LA PC
function random(i){
    shipRandom.position = positionArray[Math.floor(Math.random() * Math.floor(positionArray.length))];
    shipRandom.x = Math.floor(Math.random() * Math.floor(10));
    shipRandom.y = Math.floor(Math.random() * Math.floor(10));
    if(checkPosition("horizontal", shipRandom.y, sizeShip[i])){
        for(let j=shipRandom.y; j<(shipRandom.y + sizeShip[i]); j++){
            if(matrixAttack[shipRandom.x][j] === "ship"){
                return random(i)
            }
        }
        for(let j=shipRandom.y; j<(shipRandom.y + sizeShip[i]); j++){
            matrixAttack[shipRandom.x][j] = "ship";
        }
    }
    else if(checkPosition("vertical", shipRandom.x, sizeShip[i])){
        for(let j=shipRandom.x; j<(shipRandom.x + sizeShip[i]); j++){
            if(matrixAttack[j][shipRandom.y] === "ship"){
                return random(i)
            }
        }
        for(let j=shipRandom.x; j<(shipRandom.x + sizeShip[i]); j++){
            matrixAttack[j][shipRandom.y] = "ship";
        }
    }
    else{
        return random(i)
    }
}
//VERIFICACION DEL TIRO DEL JUGADOR
function checkShot(event){
    let grid = event.target
    let gridID = grid.id.split(",");
    let x = parseInt(gridID[0]);
    let y = parseInt(gridID[1]);
    if(matrixAttack[x][y] === "ship"){
        alert("Muy bien, acertaste. Vuelve a jugar");
        matrixAttack[x][y] = "hit";
        document.getElementById(x + "," + y + "," + "pc").className += " hit";
        checkWinner(matrixAttack, "player")
    }
    else{
        alert("Mal! tu disparo cayó al agua");
        matrixAttack[x][y] = "miss";
        document.getElementById(x + "," + y + "," + "pc").className += " miss";
        shotPc()
    }
}
//TIRO DEL PC
function shotPc(){
    let x = Math.floor(Math.random() * Math.floor(10));
    let y = Math.floor(Math.random() * Math.floor(10));
    if(matrix[x][y] === "ship"){
        alert("Ops! te han disparado");
        matrix[x][y] = "hit";
        document.getElementById(x + "," + y + "," + "player").className += " hit";
        checkWinner(matrix, "pc");
        return shotPc();
    }
    else if(matrix[x][y] === "hit" || matrix[x][y] === "miss"){
        return shotPc();
    }
    else{
        alert("El disparo del pc cayó al agua");
        matrix[x][y] = "miss";
        document.getElementById(x + "," + y + "," + "player").className += " miss";
    }
}
// AVISAR GANADOR
function checkWinner(matrix, player){
    for(let i=0; i<10; i++){
        let arraychecked = matrix[i].filter((index)=>{return index === "ship"})
        if(arraychecked.length > 0){
            return
        }
    }
    if(player === "pc"){
        alert("Ha ganado el PC")
    }
    else{
        alert("GANASTE!!!")
    }
}