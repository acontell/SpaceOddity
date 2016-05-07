/* 
 * Constructor function of a follower. Inherits from creature and follows another actor from time to time.
 */
function Follower() {
    Creature.apply(this, arguments);
    
    this.updatePosition = function (keys) {
        var movement = MOVEMENT.getMovementBasedOnKeys(keys);
        return this
            .applyMovement(movement)
            .adjustSprite(movement);
    };
}

Follower.prototype = Object.create(Creature.prototype);
Follower.prototype.constructor = Follower;
