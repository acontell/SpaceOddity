/* 
 * Here goes the main loop and the instantiation of elements. Singleton.
 */
(function (GAME, $, _, undefined) {
    var ctx,
        creatures, 
        keys;

    /* Private functions */
    function drawCreatures(ctx) {
        _.each(creatures, function (creature) {
            creature
                .updatePosition(keys)
                .draw(ctx);
        });
    }

    function mainLoop() {
        // Clear canvas
        ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
        
        // Draw World
        WORLD.draw(ctx);

        // Draw creatures.
        drawCreatures(ctx);

        // Re-draw.
        requestAnimationFrame(mainLoop);
    }

    function initCtx($canvas) {
        ctx = $canvas[0].getContext('2d');
        _.extend(ctx.canvas, CONF.world.getSize());
    }

    function initCreatures() {
        creatures = []   
                .concat(new Player(CONF.actors.rincewind))
                .concat(new Creature(CONF.actors.luggage));
    }
    
    function initWorld() {
        WORLD
            .loadCfg(CONF.world)
            .loadLevel(CONF.levels.firstLevel);
    }

    function bindEvents() {
        keys = _.clone(CONF.keys);
        EVENTS.bindEvents(keys);
    }

    /* Public interface */
    GAME.launch = function ($canvas) {
        UTILS.loadSprites(CONF.elements)
            .done(function() {
                initCtx($canvas);
                initWorld();
                initCreatures();
                bindEvents();
                mainLoop();
            });
    };

})(window.GAME = window.GAME || {}, jQuery, _);

