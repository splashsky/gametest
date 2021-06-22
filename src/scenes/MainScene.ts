import { createCharacterSprite } from "../helpers/Characters";
import { createTilemap } from "../helpers/Tilemaps";

export default class MainScene extends Phaser.Scene
{
    public isMovingText: Phaser.GameObjects.Text;

    constructor()
    {
        super({
            key: "Main"
        });
    }

    public preload(): void
    {
        this.load.image("tiles", "assets/tf_dd_A5_1.png");
        //this.load.image("nono", "assets/NoNoSquare.jpg");

        this.load.spritesheet("player", "assets/BlackKnight.png", {
            frameWidth: 26,
            frameHeight: 36
        });

        this.load.tilemapTiledJSON("map", "assets/test.json");
    }

    public create(): void
    {
        const tilemap = createTilemap(this, "map", [{layer: "DDBase", image: "tiles"}]);

        const playerSprite = createCharacterSprite(this, 0, 0, "player", 2, 1.5);

        this.isMovingText = this.add.text(-20, -10, "");

        const container = this.add.container(0, 0, [playerSprite, this.isMovingText]);

        this.cameras.main.startFollow(container, true);
        this.cameras.main.setFollowOffset(-playerSprite.width, -playerSprite.height);

        this.gridEngine.create(tilemap, {
            characters: [
                {
                    id: "player",
                    sprite: playerSprite,
                    walkingAnimationMapping: 0,
                    startPosition: { x: 33, y: 53 },
                    container
                }
            ]
        });
    }

    public update(): void
    {
        const cursors = this.input.keyboard.createCursorKeys();

        if (cursors.left.isDown) {
            this.gridEngine.move("player", "left");
        } else if (cursors.right.isDown) {
            this.gridEngine.move("player", "right");
        } else if (cursors.up.isDown) {
            this.gridEngine.move("player", "up");
        } else if (cursors.down.isDown) {
            this.gridEngine.move("player", "down");
        }

        this.isMovingText.text = `isMoving: ${this.gridEngine.isMoving("player")}`;
        //console.log(this.isMovingText.text);
    }
}