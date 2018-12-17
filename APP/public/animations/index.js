let globalVars = {
  app: [],
  sprites: []
}

function initialisePixi () {
  globalVars.app = new PIXI.Application({ width: 800, height: 800 })
  globalVars.app.renderer.backgroundColor = 0xadf7e6
  globalVars.app.renderer.view.style.position = "absolute"
  globalVars.app.renderer.view.style.display = "block"
  globalVars.app.renderer.autoResize = true
  globalVars.app.renderer.resize(window.innerWidth, window.innerHeight)
  globalVars.app.renderer.autoResize = true
  const container = document.getElementById('pixi-container')
  container.appendChild(globalVars.app.view)
}

function initialiseObjects () {
  PIXI.loader
  .add([
    "assets/ring.svg",
    "assets/letter-c.svg",
    "assets/block.svg"
  ])
  .load(setup)
}

function createSprites() {
  const ring = new PIXI.Sprite(PIXI.loader.resources["assets/ring.svg"].texture)
  const letter = new PIXI.Sprite(PIXI.loader.resources["assets/letter-c.svg"].texture)
  const block = new PIXI.Sprite(PIXI.loader.resources["assets/block.svg"].texture)
  let sprites = Object.assign({
    ring: ring,
    letter: letter,
    block: block
  })
  globalVars.sprites = sprites
}

function positionSprites() {
  let x = 400
  let y = 400
  Object.values(globalVars.sprites).forEach((sprite, index) => {
    sprite.x = x + (index * 250)
    sprite.y = y - (index * 100)
  })
}

function addSpritesToStage() {
  Object.values(globalVars.sprites).forEach((sprite, index) => {
    globalVars.app.stage.addChild(sprite)
  })
}

function gameLoop(delta) {
  globalVars.sprites.ring.x += 1
}

function setup () {
  //Adding and positioning sprites
  createSprites()
  positionSprites()
  addSpritesToStage()
  //Adding Ticker
  globalVars.app.ticker.add(delta => gameLoop(delta))
}
 
if (window)  {
  window.addEventListener('load', initialisePixi)
  initialiseObjects()
}
