// components/searchBlog/searchBlog.js
let keyword = ''
Component({
  options:{
    styleIsolation: 'apply-shared'
  },
  properties: {
    placeholder: {
      type: String,
      value: '请输入关键字'
    }
  },
  externalClasses: [
    'iconfont',
    'icon-sousuo',
    'icon-quxiao',
  ],

  /**
   * 组件的初始数据
   */
  data: {
    showView: false,
    inputValue: '',//输入框输入的值
  },

  /**
   * 组件的方法列表
   */
  methods: {
    onInput(event){
      let that = this
      keyword = event.detail.value
      console.log(keyword)
      if(keyword!=""){ //组件的显示与隐藏
        that.setData({
          showView: true
        })
      } else{
        that.setData({
          showView: false
        })
      }
    },

    onSearch(){
      // console.log(keyword)
      // 把关键字抛到调用方blog里，传递keyword
      this.triggerEvent('search', {
        keyword
      })
    },

    onCancel(event){
      keyword = '' // 把输入后存储的关键字置空
      this.setData({
        showView: false,
        inputValue: '' // 把输入框里的值置空
      })
      // 把关键字抛到调用方blog里，传递keyword
      this.triggerEvent('cancel', {
        keyword
      })
    }
  }
})
