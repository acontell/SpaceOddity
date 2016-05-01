/* 
 * Here goes the main loop and the instantiation of elements. Singleton.
 */
(function (GAME, $, _, undefined) {
    var ctx,
        canvasSize,
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
        ctx.clearRect(0, 0, canvasSize.width, canvasSize.height);

        // Draw creatures.
        drawCreatures(ctx);

        // Re-draw.
        requestAnimationFrame(mainLoop);
    }

    function initCtx($canvas) {
        canvasSize = {width: $canvas.width(), height: $canvas.height()};
        ctx = $canvas[0].getContext('2d');
    }

    function initCreatures() {
        creatures = []   
                .concat(new Player(CONF.actors.rincewind))
                .concat(new Creature(CONF.actors.luggage));
    }

    function bindEvents() {
        keys = _.clone(CONF.keys);
        EVENTS.bindEvents(keys);
    }

    /* Public interface */
    GAME.getAllCreaturesButMe = function (creature) {
        return _.filter(creatures, function(obj) {
            return creature !== obj;
        });
    };
    
    GAME.getCanvasSize = function() {
        return canvasSize;
    };
    
    GAME.launch = function ($canvas) {
        UTILS.loadSprites(CONF.actors)
            .done(function() {
                initCtx($canvas);
                initCreatures();
                bindEvents();
                mainLoop();
            });
    };

})(window.GAME = window.GAME || {}, jQuery, _);

