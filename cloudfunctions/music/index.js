// 云函数入口文件
const cloud = require('wx-server-sdk')

const TcbRouter = require('tcb-router')

const axios = require('axios')

const BASE_URL = 'https://autumnfish.cn'
// const BASE_URL = 'https://apis.imooc.com'
// const ICODE = 'icode=08D4487C3B4974E0'

cloud.init({
  env: cloud.DYNAMIC_CURRENT_ENV
})

// 云函数入口函数
exports.main = async(event, context) => {
  const app = new TcbRouter({
    event
  })

  app.router('playlist', async(ctx, next) => {
    ctx.body = await cloud.database().collection('playlist')
      .skip(event.start)
      .limit(event.count)
      .orderBy('trackNumberUpdateTime', 'desc')
      .get()
      .then((res) => {
        return res
      })
  })

  app.router('musiclist', async(ctx, next) => {
    const res = await axios.get(`${BASE_URL}/playlist/detail?id=${parseInt(event.playlistId)}`)
    ctx.body = res.data
  })

  app.router('musicUrl', async(ctx, next) => {
    const res = await axios.get(`${BASE_URL}/song/url?id=${event.musicId}`)
    ctx.body = res.data
  })

  app.router('allMusicId', async(ctx, next) => {
    const res = await axios.get(`${BASE_URL}/song/detail?ids=${event.allMusicIds}`)
    ctx.body = res.data
  })

  app.router('lyric', async(ctx, next) => {
    const res = await axios.get(`${BASE_URL}/lyric?id=${event.musicId}`)
    ctx.body = res.data
  })
  // 歌曲搜索
  app.router('search', async(ctx, next) => {
    const keyword = encodeURI(event.keyword) //中文转码
    const res = await axios.get(`${BASE_URL}/cloudsearch?keywords=${keyword}`)
    ctx.body = res.data
  })
  
  return app.serve()
}