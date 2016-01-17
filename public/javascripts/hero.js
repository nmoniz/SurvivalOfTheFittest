var Hero = function(spriteName) {
    "use strict";

    var orientation = 'south';

    var sprite;

    sprite = game.add.sprite(game.world.centerX, game.world.centerY, spriteName);
    sprite.anchor.set(0.5);

    sprite.animations.add('idle-south', range(0), 15, true);
    sprite.animations.add('walk-south', range(1, 6), 15, true);
    sprite.animations.add('idle-north', range(11), 15, true);
    sprite.animations.add('walk-north', range(12, 17), 15, true);
    sprite.animations.add('idle-west', range(22), 15, true);
    sprite.animations.add('walk-west', range(23, 28), 15, true);
    sprite.animations.add('idle-east', range(33), 15, true);
    sprite.animations.add('walk-east', range(34, 38), 15, true);

    game.physics.p2.enable(sprite, true);
    sprite.body.fixedRotation = true;
    sprite.body.setRectangle(75, 117, -10);

    var cursors = game.input.keyboard.createCursorKeys();


    ////////////////////
    // PUBLIC METHODS //
    ////////////////////

    this.getSprite = function () {
        return sprite;
    }

    this.create = function () {

    };

    this.update = function () {
        sprite.body.setZeroVelocity();

        var state = 'idle';

        //handle movement
        if (cursors.down.isDown) {
            orientation = 'south';
            state = 'walk';
            sprite.body.moveDown(100);
        } else if (cursors.up.isDown) {
            orientation = 'north';
            state = 'walk';
            sprite.body.moveUp(100);
        } else if (cursors.left.isDown) {
            orientation = 'west';
            state = 'walk';
            sprite.animations.play('walk-west');
            sprite.body.moveLeft(100);
        } else if (cursors.right.isDown) {
            orientation = 'east';
            state = 'walk';
            sprite.body.moveRight(100);
        }

        sprite.animations.play(state + '-' + orientation);
    };
}