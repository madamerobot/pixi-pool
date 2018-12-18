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
  app.renderer.autoResize = true
  app.renderer.resize(window.innerWidth, window.innerHeight)
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
    "../assets/displacement_map.jpeg"
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
  globalVars.sprites.ring.move(1, 0.3, 0.1, 0) //xSpeed, ySpeed, vx, vy
  globalVars.sprites.letter.move(0.2, 0.5, 0, 0.1)
  globalVars.sprites.block.move(0.5, 0.7, 0, 0.2)
  globalVars.pool.animate({ x: 0.1, y: 0.3 }, app.stage)
}

function setup () { 
  const ring = new FloatObject()
  ring.initialise('../assets/ring.svg', { x: 200, y: 200 }, app.stage)
  const letter = new FloatObject()
  letter.initialise('../assets/letter-c.svg', { x: 400, y: 400 }, app.stage)
  const block = new FloatObject()
  block.initialise('../assets/block.svg', { x: 600, y: 150 }, app.stage)
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
