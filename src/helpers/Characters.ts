export function createCharacterSprite(
    scene: Phaser.Scene,
    x: number,
    y: number,
    texture: string,
    scale?: number
): Phaser.GameObjects.Sprite {
    const sprite = scene.add.sprite(x, y, texture);
    sprite.scale = scale;

    return sprite;
}