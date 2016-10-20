var app = getApp()

Page({
  data:{
    // text:"这是一个页面"
  },
  onLoad:function(options){
    // 页面初始化 options为页面跳转所带来的参数
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
  },
  createGame: function() {
    var context = wx.createContext()

    this.canvasContext = context

    context.setStrokeStyle('#BFBFBF')

    this.createChassis()
    this.createHamster()

    context.stroke();
    
    //调用wx.drawCanvas，通过canvasId指定在哪张画布上绘制，通过actions指定绘制行为
    wx.drawCanvas({
      canvasId: 'gameCanvas',
      actions: context.getActions() //获取绘图动作数组
    })
  },
  // 绘制底盘
  createChassis: function() { 
    console.log('232323232')
    console.log(this)
    const context = this.canvasContext
    for(var i = 1; i < 3; i++) {
      // 绘制横线
      context.moveTo(0,   i * 100);
      context.lineTo(300, i * 100);
      // 绘制纵线
      context.moveTo(i * 100, 0);
      context.lineTo(i * 100, 300);
    }
  },
  // 绘制地鼠
  createHamster: function() {
    const context = this.canvasContext
    context.setFontSize(20)
    for(var i = 0; i < 3; i++) {
      for(var j = 0; j < 3; j++) {
        context.fillText('H', 50 + i * 100, 50 + j * 100)
        context.fillText('H', 50 + j * 100, 50 + i * 100 )
      }
    }
  }
})