// pages/search/search.js
let keyword = ''

Page({

  /**
   * 页面的初始数据
   */
  data: {
    searchMusiclist:[],
    showView: true, //组件的显示与隐藏
    tip: '请搜索点东西吧~'
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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

  // 搜索
  onSearch(event){
    keyword = event.detail.keyword

    if (keyword == '') {
      this.setData({
        searchMusiclist:[],
        showView: true //组件的显示与隐藏
      })
      wx.showModal({
        title: '提示',
        content: '请输入关键字',
        showCancel: false,
        cancelText: "",
      })
      // return false
    }else{
      wx.showLoading({
        title: '加载中',
      })
      this.setData({
        showView: false
      })
      wx.cloud.callFunction({
        name: 'music',
        data: {
          keyword,
          $url: 'search',
        }
      }).then((res) => {
        console.log(res)
        console.log(res.result.result.songs)
        this.setData({
          searchMusiclist: res.result.result.songs,
        })
        this._setMusiclist()
        wx.hideLoading()
      })
    }
  },

  // 取消输入
  onCancel(evevt){
    this.setData({
      searchMusiclist:[],
      showView: true //组件的显示与隐藏
    })
  },

  _setMusiclist() {
    // 存储到本地Storage
    wx.setStorageSync('musiclist', this.data.searchMusiclist)
  },
})