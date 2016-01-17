var Economy = function () {
    "use strict";

    var collectors = [];

    var collectableGroup = game.add.group();
    collectableGroup.enableBody = true;
    collectableGroup.physicsBodyType = Phaser.Physics.P2JS;

    //////////////////
    // Constructors //
    //////////////////

    function Collectable (point, content) {

        var collectable = content;

        var uncollected = true;

        var sprite = collectableGroup.create(point.x, point.y, 'box');
        sprite.anchor.set(0.5);

        game.physics.p2.enable(sprite, true);

        var collect = function (collector, collectable) {
            return function (a, b, c, d) {
                if (uncollected) {
                    uncollected = false;
                    collector.collect(collectable);
                    sprite.kill();
                }
            }
        };

        for (var c in collectors) {
            collectors[c].sprite.body.createBodyCallback(sprite, collect(collectors[c], collectable), this);
        }

        ////////////////////
        // PUBLIC METHODS //
        ////////////////////

        this.destroy = function () {
            sprite.kill();
        }

    };

    function Collector() {

        var collected = [];

        ////////////////////
        // PUBLIC METHODS //
        ////////////////////

        this.collect = function (collectable) {
            collected.push(collectable);
        }

        this.getCollected = function () {
            return collected;
        }
    }

    ////////////////////
    // PUBLIC METHODS //
    ////////////////////

    this.createCollectable = function (point, content) {
        var collectable = new Collectable(point, content);
        game.time.events.add(Phaser.Timer.SECOND * 6, collectable.destroy, this);
        return collectable;
    };

    this.spawnResource = function () {
        var collectable = new Collectable(new Phaser.Point(), content);
        game.time.events.add(Phaser.Timer.SECOND * 6, collectable.destroy, this);
    }

    this.addCollector = function (sprite) {
        var newCollector = new Collector();
        newCollector.sprite = sprite;
        collectors.push(newCollector);
    };

};