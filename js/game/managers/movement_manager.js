/* 
 * Singleton to manage creature movement
 */
(function (MOVEMENT, $, _, undefined) {
    /* private functions */
    function willIReachAxis(current, destiny, speed) {
        return destiny > current && destiny < (current + speed)
                || destiny < current && destiny > (current - speed)
                || current === destiny;
    }
    
    /* public interface */
    MOVEMENT.getValidMovement = function (creature, movement) {
        var currentCoords = creature.getCoords(),
            newPosition = creature.getRectAfterMovement(creature.applySpeedToMovement(movement));
        return {
            x: COLLISION.isValidMovement(_.extend({}, newPosition, {y: currentCoords.y}), creature) ? newPosition.x : currentCoords.x,
            y: COLLISION.isValidMovement(_.extend({}, newPosition, {x: currentCoords.x}), creature) ? newPosition.y : currentCoords.y
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

    MOVEMENT.getMovementToCoords = function (originCoords, destinyCoords) {
        if (originCoords === destinyCoords) {
            return 0;
        }
        return destinyCoords > originCoords ? 1 : -1;
    };
    
    MOVEMENT.willReachPoint = function (current, destiny, speed) {
        return willIReachAxis(current.x, destiny.x, speed) && willIReachAxis(current.y, destiny.y, speed);
    };
    
    MOVEMENT.canWalkHereWrapper = function (creature) {
        return function (xTile, yTile) {
            var rect = _.extend(WORLD.getCoordsBasedOnTiles(xTile, yTile), _.pick(creature, 'height', 'width'));
            return COLLISION.isValidMovement(rect, creature);
        };
    };
})(window.MOVEMENT = window.MOVEMENT || {}, jQuery, _);
