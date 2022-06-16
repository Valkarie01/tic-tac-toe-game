let playerText = document.querySelector('#playerText')
let reset = document.querySelector('#reset')
let tiles = document.querySelectorAll('.cell')

let currentPlayer = 'X'
let options = ['', '', '', '', '', '', '', '', '']
let running = false

const winningCond = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [2, 4, 6],
    [0, 4, 8]
]

startGame()

function startGame() {
    tiles.forEach(cell => cell.addEventListener('click', tilesClicked))
    reset.addEventListener('click', resetGame)
    playerText.textContent = `Player ${currentPlayer}'s turn`
    running = true
}

function tilesClicked() {
    const tileIndex = this.getAttribute('cellIndex')

    if(options[tileIndex] != '' || !running){
        return
    }

    updateTiles(this, tileIndex)
    checkWinner()
}
function updateTiles(cell, index) {
    options[index] = currentPlayer
    cell.textContent = currentPlayer

}

// changes player depending on privious players move

function changePlayer() {
    // learned this just for this game
    currentPlayer = (currentPlayer === 'X') ? 'O' : 'X'
    playerText.textContent = `Player ${currentPlayer}'s turn`
}

// checks to see if any winning conditions have been met
function checkWinner() {
    let roundWon = false

    for(let i = 0; i < winningCond.length; i++){
        const condition = winningCond[i]
        const tileA = options[condition[0]]
        const tileB = options[condition[1]]
        const tileC = options[condition[2]]
        
        if(tileA == '' || tileB == ''|| tileC == ''){
            continue
        }
        if(tileA === tileB && tileB === tileC){
            roundWon = true
            break
        }
    }

    // if someone won, shows the player who won or if they drew
    if(roundWon) {
        playerText.textContent= `Player ${currentPlayer} has won` 
        running = false
    } else if(!options.includes('')) {
        playerText.textContent = 'It\'s a draw!'
    } else {
        changePlayer()
    }
}
// resets game to play again
function resetGame() {
    currentPlayer = 'X'
    options = ['', '', '', '', '', '', '', '', '']
    playerText.textContent = `Player ${currentPlayer}'s turn`
    tiles.forEach(cell => cell.textContent = '')
    running = true
}

