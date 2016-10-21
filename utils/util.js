
function formatTime(date) {
  var year = date.getFullYear()
  var month = date.getMonth() + 1
  var day = date.getDate()

  var hour = date.getHours()
  var minute = date.getMinutes()
  var second = date.getSeconds()


  return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

function formatNumber(n) {
  n = n.toString()
  return n[1] ? n : '0' + n
}

/**
 * 获得网络类型
 */
const getNetworkType = () => {
  var promise = new Promise((resolve, reject) => {
    wx.getNetworkType({
      success: res => {
        const networkType = res.networkType
        resolve(networkType)
      },
      fail: () => {
        reject(false)
      }
    })
  })
  return promise
}

/**
 * 获得设备信息
 */
const getSystemInfo = () => {  
  var promise = new Promise((resolve, reject) => {
    wx.getSystemInfo({
      success: res => {
        resolve(res)    
      },
      fail: () => {
        reject(false)
      }
    })
  })
  return promise
}

module.exports = {
  formatTime: formatTime,
  getSystemInfo: getSystemInfo,
}
