//获取应用实例
const app = getApp();
import apiResult from '../../utils/api-result';
import { adminLogin, adminLoginPreCheck } from '../../services/api/admin/login';
import { STORAGE_KEY } from '../../services/const-data/const-data';
Component({
  data: {
    username: "",
    password: "",
    authcode: "000000",
    loginMessage: false,
    hasAuthcode: false,
    logining: false
  },
  properties: {
    logo: {
      type: String,
      value: ''
    },
  },
  options: {
    addGlobalClass: true,
  },
  lifetimes: {
    async attached() {
    }
  },
  methods: {
    /**
     * 输入账号
     */
    usernameInput(e){
      this.setData({
        username: e.detail.value
      });
    },
    /**
     * 输入密码
     * @param {*} e 
     */
    passwordInput(e){
      this.setData({
        password: e.detail.value
      });
    },
    /**
     * 输入二步验证码
     * @param {*} e 
     */
    authcodeInput(e){
      this.setData({
        authcode: e.detail.value
      });
    },

    async loginPreCheck() {
      if(!this.data.username){
        apiResult.warn("账号不能为空");
        return ;
      }
      if(!this.data.password){
        apiResult.warn("密码不能为空");
        return ;
      }
      const param = {
        username: this.data.username,
        password: this.data.password
      }
      const result = await adminLoginPreCheck(param);
      if (result.needMFACode) {
        this.setData({
          hasAuthcode: true,
          authcode: ""
        })
        return ;
      }
      await this.login();
    },
    async checkAuthcode() {
      if(!this.data.authcode) {
        apiResult.warn("请输入两步验证码");
        return ;
      }
      await this.login();
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
      const result = await adminLogin(param);
      wx.setStorageSync(STORAGE_KEY.adminToken, result.access_token)
      this.setData({
        logining: false
      })
      apiResult.success("登录成功");
      this.triggerEvent('loginSuf')
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
            duration: 1000,
          })
        }
      })
    },
    getMessage() {
      var that = this;
      const loginMessage = that.data.loginMessage;
      if(loginMessage){
        that.setData({
          loginMessage: false
        })
      }else{
        that.setData({
          loginMessage: true
        })
      }
    },
    addComment(e) {
      const detail = {
        modalName: e.currentTarget.dataset.target,
        commmentPid: e.currentTarget.dataset.pid,
        commmentPname: e.currentTarget.dataset.pname
      }
      this.triggerEvent('addComment', detail)
    },
    binderrorimg:function(e){  
      var errorImgIndex= e.target.dataset.errorimg;
      var errorChildrenImgIndex = e.target.dataset.errorchildrenimg;
      var comments=this.data.comments;
      var gravatarMd5 = e.target.dataset.gravatarmd5;
      var comment = comments[errorImgIndex];
      if(errorChildrenImgIndex || errorChildrenImgIndex == 0) {
        var childrenComment = comment.children[errorChildrenImgIndex];
        childrenComment.authorUrl = this.data.gravatarSource+gravatarMd5 + "?s=32&d=" + this.data.gravatarDefault;
        comment.children[errorChildrenImgIndex] = childrenComment;
      }else {
        comment.authorUrl = this.data.gravatarSource+gravatarMd5 + "?s=64&d=" + this.data.gravatarDefault;
      }
      comments[errorImgIndex] = comment;
      this.setData({
        comments:comments
      });
    }
  }
})
