/* 
 * Singleton to manage creature collision with the world elements and other creatures.
 */
(function (COLLISION, $, _, undefined) {
    var noMovementTileNumberLimit;
        
    /* private functions */
    function isThereCollision(rect1, rect2) {
        return rect1.x < rect2.x + rect2.width &&
                rect1.x + rect1.width > rect2.x &&
                rect1.y < rect2.y + rect2.height &&
                rect1.height + rect1.y > rect2.y;
    }
    
    function noCollisionWithWorldObjects(rect) {
        return _.every(WORLD.getTilesValuesBasedOnRect(rect), function (tileValue) {
            return tileValue > noMovementTileNumberLimit;
        });
    }
    
    function noCollisionWithOtherCreatures(rect, creature) {
        return _.every(GAME.getAllCreaturesButMe(creature), function (creature1) {
            return !isThereCollision(rect, creature1);
        });
    }

    /* public interface */
    COLLISION.isValidMovement = function (rect, creature) {
        return noCollisionWithWorldObjects(rect) && noCollisionWithOtherCreatures(rect, creature);
    };
    
    COLLISION.loadCfg = function (elements) {
        noMovementTileNumberLimit = elements.noMovementTileNumberLimit;
    };
})(window.COLLISION = window.COLLISION || {}, jQuery, _);
