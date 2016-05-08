/* 
 * Constructor function of a follower. Inherits from creature and follows another actor from time to time.
 */
function Follower(cfg) {
    var path = [],
        heuristic = cfg.heuristic,
        actorToFollow = cfg.actorToFollow,
        perimeterOffset = cfg.perimeterOffset;

    Creature.apply(this, arguments);
    
    function hasToBuildPath(pathStart, pathEnd) {
        return !UTILS.areArrayEqual(pathStart, pathEnd) && !_.size(path);
    }

    function findTheCoordsToGo() {
        return {
            x: this.x > actorToFollow.x ?
                actorToFollow.x + actorToFollow.width + perimeterOffset : actorToFollow.x - perimeterOffset - this.width,
            y: this.y > actorToFollow.y ?
                actorToFollow.y + actorToFollow.height + perimeterOffset : actorToFollow.y - perimeterOffset - this.height
        };
    }

    function findMyWay() {
        var pathStart = _.toArray(WORLD.getTileBasedOnCoords(this.getCoords())),
            pathEnd = _.toArray(WORLD.getTileBasedOnCoords(findTheCoordsToGo.apply(this)));
        return hasToBuildPath(pathStart, pathEnd)
                ? heuristic.getPath(pathStart, pathEnd, MOVEMENT.canWalkHereWrapper(this)) : path;
    }

    function findMyMovement() {
        var firstCoords,
            movement = _.clone(CONSTANTS.noMovement);
        path = findMyWay.apply(this);
        if (_.size(path)) {
            firstCoords = WORLD.getCoordsBasedOnTiles(path[0][0], path[0][1]);
            movement = {
                x: MOVEMENT.getMovementToCoords(this.x, firstCoords.x),
                y: MOVEMENT.getMovementToCoords(this.y, firstCoords.y)
            };
            
            if (MOVEMENT.willReachPoint(this.getCoords(), firstCoords, this.creatureSpeed)) {
                path = _.rest(path);
            }
        }
        return movement;
    }

    this.updatePosition = function () {
        var movement = findMyMovement.apply(this);
        return this
                .applyMovement(movement)
                .adjustSprite(movement);
    };
}

Follower.prototype = Object.create(Creature.prototype);
Follower.prototype.constructor = Follower;
