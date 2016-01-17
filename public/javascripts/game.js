var SpritesheetAssets = {
    hero: {
        name: 'hero',
        url: 'assets/images/hero.png'
    }
}

var ImageAssets = {
    grid: {name: 'debug-grid', url: 'assets/images/debug-grid-1920x1920.png'},
    box: {name: 'box', url: 'assets/images/box.png'},
}

var PlayingState = function(self) {
    "use strict";

    self = self || {};

    var actors = [];
    var collectables;

    var economy;

    var spawnResource = function () {
        economy.createCollectable("wood");
    }

    self.preload = function () {
        game.load.spritesheet(SpritesheetAssets.hero.name, SpritesheetAssets.hero.url, 150, 117, 44);

        for (var a in ImageAssets) {
            var asset = ImageAssets[a];
            game.load.image(asset.name, asset.url)
        }
    };

    self.create = function () {
        game.add.tileSprite(0, 0, 1920, 1920, 'debug-grid');

        game.world.setBounds(0, 0, 1920, 1920);

        game.physics.startSystem(Phaser.Physics.P2JS);
        game.physics.p2.setImpactEvents(true);

        collectables = game.add.group();
        economy = new Economy();

        actors.hero = new Hero(SpritesheetAssets.hero.name);
        economy.addCollector(actors.hero.getSprite());

        game.time.events.loop(Phaser.Timer.SECOND * 5, spawnResource, self);

        game.camera.follow(actors.hero.getSprite(), Phaser.Camera.FOLLOW_TOPDOWN_TIGHT);
    };

    self.update = function () {
        for (var a in actors) {
            var actor = actors[a];
            actor.update();
        }
    };

    self.render = function () {
        //game.debug.text('use arrows to move', 10, 40);
    };

    return self
}


var game = new Phaser.Game(800, 600, Phaser.AUTO);
game.state.add("playing", PlayingState());
game.state.start("playing");