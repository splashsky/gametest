import { GridEngine } from "grid-engine"
import { Direction } from "../helpers/Direction"
import { createCharacterSprite } from "../helpers/Characters"
import { createTilemap } from "../helpers/Tilemaps"

export default class BeachScene extends Phaser.Scene {
    private GridEngine: GridEngine

    constructor() {
        super({ key: 'beach' })
    }

    public preload(): void {
        this.load.image('beachTiles', 'assets/BeachWithBoundary.png')
        this.load.tilemapTiledJSON('beach', 'assets/beachmap.json')
    }

    public create(): void {
        const tilemap = createTilemap(this, 'beach', [{layer: 'beach', image: 'beachTiles'}])

        const playerSprite = createCharacterSprite(this, 0, 0, "player", 1.5)

        this.cameras.main.startFollow(playerSprite, true)
        this.cameras.main.setFollowOffset(-playerSprite.width, -playerSprite.height)

        this.GridEngine.create(tilemap, {
            characters: [
                {
                    id: "player",
                    sprite: playerSprite,
                    walkingAnimationMapping: 7,
                    startPosition: { x: 15, y: 16 }
                }
            ]
        })

        this.GridEngine.movementStopped().subscribe(({ charId, direction }) => {
            console.log("Movement stopped")
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
}