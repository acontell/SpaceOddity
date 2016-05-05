/* 
 * All creature is a rectangle in itself, this is the constructor of a rectangle.
 */
function Rectangle(cfg) {
    this.x = cfg.x;
    this.y = cfg.y;
    this.width = cfg.width;
    this.height = cfg.height;
}

Rectangle.prototype.getCoords = function () {
    return _.pick(this, 'x', 'y');
};

Rectangle.prototype.getRectAfterMovement = function (movement) {
    return {
        x: this.x + movement.x,
        y: this.y + movement.y,
        width: this.width,
        height: this.height
    };
};
