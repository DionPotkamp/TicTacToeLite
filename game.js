/**
 * Board is the array where the symbol (representing the player) is stored.
 */
board = [['', '', ''], ['', '', ''], ['', '', '']];
/**
 * positions: all the available spots on the board. First letter = row, second = collum
 */
positions = ["00", "01", "02", "10", "11", "12", "20", "21", "22"];
positionArray = "";
winner = null;
/** array of all possible players */
players = ['X', 'O'];
playerSymbols = ['&times;', '&#9675;'];
CurrentPlayer = players[Math.floor(Math.random() * players.length)];
document.getElementById('text').innerHTML = 'Starting player is: ' + CurrentPlayer;
/** using unicode to draw the X and O */
PlayerX = '&times;';
PlayerO = '&#9675;';
/** The scores, wins and draws */
PlayerXWins = 0;
PlayerOWins = 0;
PlayerDraws = 0;
/**
 * Switch to the other player
 * @return boolean, if the execution was a succes or not.
 */
function switchPlayer() {
    CurrentPlayer = (CurrentPlayer == players[0] ? players[1] : players[0]);
    document.getElementById('text').innerHTML = "Current player is " + CurrentPlayer;
    return true;
}
/**
 * Place the X or O symbol in the html on the given position
 * @return boolean, if the execution was a succes or not.
 */
function place(position) {
    draw = (CurrentPlayer == players[0] ? playerSymbols[0] : playerSymbols[1]);
    document.getElementById(position).innerHTML = draw;
    return true;
}
/**
 * Check in array board if the given position is available or not
 * @return boolean, if the execution was a succes or not.
 */
function checkIfAvailable(position) {
    positionArray = position.split("");
    boardPos = board[positionArray[0]][positionArray[1]];
    return (boardPos == "" ? true : false);
}
/**
 * Occupies the position in array board with the current player
 * And removes the position in the array positions
 * @return boolean, if the execution was a succes or not.
 */
function putInBoard(position) {
    positionArray = position.split("");
    board[positionArray[0]][positionArray[1]] = CurrentPlayer;
    positions.splice(positions.indexOf(position), 1);
    return true;
}
/**
 * Colors the winner green, or all gray on draw
 * @param String type of the winn.
 * @param String the row or colomn where the win was detected
 * @return boolean, if the execution was a succes or not.
 */
function drawWin(type, cell) {
    color = 'rgb(34, 221, 34)';
    if (type == 'horizontal') {
        cells = [[cell] + [0], [cell] + [1], [cell] + [2]];
    } else if (type == 'vertical') {
        cells = [[0] + [cell], [1] + [cell], [2] + [cell]];
    } else if (type == 'diaL-R') {
        cells = ['00', '11', '22'];
    } else if (type == 'diaR-L') {
        cells = ['02', '11', '20'];
    }
    document.getElementById('text').innerHTML = CurrentPlayer + " won the game!";
    if (type == 'draw') {
        cells = ["00", "01", "02", "10", "11", "12", "20", "21", "22"];
        color = 'rgb(128, 128, 128)';
        document.getElementById('text').innerHTML = "Draw!";
    }
    cells.forEach(one);
    function one(value) {
        document.getElementById(value).style.color = color;
    }
    return true;
}
/**
 * Checks if the three given values are equal (and not empty) to eachother
 * @return boolean, if the values are equal or not.
 */
function equal(a, b, c) {
    return (a == b && a == c && a != '' ? true : false);
}
/**
 * Checks if the current player made a winning move
 * if so, it will add a win and call function drawWin
 * @return boolean, if the execution was a succes or not.
 */
function checkWinner() {
    for (var i = 0; i < board.length; i++) {
        //horizontal
        if (equal(board[i][0], board[i][1], board[i][2])) {
            addWin();
            drawWin('horizontal', i);
            return true;
        }
        //vertical
        if (equal(board[0][i], board[1][i], board[2][i])) {
            addWin();
            drawWin('vertical', i);
            return true;
        }
    }
    //diagonal l-r
    if (equal(board[0][0], board[1][1], board[2][2])) {
        addWin();
        drawWin('diaL-R', 0);
        return true;
    }
    //diagonal r-l
    if (equal(board[0][2], board[1][1], board[2][0])) {
        addWin();
        drawWin('diaR-L', 0);
        return true;
    }
    //draw
    if (!Array.isArray(positions) || !positions.length) {
        winner = 'draw';
        PlayerDraws++;
        drawWin('draw', 0);
        return true;
    }
    return false;
}
/**
 * If the player wins this round it will add one to the score
 */
function addWin() {
    winner = CurrentPlayer;
    (CurrentPlayer == players[0] ? PlayerXWins++ : PlayerOWins++);
    document.getElementById('Xwins').innerHTML = PlayerXWins;
    document.getElementById('Owins').innerHTML = PlayerOWins;
    document.getElementById('draws').innerHTML = PlayerDraws;
}
/**
 * Resets all of the variables
 */
function restartGame() {
    board = [['', '', ''], ['', '', ''], ['', '', '']];
    positions = ["00", "01", "02", "10", "11", "12", "20", "21", "22"];
    positionArray = "";
    CurrentPlayer = (winner == players[0] ? players[1] : players[0]);
    document.getElementById('text').innerHTML = 'Starting player is: ' + CurrentPlayer;
    winner = null;
    PlayerX = '&times;';
    PlayerO = '&#9675;';
    positions.forEach(one);
    function one(value) {
        document.getElementById(value).innerHTML = "&nbsp;";
        document.getElementById(value).style.color = 'rgb(0, 0, 0)';
    }
}
/**
 * The logic of the game, puts all of the functions together. Restarts the game when necesary.
 * @return void, to stop the function if necesary.
 */
function core(position) {
    if (winner != null) restartGame();
    if (positions === undefined || positions.length == 0) restartGame();
    if (checkIfAvailable(position)) {
        if (putInBoard(position)) {
            if (place(position)) {
                if (checkWinner()) {
                    setTimeout(restartGame, 2500);
                } else {
                    if (switchPlayer()) {
                        return;
                    } else {
                        return;
                    }
                }
            } else {
                return;
            }
        } else {
            return;
        }
    } else {
        return;
    }
}
