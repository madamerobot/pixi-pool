class FloatObject {

  constructor () {
    this.xSpeed = 0
    this.ySpeed = 0
    this.direction = 1
    this.sprite = {}
    this.doesCollide = false
  }

  initialise (filePath, pos, stage) {
    this.sprite = new PIXI.Sprite(PIXI.loader.resources[filePath].texture)
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
      } 
    }
  }

  move (xSpeed, ySpeed) {
    this.xSpeed = xSpeed
    this.ySpeed = ySpeed
    this.sprite.x = this.sprite.x + (this.xSpeed * this.direction)
    this.sprite.y = this.sprite.y + (this.ySpeed * this.direction)
    //Making object bounce from Pool corners
    if (this.sprite.x > 770 || this.sprite.x < 0 || this.sprite.y > 550 || this.sprite.y < 0) {
      this.direction = this.direction * (-1)
    }
  } 

}