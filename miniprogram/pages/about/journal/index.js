import { getJournals } from '../../../services/api/content/journal'
import { ApiBaseUrl } from './../../../config/api'
import { THEME_SETTING_KEY } from '../../../services/const-data/theme-setting-key'

const app = getApp()

Page({
  data: {
    ApiBaseUrl,
    mpHtmlStyle: {},
    logo: '',
    pageNo: 0,
    bottomFlag: false,
    content: [],
    bgColor: ['green', 'red', 'grey', 'blue', 'cyan', 'purple']
  },
  async onLoad() {
    const that = this
    if (!app.globalData.hasInit) {
      await app.init()
    }
    const mpHtmlStyle = {
      journalTagStyle: app.themeSettings[THEME_SETTING_KEY.JOURNAL_TAG_STYLE],
      journalContainerStyle: app.themeSettings[THEME_SETTING_KEY.JOURNAL_CONTAINER_STYLE],
      loadingImage: app.themeSettings[THEME_SETTING_KEY.PLACEHOLDER_IMAGE],
      errorImage: app.themeSettings[THEME_SETTING_KEY.LOAD_ERROR_IMAGE]
    }
    that.setData({
      logo: app.themeSettings[THEME_SETTING_KEY.BLOG_LOGO],
      mpHtmlStyle: mpHtmlStyle
    })
  },
  async onShow() {
    const that = this
    that.setData({
      loadModal: true
    })
    const content = await this.getJournals()
    that.setData({
      content: content,
      loadModal: false
    })
  },
  /**
   * 向下滑动拉去下一页
   */
  async onReachBottom() {
    const that = this
    const pageNo = ++that.data.pageNo
    that.setData({
      pageNo: pageNo
    })
    const content = await this.getJournals()
    if (content) {
      that.setData({
        content: content
      })
    }
  },
  /**
   * 获取日记
   */
  async getJournals() {
    const that = this
    try {
      const param = {
        page: that.data.pageNo,
        size: app.themeSettings[THEME_SETTING_KEY.PAGE_SIZE_JOURNAL],
        sort: 'createTime,desc'
      }
      const result = await getJournals(param)
      if (result.page < result.pages) {
        return that.data.content.concat(result.content)
      } else {
        that.setData({
          bottomFlag: true
        })
      }
    } catch (error) {
      return await Promise.reject(error)
    }
  },
  onShareAppMessage: function (res) {
    return {
      title: app.themeSettings[THEME_SETTING_KEY.BLOG_TITLE] + '的日记本',
      path: '/pages/about/journal/index'
    }
  },
  onShareTimeline: function (res) {
    return {
      title: app.themeSettings[THEME_SETTING_KEY.BLOG_TITLE] + '的日记本',
      imageUrl: app.themeSettings[THEME_SETTING_KEY.BLOG_LOGO]
    }
  }
})
