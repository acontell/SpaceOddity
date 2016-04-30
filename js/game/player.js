/* 
 * Constructor function of the player. Inherits from creature.
 */
function Player() {
    Creature.apply(this, arguments);
    
    this.updatePosition = function (keys) {
        var movement = UTILS.getMovementBasedOnKeys(keys);
        return this
            .applyMovement(movement)
            .adjustSprite(movement);
    };
}
Player.prototype = Object.create(Creature.prototype);
Player.prototype.constructor = Player;
