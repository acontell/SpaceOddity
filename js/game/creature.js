/* 
 * Constructor function that defines a creature object.
 */
function Creature(cfg) {
    this.x = cfg.x;
    this.y = cfg.y;
    this.playerSpeed = cfg.playerSpeed;
    this.spriteManager = new SpriteManager(_.pick(cfg, 'image', 'numberOfFrames', 'ticksPerFrame', 'frameWidth', 'frameHeight'));
    this.boundaryX = cfg.boundaryX - this.spriteManager.getFrameWidth();
    this.boundaryY = cfg.boundaryY - this.spriteManager.getFrameHeight();
}

Creature.prototype.applyMovement = function (movement) {
    this.x += UTILS.getValidOffset(this.boundaryX, this.x, this.playerSpeed * movement.x);
    this.y += UTILS.getValidOffset(this.boundaryY, this.y, this.playerSpeed * movement.y);
    return this;
};

Creature.prototype.adjustSprite = function (movement) {
    this.spriteManager.adjustSprite(movement);
    return this;
};

Creature.prototype.updatePosition = function () {
    return this;
};

Creature.prototype.draw = function (ctx) {
    ctx.drawImage.apply(ctx, this.spriteManager.getDrawImageArgs({x: this.x, y: this.y}));
    return this;
};
