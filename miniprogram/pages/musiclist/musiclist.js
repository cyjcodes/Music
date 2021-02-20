// pages/musiclist/musiclist.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    allMusicId:[],//含有歌曲id的对象数组
    allMusicIds:[],//只含有歌曲id的数组 
    musiclist:[],
    listInfo: {},
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options)
    wx.showLoading({
      title: '加载中',
    })
    wx.cloud.callFunction({
      name: 'music',
      data: {
        playlistId: options.playlistId,
        $url: 'musiclist'
      }
    }).then((res) => {
      console.log(res)
      const pl = res.result.playlist
      this.setData({
        // musiclist: pl.tracks,
        allMusicId: pl.trackIds,
        listInfo: {
          coverImgUrl: pl.coverImgUrl,
          name: pl.name,
        }
      })
      // console.log(this.data.allMusicId);
      // 获取allMusicId数组里的对象元素的id值
      this.data.allMusicId.forEach((item) => {
        this.data.allMusicIds.push(item.id)
      })
      // console.log(this.data.allMusicIds);
      // 将allMusicId转换成字符串
      this.setData({
        allMusicIds: this.data.allMusicIds.join(',')
      })
      // console.log(this.data.allMusicIds);

      // 调用music云函数里的allMusicId路由
      wx.cloud.callFunction({
        name: 'music',
        data: {
          allMusicIds: this.data.allMusicIds,
          $url: 'allMusicId'
        }
      }).then((res) => {
        console.log(res);
        this.setData({
          musiclist: res.result.songs,
        })
        // console.log(this.data.musiclist);
        this._setMusiclist()
        wx.hideLoading()
      })
      // console.log(this.data.musiclist);
      // console.log(this.data.listInfo);
    })
  },
  // 缓存音乐列表信息到本地 Storage
  _setMusiclist(){
    wx.setStorageSync('musiclist', this.data.musiclist)
  },
})