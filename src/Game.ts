import { GridEngine } from 'grid-engine'
import * as Phaser from 'phaser'
import BeachScene from './scenes/BeachScene'
import MainScene from './scenes/MainScene'

const game = new Phaser.Game({
    title: "Test",
    pixelArt: true,
    type: Phaser.AUTO,
    scale: {
        width: window.innerWidth,
        height: window.innerHeight,
        autoCenter: Phaser.Scale.CENTER_BOTH
    },
    scene: [MainScene, BeachScene],
    parent: "game",
    backgroundColor: "#415263",
    /*loader: {
        baseURL: 'http://localhost:8080/assets/game/'
    },*/

    plugins: {
        scene: [
            {
                key: "GridEngine",
                plugin: GridEngine,
                mapping: "GridEngine"
            }
        ]
    }
})

