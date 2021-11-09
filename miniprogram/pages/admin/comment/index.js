import {
  adminAddPostComment,
  adminGetPostComment,
  adminDeletePostComment,
  adminEditPostCommentStatus
} from '../../../services/api/admin/post'
import {
  adminAddSheetComment,
  adminGetSheetComment,
  adminDeleteSheetComment,
  adminEditSheetCommentStatus
} from '../../../services/api/admin/sheet'
import { adminGetUserProfile } from '../../../services/api/admin/user'
import apiResult from '../../../utils/api-result'
import { ApiBaseUrl, PageSize, MpHtmlStyle } from './../../../config/api'

const app = getApp()

Page({
  data: {
    mpHtmlStyle: MpHtmlStyle,
    logo: '',
    commentContent: '',
    modalName: null,
    currentId: null,
    currentPostId: null,
    currentName: '',
    currentIndex: null,
    commentList: [],
    pageNo: 0,
    bottomFlag: false,
    type: 1
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
      loadModal: true
    })
    const commentList = await this.getComment()
    that.setData({
      commentList: commentList,
      loadModal: false
    })
  },

  /**
   * 输入评论
   */
  commentInput(e) {
    this.setData({
      commentContent: e.detail.value
    })
  },

  /**
   * 回复评论
   */
  async replyComment() {
    const that = this
    if (!that.data.commentContent) {
      apiResult.warn('不能为空')
      return
    }
    that.setData({
      loadModal: true
    })
    const type = that.data.type
    try {
      const user = await adminGetUserProfile()
      const param = {
        allowNotification: true,
        author: user.nickname,
        authorUrl: ApiBaseUrl,
        content: that.data.commentContent,
        email: user.email,
        parentId: that.data.currentId,
        postId: that.data.currentPostId
      }
      let result = {}
      if (type === 1) {
        result = await adminAddPostComment(param)
      } else {
        result = await adminAddSheetComment(param)
      }
      that.data.commentList.unshift(result)
      that.setData({
        commentList: that.data.commentList
      })
      that.hideModal()
      apiResult.success('回复成功')
    } catch (error) {
      that.hideModal()
      apiResult.error(error)
    }
  },

  /**
   * 获取评论列表
   */
  async getComment() {
    const that = this
    try {
      const type = that.data.type
      const param = {
        page: that.data.pageNo,
        size: PageSize.journalSize,
        sort: 'createTime,desc'
      }
      let result = []
      if (type === 1) {
        result = await adminGetPostComment(param)
      } else {
        result = await adminGetSheetComment(param)
      }
      if (result.page < result.pages) {
        return that.data.commentList.concat(result.content)
      } else {
        that.setData({
          bottomFlag: true
        })
      }
    } catch (error) {
      return await Promise.reject(error)
    }
  },
  /**
   * 加入评论到回收站
   * @param {*} e
   */
  async recyclingComment(e) {
    const that = this
    const index = e.currentTarget.dataset.index
    const id = e.currentTarget.dataset.id
    wx.showModal({
      title: 'Creator',
      content: '确定要将此评论加入回收站？',
      cancelText: '再看看',
      confirmText: '回收',
      success: async res => {
        if (res.confirm) {
          await that.editComment(id, 'RECYCLE', index)
        }
      }
    })
  },
  /**
   * 通过审核
   * @param {*} e
   */
  async auditComment(e) {
    const that = this
    const index = e.currentTarget.dataset.index
    const id = e.currentTarget.dataset.id
    await that.editComment(id, 'PUBLISHED', index)
  },

  /**
   * 删除评论
   * @param {*} e
   */
  async deleteComment(e) {
    const that = this
    const type = that.data.type
    const index = e.currentTarget.dataset.index
    const id = e.currentTarget.dataset.id
    wx.showModal({
      title: 'Creator',
      content: '确定要删除这个评论吗？',
      cancelText: '再看看',
      confirmText: '再见',
      success: async res => {
        if (res.confirm) {
          try {
            if (type === 1) {
              await adminDeletePostComment(id)
            } else {
              await adminDeleteSheetComment(id)
            }
            // 视图删除，不刷新调用接口
            that.data.commentList.splice(index, 1)
            that.setData({
              commentList: that.data.commentList
            })
            apiResult.success('已删除')
          } catch (error) {
            apiResult.error('网络异常')
            return error.message
          }
        }
      }
    })
  },
  /**
   * 修改评论状态
   */
  async editComment(id, status, index) {
    const that = this
    const type = that.data.type
    let result = {}
    try {
      if (type === 1) {
        result = await adminEditPostCommentStatus(id, status)
      } else {
        result = await adminEditSheetCommentStatus(id, status)
      }
      // //视图修改，而非重新调用接口刷新
      that.data.commentList.splice(index, 1, result)
      that.setData({
        commentList: that.data.commentList
      })
      apiResult.success('操作成功')
    } catch (error) {
      apiResult.error(error.message)
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
    const content = await this.getComment()
    if (content) {
      that.setData({
        commentList: content
      })
    }
  },

  showModal(e) {
    const that = this
    const index = e.currentTarget.dataset.index
    const currentComment = that.data.commentList[index]
    let currentPostId = 0
    if (that.data.type === 1) {
      currentPostId = currentComment.post.id
    } else {
      currentPostId = currentComment.sheet.id
    }
    that.setData({
      modalName: e.currentTarget.dataset.target,
      currentId: currentComment.id,
      currentName: currentComment.author,
      currentIndex: index,
      currentPostId: currentPostId
    })
  },
  hideModal(e) {
    this.setData({
      loadModal: false,
      modalName: null,
      currentId: null,
      currentName: '',
      currentIndex: null
    })
  },

  async tabSelect(e) {
    const that = this
    const type = e.currentTarget.dataset.type
    that.setData({
      type: type,
      commentList: [],
      pageNo: 0,
      bottomFlag: false
    })
    await that.onShow()
  }
})
