import Hamster from './hamster'
import utils from '../../utils/util'

var app = getApp()

Page({
  data:{
    // text:"这是一个页面"
    windowWidth: 0,
    windowHeight: 0,
  },
  onLoad:function(options){
    // 页面初始化 options为页面跳转所带来的参数
    this.HAMSTERS = []
    this.gameTimer = null
    this.windowHeight = 0
    this.windowHeight = 0
    this.verticalLine = 4
    this.horizontalLine = 5

    utils.getSystemInfo().then(res => {
      this.windowWidth = res.windowWidth
      this.windowHeight = res.windowHeight
      this.setData({
        windowWidth: this.windowWidth,
        windowHeight: this.windowHeight,
      })
    })
  },
  onReady:function(){
    // 页面渲染完成
    this.createGame()
  },
  onShow:function(){
    // 页面显示
  },
  onHide:function(){
    // 页面隐藏
  },
  onUnload:function(){
    // 页面关闭
    this.gameTimer && clearInterval(this.gameTimer)
  },
  createGame: function() {
    var context = wx.createContext()

    this.canvasContext = context

    context.setStrokeStyle('#faa755')

    this.createChassis()
    this.calsHamsterPosition()
    this.randomHamster()
  },
  // 绘制底盘
  createChassis: function() {
    const context = this.canvasContext
    const width = this.windowWidth
    const height = this.windowHeight

    const verticalLine = this.verticalLine
    const horizontalLine = this.horizontalLine

    for(let i = 1; i < verticalLine; i++) {
      // 绘制纵线
      context.moveTo(i * parseFloat(width / verticalLine),      0);
      context.lineTo(i * parseFloat(width / verticalLine), height);
    }

    for(let j = 1; j < horizontalLine; j++) {
      // 绘制横线
      context.moveTo(0,     j * parseFloat(height / horizontalLine));
      context.lineTo(width, j * parseFloat(height / horizontalLine));
    }

    context.stroke();

    // context.drawImage('./images/bg.jpg', 0, 0, width, height)

    //调用wx.drawCanvas，通过canvasId指定在哪张画布上绘制，通过actions指定绘制行为
    wx.drawCanvas({
      canvasId: 'chassicCanvas',
      actions: context.getActions() //获取绘图动作数组
    })
  },
  // 计算所有地鼠的位置
  calsHamsterPosition: function() {
    const verticalLine = this.verticalLine
    const horizontalLine = this.horizontalLine
    const width = this.windowWidth
    const height = this.windowHeight
    const verticalOffset = width / verticalLine / 2
    const horizontalOffset = height / horizontalLine / 2

    for(var i = 0; i < verticalLine; i++) {
      for(var j = 0; j < horizontalLine; j++) {
        this.HAMSTERS.push({
          x: Math.floor(i * width / verticalLine + verticalOffset),
          y: Math.floor(j * height / horizontalLine + horizontalOffset)
        })
      }
    }
    this.HAMSTERS.map((item) => {
      console.log(JSON.stringify(item))
    })
  },
  // 随机出现地鼠
  randomHamster: function() {
    const context = this.canvasContext

    this.gameTimer = setInterval(() => {
      this.createHamster()
    }, 2000)
  },
  /*
   * 随机创建地鼠
   */
  createHamster: function() {
    const context = this.canvasContext
    const hamsterTotal = this.verticalLine * this.horizontalLine
    for(var i = 0; i < 2; i++) {
      const index = Math.floor(Math.random() * hamsterTotal)
      const hamster = this.HAMSTERS[index]
      new Hamster(context).born(hamster.x, hamster.y)
      // context.fillText('T', hamster.x, hamster.y)
    }

    context.stroke();

    //调用wx.drawCanvas，通过canvasId指定在哪张画布上绘制，通过actions指定绘制行为
    wx.drawCanvas({
      canvasId: 'hamsterCanvas',
      actions: context.getActions() //获取绘图动作数组
    })
  },
  tapHamster: function({ touches }) {
    const { pageX,pageY } = touches[0]

    console.log('pageX', pageX)
    console.log('pageY', pageY)
  }
})
