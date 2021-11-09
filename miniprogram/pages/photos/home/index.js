import { getPhotos } from '../../../services/api/content/photo'
import { PageSize } from '../../../config/api'

const app = getApp()

Page({
  jsData: {
    columnsHeight: [0, 0],
    isLoading: false
  },
  data: {
    StatusBar: app.globalData.StatusBar,
    CustomBar: app.globalData.CustomBar,
    logo: '',
    pageNo: 0,
    keyword: null,
    team: null,
    content: [],
    currentPhoto: {},
    ColorList: app.globalData.ColorList,
    columns: [[], []],
    tempContent: [],
    spacing: 20,
    sortProperty: 'takeTime',
    sortPropertyValue: '拍摄时间',
    teamValue: '全部分组',
    sortPicker: [
      {
        key: 'takeTime',
        value: '拍摄时间'
      },
      {
        key: 'location',
        value: '地点'
      },
      {
        key: 'name',
        value: '名称'
      }
    ],
    teamPicker: [
      {
        key: null,
        value: '全部'
      }
    ]
  },

  async onLoad() {
    const that = this
    that.setData({
      logo: app.globalData.logo
    })
    that.setData({
      loadModal: true
    })
    const content = await this.getPhotos()
    that.setData({
      content: content,
      loadModal: false
    })
  },
  async onShow() {
    if (typeof this.getTabBar === 'function' && this.getTabBar()) {
      this.getTabBar().setData({
        selected: 2
      })
    }
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
    const content = await this.getPhotos()
    if (content) {
      that.setData({
        content: content
      })
    }
  },
  async onSearch(e) {
    const that = this
    const keyword = e.detail.value
    if (keyword !== that.data.keyword) {
      that.setData({
        keyword: keyword
      })
      this.init()
      await this.getPhotos()
    }
  },
  /**
   * 排序条件
   * @param {*} e
   */
  async sortPickerChange(e) {
    const that = this
    const sortProperty = that.data.sortPicker[e.detail.value].key
    if (that.data.sortProperty !== sortProperty) {
      const sortPropertyValue = that.data.sortPicker[e.detail.value].value
      that.setData({
        sortProperty: sortProperty,
        sortPropertyValue: sortPropertyValue
      })
      that.init()
      await that.getPhotos()
    }
  },
  /**
   * 分组条件选择
   * @param {*} e
   */
  async teamPickerChange(e) {
    const that = this
    const team = that.data.teamPicker[e.detail.value].key
    if (that.data.team !== team) {
      const teamValue = that.data.teamPicker[e.detail.value].value
      that.setData({
        team: team,
        teamValue: teamValue
      })
      that.init()
      await that.getPhotos()
    }
  },
  init() {
    const that = this
    that.setData({
      content: [],
      columns: [[], []],
      tempContent: [],
      pageNo: 0
    })
    that.jsData.columnsHeight = [0, 0]
    that.jsData.isLoading = false
  },
  /**
   * 获取光影相册
   */
  async getPhotos() {
    const that = this
    try {
      const param = {
        keyword: that.data.keyword,
        team: that.data.team,
        page: that.data.pageNo,
        size: PageSize.photoSize,
        sort: that.data.sortProperty + ',desc'
      }
      const result = await getPhotos(param)
      if (result.page < result.pages) {
        if (!that.jsData.isLoading) {
          wx.showLoading()
          that.jsData.isLoading = true
          that.setData({
            tempContent: result.content
          })
        }
        return that.data.content.concat(result.content)
      }
    } catch (error) {
      return await Promise.reject(error)
    }
  },

  /**
   * 跳到详情页
   * @param {*} event
   */
  toDetail: function (event) {
    const that = this
    that.setData({
      modalName: 'detail',
      currentPhoto: event.currentTarget.dataset.photo
    })
  },
  /**
   * 预览
   * @param {*} e
   */
  preview(event) {
    const url = event.currentTarget.dataset.url
    wx.previewImage({
      urls: [url]
    })
  },
  /**
   * 隐藏模态框
   */
  hideModal() {
    this.setData({
      modalName: null
    })
  },
  /**
   * 分享
   * @param {*} res
   */
  onShareAppMessage: function (res) {
    return {
      title: app.globalData.blogTitle + '光影',
      path: '/pages/photos/home/index'
    }
  },
  onShareTimeline: function (res) {
    return {
      title: app.globalData.blogTitle + '光影'
    }
  },
  // 获取图片尺寸数据
  loadPic: function (e) {
    const that = this
    const data = that.data
    const tempContent = data.tempContent
    const index = e.currentTarget.dataset.index
    if (tempContent[index]) {
      // 以750为宽度算出相对应的高度
      tempContent[index].height = (e.detail.height * 750) / e.detail.width
      tempContent[index].isLoad = true
    }
    that.setData(
      {
        tempContent: tempContent
      },
      function () {
        that.finLoadPic()
      }
    )
  },
  // 图片加载错误处理
  loadPicError: function (e) {
    const that = this
    const data = that.data
    const tempContent = data.tempContent
    const index = e.currentTarget.dataset.index
    if (tempContent[index]) {
      // 图片加载错误时高度固定750，展示为正方形
      tempContent[index].height = 750
      tempContent[index].isLoad = true
    }
    that.setData(
      {
        tempContent: tempContent
      },
      function () {
        that.finLoadPic()
      }
    )
  },
  // 判断图片是否加载完成
  finLoadPic: function () {
    const that = this
    const data = that.data
    const tempContent = data.tempContent
    const length = tempContent.length
    let fin = true
    for (let i = 0; i < length; i++) {
      if (!tempContent[i].isLoad) {
        fin = false
        break
      }
    }
    if (fin) {
      wx.hideLoading()
      if (that.jsData.isLoading) {
        that.jsData.isLoading = false
        that.renderPage()
      }
    }
  },
  // 渲染到瀑布流
  renderPage: function () {
    const that = this
    const data = that.data
    const columns = data.columns
    const tempContent = data.tempContent
    const length = tempContent.length
    const columnsHeight = that.jsData.columnsHeight
    let index = 0
    for (let i = 0; i < length; i++) {
      index = columnsHeight[1] < columnsHeight[0] ? 1 : 0
      columns[index].push(tempContent[i])
      columnsHeight[index] += tempContent[i].height
      columnsHeight[index] += that.data.spacing
    }
    that.setData({
      columns: columns,
      tempContent: []
    })
    that.jsData.columnsHeight = columnsHeight
  },
  // 阻止滑动
  preventTouchMove() {}
})
