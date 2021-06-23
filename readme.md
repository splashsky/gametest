# What is this?
This little repo/project is to just test various concepts related to building my MMO.

Current goals:
- Fast, useful communication from game to UI
- UI is overlaid on game, rather than being built in game engine
- Interactions with game/UI affect the other

# How to use
Ensure that (http-server)[https://www.npmjs.com/package/http-server] is installed globally in your environment.

`npm i -g http-server`

Download the git repo, `cd` into the directory and run `npm i`. From there, open a Terminal window and run `npm run serve` to start up the web server. In another terminal window, you can run `npm run build` to build both the `ui.js` and `game.js` files. Every time you make a change you'll need to rerun `npm run build`. I hope to make this process faster and easier later.

# Contributing
There's not really much I could ask for. If you have ideas for features and you implement something, submit a PR. I'd love to take a look!