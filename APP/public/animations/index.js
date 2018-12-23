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
  globalVars.sprites.forEach(sprite => sprite.initiateSpecs())
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
    "../assets/letter-c.svg",
    "../assets/letter-a.svg",
    "../assets/letter-h.svg",
    "../assets/letter-t.svg",
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
        spritesArray[i].detectObjectCollision(spritesArray[j])
      }
    }
  }
}

function gameLoop (delta) {
  globalVars.state(delta)
}

function play (delta) {
  initCollisionDetection()
  globalVars.sprites.letterA.move()
  globalVars.sprites.letterC.move()
  globalVars.sprites.letterH.move()
  globalVars.sprites.letterT.move()

  globalVars.pool.animate({ x: 0.1, y: 0.3 }, app.stage)
}

function setup () { 
  const canvas = document.querySelector("canvas")
  const canvasWidth = parseInt(canvas.style.width)
  const canvasHeight = parseInt(canvas.style.height)
  const canvasCenter = { x: canvasWidth/2, y: canvasHeight/2}

  const letterC = new FloatObject()
  letterC.initialise('../assets/letter-c.svg', { x: 100 , y: 100 }, app.stage, "cafe-robot")
  const letterA = new FloatObject()
  letterA.initialise('../assets/letter-a.svg', { x: canvasCenter.x, y: canvasCenter.y }, app.stage, "about-me")
  const letterH = new FloatObject()
  letterH.initialise('../assets/letter-h.svg', { x: canvasCenter.x + 50, y: (canvasHeight - 100) }, app.stage, "work")
  const letterT = new FloatObject()
  letterT.initialise('../assets/letter-t.svg', { x: (canvasCenter.x - 50), y: 100 }, app.stage, "teaching-and-speaking")

  globalVars.sprites = { letterA: letterA, letterC: letterC, letterH: letterH, letterT: letterT }

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
