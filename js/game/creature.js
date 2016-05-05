/* 
 * Constructor function that defines a creature object.
 */
function Creature(cfg) {
    Rectangle.apply(this, arguments);
    this.creatureSpeed = cfg.creatureSpeed;
    this.spriteManager = new SpriteManager(_.pick(cfg, 'image', 'numberOfFrames', 'ticksPerFrame'));
    this.width = this.spriteManager.getFrameWidth();
    this.height = this.spriteManager.getFrameHeight();
}

Creature.prototype = Object.create(Rectangle.prototype);
Creature.prototype.constructor = Creature;

Creature.prototype.applySpeedToMovement = function (movement) {
    return {x: this.creatureSpeed * movement.x, y: this.creatureSpeed * movement.y};
};

Creature.prototype.applyMovement = function (movement) {
    _.extend(this, MOVEMENT.getValidMovement(this.getCoords(), this.getRectAfterMovement(this.applySpeedToMovement(movement))));
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
    ctx.drawImage.apply(ctx, this.spriteManager.getDrawImageArgs(this.getCoords()));
    return this;
};
