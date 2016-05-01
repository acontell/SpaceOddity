/* 
 * Singleton to store some configuration variables.
 */
(function (CONSTANTS, _, undefined) {
    CONSTANTS.noMovement = {
        x: 0,
        y: 0
    };

    CONSTANTS.directions = {
        DOWN: 0,
        LEFT: 1,
        RIGHT: 2,
        UP: 3
    };

    CONSTANTS.numberOfDirections = _.size(_.keys(CONSTANTS.directions));
    
    CONSTANTS.coordsAlias = {
        X: {
            axis: 'x',
            depth: 'width'
        },
        Y: {
            axis: 'y',
            depth: 'height'
        }
    };
})(window.CONSTANTS = window.CONSTANTS || {}, _);

