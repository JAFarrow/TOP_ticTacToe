const domManipulation = (function() {
    'use strict';

    //Acessing container holding gameTile divs
    const gameContainer = document.getElementById('gameDisplay');
    //Accessing Instantiation Buttons
    const startButton = document.getElementById('strtBtn');
    const resetButton = document.getElementById('rstBtn');
    //Setting Listeners for Instatiation Buttons
    const buttonListeners = function() {
        startButton.addEventListener('click', () => {
            boardInstantiation();
            startButton.disabled = true;
        });
        resetButton.addEventListener('click', () => {
            let currentTileDivs = document.querySelectorAll('.gameTile');
            currentTileDivs.forEach((tile) => {
                gameContainer.removeChild(tile);
            });
            gameState.tileArrayClear();
            boardInstantiation();
        })
    };

    const boardInstantiation = function() {
        for (let i = 1; i <= 3; i++) {
            for (let j = 1; j <= 3; j++) {
                let gameTile = document.createElement('div');
                gameTile.classList.add('gameTile');
                if (j == 1) {
                    gameTile.id = `${i}a`;
                } else if (j == 2) {
                    gameTile.id = `${i}b`;
                } else if (j == 3) {
                    gameTile.id = `${i}c`;
                };
                gameState.tileArraySetter(gameTile.id);
                gameContainer.style.backgroundColor = '#000';
                gameTile.addEventListener('click', () => {
                    gameLogic.tileInteractionLogic(gameState.accessHumanPlayerObj(), gameTile.id);
                });
                gameContainer.appendChild(gameTile);
            }
        }
    };

    return {
        buttonListeners,
    };
    
})();

const agentFactory = (name, marker) => {
    'use strict';

    let _agentMoves = [];
    let _agentWins = 0;

    const getMoves = function() {
        return _agentMoves;
    };

    const pushMove = function(move) {
        _agentMoves.push(move);
    };

    const incrementWin = function() {
        _agentWins + 1;
    };

    const returnScore = function () {
        return _agentWins;
    }

    return { name, marker, getMoves, pushMove, incrementWin, returnScore };
};

const gameState = (function() {
    'use strict';

    const humanPlayer = agentFactory(document.getElementById('nameInput').value, "X");

    let _tileArray = [];

    const accessHumanPlayerObj = function() {
        return humanPlayer;
    };

    const tileArraySetter = function(tile) {
        _tileArray.push(tile);
    };

    const tileArrayGetter = function() {
        return _tileArray;
    };

    const tileArrayClear = function() {
        _tileArray = [];
    };

    const tileArrayPop = function(selectedTile) {
        let tileIndex = _tileArray.indexOf(`${selectedTile}`)
        _tileArray.splice(tileIndex, 1);
    };

    return {
        accessHumanPlayerObj,
        tileArraySetter,
        tileArrayGetter,
        tileArrayClear,
        tileArrayPop,
    };
})();

const gameLogic = (function() {
    'use strict';

    //Game logic used in event listener for each game tile.
    const tileInteractionLogic = function(agent, selectedTile) {
        gameState.tileArrayPop(selectedTile);
        agent.pushMove(selectedTile);
    }

    return {
        tileInteractionLogic,
    }
})();

domManipulation.buttonListeners();