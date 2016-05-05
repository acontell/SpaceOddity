/* 
 * Singleton to manage creature collision with the world elements and other creatures.
 */
(function (COLLISION, $, _, undefined) {
    var world,
        creatures,
        noMovementTileNumberLimit,
        tileWidth,
        tileHeight;
        
    /* private functions */
    function getTilesBasedOnCoords(coords) {
        return [
            _.range(Math.floor(coords.x / tileWidth), Math.floor((coords.x + coords.width) / tileWidth) + 1),
            _.range(Math.floor(coords.y / tileHeight), Math.floor((coords.y + coords.height) / tileHeight) + 1)
        ];
    }

    function getTilesValuesBasedOnCoords(coords) {
        var tiles = getTilesBasedOnCoords(coords);
        return [].concat.apply([], _.reduce(tiles[0], function(memo, x) {
            return memo.concat(_.reduce(tiles[1], function(memo2, y) {
               return memo2.concat(world[x][y]); 
            }, []));
        }, []));
    }
    
    function noCollisionWithWorldObjects(rect) {
        return _.every(getTilesValuesBasedOnCoords(rect), function (tileValue) {
            return tileValue > noMovementTileNumberLimit;
        });
    }
    
    function noCollisionWithOtherCreatures(rect) {
        return true;
    }

    /* public interface */
    COLLISION.isValidMovement = function (rect) {
        return noCollisionWithWorldObjects(rect) && noCollisionWithOtherCreatures(rect);
    };
    
    COLLISION.loadCfg = function (elements) {
        world = elements.world;
        creatures = elements.creatures;
        noMovementTileNumberLimit = elements.noMovementTileNumberLimit;
        tileWidth = elements.tileWidth;
        tileHeight = elements.tileHeight;
    };
})(window.COLLISION = window.COLLISION || {}, jQuery, _);
