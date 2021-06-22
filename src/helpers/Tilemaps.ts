type tilemapImage = {
    layer: string,
    image: string
}

export function createTilemap(scene: Phaser.Scene, key: string, images: Array<tilemapImage>): Phaser.Tilemaps.Tilemap
{
    const map = scene.make.tilemap({ key: key });

    images.forEach((image, index) => {
        map.addTilesetImage(image.layer, image.image);

        for (let i = 0; i < map.layers.length; i++) {
            const layer = map.createLayer(i, image.layer, 0, 0);
            layer.scale = 3;
        }
    });

    return map;
}