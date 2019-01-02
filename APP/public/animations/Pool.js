class Pool {

  constructor () {
    this.displacementSprite = {}
    this.gridSprite = {}
    this.xSpeed = 0
    this.ySpeed = 0
    this.direction = 1
  }

  initialise (filePath, stage, app) {
    this.width = stage.width
    this.height = stage.height
    let grid

    //Drawing the grid
    for (var i = 0; i < 250; i++) {
      grid = new PIXI.Graphics()
      //Vertical lines
      grid.beginFill(0xFF3300)
      grid.lineStyle(1, 0xffffff, 0.5)
      grid.moveTo((i * 35), 0)
      grid.lineTo((i * 35), 2000)
      grid.lineTo((i * 35), 0)
      grid.endFill()
      //Horizontal lines
      grid.beginFill(0xFF3300)
      grid.lineStyle(1, 0xffffff, 0.5)
      grid.moveTo(0, (i * 35))
      grid.lineTo(1500, (i * 35))
      grid.lineTo(0, (i * 35))
      grid.endFill()
      stage.addChild(grid)
    }

    //Creating a Texture out of the grid we drew before
    let gridTexture = app.renderer.generateTexture(grid)
    this.gridSprite = new PIXI.Sprite(gridTexture.texture)

    //Creating a displacement map out of the BW Cloud Image
    this.displacementSprite = PIXI.Sprite.fromImage(filePath)
    //Tiling displacement map over entire screen
    this.displacementSprite.texture.baseTexture.wrapMode = PIXI.WRAP_MODES.REPEAT
    //Apply Displacement Filter on Pool
    let displacementFilter = new PIXI.filters.DisplacementFilter(this.displacementSprite)

    //Adding it all to the stage
    stage.filters = [displacementFilter]
    stage.addChild(this.displacementSprite)
    stage.addChild(this.gridSprite)
  }

  animate (speed, stage) {
    this.xSpeed = speed.x
    this.ySpeed = speed.y
    if (this.displacementSprite.x > stage.width || this.displacementSprite.x < 0) {
      this.direction = this.direction * -1
    }
    if (this.displacementSprite.y > stage.height || this.displacementSprite.y < 0) {
      this.direction = this.direction * -1
    }
    this.displacementSprite.x = this.displacementSprite.x + (Math.random(3, 8) * this.direction)
    this.displacementSprite.y = this.displacementSprite.y + (Math.random(3, 8) * this.direction)
  }
}