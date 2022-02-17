import apiResult from '../../../../utils/api-result'
import { ApiBaseUrl } from '../../../../config/api'
import {
  adminGetAttachmentDetails,
  adminEditAttachmentDetails,
  adminDeleteAttachment
} from '../../../../services/api/admin/attachment'

const app = getApp()

Page({
  data: {
    ApiBaseUrl,
    CustomBar: app.globalData.CustomBar,
    logo: '',
    imgPath: '',
    attachment: {},
    name: ''
  },
  async onLoad(options) {
    const that = this
    const id = options.id
    that.setData({
      logo: app.globalData.logo
    })
    that.setData({
      loadModal: true
    })
    const attachment = await this.adminGetAttachmentDetails(id)
    that.setData({
      attachment: attachment,
      name: attachment.name,
      loadModal: false
    })
  },
  async onShow() {},

  /**
   * 获取附件详情
   */
  async adminGetAttachmentDetails(id) {
    try {
      const result = await adminGetAttachmentDetails(id)
      return result
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
  nameInput(e) {
    this.setData({
      name: e.detail.value
    })
  },

  /**
   * 编辑附件名
   */
  async editAttachment() {
    const that = this
    const id = that.data.attachment.id
    const name = that.data.name
    if (!name) {
      apiResult.warn('不能为空')
      return
    }
    const param = {
      name: name
    }
    try {
      const result = await adminEditAttachmentDetails(id, param)
      that.setData({
        attachment: result,
        modalName: null
      })
    } catch (error) {
      return await Promise.reject(error)
    }
  },

  /**
   * 删除单一附件
   */
  async deleteAttachment() {
    const that = this
    const id = that.data.attachment.id
    wx.showModal({
      title: 'Creator',
      content: '确定要删除这张附件吗？',
      cancelText: '再看看',
      confirmText: '再见',
      success: async res => {
        if (res.confirm) {
          try {
            await adminDeleteAttachment(id)
            apiResult.success('已删除')
            // 无需刷新，直接返回附件列表
            const pages = getCurrentPages()
            const beforePage = pages[pages.length - 2]
            beforePage.onLoad()
            wx.navigateBack({
              delta: 1
            })
          } catch (error) {
            apiResult.error('网络异常')
            return error.message
          }
        }
      }
    })
  },

  /**
   * 复制
   * @param {*} e
   */
  copyLink(e) {
    wx.setClipboardData({
      data: e.currentTarget.dataset.link,
      success: res => {
        wx.showToast({
          title: '已复制',
          duration: 1000
        })
      }
    })
  }
})
