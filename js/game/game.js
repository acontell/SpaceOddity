/* 
 * Here goes the main loop and the instantiation of elements. Singleton.
 */
(function (GAME, $, _, undefined) {
    var ctx,
        world,
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
        world = WORLD
            .loadCfg(CONF.world)
            .loadLevel(CONF.levels.firstLevel);
    }
    
    function initCollisionManager() {
        COLLISION.loadCfg(_.extend(CONF.collision, {world: world, creatures: creatures}));
    }
    
    function initHeuristics() {
        HEURISTICS.astar.init(world);
    }

    function bindEvents() {
        keys = _.clone(CONF.keys);
        EVENTS.bindEvents(keys);
    }

    /* Public interface */
    GAME.launch = function ($canvas) {
        UTILS.loadSprites(CONF.elementsWithSprites)
            .done(function() {
                initCtx($canvas);
                initWorld();
                initCreatures();
                initCollisionManager();
                initHeuristics();
                bindEvents();
                mainLoop();
            });
    };

})(window.GAME = window.GAME || {}, jQuery, _);

