import { GridEngine } from 'grid-engine';
import * as Phaser from 'phaser';
import MainScene from './scenes/MainScene';

const game = new Phaser.Game({
    title: "Test",
    pixelArt: true,
    type: Phaser.AUTO,
    scale: {
        width: window.innerWidth,
        height: window.innerHeight,
        autoCenter: Phaser.Scale.CENTER_BOTH
    },
    scene: [MainScene],
    parent: "game",
    backgroundColor: "#415263",

    plugins: {
        scene: [
            {
                key: "gridEngine",
                plugin: GridEngine,
                mapping: "gridEngine"
            }
        ]
    }
});

