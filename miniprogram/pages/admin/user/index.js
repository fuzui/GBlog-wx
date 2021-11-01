import apiResult from '../../../utils/api-result'
import { adminEditUser, adminEditPassword } from '../../../services/api/admin/user'
import { adminGetStatistics } from '../../../services/api/admin/statistic'
import { adminAddAttachment } from '../../../services/api/admin/attachment'
import { ApiBaseUrl } from '../../../config/api.js'

const app = getApp()

Page({
  data: {
    url: ApiBaseUrl,
    logo: '',
    CustomBar: app.globalData.CustomBar,
    statistics: {},
    username: '',
    nickname: '',
    email: '',
    description: '',
    oldPassword: '',
    newPassword: '',
    confirmPassword: '',
    isOldPassword: true,
    isNewPassword: true,
    isConfirmPassword: true,
    selectAttachment: null,
    uploadModal: false
  },
  onLoad: function () {
    const that = this
    that.setData({
      logo: app.globalData.logo
    })
  },
  async onShow() {
    const that = this
    const selectAttachment = that.data.selectAttachment
    if (selectAttachment) {
      that.setData({
        uploadModal: true
      })
      await that.editAvatar(selectAttachment.path)
      that.setData({
        selectAttachment: null,
        uploadModal: false
      })
    }
    that.setData({
      loadModal: true
    })
    const statistics = await this.adminGetStatistics()
    that.setData({
      statistics: statistics,
      loadModal: false
    })
  },

  /**
   * 复制
   * @param {*} e
   */
  CopyLink(e) {
    wx.setClipboardData({
      data: e.currentTarget.dataset.link,
      success: res => {
        wx.showToast({
          title: '已复制',
          duration: 1000
        })
      }
    })
  },
  /**
   * 获取站点及博主信息
   */
  async adminGetStatistics() {
    try {
      const result = await adminGetStatistics()
      return result
    } catch (error) {
      return error.message
    }
  },
  showModal(e) {
    const that = this
    const type = e.currentTarget.dataset.type
    const user = that.data.statistics.user

    if (type === 'editUser') {
      that.setData({
        username: user.username,
        nickname: user.nickname,
        email: user.email,
        description: user.description
      })
    }
    this.setData({
      modalName: e.currentTarget.dataset.target
    })
  },
  hideModal(e) {
    this.setData({
      modalName: null,
      username: '',
      nickname: '',
      email: '',
      description: '',
      oldPassword: '',
      newPassword: '',
      confirmPassword: ''
    })
  },
  usernameInput(e) {
    this.setData({
      username: e.detail.value
    })
  },
  nicknameInput(e) {
    this.setData({
      nickname: e.detail.value
    })
  },
  emailInput(e) {
    this.setData({
      email: e.detail.value
    })
  },
  descriptionInput(e) {
    this.setData({
      description: e.detail.value
    })
  },
  oldPasswordInput(e) {
    this.setData({
      oldPassword: e.detail.value
    })
  },
  newPasswordInput(e) {
    this.setData({
      newPassword: e.detail.value
    })
  },
  confirmPasswordInput(e) {
    this.setData({
      confirmPassword: e.detail.value
    })
  },
  /**
   * 修改信息
   */
  async editUser() {
    const that = this
    if (!that.data.username) {
      apiResult.warn('用户名为空')
      return
    }
    if (!that.data.nickname) {
      apiResult.warn('昵称为空')
      return
    }
    if (!that.data.email) {
      apiResult.warn('邮箱为空')
      return
    }
    const param = {
      username: that.data.username,
      nickname: that.data.nickname,
      email: that.data.email,
      description: that.data.description
    }
    try {
      const result = await adminEditUser(param)
      // //视图修改，而非重新调用接口刷新
      that.data.statistics.user = result
      that.setData({
        statistics: that.data.statistics
      })
      apiResult.success('修改成功')
      that.hideModal()
    } catch (error) {
      return error.message
    }
  },
  /**
   * 修改密码
   */
  async editPassword() {
    const that = this
    if (!that.data.oldPassword) {
      apiResult.warn('旧密码为空')
      return
    }
    if (!that.data.newPassword) {
      apiResult.warn('新密码为空')
      return
    }
    if (!that.data.confirmPassword) {
      apiResult.warn('请确认密码')
      return
    }
    if (that.data.confirmPassword !== that.data.newPassword) {
      apiResult.warn('输入不一致')
      return
    }
    const param = {
      oldPassword: that.data.oldPassword,
      newPassword: that.data.newPassword
    }
    try {
      await adminEditPassword(param)
      apiResult.success('修改成功')
      that.hideModal()
    } catch (error) {
      return error.message
    }
  },
  /**
   * 密码框是否可见
   * @param {*} e
   */
  viewPassword(e) {
    const that = this
    const passwordType = e.currentTarget.dataset.type
    if (passwordType === 'isOldPassword') {
      let flag = true
      if (that.data.isOldPassword) {
        flag = false
      }
      this.setData({
        isOldPassword: flag
      })
    }
    if (passwordType === 'isNewPassword') {
      let flag = true
      if (that.data.isNewPassword) {
        flag = false
      }
      this.setData({
        isNewPassword: flag
      })
    }
    if (passwordType === 'isConfirmPassword') {
      let flag = true
      if (that.data.isConfirmPassword) {
        flag = false
      }
      this.setData({
        isConfirmPassword: flag
      })
    }
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
        const imgInfo = await that.adminAddAttachment(res.tempFilePaths[0])
        await that.editAvatar(imgInfo.path)
        that.setData({
          uploadModal: false
        })
      },
      fail: () => {
        that.setData({
          uploadModal: false
        })
        apiResult.warn('取消上传')
      }
    })
  },
  async adminAddAttachment(imgPath) {
    try {
      const param = {
        path: imgPath
      }
      const result = await adminAddAttachment(param)
      return result
    } catch (error) {
      this.setData({
        modalName: null
      })
      return await Promise.reject(error)
    }
  },
  /**
   * 修改头像
   */
  async editAvatar(url) {
    const that = this
    const user = that.data.statistics.user
    const param = {
      avatar: url,
      username: user.username,
      nickname: user.nickname,
      email: user.email,
      description: user.description
    }
    try {
      const result = await adminEditUser(param)
      // 视图修改，而非重新调用接口刷新
      that.data.statistics.user = result
      that.setData({
        statistics: that.data.statistics
      })
      apiResult.success('修改成功')
      that.hideModal()
    } catch (error) {
      return error.message
    }
  },
  toChooseAttachment: function () {
    wx.navigateTo({
      url: '/pages/admin/attachment/select/index?type=2'
    })
  }
})
