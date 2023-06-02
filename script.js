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
                // "Tile" div interaction event listener
                gameTile.addEventListener('click', function() {
                    this.style.backgroundColor = 'blue';
                    gameState.tileArrayPop(this.id);
                    console.log(gameState.tileArrayGetter());
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

    let _tileArray = [];

    const tileArraySetter = function(tile) {
        _tileArray.push(tile);
    };

    const tileArrayGetter = function() {
        return _tileArray;
    }

    const tileArrayPop = function(selectedTile) {
        let tileIndex = _tileArray.indexOf(`${selectedTile}`)
        _tileArray.splice(tileIndex, 1);
    }

    return {
        tileArraySetter,
        tileArrayGetter,
        tileArrayPop,
    };
})();

// const agentFactory = (name) => {
//     'use strict';

//     const  
// };

domManipulationModule.boardInstantiation();