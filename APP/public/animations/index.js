let globalVars = {
  app: [],
  sprites: {},
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
    "../assets/block.svg"
  ])
  .load(setup)
}

function gameLoop (delta) {
  globalVars.state(delta)
}

function play (delta) {
  globalVars.sprites.ring.move(1, 0.3) //xSpeed, ySpeed
  globalVars.sprites.letter.move(0.2, 0.5) //xSpeed, ySpeed
  globalVars.sprites.block.move(0.5, 0.7) //xSpeed, ySpeed
}

function setup () {
  const ring = new FloatObject()
  ring.initialise('../assets/ring.svg', { x: 200, y: 200 }, app.stage)
  const letter = new FloatObject()
  letter.initialise('../assets/letter-c.svg', { x: 400, y: 400 }, app.stage)
  const block = new FloatObject()
  block.initialise('../assets/block.svg', { x: 600, y: 150 }, app.stage)

  globalVars.sprites = { ring: ring, letter: letter, block: block }

  globalVars.state = play
  app.ticker.add(delta => gameLoop(delta))

}


 
if (window)  {
  window.addEventListener('load', initialisePixi)
  window.addEventListener('resize', resize)
  initialiseObjects()
}
