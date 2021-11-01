import { CloudConfig } from '../../config/api'
import apiResult from '../../utils/api-result'
import { adminLogin, adminLoginPreCheck } from '../../services/api/admin/login'
import { checkUser, createUser, updateUser } from '../../services/api/cloud/user'
import { STORAGE_KEY } from '../../services/const-data/const-data'
Component({
  data: {
    username: '',
    password: '',
    authcode: '000000',
    loginMessage: false,
    hasAuthcode: false,
    logining: false,
    firstBind: true
  },
  properties: {
    logo: {
      type: String,
      value: ''
    }
  },
  options: {
    addGlobalClass: true
  },
  lifetimes: {
    async attached() {
      if (CloudConfig.adminUser) {
        const user = await checkUser()
        if (!user._openid) {
          this.setData({
            firstBind: true
          })
          return
        }
        this.setData({
          username: user.username,
          password: user.password,
          adminUserId: user._id
        })
        const param = {
          username: user.username,
          password: user.password
        }
        try {
          const result = await adminLoginPreCheck(param)
          if (result.needMFACode) {
            this.setData({
              hasAuthcode: true,
              authcode: ''
            })
            return
          }
        } catch (error) {
          apiResult.warn('密码已修改')
          this.setData({
            firstBind: false
          })
          return
        }
        await this.login()
      }
    }
  },
  methods: {
    /**
     * 输入账号
     */
    usernameInput(e) {
      this.setData({
        username: e.detail.value
      })
    },
    /**
     * 输入密码
     * @param {*} e
     */
    passwordInput(e) {
      this.setData({
        password: e.detail.value
      })
    },
    /**
     * 输入二步验证码
     * @param {*} e
     */
    authcodeInput(e) {
      this.setData({
        authcode: e.detail.value
      })
    },

    async loginPreCheck() {
      if (!this.data.username) {
        apiResult.warn('账号不能为空')
        return
      }
      if (!this.data.password) {
        apiResult.warn('密码不能为空')
        return
      }
      const param = {
        username: this.data.username,
        password: this.data.password
      }
      const result = await adminLoginPreCheck(param)
      if (result.needMFACode) {
        this.setData({
          hasAuthcode: true,
          authcode: ''
        })
        await this.bindCloudUser()
        return
      }
      await this.login()
      await this.bindCloudUser()
    },
    async checkAuthcode() {
      if (!this.data.authcode) {
        apiResult.warn('请输入两步验证码')
        return
      }
      await this.login()
    },
    async bindCloudUser() {
      const param = {
        username: this.data.username,
        password: this.data.password,
        id: this.data.adminUserId
      }
      if (CloudConfig.adminUser) {
        if (this.data.firstBind) {
          await createUser(param)
        } else {
          await updateUser(param)
        }
      }
    },
    /**
     * 登录
     */
    async login() {
      this.setData({
        logining: true
      })
      const param = {
        username: this.data.username,
        password: this.data.password,
        authcode: this.data.authcode
      }
      try {
        const result = await adminLogin(param)
        wx.setStorageSync(STORAGE_KEY.adminToken, result.access_token)
        this.setData({
          logining: false
        })
        apiResult.success('登录成功')
        this.triggerEvent('loginSuf')
      } catch (error) {
        this.setData({
          logining: false
        })
      }
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
    getMessage() {
      const that = this
      const loginMessage = that.data.loginMessage
      if (loginMessage) {
        that.setData({
          loginMessage: false
        })
      } else {
        that.setData({
          loginMessage: true
        })
      }
    }
  }
})
