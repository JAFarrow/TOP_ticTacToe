const domManipulationModule = (function() {
    'use strict';

    let boardInstantiation = function() {
        for (let i = 0; i <= 9; i++) {
            let gameTile = document.createElement('div');
            gameTile.classList.add('gameTile');
            gameTile.id = i;
            document.getElementById('gameDisplay').appendChild(gameTile);
        }
    };

    return {
        boardInstantiation,
    };
    
})();

domManipulationModule.boardInstantiation();