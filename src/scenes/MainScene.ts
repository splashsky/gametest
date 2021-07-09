import { GridEngine, Position } from "grid-engine"
import { Direction } from "../helpers/Direction"
import { createCharacterSprite } from "../helpers/Characters"
import { createTilemap } from "../helpers/Tilemaps"
import { notice } from "../UI"

export default class MainScene extends Phaser.Scene {
    private GridEngine: GridEngine

    constructor() {
        super({
            key: "Main"
        })
    }

    public preload(): void {
        this.load.image("tiles", "assets/tf_atlantis_tiles.png")

        this.load.spritesheet("player", "assets/FactionKnights2x.png", {
            frameWidth: 52,
            frameHeight: 72
        })

        this.load.tilemapTiledJSON("map", "assets/testmap.json")
    }

    public create(): void {
        const tilemap = createTilemap(this, "map", [{layer: "Atlantis", image: "tiles"}])

        const playerSprite = createCharacterSprite(this, 0, 0, "player", 1.5)

        this.cameras.main.startFollow(playerSprite, true)
        this.cameras.main.setFollowOffset(-playerSprite.width, -playerSprite.height)

        this.GridEngine.create(tilemap, {
            characters: [
                {
                    id: "player",
                    sprite: playerSprite,
                    walkingAnimationMapping: 7,
                    startPosition: { x: 35, y: 32 }
                }
            ]
        })

        this.GridEngine.movementStopped().subscribe(({ charId, direction }) => {
            console.log("Movement stopped")
            
            console.log(this.GridEngine.getPosition(charId));
            if (this.hasTrigger(tilemap, this.GridEngine.getPosition(charId))) {
                console.log("Found the trigger!")
                notice("Found the thingy!")
                this.scene.start('beach');
            }
        })
    }

    public update(): void {
        const cursors = this.input.keyboard.createCursorKeys()

        if (cursors.left.isDown) {
            this.GridEngine.move("player", Direction.LEFT)
        } else if (cursors.right.isDown) {
            this.GridEngine.move("player", Direction.RIGHT)
        } else if (cursors.up.isDown) {
            this.GridEngine.move("player", Direction.UP)
        } else if (cursors.down.isDown) {
            this.GridEngine.move("player", Direction.DOWN)
        }
    }

    private hasTrigger(tilemap: Phaser.Tilemaps.Tilemap, pos: Position): boolean {
        console.log("Checking for trigger")

        const result = tilemap.layers.some((layer) => {
            const tile = tilemap.getTileAt(pos.x, pos.y, false, layer.name)
            return tile ? 'trigger' in tile.properties : false
        })

        console.log(result ? "Found it!" : "Nope.")

        return result
    }
}