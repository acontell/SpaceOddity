/* 
 * Singleton to control the world.
 */
(function (WORLD, $, _, undefined) {
    var world,
        worldCfg,
        tilesCfg;

    /* private functions */ 
    function getTilesBasedOnRect(rect) {
        return [
            _.range(Math.floor(rect.x / tilesCfg.tileWidth), Math.floor((rect.x + rect.width) / tilesCfg.tileWidth) + 1),
            _.range(Math.floor(rect.y / tilesCfg.tileHeight), Math.floor((rect.y + rect.height) / tilesCfg.tileHeight) + 1)
        ];
    }
    
    /* public functions */
    WORLD.getTilesValuesBasedOnRect = function (rect) {
        var tiles = getTilesBasedOnRect(rect);
        return [].concat.apply([], _.reduce(tiles[0], function (memo, x) {
            return memo.concat(_.reduce(tiles[1], function (memo2, y) {
                return memo2.concat(world[x][y]);
            }, []));
        }, []));
    };
    
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

