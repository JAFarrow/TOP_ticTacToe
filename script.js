const domManipulationModule = (function() {
    'use strict';

    let boardInstantiation = function() {
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
                document.getElementById('gameDisplay').appendChild(gameTile);
                gameTile.addEventListener('click', function() {
                    this.style.backgroundColor = 'blue';
                });
            }
        }
    };

    return {
        boardInstantiation,
    };
    
})();

const gameState = (function() {
    'use strict';

    let tileArray = [];

    let tileArraySetter = function(tile) {
        tileArray.push(tile);
    };

    let tileArrayGetter = function() {
        return tileArray;
    }

    return {
        tileArraySetter,
        tileArrayGetter,
    };
})();

domManipulationModule.boardInstantiation();