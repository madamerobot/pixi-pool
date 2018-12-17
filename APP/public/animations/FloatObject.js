function FloatObject () {
  
  this.x = 0
  this.y = 0
  this.vx = 0
  this.vy = 0
  this.src = ''

  this.create = ((src) => {
    this.src = src
    return new PIXI.Sprite(PIXI.loader.resources[this.src].texture)
  })

  this.position = ((sprite, x, y) => {
    this.x = x
    this.y = y
    sprite.x = this.x
    sprite.y = this.y
  })

  this.addToStage = ((stage) => {

  })

  this.removeFromStage = ((stage) => {

  })

  this.move = ((vx, vy) => {

  })

  this.reverseDirection = (() => {

  })

}