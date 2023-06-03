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
            gameState.accessComputerPlayerObj().resetArray();
            gameState.accessHumanPlayerObj().resetArray();
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
                    gameTile.classList.add('gameTileCross');
                    gameLogic.easyAI();
                    gameLogic.winCheck(gameState.accessHumanPlayerObj());
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

    let _agentMoves = [];;

    const getMoves = function() {
        return _agentMoves;
    };

    const pushMove = function(move) {
        _agentMoves.push(move);
    };

    const resetArray = function() {
        _agentMoves = [];
    };

    return { name, marker, getMoves, pushMove, resetArray };
};

const gameState = (function() {
    'use strict';

    const _humanPlayer = agentFactory(document.getElementById('nameInput').value, "X");
    const _computerPlayer = agentFactory('Computer', "O")

    let _tileArray = [];

    const accessHumanPlayerObj = function() {
        return _humanPlayer;
    };

    const accessComputerPlayerObj = function () {
        return _computerPlayer;
    }

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
        accessComputerPlayerObj,
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
        if (gameState.tileArrayGetter().indexOf(selectedTile) != -1) {
            gameState.tileArrayPop(selectedTile);
            agent.pushMove(selectedTile);
        } else {
            console.log('Error!');
        }
    }

    const easyAI = function() {
        let randomPick = Math.floor(Math.random() * gameState.tileArrayGetter().length);
        let pickIndex = gameState.tileArrayGetter()[randomPick];
        let tilePick = document.getElementById(pickIndex);
        tileInteractionLogic(gameState.accessComputerPlayerObj(), pickIndex);
        tilePick.classList.add('gameTileNought');
        winCheck(gameState.accessComputerPlayerObj());
    };

    const winCheck = function(agent) {
        let moveArray = agent.getMoves();
        let stringifiedArray = moveArray.join('');

        const regExArr = [
            "(?=.*1a)(?=.*2a)(?=.*3a)",
            "(?=.*1b)(?=.*2b)(?=.*3b)",
            "(?=.*1c)(?=.*2c)(?=.*3c)",
            "(?=.*1a)(?=.*1b)(?=.*1c)",
            "(?=.*2a)(?=.*2b)(?=.*2c)",
            "(?=.*3a)(?=.*3b)(?=.*3c)",
            "(?=.*1a)(?=.*2b)(?=.*3c)",
            "(?=.*3a)(?=.*2b)(?=.*3c)"
        ];
        const regExTest = new RegExp(regExArr.join('|'));

        if (regExTest.test(stringifiedArray) == true) {
            console.log("Win!");
        } else {
            console.log("No win..");
        }
    };

    return {
        tileInteractionLogic,
        easyAI,
        winCheck,
    }
})();

domManipulation.buttonListeners();