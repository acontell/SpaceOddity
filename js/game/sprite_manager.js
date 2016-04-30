/* 
 * Objects generated from this constructor will take care of sprites management.
 */
function SpriteManager(cfg) {
    var image = cfg.image,
        numberOfFrames = cfg.numberOfFrames,
        frameWidth = image.width / numberOfFrames,
        frameHeight = image.height / CONF.howManyDirections(),
        ticksPerFrame = cfg.ticksPerFrame || 0,
        tickCount = 0,
        currentFrame = 0,
        currentDirection = 0;

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
        if (UTILS.noMovement(movement)) {
            currentFrame = currentDirection = 0;
        } else {
            updateFrameNumber();
            updateDirectionBasedOnMovement(movement);
        }
        return this;
    };

    function updateFrameNumber() {
        if (tickCount > ticksPerFrame) {
            tickCount = 0;
            currentFrame = currentFrame >= numberOfFrames - 1 ? 0 : currentFrame + 1;
        }
        tickCount += 1;
    }

    function updateDirectionBasedOnMovement(movement) {
        if (UTILS.movesHorizontally(movement)) {
            currentDirection = movement.x > 0 ? CONF.directions.RIGHT : CONF.directions.LEFT;
        } else {
            currentDirection = movement.y > 0 ? CONF.directions.DOWN : CONF.directions.UP;
        }
    }
}
