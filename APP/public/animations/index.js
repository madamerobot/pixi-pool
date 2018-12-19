let globalVars = {
  app: [],
  sprites: {},
  pool: {},
  state: play
}

// Just because I am too lazy to type this each time
let app = globalVars.app
let sprites = globalVars.sprites

function resize () {
  const parent = app.view.parentNode
  app.renderer.resize(parent.clientWidth, parent.clientHeight)
}

function initialisePixi () {
  app = new PIXI.Application({ 
    autoResize: true,
    resolution: devicePixelRatio
  })
  app.renderer.backgroundColor = 0xadf7e6
  app.renderer.view.style.position = "absolute"
  app.renderer.view.style.display = "block"
  app.renderer.resize(((window.innerWidth/100) * 80), ((window.innerHeight/100) * 80))
  app.renderer.autoResize = true
  const container = document.getElementById('pixi-container')
  container.appendChild(app.view)
}

function initialiseObjects () {
  PIXI.loader
  .add([
    "../assets/ring.svg",
    "../assets/letter-c.svg",
    "../assets/block.svg",
    "../assets/displacement_map.png"
  ])
  .load(setup)
}

function initCollisionDetection () {
  const spritesArray = Object.keys(globalVars.sprites).map(function(key) {
    return globalVars.sprites[key]
  })
  for (var i = 0; i < spritesArray.length; i++) {
    for (var j = 0; j < spritesArray.length; j++) {
      if (i != j) {
        spritesArray[i].detectCollision(spritesArray[j])
      }
    }
  }
}

function gameLoop (delta) {
  globalVars.state(delta)
}

function play (delta) {
  initCollisionDetection()
  globalVars.sprites.ring.move() // velocity, acceleration
  globalVars.sprites.letter.move()
  globalVars.sprites.block.move()
  globalVars.pool.animate({ x: 0.1, y: 0.3 }, app.stage)
}

function setup () { 
  const canvas = document.querySelector("canvas")
  const canvasWidth = parseInt(canvas.style.width)
  const canvasHeight = parseInt(canvas.style.height)
  const canvasCenter = { x: canvasWidth/2, y: canvasHeight/2}

  const ring = new FloatObject()
  ring.initialise('../assets/ring.svg', { x: 0, y: 0 }, app.stage, "ring")
  const letter = new FloatObject()
  letter.initialise('../assets/letter-c.svg', { x: canvasCenter.x, y: 0 }, app.stage, "letter")
  const block = new FloatObject()
  block.initialise('../assets/block.svg', { x: 0, y: (canvasHeight - 50) }, app.stage, "block")
  globalVars.sprites = { ring: ring, letter: letter, block: block }

  const pool = new Pool()
  pool.initialise('../assets/displacement_map.png', app.stage, app)
  globalVars.pool = pool

  globalVars.state = play
  app.ticker.add(delta => gameLoop(delta))
}
 
if (window)  {
  window.addEventListener('load', initialisePixi)
  window.addEventListener('resize', resize)
  initialiseObjects()
}
