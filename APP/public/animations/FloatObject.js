class FloatObject {

  constructor () {
    this.x = 0
    this.y = 0
    this.vx = 0
    this.vy = 0
    this.xdir = 0
    this.ydir = 0
    this.sprite = {}
  }

  initialise(filePath, pos, stage) {
    this.sprite = new PIXI.Sprite(PIXI.loader.resources[filePath].texture)
    this.x = pos.x
    this.y = pos.y
    this.sprite.x = this.x
    this.sprite.y = this.y
    stage.addChild(this.sprite)
  }

  removeFromStage(stage) {
    stage.removeChild(this.sprite)
  }

  move (xdir, ydir, vx, vy) {
    this.xdir = xdir
    this.ydir = ydir
    this.sprite.x = this.sprite.x + this.xdir
    this.sprite.y = this.sprite.y + this.ydir
  }

  reverseDirection () {
    this.sprite.x = this.sprite.x - this.xdir
    this.sprite.y = this.sprite.y - this.ydir
  }

}