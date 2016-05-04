/* 
 * Singleton with utility and helper functions.
 */
(function (UTILS, _, undefined) {
    /* private */
    function getCreaturePositionAfterMovement(creature, movement) {
        var x = creature.x + (creature.creatureSpeed * movement.x),
            y = creature.y + (creature.creatureSpeed * movement.y);

        return {
            x: x,
            y: y,
            farthestX: x + (movement.x > 0 ? creature.width : 0),
            farthestY: y + (movement.y > 0 ? creature.height : 0)
        };
    }

    /* public interface */
    UTILS.getValidMovement = function (creature, movement) {
        var newPosition = getCreaturePositionAfterMovement(creature, movement);
        return {
            x: WORLD.isValidMovement({x: newPosition.farthestX, y: creature.y}) ? newPosition.x : creature.x,
            y: WORLD.isValidMovement({x: creature.x, y: newPosition.farthestY}) ? newPosition.y : creature.y
        };
    };
    
    UTILS.getMovementBasedOnKeys = function (keys) {
        return _.reduce(keys, function (memo, val) {
            memo.x += val.movement.x;
            memo.y += val.movement.y;
            return memo;
        }, {x: 0, y: 0});
    };

    UTILS.hasNoMovement = function (movement) {
        return movement.x === 0 && movement.y === 0;
    };

    UTILS.isMovingHorizontally = function (movement) {
        return movement.x !== 0 && movement.y === 0;
    };

    UTILS.isMovingVertically = function (movement) {
        return movement.x === 0 && movement.y !== 0;
    };

    UTILS.loadSprites = function (elements) {
        return $.when.apply($, _.reduce(elements, function (memo, element) {
            var dfd = $.Deferred(),
                image = new Image;
            image.src = element.imageUrl;
            image.onload = function () {
                element.image = image;
                dfd.resolve();
            };
            return memo.concat(dfd.promise());
        }, []));
    };
})(window.UTILS = window.UTILS || {}, _);




