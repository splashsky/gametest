import { Direction } from "grid-engine"
import BaseScene from "../classes/BaseScene"

export function createCharacterSprite(
    scene: BaseScene,
    x: number,
    y: number,
    texture: string,
    scale?: number
): Phaser.GameObjects.Sprite {
    const sprite = scene.add.sprite(x, y, texture)
    sprite.scale = scale

    return sprite
}

export function registerBasicMovement(scene: BaseScene, id: string = "player"): void {
    const cursors = scene.input.keyboard.createCursorKeys()

    if (cursors.left.isDown) {
        scene.GridEngine.move(id, Direction.LEFT)
    } else if (cursors.right.isDown) {
        scene.GridEngine.move(id, Direction.RIGHT)
    } else if (cursors.up.isDown) {
        scene.GridEngine.move(id, Direction.UP)
    } else if (cursors.down.isDown) {
        scene.GridEngine.move(id, Direction.DOWN)
    }
}