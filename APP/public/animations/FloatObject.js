class FloatObject {

  constructor () {
    this.yDirection = 1
    this.xDirection = 1
    this.acceleration = { x: Math.random(0.1, 0.2), y: Math.random(0.1, 0.2)}
    this.velocity = { x: Math.random(0.1, 0.2), y: Math.random(0.1, 0.2) }
    this.vectorX = 0
    this.vectorY = 0
    this.sprite = {}
    this.doesCollide = false
    this.name = false
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

    stage.addChild(this.sprite)
  }

  removeFromStage (stage) {
    stage.removeChild(this.sprite)
  }
  
  detectCollision (otherSprite) {
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
    let clashAxis = null
    if (Math.abs(vx) < combinedHalfWidths) {
      //A collision might be occurring. Checking for a collision on the y axis
      if (Math.abs(vy) < combinedHalfHeights) {
        console.log('💥 INTERSECT')
        if (vx < vy) {
          clashAxis = 'x'       
        } else if (vx > vy) {
          clashAxis = 'y'
        }
        this.bounceOff(clashAxis)
      }
    } else {
      this.doesCollide = false
    }
  }

  bounceOff () {
    this.yDirection = this.yDirection * (-1)
    // this.velocity.y = this.velocity.y * 1.1
    this.xDirection = this.xDirection * (-1)
    // this.velocity.x = this.velocity.x * 1.2
  }

  move () {
    const canvas = document.querySelector("canvas")

    //Reversing direction if object hits Pool corners
    // let xRadius = this.sprite.width/2
    // let yRadius = this.sprite.height/2
    let canvasBorderHoriz = parseInt(canvas.style.width)
    let canvasBorderVertic = parseInt(canvas.style.height)

    if (this.sprite.x > canvasBorderHoriz || this.sprite.x < 0) {
      this.xDirection = this.xDirection * -1
      this.acceleration.y = this.acceleration.y * Math.random(0.2, 0.6)
    }
    if (this.sprite.y > canvasBorderVertic || this.sprite.y < 0) {
      this.yDirection = this.yDirection * -1
      this.acceleration.x = this.acceleration.x * Math.random(0.1, 0.3)
    } 

    //Setting up Physics Engine
    this.vectorX = (this.acceleration.x + this.velocity.x) * this.xDirection
    this.vectorY = (this.acceleration.y + this.velocity.y) * this.yDirection

    this.sprite.x = this.sprite.x + this.vectorX
    this.sprite.y = this.sprite.y + this.vectorY
  } 
}