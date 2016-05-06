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
    function isThereCollision(rect1, rect2) {
        return rect1.x < rect2.x + rect2.width &&
                rect1.x + rect1.width > rect2.x &&
                rect1.y < rect2.y + rect2.height &&
                rect1.height + rect1.y > rect2.y;
    }
    
    function getTilesBasedOnRect(rect) {
        return [
            _.range(Math.floor(rect.x / tileWidth), Math.floor((rect.x + rect.width) / tileWidth) + 1),
            _.range(Math.floor(rect.y / tileHeight), Math.floor((rect.y + rect.height) / tileHeight) + 1)
        ];
    }

    function getTilesValuesBasedOnRect(rect) {
        var tiles = getTilesBasedOnRect(rect);
        return [].concat.apply([], _.reduce(tiles[0], function(memo, x) {
            return memo.concat(_.reduce(tiles[1], function(memo2, y) {
               return memo2.concat(world[x][y]); 
            }, []));
        }, []));
    }
    
    function noCollisionWithWorldObjects(rect) {
        return _.every(getTilesValuesBasedOnRect(rect), function (tileValue) {
            return tileValue > noMovementTileNumberLimit;
        });
    }
    
    function getAllCreaturesButMe(creature) {
        return _.filter(creatures, function (creature1) {
            return creature !== creature1;
        });
    }
    
    function noCollisionWithOtherCreatures(rect, creature) {
        return _.every(getAllCreaturesButMe(creature), function (creature1) {
            return !isThereCollision(rect, creature1);
        });
    }

    /* public interface */
    COLLISION.isValidMovement = function (rect, creature) {
        return noCollisionWithWorldObjects(rect) && noCollisionWithOtherCreatures(rect, creature);
    };
    
    COLLISION.loadCfg = function (elements) {
        world = elements.world;
        creatures = elements.creatures;
        noMovementTileNumberLimit = elements.noMovementTileNumberLimit;
        tileWidth = elements.tileWidth;
        tileHeight = elements.tileHeight;
    };
})(window.COLLISION = window.COLLISION || {}, jQuery, _);
