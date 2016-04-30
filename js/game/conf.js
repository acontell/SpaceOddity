/* 
 * Singleton to store some configuration variables.
 */
(function (CONF, $, _, undefined) {
    var noMovement = {
        x: 0,
        y: 0
    };

    CONF.keys = {
        37: {// Left
            offset: _.extend({}, noMovement, {x: -1}),
            movement: _.clone(noMovement)
        },
        38: {// Up
            offset: _.extend({}, noMovement, {y: -1}),
            movement: _.clone(noMovement)
        },
        39: {// Right
            offset: _.extend({}, noMovement, {x: 1}),
            movement: _.clone(noMovement)
        },
        40: {// Down
            offset: _.extend({}, noMovement, {y: 1}),
            movement: _.clone(noMovement)
        }
    };


    CONF.directions = {
        DOWN: 0,
        LEFT: 1,
        RIGHT: 2,
        UP: 3
    };

    CONF.howManyDirections = function () {
        return _.size(_.keys(CONF.directions));
    };

    CONF.actors = {
        rincewind: {
            x: 125,
            y: 125,
            numberOfFrames: 4,
            ticksPerFrame: 6,
            playerSpeed: 4,
            imageUrl: 'img/rincewind.png'
        },
        luggage: {
            x: 50,
            y: 50,
            numberOfFrames: 4,
            ticksPerFrame: 6,
            playerSpeed: 4,
            imageUrl: 'img/luggage.png'
        }
    };

    CONF.loadSprites = function () {
        return $.when.apply($, _.reduce(CONF.actors, function (memo, creature) {
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
})(window.CONF = window.CONF || {}, jQuery, _);

