import { adminGetAttachment } from '../../../../services/api/admin/attachment'
import config from '../../../../config/api'

const app = getApp()

Page({
  data: {
    CustomBar: app.globalData.CustomBar,
    logo: '',
    selectAttachment: null,
    pageNo: 0,
    bottomFlag: false,
    content: [],
    selectId: null
  },
  async onLoad(options) {
    const that = this
    if (options.type === '3') {
      that.setData({
        tagCur: options.tagCur
      })
    }
    that.setData({
      logo: app.globalData.logo
    })
  },
  async onShow() {
    const that = this
    that.setData({
      loadModal: true,
      content: [],
      pageNo: 0
    })
    const content = await this.getAttachments()
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
    const content = await this.getAttachments()
    if (content) {
      that.setData({
        content: content
      })
    }
  },
  /**
   * 获取附件列表
   */
  async getAttachments() {
    const that = this
    try {
      const param = {
        page: that.data.pageNo,
        size: config.PageSize.attachmentSize,
        sort: 'createTime,desc'
      }
      const result = await adminGetAttachment(param)
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

  showModal(e) {
    this.setData({
      modalName: e.currentTarget.dataset.target
    })
  },
  hideModal(e) {
    this.setData({
      modalName: null
    })
  },

  returnTop() {
    if (wx.pageScrollTo) {
      wx.pageScrollTo({
        scrollTop: 0
      })
    } else {
      wx.showModal({
        title: '提示',
        content: '当前微信版本过低，无法使用该功能，请升级到最新微信版本后重试。'
      })
    }
  },

  submitSelect() {
    const that = this
    const selectAttachment = that.data.selectAttachment
    const pages = getCurrentPages()
    let prevPage = null
    if (pages.length >= 2) {
      prevPage = pages[pages.length - 2]
      if (prevPage) {
        if (that.data.tagCur) {
          prevPage.setData({
            tagCur: that.data.tagCur
          })
        }
        prevPage.setData({
          selectAttachment: selectAttachment
        })
      }
    }
    wx.navigateBack({
      delta: 1
    })
  },
  returnPage() {
    const that = this
    if (that.data.tagCur) {
      const pages = getCurrentPages()
      let prevPage = null
      if (pages.length >= 2) {
        prevPage = pages[pages.length - 2]
        if (prevPage) {
          prevPage.setData({
            tagCur: that.data.tagCur
          })
        }
      }
    }
    wx.navigateBack({
      delta: 1
    })
  },
  selectAttachment(event) {
    const that = this
    const index = event.currentTarget.dataset.index
    const selectAttachment = that.data.content[index]
    that.setData({
      selectId: selectAttachment.id,
      selectAttachment: selectAttachment
    })
  }
})
