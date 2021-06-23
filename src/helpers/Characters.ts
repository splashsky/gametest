export function createCharacterSprite(
    scene: Phaser.Scene,
    x: number,
    y: number,
    texture: string,
    depth?: number,
    scale?: number
): Phaser.GameObjects.Sprite {
    const sprite = scene.add.sprite(x, y, texture);
    sprite.setDepth(depth);
    sprite.scale = scale;

    return sprite;
}