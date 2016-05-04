/* 
 * Singleton with utility and helper functions.
 */
(function (UTILS, _, undefined) {
    /* private */
    function getRectAfterMovement(creature, movement) {
        return {
            x: creature.x + (creature.creatureSpeed * movement.x),
            y: creature.y + (creature.creatureSpeed * movement.y),
            width: creature.width,
            height: creature.height
        };
    }

    /* public interface */
    UTILS.getValidMovement = function (creature, movement) {
        var newPosition = getRectAfterMovement(creature, movement);
        return {
            x: WORLD.isValidMovement(_.extend({}, newPosition, {y: creature.y})) ? newPosition.x : creature.x,
            y: WORLD.isValidMovement(_.extend({}, newPosition, {x: creature.x})) ? newPosition.y : creature.y
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




