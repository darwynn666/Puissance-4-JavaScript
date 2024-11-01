const maxCols = 8
const maxRows = 6
let player = 1
let arrayGame = []


// construction du tableau de jeu
function builtGame(cols, rows) {
    let tbl = document.createElement('table')
    for (let r = 0; r < rows; r++) {
        let arrayCol = []
        let tr = document.createElement('tr')
        for (let c = 0; c < cols; c++) {
            let td = document.createElement('td')
            td.id = `L${r}C${c}`
            td.className = 'white'
            //td.textContent = `r${r}c${c}`
            tr.append(td)
            arrayCol.push(0) //case vide
        }
        // console.log(arrayCol)
        tbl.append(tr)
        arrayGame.push(arrayCol)
    }
    document.querySelector('#game').append(tbl)
    //arrayGame.push
}



// affectation des evenements aux cases
function addEvents(cols, rows) {
    for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
            let e = document.querySelector(`#L${r}C${c}`)
            // click sur une case
            e.addEventListener('click', function () {
                play(c)
            })
        }
    }
}



// affichage des pions
function displayGame() {
    // console.log(arrayGame)
    let log = ''
    let classe = ''
    for (let r = 0; r < maxRows; r++) {
        for (let c = 0; c < maxCols; c++) {
            // console.log('arrayGame', r, c, arrayGame[r][c], `#L${r}C${c}`)
            log += c + ' '
            switch (arrayGame[r][c]) {
                case 0: classe = 'white'
                    break
                case 1: classe = 'red'
                    break
                case 2: classe = 'yellow'
                    break
            }
            document.querySelector(`#L${r}C${c}`).classList.remove('white', 'red', 'yellow')
            document.querySelector(`#L${r}C${c}`).classList.add(classe)
        }
        log += '\n'
    }
    // console.log(log)
}



// play (clic sur une colonne)
function play(c) {
    // console.log('play col', c)
    let r = 0
    // la piece tombe
    if (arrayGame[maxRows - 1][c] === 0) { // 1ere piece de colonne
        r = 5
        arrayGame[maxRows - 1][c] = player
    }
    else { //autres
        let tombe = true
        while (tombe) {
            //console.log('test row', r, arrayGame[r][c])
            if (arrayGame[r + 1][c] > 0) {
                //console.log('stop col', r)
                arrayGame[r][c] = player
                tombe = false
                break
            }
            r++
        }
    }
    checkVictory(r, c) // verifie victoire
    displayGame() // affiche le jeu
    switchPlayer() // joueur suivant
}

function checkVictory(r, c) {
    console.log(arrayGame)
    console.log('check victory', r, c)

    //horizontal, row
    let checkH = ''
    for (let i = 0; i < maxCols; i++) {
        checkH += arrayGame[r][i]
    }
    // console.log('H', checkH)

    //vertical
    let checkV = ''
    for (let i = 0; i < maxRows; i++) {
        checkV += arrayGame[i][c]
    }
    // console.log('V', checkV)

    let max = (maxRows < maxCols) ? maxCols : maxRows

    // diagonale UP
    // r--c++ ou r++c-- 
    let countUp = 1
    for (let i = 1; i < max; i++) {
        // console.log('test', r + i, c - i)
        if (arrayGame[r + i] !== undefined) {
            if (arrayGame[r + i][c - i] !== undefined) {
                if (arrayGame[r + i][c - i] === player) countUp++
                console.log(r + i, c - i, 'up1', countUp)
            }
        }
        // console.log('test', r - i, c + i)
        if (arrayGame[r - i] !== undefined) {
            if (arrayGame[r - i][c + i] !== undefined) {
                if (arrayGame[r - i][c + i] === player) countUp++
                console.log(r - i, c + i, 'up2', countUp)
            }
        }

    }
    if (countUp === 4) { // 4 pions alignés en diagonale UP
        displayWinner(player)
    }

    // diagonale DOWN
    // r++c++ ou r--c-- 
    let countDown = 1
    for (let i = 1; i < max; i++) {
        // console.log('test', r + i, c + i)
        if (arrayGame[r + i] !== undefined) {
            if (arrayGame[r + i][c + i] !== undefined) {
                if (arrayGame[r + i][c + i] === player) countDown++
                console.log(r + i, c + i, 'down1', countDown)
            }
        }
        // console.log('test', r - i, c - i)
        if (arrayGame[r - i] !== undefined) {
            if (arrayGame[r - i][c - i] !== undefined) {
                if (arrayGame[r - i][c - i] === player) countDown++
                console.log(r - i, c - i, 'down2', countDown)
            }
        }

    }
    if (countDown === 4) {// 4 pions alignés en diagonale DOWN
        displayWinner(player)
    }


    // verif des pattern
    let p = player.toString()
    pattern = new RegExp(p + p + p + p)
    for (let t of [checkH, checkV]) {
        if (pattern.test(t)) {
            console.log('WINNER', player)
            displayWinner(player)
        }
    }

}

// change de joueur
function switchPlayer() {
    player = (player === 1) ? 2 : 1
    spanPlayer = document.querySelector('#player')
    spanPlayer.textContent = player
    spanPlayer.className = (player === 1) ? 'red' : 'yellow'
    // console.log('switched to player', player)
}


// affiche le joueur gagnant
function displayWinner(player) {
    document.querySelector('#winner').textContent = `Payer ${player} wins !`
}

// init new game
function newGame(cols, rows) {
    builtGame(cols, rows)
    addEvents(cols, rows)
}

newGame(maxCols, maxRows)