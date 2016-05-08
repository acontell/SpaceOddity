/* 
 * Objects generated from this constructor will take care of sprites management.
 */
function SpriteManager(cfg) {
    var image = cfg.image,
        numberOfFrames = cfg.numberOfFrames,
        frameWidth = image.width / numberOfFrames,
        frameHeight = image.height / CONSTANTS.numberOfDirections,
        ticksPerFrame = cfg.ticksPerFrame || 0,
        tickCount = 0,
        currentFrame = 0,
        currentDirection = CONSTANTS.directions.DOWN,
        previousDirection = currentDirection;

    this.getFrameWidth = function () {
        return frameWidth;
    };
    
    this.getFrameHeight = function () {
        return frameHeight;
    };

    this.getDrawImageArgs = function (pos) {
        return [image,
            currentFrame * frameWidth,
            currentDirection * frameHeight,
            frameWidth,
            frameHeight,
            pos.x,
            pos.y,
            frameWidth,
            frameHeight];
    };

    this.adjustSprite = function (movement) {
        if (MOVEMENT.hasMovement(movement)) {
            updateDirectionBasedOnMovement(movement);
            updateFrameNumber();
        } else {
            currentFrame = 0;
        }
        return this;
    };

    function updateFrameNumber() {
        if (tickCount > ticksPerFrame) {
            tickCount = 0;
            currentFrame = currentFrame >= numberOfFrames - 1 || previousDirection !== currentDirection
                    ? 0 : currentFrame + 1;
        }
        tickCount += 1;
    }

    function updateDirectionBasedOnMovement(movement) {
        previousDirection = currentDirection;
        if (MOVEMENT.isMovingHorizontally(movement)) {
            currentDirection = movement.x > 0 ? CONSTANTS.directions.RIGHT : CONSTANTS.directions.LEFT;
        } else {
            currentDirection = movement.y > 0 ? CONSTANTS.directions.DOWN : CONSTANTS.directions.UP;
        }
    }
}
