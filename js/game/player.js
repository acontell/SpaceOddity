/* 
 * Constructor function of the player. Inherits from creature.
 */
function Player() {
    Creature.apply(this, arguments);
    
    this.updatePosition = function(keys) {
        _.each(keys, function(val) {
            this.x += this.getValidOffsetX(val.movement.x);
            this.y += this.getValidOffsetY(val.movement.y);
        }, this);
        
        return this;
    };
}
Player.prototype = Object.create(Creature.prototype);

