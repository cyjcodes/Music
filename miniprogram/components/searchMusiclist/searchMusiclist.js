// components/searchMusiclist/searchMusiclist.js
const app = getApp()
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    // 调用组件时传递的数据
    searchMusiclist: Array
  },

  /**
   * 组件的初始数据
   */
  data: {
    // 组件内部的数据
    playingId: -1 //初始值定为-1，因为不可能是-1
  },

  pageLifetimes: {
    show(){
      this.setData({
        playingId: parseInt(app.getPlayMusicId())
      })
    }
  },
  /**
   * 组件的方法列表
   */
  methods: {
    onSelect(event){
      // 事件源 事件处理函数 事件对象 事件类型
      //console.log(event.currentTarget.dataset.musicid)
      const ds =  event.currentTarget.dataset
      const musicid = ds.musicid
      this.setData({
        playingId: musicid
      })
      wx.navigateTo({
        url: `../../pages/player/player?musicId=${musicid}&index=${ds.index}`,
      })
    }
  }
})
