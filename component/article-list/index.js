//获取应用实例
const app = getApp();

Component({
  properties: {
    content: {
      type: Array,
      value: []
    },
  },
  options: {
    addGlobalClass: true,
  },
  methods: {
    details(e) {
      //详情页跳转
      wx.navigateTo({
        url: '/pages/details/details?id=' + e.currentTarget.id
      })
    },
  }
})