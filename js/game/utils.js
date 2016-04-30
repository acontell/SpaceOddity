/* 
 * Singleton with utility and helper functions.
 */
(function (UTILS, _, undefined) {
    /* private */

    /* public interface */
    UTILS.getValidOffset = function (boundary, position, offset) {
        var newVal = position + offset,
            validOffset = newVal < 0 ? offset - newVal : offset;

        return newVal > boundary ? boundary - position : validOffset;
    };

    UTILS.getMovementBasedOnKeys = function (keys) {
        return _.reduce(keys, function (memo, val) {
            memo.x += val.movement.x;
            memo.y += val.movement.y;
            return memo;
        }, {x: 0, y: 0});
    };

    UTILS.noMovement = function (movement) {
        return movement.x === 0 && movement.y === 0;
    };
    
    UTILS.movesHorizontally = function (movement) {
        return movement.x !== 0 && movement.y === 0;
    };
    
    UTILS.movesVertically = function (movement) {
        return movement.x === 0 && movement.y !== 0;
    };
})(window.UTILS = window.UTILS || {}, _);




