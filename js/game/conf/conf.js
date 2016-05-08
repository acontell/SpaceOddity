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
            creatureSpeed: 4,
            imageUrl: 'img/rincewind.png',
            image: null
        },
        luggage: {
            x: 50,
            y: 50,
            numberOfFrames: 4,
            ticksPerFrame: 6,
            creatureSpeed: 0.5,
            perimeterOffset: 5,
            imageUrl: 'img/luggage.png',
            image: null
        }
    };
    
    CONF.world = {
        worldWidth: 16,
        worldHeight: 16,
        getSize: function () {
            return {width: this.worldWidth * this.tiles.tileWidth, height: this.worldHeight * this.tiles.tileHeight};
        },
        tiles: {
            tileWidth: 32,
            tileHeight: 32,
            imageUrl: 'img/tiles.png',
            image: null
        }
    };
    
    CONF.collision = {
        noMovementTileNumberLimit: 0
    };
    
    CONF.levels = {
        firstLevel: (function (worldCfg) {
            return _.reduce(_.range(worldCfg.worldWidth), function (memo, x) {
                memo.push(_.reduce(_.range(worldCfg.worldHeight), function (memo, y) {
                    return memo.concat(y === 0 || x === 0 
                            || x === worldCfg.worldWidth / 2 && y === worldCfg.worldHeight / 2
                            || x === Math.floor(worldCfg.worldWidth / 2.5) && y === Math.floor(worldCfg.worldHeight / 2.5)
                            || x === worldCfg.worldWidth - 1 || y === worldCfg.worldHeight - 1 ? 0 : 1);
                }, []));
                return memo;
            }, []);
        })(CONF.world)
    };
    
    CONF.elementsWithSprites = _.extend({}, CONF.actors, _.pick(CONF.world, 'tiles'));
})(window.CONF = window.CONF || {}, jQuery, _);

