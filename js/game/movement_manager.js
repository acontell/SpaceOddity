/* 
 * Singleton to manage creature movement
 */
(function (MOVEMENT, $, _, undefined) {
    /* private functions */
    
    /* public interface */
    MOVEMENT.getValidMovement = function (creature, newPosition) {
        return {
            x: COLLISION.isValidMovement(_.extend({}, newPosition, {y: creature.y})) ? newPosition.x : creature.x,
            y: COLLISION.isValidMovement(_.extend({}, newPosition, {x: creature.x})) ? newPosition.y : creature.y
        };
    };
    
    MOVEMENT.getMovementBasedOnKeys = function (keys) {
        return _.reduce(keys, function (memo, val) {
            memo.x += val.movement.x;
            memo.y += val.movement.y;
            return memo;
        }, {x: 0, y: 0});
    };

    MOVEMENT.hasNoMovement = function (movement) {
        return movement.x === 0 && movement.y === 0;
    };

    MOVEMENT.isMovingHorizontally = function (movement) {
        return movement.x !== 0 && movement.y === 0;
    };

    MOVEMENT.isMovingVertically = function (movement) {
        return movement.x === 0 && movement.y !== 0;
    };

})(window.MOVEMENT = window.MOVEMENT || {}, jQuery, _);
