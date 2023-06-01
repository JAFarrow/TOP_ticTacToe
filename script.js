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
                document.getElementById('gameDisplay').appendChild(gameTile);
            }
        }
    };

    return {
        boardInstantiation,
    };
    
})();

domManipulationModule.boardInstantiation();