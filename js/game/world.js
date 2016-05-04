/* 
 * Singleton to control the world.
 */
(function (WORLD, $, _, undefined) {
    var world,
        worldCfg,
        tilesCfg,
        noMovementTileNumberLimit;

    /* private functions */
    function getTileValueBasedOnCoords(coords) {
        return world[Math.floor(coords.x / tilesCfg.tileWidth)][Math.floor(coords.y / tilesCfg.tileHeight)];
    }

    /* public functions */
    WORLD.isValidMovement = function(coords) {
        return getTileValueBasedOnCoords(coords) > noMovementTileNumberLimit;
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

