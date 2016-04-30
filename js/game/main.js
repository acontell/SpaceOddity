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
        var boundaries = {boundaryX: canvasSize.width, boundaryY: canvasSize.height};
        creatures = []   
                .concat(new Player(_.extend({}, CONF.actors.rincewind, boundaries)))
                .concat(new Creature(_.extend({}, CONF.actors.luggage, boundaries)));
    }

    function bindEvents() {
        keys = _.clone(CONF.keys);
        EVENTS.bindEvents(keys);
    }

    /* Public interface */
    GAME.launch = function ($canvas) {
        CONF.loadSprites()
            .done(function() {
                initCtx($canvas);
                initCreatures();
                bindEvents();
                mainLoop();
            });
    };

})(window.GAME = window.GAME || {}, jQuery, _);

