/* 
 * Singleton with utility and helper functions.
 */
(function (UTILS, _, undefined) {
    /* private */

    /* public interface */
    UTILS.getValidOffset = function (boundary, position, offset) {
        var newVal = position + offset,
            validOffset = newVal < 0 ? offset - newVal : offset;

        return newVal > boundary ? boundary - position : validOffset;
    };
})(window.UTILS = window.UTILS || {}, _);




