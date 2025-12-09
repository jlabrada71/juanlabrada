How to react to OnClick (pointerdown) event in a sprite:
-----------------------------------------

    var sprite = this.add.sprite(400, 300, 'eye').setInteractive();

    sprite.on('pointerdown', function (pointer) {

        this.setTint(0xff0000);

    });

How to react to pointerout:
---------------------------
    var sprite = this.add.sprite(400, 300, 'eye').setInteractive();
    sprite.on('pointerout', function (pointer) {
        this.clearTint();
    });

How to react to pointerup:
--------------------------

    var sprite = this.add.sprite(400, 300, 'eye').setInteractive();
    sprite.on('pointerup', function (pointer) {

        this.clearTint();

    });

How to react to pointerover
---------------------------

    this.add.sprite(300, 200, 'eye').setInteractive();
    this.add.sprite(400, 300, 'eye').setInteractive();
    this.add.sprite(500, 400, 'eye').setInteractive();

    //  Events

    this.input.on('pointerover', function (event, gameObjects) {

        gameObjects[0].setTint(0xff0000);

    });

    this.input.on('pointerout', function (event, gameObjects) {

        gameObjects[0].clearTint();

    });


How to react to Mouse move over game object (gameobjectmove):
-------------------------------------------
The main difference gameobjectmove and pointerover is that pointer over generates only one event when the pointer is over the object, whereas the gameobjectmove keeps generating events while the pointer is whithin the bounderies of the object.

    this.add.sprite(300, 200, 'eye').setInteractive();
    this.add.sprite(400, 300, 'eye').setInteractive();
    this.add.sprite(500, 400, 'eye').setInteractive();

    //  Events

    this.input.on('pointerover', function (event, gameObjects) {
        console.log('is over')

        gameObjects[0].setTint(0xff0000);

    });

    this.input.on('gameobjectmove', function (event, gameObjects) {
        console.log('is moving');
    });

    this.input.on('pointerout', function (event, gameObjects) {
        console.log('is out')
        gameObjects[0].clearTint();

    });


How to react to Mouse Wheel (wheel)
-----------------------------------

Example 1:

    var soil = this.add.tileSprite(400, 300, 800, 600, 'soil');

    this.input.on('wheel', function (pointer, gameObjects, deltaX, deltaY, deltaZ) {

        soil.tilePositionX += deltaX * 0.5;
        soil.tilePositionY += deltaY * 0.5;

    });

Example 2: 

    var poo = this.add.image(400, 300, 'poo').setInteractive();

    poo.on('wheel', function (pointer, deltaX, deltaY, deltaZ) {

        this.scale += deltaY * -0.001;

    });


How to react to right mouse click
---------------------------------

    this.input.mouse.disableContextMenu();

    this.input.on('pointerdown', function (pointer) {

        if (pointer.rightButtonDown())
        {
            if (pointer.getDuration() > 500)
            {
                this.add.image(pointer.x, pointer.y, 'disk');
            }
            else
            {
                this.add.image(pointer.x, pointer.y, 'asuna');
            }
        }
        else
        {
            if (pointer.getDuration() > 500)
            {
                this.add.image(pointer.x, pointer.y, 'tree');
            }
            else
            {
                this.add.image(pointer.x, pointer.y, 'logo');
            }
        }

    }, this);

How to react to a click on a shaped area:
-----------------------------------------

Example 1: Triagle area.

    var sprite = this.add.sprite(400, 300, 'ship').setScale(8);

    var shape = new Phaser.Geom.Triangle.BuildEquilateral(16, 0, 30);

    sprite.setInteractive(shape, Phaser.Geom.Triangle.Contains);

    //  Input Event listeners

    sprite.on('pointerover', function () {

        this.setTint(0x7878ff);

    });

    sprite.on('pointerout', function () {

        this.clearTint();

    });

Example 2: A polygon shaped area

    var sprite = this.add.sprite(400, 300, 'car');

    var shape = new Phaser.Geom.Polygon([
        0, 143,
        0, 92,
        110, 40,
        244, 4,
        330, 0,
        458, 12,
        574, 18,
        600, 79,
        594, 153,
        332, 152,
        107, 157
    ]);

    sprite.setInteractive(shape, Phaser.Geom.Polygon.Contains);

    //  Input Event listeners

    this.input.on('gameobjectover', function (pointer, gameObject) {

        gameObject.setTint(0x7878ff);

    });

    this.input.on('gameobjectout', function (pointer, gameObject) {

        gameObject.clearTint();

    }); 


How to drag a sprite:
---------------------

    var image = this.add.sprite(200, 300, 'eye').setInteractive();

    this.input.setDraggable(image);

    //  The pointer has to move 16 pixels before it's considered as a drag
    this.input.dragDistanceThreshold = 16;

    this.input.on('dragstart', function (pointer, gameObject) {

        gameObject.setTint(0xff0000);

    });

    this.input.on('drag', function (pointer, gameObject, dragX, dragY) {

        gameObject.x = dragX;
        gameObject.y = dragY;

    });

    this.input.on('dragend', function (pointer, gameObject) {

        gameObject.clearTint();

    });

How to create a container:
--------------------------

    //  Positions are relative to the Container x/y
    var image0 = this.add.image(0, 0, 'lemming');
    var image1 = this.add.image(-100, -100, 'lemming');
    var image2 = this.add.image(100, -100, 'lemming');
    var image3 = this.add.image(100, 100, 'lemming');
    var image4 = this.add.image(-100, 100, 'lemming');

    container = this.add.container(400, 300, [ image0, image1, image2, image3, image4 ]);

    this.tweens.add({
        targets: container,
        angle: 360,
        duration: 6000,
        yoyo: true,
        repeat: -1
    });

How to add sprites to container:
--------------------------------

   var container = this.add.container(400, 300);

    //  Add some sprites - positions are relative to the Container x/y
    var sprite0 = this.add.sprite(0, 0, 'lemming');
    var sprite1 = this.add.sprite(-100, -100, 'lemming');
    var sprite2 = this.add.sprite(100, -100, 'lemming');
    var sprite3 = this.add.sprite(100, 100, 'lemming');
    var sprite4 = this.add.sprite(-100, 100, 'lemming');

    container.add(sprite0);
    container.add(sprite1);
    container.add(sprite2);
    container.add(sprite3);
    container.add(sprite4);

How to make a container draggable:
----------------------------------

    var bg = this.add.image(0, 0, 'buttonBG');
    var text = this.add.image(0, 0, 'buttonText');

    var container = this.add.container(400, 300, [ bg, text ]);
    
    // Is important to call setSize before of setInteractive 
    // That avoids the error 'can not set property draggable of null' 
    // when calling set draggable.
    container.setSize(bg.width, bg.height);

    container.setInteractive();

    this.input.setDraggable(container);

    container.on('pointerover', function () {

        bg.setTint(0x44ff44);

    });

    container.on('pointerout', function () {

        bg.clearTint();

    });

    this.input.on('drag', function (pointer, gameObject, dragX, dragY) {

        gameObject.x = dragX;
        gameObject.y = dragY;

    });