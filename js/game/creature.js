/* 
 * Constructor function that defines a creature object.
 */
function Creature(cfg) {
    this.x = cfg.x;
    this.y = cfg.y;
    this.height = cfg.height;
    this.width = cfg.width;
    this.boundaryX = cfg.boundaryX - this.width;
    this.boundaryY = cfg.boundaryY - this.height;
}

Creature.prototype.getValidOffsetX = function (offset) {
    return UTILS.getValidOffset(this.boundaryX, this.x, offset);
};

Creature.prototype.getValidOffsetY = function (offset) {
    return UTILS.getValidOffset(this.boundaryY, this.y, offset);
};

Creature.prototype.updatePosition = function () {
    return this;
};

Creature.prototype.draw = function (ctx) {
    ctx.beginPath();
    ctx.rect(this.x, this.y, this.width, this.height);
    ctx.fillStyle = "#FF0000";
    ctx.fill();
    ctx.closePath();

    return this;
};