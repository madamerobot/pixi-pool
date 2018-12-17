let globalVars = {
  app: [],
  sprites: {}
}

let app = globalVars.app

function initialisePixi () {
  app = new PIXI.Application({ width: 800, height: 800 })
  app.renderer.backgroundColor = 0xadf7e6
  app.renderer.view.style.position = "absolute"
  app.renderer.view.style.display = "block"
  app.renderer.autoResize = true
  app.renderer.resize(window.innerWidth, window.innerHeight)
  app.renderer.autoResize = true
  const container = document.getElementById('pixi-container')
  container.appendChild(app.view)
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

function setup () {
  const ring = new FloatObject()
  ring.initialise('assets/ring.svg', {x: 200, y: 200}, app.stage)
  const letter = new FloatObject()
  letter.initialise('assets/letter-c.svg', {x: 400, y: 400}, app.stage)
  const block = new FloatObject()
  block.initialise('assets/block.svg', {x: 600, y: 150}, app.stage)
  globalVars.sprites = { ring: ring, letter: letter, block: block }
}
 
if (window)  {
  window.addEventListener('load', initialisePixi)
  initialiseObjects()
}
