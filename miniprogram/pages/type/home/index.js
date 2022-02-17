import LastMayday from '../../../services/posters/category/base'
import { getCategories } from '../../../services/api/content/category'
import { convertImageUrl } from '../../../utils/utils'
import { STORAGE_KEY } from '../../../services/const-data/const-data'

const app = getApp()

Page({
  data: {
    randomGraphs: [],
    logo: '',
    pageNo: 0,
    selected: 0, // 当前选中
    categories: [],
    loading: false,
    currentOpenId: 0,
    scene: ''
  },

  async onLoad() {
    // 加载
    const that = this
    if (!app.globalData.hasInit) {
      await app.init()
    }
    that.setData({
      logo: app.globalData.logo,
      randomGraphs: app.globalData.randomGraphs
    })
    this.setData({
      logo: app.globalData.logo
    })
    const categories = await this.getCategories()
    that.setData({
      categories: categories
    })
  },
  async onShow() {
    const that = this
    if (typeof that.getTabBar === 'function' && that.getTabBar()) {
      that.getTabBar().setData({
        selected: 1
      })
    }
    const pages = getCurrentPages()
    const currentPage = pages[pages.length - 1]
    that.setData({
      currentPage: currentPage
    })
  },
  onShareAppMessage: function (res) {
    const that = this
    if (res.from === 'button') {
      const category = this.data.categories[res.target.dataset.index]
      return {
        title: app.globalData.blogTitle + '的' + category.name + '专题',
        imageUrl: convertImageUrl(category.thumbnail, that.data.randomGraphs),
        path: '/pages/type/details/index?slug=' + category.slug + '&name=' + category.name
      }
    }
    return {
      title: app.globalData.blogTitle + '专题栏',
      path: '/pages/type/home/index'
    }
  },
  onShareTimeline: function (res) {
    return {
      title: app.globalData.blogTitle + '专题栏',
      imageUrl: app.globalData.logo
    }
  },
  /**
   * 获取分类
   */
  async getCategories() {
    try {
      const param = {
        more: true
      }
      const result = await getCategories(param)
      return result
    } catch (error) {
      return await Promise.reject(error)
    }
  },
  handleMore(event) {
    const that = this
    const id = event.currentTarget.dataset.id
    if (that.data.currentOpenId === id) {
      that.setData({
        currentOpenId: 0
      })
    } else {
      that.setData({
        currentOpenId: id
      })
    }
  },
  toDetailPage(event) {
    const slug = event.currentTarget.dataset.slug
    const name = event.currentTarget.dataset.name
    // 详情页跳转
    wx.navigateTo({
      url: '/pages/type/details/index?slug=' + slug + '&name=' + name
    })
  },

  toSharePage(event) {
    wx.hideLoading()
    wx.navigateTo({
      url: '/pages/share/index',
      success: res => {
        res.eventChannel.emit('shareImage', {
          shareImage: event.detail.path,
          id: this.data.id
        })
      }
    })
  },
  /**
   * 跳转海报页
   */
  shareFriends(event) {
    const that = this
    const categoryIndex = event.currentTarget.dataset.index
    const category = that.data.categories[categoryIndex]
    that.setData({
      modalShare: false
    })
    // 需要用户登陆
    const userInfo = wx.getStorageSync(STORAGE_KEY.user)
    if (!userInfo.nickName) {
      that.setData({
        modalName: 'loginModal'
      })
      return false
    }
    wx.showLoading({
      title: '生成中'
    })
    const scene = 'slug=' + category.slug
    wx.cloud.callFunction({
      name: 'get_qrcode',
      data: {
        scene: scene,
        path: that.data.currentPage.route
      },
      success(res) {
        const filePath = wx.env.USER_DATA_PATH + '/' + Date.parse(new Date()) + '_buffer2file.jpg'
        const fileManager = wx.getFileSystemManager()
        fileManager.writeFile({
          filePath: filePath,
          encoding: 'binary',
          data: res.result.buffer,
          success(res) {
            const palette = new LastMayday().palette(
              app.globalData.blogTitle,
              userInfo.nickName,
              userInfo.avatarUrl,
              '/images/bg/background-share.png',
              category.name,
              category.description,
              filePath
            )
            that.setData({
              palette: palette
            })
          },
          fail(err) {
            console.log(err)
          }
        })
      },
      fail(err) {
        console.log(err)
      }
    })
  }
})
