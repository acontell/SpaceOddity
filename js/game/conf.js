/* 
 * Singleton to store some configuration variables.
 */
(function (CONF, _, undefined) {
    var noMovement = {
        x: 0,
        y: 0
    };
    CONF.keys = {
        37: {// Left
            offset: _.extend({}, noMovement, {x: -7}),
            movement: _.clone(noMovement)
        },
        38: {// Up
            offset: _.extend({}, noMovement, {y: -7}),
            movement: _.clone(noMovement)
        },
        39: {// Right
            offset: _.extend({}, noMovement, {x: 7}),
            movement: _.clone(noMovement)
        },
        40: {// Down
            offset: _.extend({}, noMovement, {y: 7}),
            movement: _.clone(noMovement)
        }
    };
    
    CONF.player = {
        x: 125,
        y: 125,
        width: 50,
        height: 50
    };
    
    CONF.alien = {
        x: 50,
        y: 50,
        width: 50,
        height: 50
    };
})(window.CONF = window.CONF || {}, _);

