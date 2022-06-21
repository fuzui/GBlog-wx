import { ApiBaseUrl } from '../../config/api'
import { THEME_SETTING_KEY } from '../../services/const-data/theme-setting-key'

const app = getApp()
Component({
  externalClasses: ['custom-class'],
  properties: {
    defaultImage: {
      type: String,
      value: ''
    },
    loadErrorImage: {
      type: String,
      value: ''
    },
    originalImage: {
      type: String,
      value: ''
    },
    width: {
      type: String,
      value: ''
    },
    height: {
      type: String,
      value: ''
    },
    mode: {
      type: String,
      value: 'widthFix'
    },
    randomGraphs: {
      type: Array,
      value: []
    }
  },
  data: {
    ApiBaseUrl,
    finishLoadFlag: false,
    loadErrorFlag: false
  },
  lifetimes: {
    async attached() {
      if (!app.globalData.hasInit) {
        await app.init()
      }
      this.setData({
        defaultImage: app.themeSettings[THEME_SETTING_KEY.PLACEHOLDER_IMAGE],
        loadErrorImage: app.themeSettings[THEME_SETTING_KEY.LOAD_ERROR_IMAGE]
      })
    }
  },
  methods: {
    finishLoad: function (e) {
      this.setData({
        finishLoadFlag: true
      })
    },
    loadError: function (e) {
      this.setData({
        loadErrorFlag: true
      })
    }
  }
})
