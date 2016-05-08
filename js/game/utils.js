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
    
    UTILS.areArrayEqual = function (arr1, arr2) {
        return _.size(arr1) === _.size(arr2) ? _.every(arr1, function (el, index) {
            return el === arr2[index];
        }) : false;
    };
    
    UTILS.getPointTranslation = function(point, traslation) {
        return {
            x: point.x + traslation.x,
            y: point.y + traslation.y
        };
    };
})(window.UTILS = window.UTILS || {}, _);
