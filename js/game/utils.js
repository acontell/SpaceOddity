/* 
 * Singleton with utility and helper functions.
 */
(function (UTILS, _, undefined) {
    /* private functions */
    
    /* public interface */
    UTILS.loadSprites = function (elements) {
        return $.when.apply($, _.reduce(elements, function (memo, element) {
            var dfd = $.Deferred(),
                image = new Image;
            image.src = element.imageUrl;
            image.onload = function () {
                element.image = image;
                dfd.resolve();
            };
            return memo.concat(dfd.promise());
        }, []));
    };
})(window.UTILS = window.UTILS || {}, _);




