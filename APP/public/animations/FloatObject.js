class FloatObject {

  constructor () {
    this.yDirection = 1
    this.xDirection = 1
    this.acceleration = { x: Math.random(0.1, 0.2), y: Math.random(0.1, 0.2)}
    this.velocity = { x: Math.random(0.1, 0.2), y: Math.random(0.1, 0.2) }
    this.vectorX = 0
    this.vectorY = 0
    this.sprite = {}
    this.name = false
    this.canvas = false
    this.canvasBorderHoriz = false
    this.canvasBorderVertic = false
  }

  onHover() {
    console.log('Pausing...')
  }

  addMouseEvents() {
    let pathname = this.name
    this.sprite.on('click', function() {
      let overlayContainer = document.querySelector('.overlay-container')
      let layoutWrapper = document.querySelector('.layout-wrapper')
      if (!overlayContainer.classList.contains('swipe-up-animation')){
        swipeOverlay(overlayContainer, layoutWrapper)
      }
      window.location = `/#/${pathname}`
    })
  }

  initialise (filePath, pos, stage, name) {
    this.sprite = new PIXI.Sprite(PIXI.loader.resources[filePath].texture)
    this.name = name

    //Positioning Element
    this.sprite.x = pos.x
    this.sprite.y = pos.y

    //Moving Anchor to center
    this.sprite.anchor.x = 0.5
    this.sprite.anchor.y = 0.5

    //Making Sprite interactive
    this.sprite.buttonMode = true
    this.sprite.interactive = true

    this.addMouseEvents()
    this.initiateSpecs()

    stage.addChild(this.sprite)
  }

  initiateSpecs() {
    this.canvas = document.querySelector("canvas")
    this.canvasBorderHoriz = parseInt(this.canvas.style.width) - this.sprite.width/2
    this.canvasBorderVertic = parseInt(this.canvas.style.height) - this.sprite.height/2
  }

  removeFromStage (stage) {
    stage.removeChild(this.sprite)
  }
  
  detectObjectCollision (otherSprite) {
    //Inspired by https://github.com/kittykatattack/learningPixi
    let combinedHalfWidths, combinedHalfHeights, vx, vy

    let r1 = this.sprite
    let r2 = otherSprite.sprite

    //Find the center points of each sprite
    r1.centerX = r1.x + r1.width / 2
    r1.centerY = r1.y + r1.height / 2
    r2.centerX = r2.x + r2.width / 2
    r2.centerY = r2.y + r2.height / 2

    //Find the half-widths and half-heights of each sprite
    r1.halfWidth = r1.width / 2
    r1.halfHeight = r1.height / 2
    r2.halfWidth = r2.width / 2
    r2.halfHeight = r2.height / 2

    //Calculate the distance vector between the sprites
    vx = r1.centerX - r2.centerX
    vy = r1.centerY - r2.centerY

    //Figure out the combined half-widths and half-heights
    combinedHalfWidths = r1.halfWidth + r2.halfWidth
    combinedHalfHeights = r1.halfHeight + r2.halfHeight

    //Detecting collision and clash-axis
    if (Math.abs(vx) < combinedHalfWidths) {
      //A collision might be occurring. Checking for a collision on the y axis
      if (Math.abs(vy) < combinedHalfHeights) {
        this.bounceOff()
      }
    }
  }

  bounceOff () {
    this.yDirection = this.yDirection * (-1)
    this.xDirection = this.xDirection * (-1)
  }

  move () {

    //Reversing directions if object hits Pool corners
    if (this.sprite.x > this.canvasBorderHoriz || this.sprite.x < 0 + (this.sprite.width/2)) {
      this.xDirection = this.xDirection * -1
    }
    if (this.sprite.y > this.canvasBorderVertic || this.sprite.y < 0 + this.sprite.height/2) {
      this.yDirection = this.yDirection * -1
    } 
    if (this.sprite.x === 0 && this.sprite.y === 0) {
      this.yDirection = this.yDirection * -1
      this.xDirection = this.xDirection * -1
    } 
        
    //Setting up Physics Engine
    this.vectorX = (this.acceleration.x + this.velocity.x) * this.xDirection
    this.vectorY = (this.acceleration.y + this.velocity.y) * this.yDirection

    this.sprite.x = this.sprite.x + this.vectorX
    this.sprite.y = this.sprite.y + this.vectorY
  } 
}