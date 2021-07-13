import { GridEngine, Direction } from "grid-engine"
import BaseScene from "../classes/BaseScene"
import { createCharacterSprite, registerBasicMovement } from "../helpers/Characters"
import { createTilemap } from "../helpers/Tilemaps"

export default class BeachScene extends BaseScene {
    constructor() {
        super({ key: 'beach' })
    }

    public preload(): void {
        this.load.image('beachTiles', 'assets/beach-tiles.png')
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
    }
    
    public update(): void {
        registerBasicMovement(this)
    }
}
