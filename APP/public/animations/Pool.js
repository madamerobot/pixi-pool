class Pool {

  constructor () {
    this.width = 0
    this.height = 0
    this.color = 0
  }

  initialise (stage) {

    this.width = stage.width
    this.height = stage.height

    for (var i = 0; i < 180; i++) {
      let verticalLine = new PIXI.Graphics()
      //Vertical lines
      verticalLine.beginFill(0xFF3300)
      verticalLine.lineStyle(1, 0xffffff, 0.5)
      verticalLine.moveTo((i * 25), 0)
      verticalLine.lineTo((i * 25), 800)
      verticalLine.lineTo((i * 25), 0)
      verticalLine.endFill()
      stage.addChild(verticalLine)
      //Horizontal lines
      let horizLine = new PIXI.Graphics()
      horizLine.beginFill(0xFF3300)
      horizLine.lineStyle(1, 0xffffff, 0.5)
      horizLine.moveTo(0, (i * 25))
      horizLine.lineTo(1000, (i * 25))
      horizLine.lineTo(0, (i * 25))
      horizLine.endFill()
      stage.addChild(horizLine)
    }
  }

  move () {
    //
  }
}