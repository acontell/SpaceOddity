/* 
 * Singleton to store some configuration variables.
 */
(function (CONF, $, _, undefined) {
    CONF.keys = {
        37: {// Left
            offset: _.extend({}, CONSTANTS.noMovement, {x: -1}),
            movement: _.clone(CONSTANTS.noMovement)
        },
        38: {// Up
            offset: _.extend({}, CONSTANTS.noMovement, {y: -1}),
            movement: _.clone(CONSTANTS.noMovement)
        },
        39: {// Right
            offset: _.extend({}, CONSTANTS.noMovement, {x: 1}),
            movement: _.clone(CONSTANTS.noMovement)
        },
        40: {// Down
            offset: _.extend({}, CONSTANTS.noMovement, {y: 1}),
            movement: _.clone(CONSTANTS.noMovement)
        }
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
})(window.CONF = window.CONF || {}, jQuery, _);

