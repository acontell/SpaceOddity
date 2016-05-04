/* 
 * Constructor function that defines a creature object.
 */
function Creature(cfg) {
    this.x = cfg.x;
    this.y = cfg.y;
    this.creatureSpeed = cfg.creatureSpeed;
    this.spriteManager = new SpriteManager(_.pick(cfg, 'image', 'numberOfFrames', 'ticksPerFrame'));
    this.width = this.spriteManager.getFrameWidth();
    this.height = this.spriteManager.getFrameHeight();
}

Creature.prototype.applyMovement = function (movement) {
    _.extend(this, UTILS.getValidMovement(this, movement));
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
    ctx.drawImage.apply(ctx, this.spriteManager.getDrawImageArgs(_.pick(this, 'x', 'y')));
    return this;
};
