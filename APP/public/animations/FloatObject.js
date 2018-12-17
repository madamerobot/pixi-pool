class FloatObject {

  constructor () {
    this.direction = 1
    this.acceleration = { x: this.xSpeed, y: this.ySpeed }
    this.velocity = { x: this.vx, y: this.vy }
    this.sprite = {}
    this.doesCollide = false
  }

  onClick() {
    console.log('Click')
  }

  initialise (filePath, pos, stage) {
    this.sprite = new PIXI.Sprite(PIXI.loader.resources[filePath].texture)

    //Adding Event Listener
    this.sprite.buttonMode = true
    this.sprite.interactive = true
    this.sprite.on('click', this.onClick)

    //Positioning Element
    this.sprite.x = pos.x
    this.sprite.y = pos.y
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

    //Check for a collision and revert direction
    if (Math.abs(vx) < combinedHalfWidths) {
      if (Math.abs(vy) < combinedHalfHeights) {
        this.direction = this.direction * (-1)
        r2.direction = r2.direction * (-1)
      } 
    }
  }

  move (xSpeed, ySpeed, vx, vy) {
    this.acceleration = {
      x: xSpeed,
      y: ySpeed
    }
    this.velocity = {
      y: vy,
      x: vx
    }
    let vectorX = this.acceleration.x + this.velocity.x
    let vectorY = this.acceleration.y + this.velocity.y
    this.sprite.x = this.sprite.x + (vectorX * this.direction)
    this.sprite.y = this.sprite.y + (vectorY * this.direction)
    //Making object bounce from Pool corners
    if (this.sprite.x > 770 || this.sprite.x < 0 || this.sprite.y > 550 || this.sprite.y < 0) {
      this.direction = this.direction * (-1)
    }
  } 

}