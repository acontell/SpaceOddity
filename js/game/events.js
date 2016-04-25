/* 
 * Singleton with utilities and helper functions related to events.
 */
(function (EVENTS, _, undefined) {
    /* private */
    function execFncIfKeyExists(keys, fnc, ev) {
        if (keys[ev.keyCode]) {
            fnc(ev);
        }
    }
    
    /* public interface */
    EVENTS.bindEvents = function (keys) {
        $(document)
            .on('keydown', _.partial(execFncIfKeyExists, keys, function (ev) {
                _.extend(keys[ev.keyCode].movement, keys[ev.keyCode].offset);
            }))
            .on('keyup', _.partial(execFncIfKeyExists, keys, function (ev) {
                keys[ev.keyCode].movement.x = keys[ev.keyCode].movement.y = 0;
            }));
    };
})(window.EVENTS = window.EVENTS || {}, _);


