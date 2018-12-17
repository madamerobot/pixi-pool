class FloatObject {

  constructor () {
    this.x = 0
    this.y = 0
    this.xSpeed = 0
    this.ySpeed = 0
    this.direction = 1
    this.sprite = {}
  }

  initialise (filePath, pos, stage) {
    this.sprite = new PIXI.Sprite(PIXI.loader.resources[filePath].texture)
    this.x = pos.x
    this.y = pos.y
    this.sprite.x = this.x
    this.sprite.y = this.y
    stage.addChild(this.sprite)
  }

  removeFromStage (stage) {
    stage.removeChild(this.sprite)
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