/* 
 * Constructor function that defines a creature object.
 */
function Creature(cfg) {
    this.x = cfg.x;
    this.y = cfg.y;
    this.playerSpeed = cfg.playerSpeed;
    this.spriteManager = new SpriteManager(_.pick(cfg, 'image', 'numberOfFrames', 'ticksPerFrame'));
    this.width = this.spriteManager.getFrameWidth();
    this.height = this.spriteManager.getFrameHeight();
}

Creature.prototype.applyMovement = function (movement) {
    this.x += UTILS.getValidOffsetX(this, this.playerSpeed * movement.x);
    this.y += UTILS.getValidOffsetY(this, this.playerSpeed * movement.y);
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
