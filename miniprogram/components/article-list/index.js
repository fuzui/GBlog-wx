import { THEME_SETTING_KEY } from '../../services/const-data/theme-setting-key'

// 获取应用实例
const app = getApp()
Component({
  data: {
    randomGraphs: []
  },
  properties: {
    content: {
      type: Array,
      value: []
    },
    isMore: {
      type: Boolean,
      value: true
    },
    layout: {
      type: String,
      value: 'card'
    }
  },
  options: {
    addGlobalClass: true
  },
  pageLifetimes: {
    async show() {
      if (!app.globalData.hasInit) {
        await app.init()
      }
      this.setData({
        randomGraphs: app.themeSettings[THEME_SETTING_KEY.RANDOM_IMAGE]
      })
    }
  },
  methods: {
    details(e) {
      // 详情页跳转
      wx.navigateTo({
        url: '/pages/details/index?id=' + e.currentTarget.id
      })
    }
  }
})
