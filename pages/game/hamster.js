class Hamster {
  constructor (canvasContext) {
    this.canvasContext = canvasContext
  }

  born (x, y) {
    this.x = x
    this.y = y

    this.create()
  }

  create () {
    const context = this.canvasContext
    context.drawImage('./images/dishu.png', this.x - 35, this.y - 30, 70, 70)
  }

  checkBeat (touchX, touchY) {
    console.log(touchX)
    console.log(touchY)
  }
}

module.exports = Hamster