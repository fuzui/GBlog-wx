import { getCategories, getCategoriesArticle } from '../../../services/api/content/category'
import { PageSize, CustomStyle } from '../../../config/api'

const app = getApp()

Page({
  data: {
    noContentImage: CustomStyle.noContentImage,
    title: '分类',
    logo: '',
    slug: '',
    name: '',
    pageNo: 0,
    selected: 0, // 当前选中
    content: [],
    loading: false
  },

  async onLoad(options) {
    const that = this
    let slug = ''
    // 扫码打开
    if (options.scene && !options.slug) {
      const scene = decodeURIComponent(options.scene)
      const param = this.parseQuery(scene)
      slug = param.slug
    } else {
      slug = options.slug
    }
    that.setData({
      logo: app.globalData.logo,
      loadModal: true,
      scene: 'slug=' + slug,
      slug: slug,
      name: slug
    })
    const content = await this.getArticleList(true, slug)
    that.setData({
      content: content,
      loadModal: false
    })
  },
  async onShow() {},
  onReady() {},
  /**
   * 下拉分页
   */
  async onReachBottom() {
    const that = this
    const pageNo = ++that.data.pageNo
    that.setData({
      pageNo: pageNo
    })
    const content = await this.getArticleList(false, that.data.slug)
    that.setData({
      content: content
    })
  },
  onShareAppMessage: function (res) {
    return {
      title: app.globalData.blogTitle + '之' + this.data.slug,
      path: '/pages/type/details/index'
    }
  },
  onShareTimeline: function (res) {
    return {
      title: app.globalData.blogTitle + '之' + this.data.slug,
      imageUrl: app.globalData.logo
    }
  },
  /**
   * 详情跳转
   * @param {*} e
   */
  details(e) {
    wx.navigateTo({
      url: '../details/index?id=' + e.currentTarget.id
    })
  },
  /**
   * 获取分类
   */
  async getCategories() {
    try {
      const param = {}
      const result = await getCategories(param)
      return result
    } catch (error) {
      return await Promise.reject(error)
    }
  },
  /**
   * 获取文章列表
   */
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
        size: PageSize.categorySize,
        sort: ['topPriority,desc', 'createTime,desc']
      }
      const result = await getCategoriesArticle(slug, param)
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
  // 初始化文章数与页数
  initParams() {
    const that = this
    that.setData({
      content: [],
      pageNo: 0
    })
  },
  /**
   * 查询字符串转对象
   */
  parseQuery(query) {
    const reg = /([^=&\s]+)[=\s]*([^&\s]*)/g
    const obj = {}
    while (reg.exec(query)) {
      obj[RegExp.$1] = RegExp.$2
    }
    return obj
  }
})
