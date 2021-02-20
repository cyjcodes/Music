// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init({
  env: cloud.DYNAMIC_CURRENT_ENV
})

// 云函数入口函数
exports.main = async (event, context) => {
  try {

    const wxContext = cloud.getWXContext()

    cloud.openapi.subscribeMessage.send({
      touser: wxContext.OPENID,
      templateId: 'ZtAqZYxOcOHfoS2Hrx1Z0fvpiL-ygvgJ4EIwDlzXVvg',
      page: `/pages/blog-comment/blog-comment?blogId=${event.blogId}`,
      data: {
        thing2: {
          value: event.content,
        },
        thing5: {
          value: '评论成功'
        }
      },
      miniprogramState: 'developer'
    })
  } catch (err) {
    console.log(err)
  }
}