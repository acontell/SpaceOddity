/* 
 * Singleton to control the world.
 */
(function (WORLD, $, _, undefined) {
    var world,
        worldCfg,
        tilesCfg;

    /* private functions */ 

    /* public functions */
    WORLD.loadLevel = function (level) {
        world = level;
        return world;
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
        return WORLD;
    };

})(window.WORLD = window.WORLD || {}, jQuery, _);

