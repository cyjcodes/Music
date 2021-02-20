// pages/profile-playhistory/profile-playhistory.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    musiclist: [],
    showView: true
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const playHistory = wx.getStorageSync(app.globalData.openid)
    if (playHistory.length == 0) {
      this.setData({
        showView: false
      })
      wx.showModal({
        title: '提示',
        content: '播放历史为空',
        showCancel: false,
        cancelText: "",
      })
    }else{
      // storage里面存储的musiclist替换成播放历史的歌单
      wx.setStorage({
        key: 'musiclist',
        data: playHistory,
      })
      this.setData({
        musiclist: playHistory
      })
    }
  },

  // 删除播放历史记录：之所以用setStorage而不用removeStorage，是因为前面进行播放历史的操作时，操作到了数组，如用remove，则会报错，而且删除后刚进入时获取到的openid的数组就没了，要重新进入才能再次获取
  deletePlayhistory(){
    let that = this
    wx.showModal({
      title: '提示',
      content: '是否删除播放记录',
      success (res) {
        if (res.confirm) {
          wx.setStorage({
            key: app.globalData.openid,
            data: [],
            success () {
              console.log('删除成功')
              that.setData({
                musiclist: [],
                showView: false
              })
            }
          })
        } else if (res.cancel) {
        }
      }
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})