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

//Función para seleccionar barco
function selectShip(event){
    shipData = event.target.className.split(" ");
    ship.position = shipData[0];
    ship.size = sizeShip[shipData[1]];
    ship.quantity = quantityShip[shipData[1]];
    ship.id = shipData[1];
}

//Creación de tablero jugador
createMatrix(board, matrix, selectPosition, "player");
//Creación de barcos
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

//Función para seleccionar posición de los barcos
function selectPosition(event){
    if(ship.quantity > 0){
        let grid = event.target
        let gridID = grid.id.split(",");
        let x = parseInt(gridID[0]);
        let y = parseInt(gridID[1]);
        if(ship.position === "horizontal"){
            if((y + (ship.size - 1)) < 15){
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

//Verificar tiro de jugador 1
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
        checkShot2()
    }
}

//variables jugador 2
const board2 = document.querySelector("#board2");
const boardAttack2 = document.querySelector("#boardAttack2");
const position2 = document.querySelectorAll(".position2");
let matrix2 = [];
let matrixAttack2 = [];
const sizeShip2 = [5, 4, 3, 2];
const positionArray2 = ["horizontal2", "vertical2"]
let quantityShip2 = [1, 1, 1, 2];
let quantityShipPC2 =  [1, 1, 1, 2];
let ship2 = {};

//Función para creación de tableros jugador 2
function createMatrix2(boardType2, matrixType2, func2, type2){
    for(let i=0; i<15; i++){
        let list2 = []
        let row2 = document.createElement("div");
        boardType2.appendChild(row2);
        row2.className = "myRow2"
        for(let j=0; j<10; j++){
            let grid2 = document.createElement("div");
            row2.appendChild(grid2);
            grid2.className = "grid";
            grid2.id = i + "," + j + "," + type2;
            grid2.addEventListener("click", func2);
            list2.push("");
        }
        matrixType2.push(list2)
    }
}

//Función para seleccionar barco jugador 2
function selectShip2(event2){
    shipData2 = event2.target.className.split(" ");
    ship2.position = shipData2[0];
    ship2.size = sizeShip2[shipData2[1]];
    ship2.quantity = quantityShip2[shipData2[1]];
    ship2.id = shipData2[1];
}

//Creación de tablero jugador2
createMatrix2(board2, matrix2, selectPosition2, "player2");
//Creación de barcos jugador 2
for(let i2=0; i2<position2.length; i2++){
    let horizontal2 = document.createElement("div");
    position2[i2].appendChild(horizontal2);
    horizontal2.className = "horizontal2 " + i2;
    horizontal2.addEventListener("click", selectShip2)
    let vertical2 = document.createElement("div2");
    position2[i2].appendChild(vertical2);
    vertical2.className = "vertical2 " + i2;
    vertical2.addEventListener("click", selectShip2)
}


//Función para seleccionar posición de los barcos jugador 2

function selectPosition2(event2){
    if(ship2.quantity > 0){
        let grid2 = event2.target;
        let gridID2 = grid2.id.split(",");
        let x2 = parseInt(gridID2[0]);
        let y2 = parseInt(gridID2[1]);
        if(ship2.position === "horizontal2"){
            if((y2 + (ship2.size - 1)) < 15){
                for(let i2=y2; i2<(y2 + ship2.size); i2++){
                    matrix2[x2][i2] = "ship2";
                    document.getElementById(x2 + "," + i2 + "," + "player2").className += " selected";
                }
                quantityShip2[ship2.id] -= 1;
                ship2 = {}
            }
            else{
                alert("Selecciona una posición válida");
            }
        }
        else if(ship2.position === "vertical2"){
            if((x2 + (ship2.size - 1)) < 15){
                for(let i2=x2; i2<(x2 + ship2.size); i2++){
                    matrix2[i2][y2] = "ship2";
                    document.getElementById(i2 + "," + y2 + "," + "player2").className += " selected";
                }
                quantityShip2[ship2.id] -= 1;
                ship2 = {}
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

//Verificar tiro de jugador 2
function checkShot2(event2){
    let grid2 = event2.target
    let gridID2 = grid2.id.split(",");
    let x2 = parseInt(gridID2[0]);
    let y2 = parseInt(gridID2[1]);
    if(matrixAttack2[x2][y2] === "ship2"){
        alert("Muy bien, acertaste. Vuelve a jugar");
        matrixAttack2[x2][y2] = "hit2";
        document.getElementById(x2 + "," + y2 + "," + "player2").className += " hit2";
        checkWinner(matrixAttack2, "player2")
    }
    else{
        alert("Mal! tu disparo cayó al agua");
        matrixAttack2[x2][y2] = "miss2";
        document.getElementById(x2 + "," + y2 + "," + "player2").className += " miss2";
        checkShot()
    }
}

//Función de botón iniciar juego
function startGame(){
    createMatrix(boardAttack, matrixAttack, checkShot, "player");
    createMatrix2(boardAttack2, matrixAttack2, checkShot2, "player2", ship.position);
    document.querySelector("#button").disabled = true;
}

//Revisar ganador
function checkWinner(matrix, player){
    for(let i=1; i<15; i++){
        let arraychecked = matrix[i].filter((index)=>{return index === "ship"})
        if(arraychecked.length > 0){
            return
        }
    }
    if(player === "player2"){
        alert("Ha ganado el jugador 2")
    }
    else{
        alert("Ha ganado el jugador 1")
    }
}