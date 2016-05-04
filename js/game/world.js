/* 
 * Singleton to control the world.
 */
(function (WORLD, $, _, undefined) {
    var world,
        worldCfg,
        tilesCfg,
        noMovementTileNumberLimit;

    /* private functions */ 
    function getTilesBasedOnCoords(coords) {
        return [
            _.range(Math.floor(coords.x / tilesCfg.tileWidth), Math.floor((coords.x + coords.width) / tilesCfg.tileWidth) + 1),
            _.range(Math.floor(coords.y / tilesCfg.tileHeight), Math.floor((coords.y + coords.height) / tilesCfg.tileHeight) + 1)
        ];
    }

    function getTilesValuesBasedOnCoords(coords) {
        var tiles = getTilesBasedOnCoords(coords);
        return [].concat.apply([], _.reduce(tiles[0], function(memo, x) {
            return memo.concat(_.reduce(tiles[1], function(memo2, y) {
               return memo2.concat(world[x][y]); 
            }, []));
        }, []));
    }

    /* public functions */
    WORLD.isValidMovement = function (rect) {
        return _.every(getTilesValuesBasedOnCoords(rect), function (tileValue) {
            return tileValue > noMovementTileNumberLimit;
        });
    };

    WORLD.loadLevel = function (level) {
        world = level;
        return WORLD;
    };

    WORLD.draw = function (ctx) {
        _.each(world, function (column, x) {
            _.each(column, function (spriteNum, y) {
                ctx.drawImage(
                        tilesCfg.image,
                        spriteNum * tilesCfg.tileWidth,
                        0,
                        tilesCfg.tileWidth,
                        tilesCfg.tileHeight,
                        x * tilesCfg.tileWidth,
                        y * tilesCfg.tileHeight,
                        tilesCfg.tileWidth,
                        tilesCfg.tileHeight);
            });
        });
        return WORLD;
    };

    WORLD.loadCfg = function (cfg) {
        worldCfg = cfg;
        tilesCfg = cfg.tiles;
        noMovementTileNumberLimit = cfg.noMovementTileNumberLimit;
        return WORLD;
    };

})(window.WORLD = window.WORLD || {}, jQuery, _);

