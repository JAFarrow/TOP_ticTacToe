const domManipulationModule = (function() {
    'use strict';

    //Acessing Container Holding gameTile Divs
    let gameContainer = document.getElementById('gameDisplay');

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
                gameContainer.style.backgroundColor = '#000'
                gameContainer.appendChild(gameTile);
                // "Tile" div interaction event listener
                gameTile.addEventListener('click', function() {
                    this.style.backgroundColor = 'blue';
                    gameState.tileArrayPop(this.id);
                    console.log(gameState.tileArrayGetter());
                });
            }
        }
    };

    const buttonCreation = function() {
        const instanceButtonDiv = document.getElementById('instBtnDiv');
        //Start Button
        let startButton = document.createElement('button');
        startButton.innerText = 'Start';
        instanceButtonDiv.appendChild(startButton);
        startButton.addEventListener('click', () => boardInstantiation());
        //Reset Button
        let resetButton = document.createElement('button');
        resetButton.innerText = 'Reset';
        instanceButtonDiv.appendChild(resetButton);
        resetButton.addEventListener('click', () => {
            let currentTileDivs = document.querySelectorAll('.gameTile');
            currentTileDivs.forEach((tile) => {
                gameContainer.removeChild(tile);
            });
            gameState.tileArrayClear();
            boardInstantiation();
        });
    };

    return {
        boardInstantiation,
        buttonCreation,
    };
    
})();

const gameState = (function() {
    'use strict';

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
        _tileArray.splice(tileIndex, 1);
    };

    return {
        tileArraySetter,
        tileArrayGetter,
        tileArrayClear,
        tileArrayPop,
    };
})();

// const agentFactory = (name) => {
//     'use strict';

//     const  
// };

domManipulationModule.buttonCreation();