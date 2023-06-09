const domManipulation = (function() {
    'use strict';

    //Acessing container holding gameTile divs
    const gameContainer = document.getElementById('gameDisplay');
    //Accessing Instantiation Buttons
    const startButton = document.getElementById('strtBtn');
    const resetButtons = document.querySelectorAll('.resetGameButton');
    //Accessing sidebar warning
    const warningDialogue = document.getElementById('warning');
    //Accessing select token buttons
    const selectTokenButtons = document.querySelectorAll('.tokenSelectionBtn');
    //Accessing token sets
    const allXTokenButtons = document.querySelectorAll('.tokenX');
    const allOTokenButtons = document.querySelectorAll('.tokenO');
    //Accessing gameOverDisplay elements
    const gameOverDisplay = document.getElementById('gameOverDisplay');
    const gameOverWinnerAnnouncement = document.getElementById('gameOverWinner');
    const gameOverHumanTally = document.getElementById('humanTally');
    const gameOverTieTally = document.getElementById('tieTally');
    const gameOverComputerTally = document.getElementById('computerTally');
    //Accessing difficulty setting buttons
    const setDifficultyButtons = document.querySelectorAll('.setDifficultyButton');
    //Accessing sets of difficulty buttons
    const allEasyButtons = document.querySelectorAll('.difficultyEasy');
    const allHardButtons = document.querySelectorAll('.difficultyHard');
    const allImpossibleButtons = document.querySelectorAll('.difficultyImpossible');
    //Accessing all settings buttons
    const allSettingButtons = document.querySelectorAll('.settingButton');

    const buttonListeners = function() {

        startButton.addEventListener('click', () => {
            boardInstantiation();
            if (gameState.getPlayerToken() != 'X') {
                gameLogic.gameFlow('computer', gameState.returnDifficulty());
            };
            startButton.disabled = true;
        });

        resetButtons.forEach((button) => {
            button.addEventListener('click', () => {
                if (gameOverDisplay.style.display === 'flex') {
                    gameOverDisplay.style.display = 'none';
                };
                let currentTileDivs = document.querySelectorAll('.gameTile');
                currentTileDivs.forEach((tile) => {
                    gameContainer.removeChild(tile);
                });
                gameState.resetState();
                boardInstantiation();
                if (gameState.getPlayerToken() === 'O') {
                    gameLogic.gameFlow('computer', gameState.returnDifficulty());
                }
            });
        });

        selectTokenButtons.forEach((button) => {
            button.addEventListener('click', () => {
                gameState.setPlayerToken(button.value);
                switch(gameState.getPlayerToken()) {
                    case 'X':
                        allXTokenButtons.forEach((button) => {
                            button.disabled = true;
                        });
                        allOTokenButtons.forEach((button) => {
                            button.disabled = false;
                        });
                        break;
                    case 'O':
                        allXTokenButtons.forEach((button) => {
                            button.disabled = false;
                        });
                        allOTokenButtons.forEach((button) => {
                            button.disabled = true;
                        });
                };
            });
        });

        setDifficultyButtons.forEach((button) => {
            button.addEventListener('click', () => {
                gameState.setDifficulty(button.value);
                switch(gameState.returnDifficultyAsString()) {
                    case 'easy':
                        allEasyButtons.forEach((button) => {
                            button.disabled = true;
                        });
                        allHardButtons.forEach((button) => {
                            button.disabled = false;
                        });
                        allImpossibleButtons.forEach((button) => {
                            button.disabled = false;
                        });
                        break;
                    case 'hard':
                        allEasyButtons.forEach((button) => {
                            button.disabled = false;
                        });
                        allHardButtons.forEach((button) => {
                            button.disabled = true;
                        });
                        allImpossibleButtons.forEach((button) => {
                            button.disabled = false;
                        });
                        break;
                    case 'impossible':
                        allEasyButtons.forEach((button) => {
                            button.disabled = false;
                        });
                        allHardButtons.forEach((button) => {
                            button.disabled = false;
                        });
                        allImpossibleButtons.forEach((button) => {
                            button.disabled = true;
                        });
                };
            });
        });

        const initialEnableStart = function() {
            if (gameState.returnDifficultyAsString() != '' && gameState.getPlayerToken() != '') {
                startButton.disabled = false;
                warningDialogue.innerHTML = '<p>Good luck and have fun!';
            };
            if (startButton.disabled === false) {
                allSettingButtons.forEach((button) => {
                    button.removeEventListener('click', initialEnableStart);
                });
            };
        };

        allSettingButtons.forEach((button) => {
            button.addEventListener('click', initialEnableStart);
        });
    };

    const gameOverInfoController = (function() {
        const setWinner = function(str) {
            switch(str) {
                case 'Tie!':
                    gameOverWinnerAnnouncement.innerHTML = str;
                    break;
                case 'Player':
                    gameOverWinnerAnnouncement.innerHTML = `${document.getElementById('nameInput').value} Won!`;
                    break;
                case 'Computer':
                    gameOverWinnerAnnouncement.innerHTML = `${str} Won!`;
            }
        };

        const setPlayerScore = function() {
            gameOverHumanTally.innerText = gameState.returnPlayerTally();
        };

        const setTieScore = function() {
            gameOverTieTally.innerText = gameState.returnTieTally();
        };

        const setComputerScore = function() {
            gameOverComputerTally.innerText = gameState.returnComputerTally();
        };

        return {
            setWinner,
            setPlayerScore,
            setTieScore,
            setComputerScore
        }
    })();

    const gameOverHandler = function(winner) {
        gameOverInfoController.setWinner(winner);
        gameOverInfoController.setPlayerScore();
        gameOverInfoController.setTieScore();
        gameOverInfoController.setComputerScore();
        gameOverDisplay.style.display = 'flex';
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
                gameContainer.style.backgroundColor = '#696d86';
                gameTile.addEventListener('click', () => {
                    gameLogic.gameFlow('player', gameTile.id);
                });
                gameContainer.appendChild(gameTile);
            };
        };
    };

    return {
        buttonListeners,
        gameOverHandler
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

    const cloneAgentMoves = function() {
        return [..._agentMoves];
    }

    return { name, getMoves, pushMove, resetArray, cloneAgentMoves };
};

const gameState = (function() {
    'use strict'; 

    const _humanPlayer = agentFactory('Player');
    const _computerPlayer = agentFactory('Computer');

    const accessHumanPlayerObj = function() {
        return _humanPlayer;
    };

    const accessComputerPlayerObj = function () {
        return _computerPlayer;
    };

    let _tileArray = [];

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
        let newTileArray = [..._tileArray];
        newTileArray.splice(tileIndex, 1);
        _tileArray = newTileArray;
    };

    const cloneTileArray = function() {
        return [..._tileArray];
    };

    let _playerToken = '';

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

    let _selectedDifficulty = '';

    const setDifficulty = function(str) {
        _selectedDifficulty = str;
    };

    const returnDifficultyAsString = function() {
        return _selectedDifficulty;
    }

    const returnDifficulty = function() {
        switch(_selectedDifficulty) {
            case 'easy':
                return gameLogic.easyAI();
            case 'hard':
                return gameLogic.hardAI();
            case 'impossible':
                return gameLogic.impossibleAI();
        };
    };

    let _playerTally = 0;

    const returnPlayerTally = function() {
        return _playerTally;
    };

    const incrementPlayerTally = function() {
        _playerTally++;
    };

    let _tieTally = 0;

    const returnTieTally = function() {
        return _tieTally;
    };

    const incrementTieTally = function() {
        _tieTally++;
    };

    let _computerTally = 0;

    const returnComputerTally = function() {
        return _computerTally;
    };

    const incrementComputerTally = function() {
        _computerTally++;
    };

    return {
        accessHumanPlayerObj,
        accessComputerPlayerObj,
        tileArraySetter,
        tileArrayGetter,
        tileArrayClear,
        tileArrayPop,
        cloneTileArray,
        setPlayerToken,
        getPlayerToken,
        resetState,
        setDifficulty,
        returnDifficulty,
        returnDifficultyAsString,
        returnPlayerTally,
        incrementPlayerTally,
        returnTieTally,
        incrementTieTally,
        returnComputerTally,
        incrementComputerTally
    };
})();

const gameLogic = (function() {
    'use strict';

    const tileInteractionLogic = function(agent, selectedTile) {
        let selectedGameTile = document.getElementById(selectedTile);

        if (gameState.tileArrayGetter().indexOf(selectedTile) != -1) {
            gameState.tileArrayPop(selectedTile);
            if (agent === 'player') {
                gameState.accessHumanPlayerObj().pushMove(selectedTile);
            } else if (agent === 'computer') {
                gameState.accessComputerPlayerObj().pushMove(selectedTile);
            }
            switch(gameState.getPlayerToken()) {
                case 'O':
                    selectedGameTile.classList.add(
                    agent === 'player' ? 'gameTileNought' : 'gameTileCross' );
                    break;
                case 'X': 
                    selectedGameTile.classList.add(
                    agent === 'player' ? 'gameTileCross' : 'gameTileNought' );
                    break;
            }
        } else {
            console.log('Error!');
        }
    };

    const randomCornerTile = function() {
        const cornerSpots = ['1a', '3a', '1c', '3c'];
        return cornerSpots[Math.floor(Math.random() *4)];
    };

    const easyAI = function() {
        let randomPick = Math.floor(Math.random() * gameState.tileArrayGetter().length);
        let pickIndex = gameState.tileArrayGetter()[randomPick];
        return pickIndex;
    };

    const hardAI = function() {
        let gameBoard = gameState.cloneTileArray();
        let computerMoves = gameState.accessComputerPlayerObj().cloneAgentMoves();
        let humanMoves = gameState.accessHumanPlayerObj().cloneAgentMoves();

        const evalMove = function(moveArray) {
            switch(winCheck(moveArray)) {
                case true:
                    return 10;
                case false:
                    return 0;
            };
        };

        if (gameBoard.length === 9) {
            return randomCornerTile(); 
        } else if (humanMoves.indexOf('2b') === -1 && computerMoves.indexOf('2b') === -1) {
            return '2b';
        } else {
            let nextMove = '';
            for ( let move = 0; move <= gameBoard.length; move++) {
                let newMove = gameBoard[move];
                let humanMovesPlusMove = [...humanMoves];
                humanMovesPlusMove.push(newMove);
                let computerMovesPlusMove = [...computerMoves];
                computerMovesPlusMove.push(newMove);
                let newComputerScore = evalMove(computerMovesPlusMove);
                if (newComputerScore > 0) {
                    nextMove = newMove;
                    break;
                };
                let newHumanScore = evalMove(humanMovesPlusMove);
                if (newHumanScore > 0) {
                    nextMove = newMove;
                    break;
                } else {
                    nextMove = gameBoard[Math.floor(Math.random() * gameBoard.length)];
                };
            };
            return nextMove;
        };
    };

    const impossibleAI = function() {
        let realGameBoard = gameState.cloneTileArray();
        let computerMoves = gameState.accessComputerPlayerObj().cloneAgentMoves();
        let humanMoves = gameState.accessHumanPlayerObj().cloneAgentMoves();

        const bestMove = function(gameBoard, currentComputerMoves, currentHumanMoves) {
            if (gameBoard.length === 9) {
                return randomCornerTile();
            } else {
                let bestScore = -1000;
                let bestMove = '';
                for (let move = 0; move <= gameBoard.length - 1; move++) {
                    let newMove = gameBoard[move];
                    let gameBoardMinusMove = [...gameBoard];
                    gameBoardMinusMove.splice(move, 1)
                    let computerMovesPlusNewMove = [...currentComputerMoves];
                    computerMovesPlusNewMove.push(newMove);
                    let newScore = miniMax(gameBoardMinusMove, computerMovesPlusNewMove, currentHumanMoves, gameBoardMinusMove.length, false);
                    if (newScore > bestScore) {
                        bestScore = newScore;
                        bestMove = newMove;
                    };
                    // console.log(`Best Move = ${bestMove} & Best Score = ${bestScore}`);      logging each move and respective value for testing
                };
                return bestMove;
            };
        };

        const miniMax = function(gameBoard, maxiMoves, miniMoves, depth, isMaximiser) {
            if (winCheck(maxiMoves) === true) {
                return 10 - depth;
            };

            if (winCheck(miniMoves) === true) {
                return depth - 10;
            };

            if (depth === 0) {
                return 0;
            };


            if (isMaximiser) {
                let maxiBestScore = -1000;
                for (let move = 0; move <= depth - 1; move++) {
                    let gameBoardMinusMove = [...gameBoard];
                    gameBoardMinusMove.splice(move, 1);
                    let maxiArrayPlusMove = [...maxiMoves];
                    maxiArrayPlusMove.push(gameBoard[move]);
                    let miniMovesClone = [...miniMoves];
                    maxiBestScore = Math.max(maxiBestScore, miniMax(gameBoardMinusMove, maxiArrayPlusMove, miniMovesClone, gameBoardMinusMove.length, false));
                };
                return maxiBestScore;
            } else {
                let miniBestScore = 1000;
                for (let move = 0; move <= depth - 1; move++) {
                    let gameBoardMinusMove = [...gameBoard];
                    gameBoardMinusMove.splice(move, 1)
                    let miniArrayPlusMove = [...miniMoves];
                    miniArrayPlusMove.push(gameBoard[move]);
                    let maxiMovesClone = [...maxiMoves];
                    miniBestScore = Math.min(miniBestScore, miniMax(gameBoardMinusMove, maxiMovesClone, miniArrayPlusMove, gameBoardMinusMove.length, true));
                };
                return miniBestScore;
            };
        };
        return bestMove(realGameBoard, computerMoves, humanMoves);

    };

    const regExInit = function() {
        const regEx = [
            "(?=.*1a)(?=.*2a)(?=.*3a)",
            "(?=.*1b)(?=.*2b)(?=.*3b)",
            "(?=.*1c)(?=.*2c)(?=.*3c)",
            "(?=.*1a)(?=.*1b)(?=.*1c)",
            "(?=.*2a)(?=.*2b)(?=.*2c)",
            "(?=.*3a)(?=.*3b)(?=.*3c)",
            "(?=.*1a)(?=.*2b)(?=.*3c)",
            "(?=.*1c)(?=.*2b)(?=.*3a)"
            ];
            const regExTest = new RegExp(regEx.join('|'));
            return regExTest;
    }

    const winRegExTest = regExInit();

    const winCheck = function(array) {
        const stringifyArray = (array) => {return array.join('')};
        return (winRegExTest.test(stringifyArray(array)) === true ? true: false);
    };

    const gameFlow = function(agent, selectedTile) {
        switch(agent) {
            case 'player':

                tileInteractionLogic('player', selectedTile);

                switch(winCheck(gameState.accessHumanPlayerObj().getMoves())) {
                    case false:
                        if (gameState.tileArrayGetter().length === 0) {
                            gameState.incrementTieTally();
                            domManipulation.gameOverHandler('Tie!');
                        } else {
                            gameFlow('computer', gameState.returnDifficulty());
                        };
                        break;
                    case true:
                        gameState.incrementPlayerTally();
                        domManipulation.gameOverHandler('Player');
                };
                break;

            case 'computer':

                tileInteractionLogic('computer', selectedTile);

                switch(winCheck(gameState.accessComputerPlayerObj().getMoves())) {
                    case true:
                        gameState.incrementComputerTally();
                        domManipulation.gameOverHandler('Computer');
                        break;
                    case false:
                        if (gameState.tileArrayGetter().length === 0) {
                            gameState.incrementTieTally();
                            domManipulation.gameOverHandler('Tie!');
                        };
                };
        };
    };

    return {
        gameFlow,
        easyAI,
        impossibleAI,
        hardAI,
    }
})();

domManipulation.buttonListeners();