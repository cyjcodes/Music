// pages/profile-bloghistory/profile-bloghistory.js
const MAX_LIMIT = 10
const db = wx.cloud.database()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    blogList: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (_options) {
    // this._getListByClouFn()
    this._getListByMiniprogram()
  },

  _getListByClouFn(){
    wx.showLoading({
      title: '加载中',
    })
    wx.cloud.callFunction({
      name: 'blog',
      data: {
        $url: 'getListByOpenid',
        start: this.data.blogList.length,
        count: MAX_LIMIT
      }
    }).then((res)=>{
      console.log(res)
      this.setData({
        blogList: this.data.blogList.concat(res.result)
      })
      wx.hideLoading()
    })
  }, 

  _getListByMiniprogram(){
    wx.showLoading({
      title: '加载中',
    })
    db.collection('blog').skip(this.data.blogList.length)
      .limit(MAX_LIMIT).orderBy('createTime', 'desc').get().then((res) => {
        console.log(res)
        let _bloglist = res.data
        for (let i = 0, len = _bloglist.length; i < len; i++) {
          _bloglist[i].createTime = _bloglist[i].createTime.toString()
        }
        this.setData({
          blogList: this.data.blogList.concat(_bloglist)
        })
        wx.hideLoading()
        wx.stopPullDownRefresh() //刷新完成后停止下拉刷新动效
      })
  },

  goComment(event) {
    wx.navigateTo({
      url: `../blog-comment/blog-comment?blogId=${event.target.dataset.blogid}`,
    })
  },
  // 删除自己的博客
  deleteBlog(event){
    let that = this
    let blogImg = event.currentTarget.dataset.img
    let blogId = event.currentTarget.dataset._id
    // let _res = res
    console.log(blogId)
    console.log(blogImg[0])
    wx.showModal({
      title: '提示',
      content: '是否删除当前博客',
      success (res) {
        if (res.confirm) {
          // 删除博客
          db.collection('blog').doc(`${blogId}`).remove({
            success(){
              console.log('删除成功')
            },
            fail(){
              console.log('删除失败')
            }
          })

          // 删除博客评论
          db.collection('blog-comment').where({
            blogId: `${blogId}`
          }).remove({
            success(){
              console.log('删除成功')
            },
            fail(){
              console.log('删除失败')
            }
          })

          // 删除博客图片
          for (let i = 0; i < blogImg.length; i++) {
            wx.cloud.deleteFile({
              fileList: [`${blogImg[i]}`]
            }).then(res => {
              // handle success
              console.log('删除成功')
            }).catch(error => {
              console.log('删除失败')
            })
          }
          wx.startPullDownRefresh()
        }else if (res.cancel) {
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
    this.setData({
      blogList: []
    })
    this._getListByMiniprogram()
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    // this._getListByClouFn()
    this._getListByMiniprogram()
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function(event) {
    const blog = event.target.dataset.blog
    return {
      title: blog.content,
      path: `/pages/blog-comment/blog-comment?blogId=${blog._id}`
    }
  }
})