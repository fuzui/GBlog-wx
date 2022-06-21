import { Config, themeSettings } from 'config/api.js'
import { compareVersion } from './utils/utils'
import { getOptions } from './services/api/content/option'
import { getThemeSettingsById } from './services/api/content/theme'
import { STORAGE_KEY, HALO_OPTION_KEY } from './services/const-data/const-data'
import { THEME_SETTING_KEY } from './services/const-data/theme-setting-key'

App({
  async onLaunch() {
    wx.showLoading({
      title: '初始化中',
      mask: true
    })
    await this.updateManager()
    await this.init()
    if (this.themeSettings[THEME_SETTING_KEY.CLOUD_IS_OPEN]) {
      if (!wx.cloud) {
        console.error('请使用 2.2.3 或以上的基础库以使用云能力')
      } else {
        wx.cloud.init({
          env: Config.cloudEnv,
          traceUser: true
        })
      }
    }
    wx.hideLoading()
  },
  globalData: {
    windowHeight: 1334,
    unitConversionRatio: 2
  },
  themeSettings: themeSettings,
  async init() {
    await this.loadFontFace()
    await this.getOptions()
    // 必须在options后
    await this.getThemeSettings()
    this.globalData.hasInit = true
  },
  async getOptions() {
    let options = wx.getStorageSync(STORAGE_KEY.options)
    if (!options) {
      const optionOrigin = await getOptions()
      options = {}
      optionOrigin.forEach(option => {
        options[option.key] = option.value
      })
      wx.setStorageSync(STORAGE_KEY.options, options)
    }
  },
  async getThemeSettings() {
    let settings
    // 是否使用缓存判断
    if (Config.themeSettingsCache) {
      settings = wx.getStorageSync(STORAGE_KEY.themeSettings)
      if (!settings) {
        settings = await getThemeSettingsById('gblogwx_config')
        wx.setStorageSync(STORAGE_KEY.themeSettings, settings)
      }
    } else {
      settings = await getThemeSettingsById('gblogwx_config')
    }

    // 博客名和logo处理
    const options = wx.getStorageSync(STORAGE_KEY.options)
    if (!settings[THEME_SETTING_KEY.BLOG_TITLE] || !settings[THEME_SETTING_KEY.BLOG_LOGO]) {
      settings[THEME_SETTING_KEY.BLOG_TITLE] =
        settings[THEME_SETTING_KEY.BLOG_TITLE] || options[HALO_OPTION_KEY.blogTitle]
      settings[THEME_SETTING_KEY.BLOG_LOGO] =
        settings[THEME_SETTING_KEY.BLOG_LOGO] || options[HALO_OPTION_KEY.blogFavicon]
    }
    Object.assign(this.themeSettings, settings)
    // 随机图转为数组
    this.themeSettings[THEME_SETTING_KEY.RANDOM_IMAGE] = this.themeSettings[THEME_SETTING_KEY.RANDOM_IMAGE]
      .trim()
      .split(';')
    // 解析样式处理
    this.themeSettings[THEME_SETTING_KEY.POST_TAG_STYLE] = this.themeSettings[THEME_SETTING_KEY.POST_TAG_STYLE]
      ? JSON.parse(this.themeSettings[THEME_SETTING_KEY.POST_TAG_STYLE].trim())
      : ''
    this.themeSettings[THEME_SETTING_KEY.COMMENT_TAG_STYLE] = this.themeSettings[THEME_SETTING_KEY.COMMENT_TAG_STYLE]
      ? JSON.parse(this.themeSettings[THEME_SETTING_KEY.COMMENT_TAG_STYLE].trim())
      : ''
    this.themeSettings[THEME_SETTING_KEY.JOURNAL_TAG_STYLE] = this.themeSettings[THEME_SETTING_KEY.JOURNAL_TAG_STYLE]
      ? JSON.parse(this.themeSettings[THEME_SETTING_KEY.JOURNAL_TAG_STYLE].trim())
      : ''
  },
  async loadFontFace() {
    wx.loadFontFace({
      global: true,
      family: 'JetBrainsMono',
      source: 'url("https://cdn.jsdelivr.net/gh/JetBrains/JetBrainsMono/ttf/JetBrainsMono-Regular.ttf")',
      success: res => {},
      fail: function (res) {},
      complete: function (res) {}
    })
    wx.loadFontFace({
      global: true,
      family: 'Ali',
      source: 'url("https://at.alicdn.com/t/webfont_8of3cuhq013.ttf")',
      success: res => {},
      fail: function (res) {},
      complete: function (res) {}
    })
  },
  // 更新小程序以及系统信息获取校验
  updateManager: function () {
    // 获取系统信息 客户端基础库
    const that = this
    wx.getSystemInfo({
      success: function (res) {
        // 全局设置
        that.globalData.windowHeight = res.windowHeight * (750 / res.windowWidth)
        that.globalData.StatusBar = res.statusBarHeight
        // px换算rpx
        that.globalData.unitConversionRatio = 750 / res.windowWidth
        const custom = wx.getMenuButtonBoundingClientRect()
        that.globalData.Custom = custom
        that.globalData.CustomBar = custom.bottom + custom.top - res.statusBarHeight
        // 基础库版本比较，版本更新必须是1.9.90以上
        // wx.getUserProfile，版本必须是2.10.4及以上
        const v = compareVersion(res.SDKVersion, '2.10.4')
        if (v >= 0) {
          const manager = wx.getUpdateManager()
          manager.onCheckForUpdate(function (res) {
            // 请求完新版本信息的回调
          })
          manager.onUpdateReady(function () {
            wx.showModal({
              title: '更新提示',
              content: '新版本已经准备好，是否重启应用？',
              success: function (res) {
                if (res.confirm) {
                  // 新的版本已经下载好，调用 applyUpdate 应用新版本并重启
                  manager.applyUpdate()
                }
              }
            })
          })
          manager.onUpdateFailed(function () {
            // 新的版本下载失败
          })
        } else {
          wx.showModal({
            title: '温馨提示',
            content: '当前微信版本过低，无法更好体验程序，请升级到最新微信版本后重试。'
          })
        }
      }
    })
  }
})
