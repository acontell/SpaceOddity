/* 
 * Singleton with utility and helper functions.
 */
(function (UTILS, _, undefined) {
    /* private */
    function isThereCollision(rect1, rect2) {
        return rect1.x < rect2.x + rect2.width &&
                rect1.x + rect1.width > rect2.x &&
                rect1.y < rect2.y + rect2.height &&
                rect1.height + rect1.y > rect2.y;
    }

    function getValidOffsetBoundary(boundary, position, offset) {
        var newVal = position + offset,
            validOffset = newVal < boundary.min ? boundary.min - position : offset;

        return newVal > boundary.max ? boundary.max - position : validOffset;
    }

    function getCreatureNewRect(creature, coord, offset) {
        var newRect = _.pick(creature, 'height', 'width', 'x', 'y');
        newRect[coord.axis] += offset;
        return newRect;
    }

    function getValidOffset(coord, creature, offset) {
        var canvasBoundary = {min: 0, max: GAME.getCanvasSize()[coord.depth] - creature[coord.depth]},
            validOffsetBoundary = getValidOffsetBoundary(canvasBoundary, creature[coord.axis], offset);

        return _.reduce(GAME.getAllCreaturesButMe(creature), function (memo, creature2) {
            var boundary;
            if (isThereCollision(getCreatureNewRect(creature, coord, validOffsetBoundary), creature2)) {
                boundary = creature[coord.axis] < creature2[coord.axis]
                        ? _.extend(canvasBoundary, {max: creature2[coord.axis] - creature[coord.depth]})
                        : _.extend(canvasBoundary, {min: creature2[coord.axis] + creature2[coord.depth]});
                        
                memo = getValidOffsetBoundary(boundary, creature[coord.axis], offset);
            }
            return memo;
        }, validOffsetBoundary);
    }

    /* public interface */
    UTILS.getValidOffsetX = _.partial(getValidOffset, CONSTANTS.coordsAlias.X);

    UTILS.getValidOffsetY = _.partial(getValidOffset, CONSTANTS.coordsAlias.Y);

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

    UTILS.loadSprites = function (actors) {
        return $.when.apply($, _.reduce(actors, function (memo, creature) {
            var dfd = $.Deferred(),
                image = new Image;
            image.src = creature.imageUrl;
            image.onload = function () {
                creature.image = image;
                dfd.resolve();
            };
            return memo.concat(dfd.promise());
        }, []));
    };
})(window.UTILS = window.UTILS || {}, _);




