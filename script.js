const domManipulation = (function() {
    'use strict';

    //Acessing container holding gameTile divs
    const gameContainer = document.getElementById('gameDisplay');
    //Accessing Instantiation Buttons
    const startButton = document.getElementById('strtBtn');
    const resetButton = document.getElementById('rstBtn');
    //Accessing Setting Buttons
    const selectTokenButtons = document.querySelectorAll('.tokenSelectionBtn');
    //Setting Listeners for Instatiation Buttons
    const buttonListeners = function() {

        startButton.addEventListener('click', () => {
            boardInstantiation();
            if (gameState.getPlayerToken() != 'X') {
                gameLogic.gameFlow('computer', gameLogic.easyAI());
            };
            startButton.disabled = true;
        });

        resetButton.addEventListener('click', () => {
            let currentTileDivs = document.querySelectorAll('.gameTile');
            currentTileDivs.forEach((tile) => {
                gameContainer.removeChild(tile);
            });
            gameState.resetState();
            boardInstantiation();
            if (gameState.getPlayerToken() === 'O') {
                gameLogic.gameFlow('computer', gameLogic.easyAI());
            }
        });

        selectTokenButtons.forEach((button) => {
            button.addEventListener('click', () => {
                gameState.setPlayerToken(button.value);
            })
        });

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
                    gameTile.classList.add(
                        gameState.getPlayerToken() === 'X' ?
                         'gameTileCross' : 'gameTileNought'
                    );
                    gameLogic.gameFlow('player', gameTile.id);
                });
                gameContainer.appendChild(gameTile);
            };
        };
    };

    return {
        buttonListeners,
    };
    
})();

const agentFactory = (name) => {
    'use strict';

    let _agentMoves = [];

    const getMoves = function() {
        return _agentMoves;
    };

    const pushMove = function(move) {
        _agentMoves.push(move);
    };

    const resetArray = function() {
        _agentMoves = [];
    };

    return { name, getMoves, pushMove, resetArray };
};

const gameState = (function() {
    'use strict';

    let _playerToken = '';

    const _humanPlayer = agentFactory('Player', "X");
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
    };;

    const setPlayerToken = function(token) {
        _playerToken = token;
    };

    const getPlayerToken = function() {
        return _playerToken;
    };

   const resetState = function() {
        tileArrayClear();
        accessHumanPlayerObj().resetArray();
        accessComputerPlayerObj().resetArray();
    };

    return {
        accessHumanPlayerObj,
        accessComputerPlayerObj,
        tileArraySetter,
        tileArrayGetter,
        tileArrayClear,
        tileArrayPop,
        setPlayerToken,
        getPlayerToken,
        resetState,
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
        let tileSelection = document.getElementById(pickIndex);
        tileSelection.classList.add(
            gameState.getPlayerToken() === 'X' ?
            'gameTileNought' : 'gameTileCross'
        );
        return pickIndex;
    };

    const winCheck = function(array) {
        const stringifyArray = (array) => {return array.join('')};

        const regExArr = [
            "(?=.*1a)(?=.*2a)(?=.*3a)",
            "(?=.*1b)(?=.*2b)(?=.*3b)",
            "(?=.*1c)(?=.*2c)(?=.*3c)",
            "(?=.*1a)(?=.*1b)(?=.*1c)",
            "(?=.*2a)(?=.*2b)(?=.*2c)",
            "(?=.*3a)(?=.*3b)(?=.*3c)",
            "(?=.*1a)(?=.*2b)(?=.*3c)",
            "(?=.*1c)(?=.*2b)(?=.*3a)"
        ];
        const regExTest = new RegExp(regExArr.join('|'));

        switch (regExTest.test(stringifyArray(array))) {
            case true:
                return 'win';
                break;
            case false:
                if (gameState.tileArrayGetter().length === 0) {
                    return 'tie';
                } else {
                    return false;
                }
        };
    };

    const gameFlow = function(agent, selectedTile) {
        switch(agent) {
            case 'player':

                let player = gameState.accessHumanPlayerObj();
                tileInteractionLogic(player, selectedTile);

                let playerWinTieCheck = winCheck(player.getMoves());
                switch(playerWinTieCheck) {
                    case false:
                        gameFlow('computer', easyAI());
                        break;
                    case 'win':
                        console.log(`${document.getElementById('nameInput').value} won!`);
                        break;
                    case 'tie':
                        console.log('Tie!');
                };
                break;

            case 'computer':

                let computer = gameState.accessComputerPlayerObj();
                tileInteractionLogic(computer, selectedTile);

                let computerWinTieCheck = winCheck(computer.getMoves());
                switch(computerWinTieCheck) {
                    case 'win':
                        console.log('Computer Win!');
                        break;
                    case 'tie':
                        console.log('Tie!');
                }
        };
    };

    return {
        gameFlow,
        easyAI,
    }
})();

domManipulation.buttonListeners();