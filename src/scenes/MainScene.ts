import { GridEngine, Position } from "grid-engine";
import { Direction } from "../helpers/Direction";
import { createCharacterSprite } from "../helpers/Characters";
import { createTilemap } from "../helpers/Tilemaps";
import { notice } from "../UI";

export default class MainScene extends Phaser.Scene
{
    public isMovingText: Phaser.GameObjects.Text;

    private GridEngine: GridEngine;

    constructor()
    {
        super({
            key: "Main"
        });
    }

    public preload(): void
    {
        this.load.image("tiles", "assets/tf_atlantis_tiles.png");
        //this.load.image("nono", "assets/NoNoSquare.jpg");

        this.load.spritesheet("player", "assets/BlackKnight.png", {
            frameWidth: 26,
            frameHeight: 36
        });

        this.load.tilemapTiledJSON("map", "assets/testmap.json");
    }

    public create(): void
    {
        const tilemap = createTilemap(this, "map", [{layer: "Atlantis", image: "tiles"}]);

        const playerSprite = createCharacterSprite(this, 0, 0, "player", 2, 1.5);

        this.isMovingText = this.add.text(-20, -10, "");

        const container = this.add.container(0, 0, [playerSprite, this.isMovingText]);

        this.cameras.main.startFollow(container, true);
        this.cameras.main.setFollowOffset(-playerSprite.width, -playerSprite.height);

        this.GridEngine.create(tilemap, {
            characters: [
                {
                    id: "player",
                    sprite: playerSprite,
                    walkingAnimationMapping: 0,
                    startPosition: { x: 35, y: 32 },
                    container
                }
            ]
        });

        this.GridEngine.movementStopped().subscribe(({ charId, direction }) => {
            console.log("Movement stopped");
            
            if (this.hasTrigger(tilemap, this.GridEngine.getPosition(charId))) {
                console.log("Found the trigger!");
                notice("Found the thingy!");
            }
        });
    }

    public update(): void
    {
        const cursors = this.input.keyboard.createCursorKeys();

        if (cursors.left.isDown) {
            this.GridEngine.move("player", Direction.LEFT);
        } else if (cursors.right.isDown) {
            this.GridEngine.move("player", Direction.RIGHT);
        } else if (cursors.up.isDown) {
            this.GridEngine.move("player", Direction.UP);
        } else if (cursors.down.isDown) {
            this.GridEngine.move("player", Direction.DOWN);
        }

        const pos = this.GridEngine.getPosition("player");
        this.isMovingText.text = `(x: ${pos.x}, y: ${pos.y})`;
    }

    private hasTrigger(tilemap: Phaser.Tilemaps.Tilemap, pos: Position): boolean
    {
        console.log("Checking for trigger");

        const result = tilemap.layers.some((layer) => {
            const tile = tilemap.getTileAt(pos.x, pos.y, false, layer.name);
            return tile ? 'trigger' in tile.properties : false;
        });

        console.log(result ? "Found it!" : "Nope.");

        return result;
    }
}