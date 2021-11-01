// 获取应用实例
import { CloudConfig } from '../../../config/api.js'
import { writeComment } from '../../../services/api/content/article'
import { writeSheetComment } from '../../../services/api/content/sheet'
import { checkMessage } from '../../../services/api/cloud/cloud'
import { STORAGE_KEY, HALO_OPTION_KEY, COMMENT_TYPE } from '../../../services/const-data/const-data'
import apiResult from '../../../utils/api-result'

Page({
  data: {
    title: '分类',
    logo: '',
    slug: '',
    name: '',
    commentMail: '',
    notifiStatus: false,
    pageNo: 0,
    selected: 0, // 当前选中
    content: [],
    loading: false
  },

  async onLoad(options) {
    const that = this
    const id = options.id
    const commmentPid = options.commmentPid
    const commmentPname = options.commmentPname
    const type = options.type
    let title = '评论博文'
    if (type === COMMENT_TYPE.guestbook) {
      title = '留言'
    }
    if (commmentPid !== 0) {
      title = '正在回复 ' + commmentPname
    }

    const userInfo = wx.getStorageSync(STORAGE_KEY.user)
    const commentMail = wx.getStorageSync(STORAGE_KEY.userEmail)
    const notifiStatus = wx.getStorageSync(STORAGE_KEY.notifiStatus)
    if (commentMail) {
      that.setData({
        commentMail: commentMail,
        notifiStatus: notifiStatus
      })
    }
    that.setData({
      userInfo: userInfo,
      commmentPid: commmentPid,
      title: title,
      id: id,
      commmentPname: commmentPname,
      type: type
    })
  },
  async onShow() {},
  onReady() {},
  /**
   * 评论者输入邮箱
   */
  mailInput(e) {
    this.setData({
      commentMail: e.detail.value
    })
  },
  /**
   * 评论内容输入
   * @param {*} e
   */
  commentInput(e) {
    this.setData({
      commentContent: e.detail.value
    })
  },
  /**
   * 是否回复邮箱通知
   * @param {*} e
   */
  isAllowNotification(e) {
    const that = this
    if (e.detail.value) {
      that.setData({
        notifiStatus: true
      })
    }
  },
  /**
   * 发表评论
   */
  async writeComment() {
    const that = this
    if (!this.data.commentContent) {
      apiResult.warn('内容不能为空')
      return
    }
    if (!this.data.commentMail) {
      apiResult.warn('邮箱不能为空')
      return
    }
    wx.showLoading({
      title: '发布中',
      mask: true
    })
    if (CloudConfig.isOpen && CloudConfig.checkMessage) {
      const checkResult = await checkMessage(this.data.commentContent)
      if (checkResult.code !== 200) {
        wx.hideLoading().then(() => {
          apiResult.warn(checkResult.msg)
        })
        return
      }
    }
    const param = {
      allowNotification: this.data.notifiStatus,
      author: this.data.userInfo.nickName,
      authorUrl: this.data.userInfo.avatarUrl,
      content: this.data.commentContent,
      email: this.data.commentMail,
      parentId: this.data.commmentPid,
      postId: this.data.id
    }
    if (that.data.type === COMMENT_TYPE.post) {
      await writeComment(param)
    } else {
      await writeSheetComment(param)
    }
    wx.hideLoading().then(() => {
      that.setData({
        modalName: null
      })
      let tip = '发表成功'
      const globalOptions = wx.getStorageSync(STORAGE_KEY.options)
      if (globalOptions[HALO_OPTION_KEY.blogTitle]) {
        tip = '发表成功，等待审核'
      }
      if (this.data.commentMail !== wx.getStorageSync(STORAGE_KEY.userEmail)) {
        wx.setStorageSync(STORAGE_KEY.userEmail, this.data.commentMail)
      }
      if (this.data.notifiStatus !== wx.getStorageSync(STORAGE_KEY.notifiStatus)) {
        wx.setStorageSync(STORAGE_KEY.notifiStatus, this.data.notifiStatus)
      }
      apiResult.success(tip)
      wx.navigateBack({
        delta: 1,
        success: function (e) {
          const page = getCurrentPages().pop()
          if (page === undefined || page == null) {
            return false
          }
        }
      })
    })
  }
})
