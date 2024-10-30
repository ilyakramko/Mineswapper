const width = 10
const bomb = 10;

let bombsFlagged = 0;
let openedCells = 0;
let isGameOver = false;
let startTime;
let stopwatchInterval;

let gridArray;

function setupControls(){
    let resetButton = document.getElementById("reset");
    resetButton.addEventListener("mouseup", (e) => {
        reset();
    });
    
    resetStopwatch();
}

function setupGrid(){
    resetStopwatch();

    let score = document.getElementById("score");
    score.innerText = bomb;

    let bombArray = Array.from({ length:bomb }, (_, index) => 1);
    let emptyCellArray = Array.from({ length: width * width - bomb}, (_, index) => 0);

    gridArray = bombArray.concat(emptyCellArray).sort(() => Math.random() - 0.5)
        .reduce((result, item, index) => {
            if (index % width === 0) 
                result.push([]);
            result[result.length - 1].push({ Bomb: item, Openned: false, Flagged: false });
            return result;
        }, []);

    let grid = document.getElementById("mineswapper-grid");

    for(let i = 0; i < width; i++){
        for(let j = 0; j < width; j++){
            let cell = document.createElement("div");
            cell.id = `${i}${j}`;

            cell.classList.add("cell");

            if (i !== width - 1 && j !== width - 1){
                cell.classList.add("cell-top-row-margin");
            } else if (i !== width - 1 && j === width - 1){
                cell.classList.add("cell-right-column-margin");
            } else if (i === width - 1 && j !== width -1) {
                cell.classList.add("cell-bottom-row-margin");
            }
            
            gridArray[i][j].Score = gridArray[i][j].Bomb === 0 ? getCellScore(i, j) : -1;

            cell.addEventListener("mouseup", (e) => {
                let elem = document.getElementById(`${i}${j}`);

                switch (e.button) {
                    case 0:
                        clickCell(elem, i, j);
                        break;
                    case 2:
                        flagCell(elem, i, j);
                        break;
                    default:
                        break;
                }
            });
    
            cell.addEventListener('contextmenu', event => {
                event.preventDefault();
            });
    
            grid.appendChild(cell);
        }
    }
}

function clickCell(cell, i, j){
    if (isGameOver)
        return;

    startStopwatch();

    if(gridArray[i][j].Openned || gridArray[i][j].Flagged)
        return;

    if (gridArray[i][j].Bomb === 1){
        gameOver();
        return;
    }
    
    let cellScore = gridArray[i][j].Score;

    if (cellScore > 0){
        cell.classList.add("cell-opened");
        
        switch(cellScore){
            case 1: cell.classList.add("cell-one"); break;
            case 2: cell.classList.add("cell-two"); break;
            case 3: cell.classList.add("cell-three"); break;
            case 4: cell.classList.add("cell-four"); break;
            case 5: cell.classList.add("cell-five"); break;
        }

        openCell(cell, i, j, false);
        return;
    }

    checkCell(i, j);
    openCell(cell, i, j, true);
}

function checkCell(i, j){
    if (isGameOver)
        return;

    setTimeout(() => {
        for (let m = i - 1; m <= i + 1; m++){
            for (let n = j - 1; n <= j + 1; n++){
                if (m < 0 || n < 0 || m >= width || n >= width || (m == i && n == j))
                    continue;
                
                let cell = document.getElementById(`${m}${n}`); 
                clickCell(cell, m, n);
            }
        }
    }, 1);
}

function openCell(cell, i, j, empty){
    openedCells++;
    gridArray[i][j].Openned = true;

    if (empty){
        cell.classList.add("cell-empty");
    } else {
        cell.innerText = gridArray[i][j].Score;
    }

    checkForWin();
}

function flagCell(cell, i, j){
    if (isGameOver)
        return;
    
    startStopwatch();

    if (gridArray[i][j].Flagged){
        gridArray[i][j].Flagged = false;
        
        cell.classList.remove("cell-flag");
        cell.innerHTML = "";

        bombsFlagged--;
    } else if (bombsFlagged == bomb){
        return;
    }
    else if (!gridArray[i][j].Openned){
        gridArray[i][j].Flagged = true;
        
        cell.classList.add("cell-flag");
        cell.innerHTML = `<i class="fa-solid fa-flag"></i>`;

        bombsFlagged++;
    }

    let score = document.getElementById("score");
    score.innerText = bomb - bombsFlagged;
}

function getCellScore(i, j){
    let bombCount = 0;

    for (let m = i - 1; m <= i + 1; m++){
        for (let n = j - 1; n <= j + 1; n++){
            if (m < 0 || n < 0 || m >= width || n >= width || (m == i && n == j))
                continue;

            if (gridArray[m][n].Bomb === 1)
                bombCount++;    
        }
    }

    return bombCount;
}

function startStopwatch(){
    if(!stopwatchInterval){
        startTime = new Date().getTime();
        stopwatchInterval = setInterval(updateStopwatch, 1000);
    }
}

function stopStopwatch(){
    clearInterval(stopwatchInterval);
    stopwatchInterval = null;
}


function resetStopwatch(){
    stopStopwatch();
    let stopwatch = document.getElementById("stopwatch");
    stopwatch.innerText = 0;
}

function updateStopwatch(){
    let stopwatch = document.getElementById("stopwatch");

    let currentTime = new Date().getTime();
    let elapsedTime = currentTime - startTime;
    let seconds = Math.floor(elapsedTime / 1000); 

    stopwatch.innerText = seconds;
}

function checkForWin(){
    if (openedCells === width * width - bomb){
        stopStopwatch();
        
        let grid = document.getElementById("mineswapper-grid");

        let result = document.createElement("div");
        result.className = "result result-win"
        result.innerText = "Win";

        grid.appendChild(result);
    } 
}

function gameOver(){
    isGameOver = true;
    
    stopStopwatch();

    for (let i = 0; i < width; i++){
        for (let j = 0; j < width; j++){
            if (gridArray[i][j].Bomb === 1){
                let cell = document.getElementById(`${i}${j}`); 

                if (gridArray[i][j].Flagged){
                    cell.classList.add("cell-flag-bomb");
                } else {
                    cell.classList.add("cell-mine");
                    cell.innerHTML = `<i class="fa-solid fa-bomb"></i>`;
                }
            }
        }
    }

    let grid = document.getElementById("mineswapper-grid");

    let result = document.createElement("div");
    result.className = "result result-fail"
    result.innerText = "Game Over";

    grid.appendChild(result);
}

function reset(){
    isGameOver = false;
    bombsFlagged = 0;
    openedCells = 0;

    let grid = document.getElementById("mineswapper-grid");
    grid.innerHTML = "";

    setupGrid();
}






