import { getTags, getTagsArticle } from '../../services/api/content/tag'
import { convertImageUrl } from '../../utils/utils'
import { THEME_SETTING_KEY } from '../../services/const-data/theme-setting-key'

const app = getApp()
Page({
  data: {
    noContentImage: '',
    StatusBar: app.globalData.StatusBar,
    CustomBar: app.globalData.CustomBar,
    unitConversionRatio: app.globalData.unitConversionRatio,
    Custom: app.globalData.Custom,
    logo: '',
    loadModal: false,
    tagCur: 0,
    mainCur: 0,
    tagNavTop: 0,
    typeSlug: '',
    pageNo: 0,
    tagList: [],
    content: [],
    tip: '',
    loading: false
  },
  async onLoad(options) {
    const that = this
    wx.showLoading({
      title: '加载中...',
      mask: true
    })
    if (!app.globalData.hasInit) {
      await app.init()
    }
    that.setData({
      logo: app.themeSettings[THEME_SETTING_KEY.BLOG_LOGO],
      noContentImage: app.themeSettings[THEME_SETTING_KEY.PLACEHOLDER_IMAGE],
      loadModal: true
    })
    const tagList = await this.getTags()
    const selected = options.id ? (tagList || []).findIndex(tag => tag.id === parseInt(options.id)) : 0
    that.setData({
      tagCur: selected
    })
    if (tagList.length === 0) {
      that.setData({
        tagList: tagList,
        loadModal: false
      })
      return
    }
    const tagSlug = tagList[selected].slug
    const content = await this.getArticleList(true, tagSlug)
    that.setData({
      tagList: tagList,
      content: content,
      loadModal: false
    })
  },
  onReady() {
    wx.hideLoading()
  },
  async tagSelect(e) {
    const tagSlug = e.currentTarget.dataset.slug
    const content = await this.getArticleList(true, tagSlug)
    this.setData({
      tagCur: e.currentTarget.dataset.index,
      content: content,
      mainCur: e.currentTarget.dataset.index,
      tagNavTop: (e.currentTarget.dataset.index - 1) * 50
    })
  },
  /**
   * 获取标签
   */
  async getTags() {
    try {
      const param = {}
      const result = await getTags(param)
      return result
    } catch (error) {
      return await Promise.reject(error)
    }
  },
  async getArticleList(init, slug) {
    try {
      const that = this
      if (init) {
        this.initParams()
      }
      const pageNo = that.data.pageNo
      if (pageNo !== 0) {
        that.setData({
          loading: true
        })
      } else {
        that.setData({
          loading: false
        })
      }
      const param = {
        page: pageNo,
        size: app.themeSettings[THEME_SETTING_KEY.PAGE_SIZE_TAG]
      }
      const result = await getTagsArticle(slug, param)
      if (result.page < result.pages) {
        return that.data.content.concat(result.content)
      } else {
        that.setData({
          loading: false
        })
      }
    } catch (error) {
      return await Promise.reject(error)
    }
  },
  async onReachBottomArticleMain() {
    const that = this
    const pageNo = ++that.data.pageNo
    that.setData({
      pageNo: pageNo
    })
    const tagSlug = that.data.tagList[this.data.tagCur].slug
    const content = await this.getArticleList(false, tagSlug)
    that.setData({
      content: content
    })
  },
  // 初始化文章数与页数
  initParams() {
    const that = this
    that.setData({
      content: [],
      pageNo: 0
    })
  },
  toDetail(event) {
    wx.navigateTo({
      url: '../details/index?id=' + event.currentTarget.dataset.id
    })
  },
  toHome() {
    wx.switchTab({
      url: '../index/index'
    })
  },
  backPage() {
    wx.navigateBack({
      delta: 1
    })
  },
  onShareAppMessage: function (res) {
    const that = this
    const currentTag = that.data.tagList[that.data.tagCur]
    return {
      title: app.themeSettings[THEME_SETTING_KEY.BLOG_TITLE] + '标签：' + currentTag.name,
      imageUrl: convertImageUrl(currentTag.thumbnail, [app.themeSettings[THEME_SETTING_KEY.BLOG_LOGO]]),
      path: '/pages/tag/index?id=' + currentTag.id
    }
  },
  onShareTimeline: function (res) {
    const that = this
    const currentTag = that.data.tagList[that.data.tagCur]
    return {
      title: app.themeSettings[THEME_SETTING_KEY.BLOG_TITLE] + '标签：' + currentTag.name,
      imageUrl: convertImageUrl(currentTag.thumbnail, [app.themeSettings[THEME_SETTING_KEY.BLOG_LOGO]]),
      query: 'id=' + currentTag.id
    }
  }
})
