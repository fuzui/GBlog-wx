import apiResult from '../../../../utils/api-result'
import {
  adminGetAttachment,
  adminAddAttachment,
  adminBatchDeleteAttachment
} from '../../../../services/api/admin/attachment'
import config from '../../../../config/api'

const app = getApp()

Page({
  data: {
    CustomBar: app.globalData.CustomBar,
    logo: '',
    imgPath: '',
    pageNo: 0,
    bottomFlag: false,
    uploadModal: false,
    content: [],
    batchView: false,
    indexs: []
  },
  async onLoad() {
    const that = this
    that.setData({
      logo: app.globalData.logo
    })
  },
  async onShow() {
    const that = this
    that.setData({
      loadModal: true,
      content: [],
      pageNo: 0,
      indexs: []
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
  async adminAddAttachment(imgPath) {
    try {
      const param = {
        path: imgPath
      }
      const result = await adminAddAttachment(param)
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
  /**
   * 选择图片
   */
  async chooseImage(event) {
    const that = this
    const type = event.currentTarget.dataset.type
    const sourceType = [type]
    that.setData({
      uploadModal: true,
      modalName: null
    })
    wx.chooseImage({
      count: 1, // 默认9
      sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
      sourceType: sourceType, // 从相册选择
      success: async res => {
        const result = await that.adminAddAttachment(res.tempFilePaths[0])
        that.data.content.unshift(result)
        that.setData({
          content: that.data.content
        })
        that.returnTop()
        that.setData({
          uploadModal: false
        })
        apiResult.success('上传成功')
      },
      fail: () => {
        that.setData({
          uploadModal: false
        })
        apiResult.warn('取消上传')
      }
    })
  },

  /**
   * 批量删除附件
   */
  async deleteBatchAttachment() {
    const that = this
    const indexs = that.data.indexs
    if (indexs.length === 0) {
      apiResult.warn('请勾选附件')
      return
    }
    wx.showModal({
      title: 'Creator',
      content: '确定要删除这' + indexs.length + '张附件吗？',
      cancelText: '再看看',
      confirmText: '再见',
      success: async res => {
        if (res.confirm) {
          try {
            const ids = []
            const content = that.data.content
            indexs.forEach(element => {
              ids.push(content[element].id)
            })
            await adminBatchDeleteAttachment(ids)
            apiResult.success('已删除')
            // 无需刷新，视图删
            let tmp = -1
            indexs.forEach(element => {
              let k = 0
              if (element > tmp && tmp !== -1) {
                k = 1
              }
              tmp = element
              content.splice(element - k, 1)
            })
            that.setData({
              content: content,
              indexs: []
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
   * 跳到详情页
   * @param {*} event
   */
  toDetailsPage: function (event) {
    const id = event.currentTarget.dataset.id
    wx.navigateTo({
      url: '/pages/admin/attachment/details/index?id=' + id
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

  showBatchView() {
    this.setData({
      batchView: true
    })
  },
  cancelBatchView() {
    this.setData({
      batchView: false,
      indexs: []
    })
  },
  selectAttachment(event) {
    const that = this
    const id = event.currentTarget.dataset.index // 这里id存附件数组的index
    const indexs = that.data.indexs
    const index = indexs.indexOf(id)
    if (index > -1) {
      indexs.splice(index, 1)
    } else {
      indexs.push(id)
    }
    that.setData({
      indexs: indexs
    })
  }
})
