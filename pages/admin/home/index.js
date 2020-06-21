const app = getApp();
import apiResult from '../../../utils/api-result';
import apiService from '../../../utils/api-service'; 
import {Config} from '../../../config/api.js';
Page({
  data: {
    logo: "",
    statistics: {},
    isLogin: false,
    username: "",
    password: ""
  },
  onLoad: function () { 
    var that = this;
    that.setData({
      logo: app.globalData.logo
    })
  },
  async onShow() {
    var that = this;
    that.setData({
      loadModal:true
    })
    var token = wx.getStorageSync(Config.Token)
    console.log(token)
    if(token){
      const statistics = await this.adminGetStatistics();
      that.setData({
        user: statistics.user,
        statistics: statistics,
        isLogin: true
      });
    }
    that.setData({
      loadModal:false
    })
  },
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
   * 登录
   */
  async login(){
    var that = this;
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
    try {
      const result = await apiService.adminLogin(param);
      wx.setStorageSync(Config.Token, result.access_token)
      const statistics = await this.adminGetStatistics();
      apiResult.success("登录成功");
      that.setData({
        user: statistics.user,
        statistics: statistics
      });
      that.setData({
        isLogin: true
      })
    } catch (error) {
      wx.setStorageSync(Config.Token, "")
      apiResult.error("密码错误");
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
          duration: 1000,
        })
      }
    })
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
   * 跳转到日记页面
   */
  toJournalPage() {
    this.setData({
      modalName: null
    })
    wx.navigateTo({
      url:"/pages/admin/journal/home/index"
    })
  },
  /**
   * 跳转到捕捉页面(光影)
   */
  toPhotosPage() {
    this.setData({
      modalName: null
    })
    wx.navigateTo({
      url:"/pages/admin/photos/home/index"
    })
  },
  /**
   * 跳转到友链管理页面
   */
  toLinksPage() {
    this.setData({
      modalName: null
    })
    wx.navigateTo({
      url:"/pages/admin/links/home/index"
    })
  },
  /**
   * 跳转到服务器信息页面
   */
  toEnvironmentPage() {
    this.setData({
      modalName: null
    })
    wx.navigateTo({
      url:"/pages/admin/environments/index"
    })
  },
  /**
   * 跳转到个人信息
   */
  toUserPage() {
    this.setData({
      modalName: null
    })
    wx.navigateTo({
      url:"/pages/admin/user/index"
    })
  },

  /**
   * 跳转到评论页
   */
  toCommentPage() {
    this.setData({
      modalName: null
    })
    apiResult.warn("功能开发中");
    // wx.navigateTo({
    //   url:"/pages/admin/comment/index"
    // })
  },
  toCategoryPage() {
    this.setData({
      modalName: null
    })
    apiResult.warn("功能开发中");
    // wx.navigateTo({
    //   url:"/pages/admin/category/index"
    // })
  },
  toTagPage() {
    this.setData({
      modalName: null
    })
    apiResult.warn("功能开发中");
    // wx.navigateTo({
    //   url:"/pages/admin/tag/index"
    // })
  },
  toArticlePage() {
    this.setData({
      modalName: null
    })
    apiResult.warn("功能开发中");
    // wx.navigateTo({
    //   url:"/pages/admin/article/index"
    // })
  },
  toAddArticlePage() {
    this.setData({
      modalName: null
    })
    apiResult.warn("功能开发中");
    // wx.navigateTo({
    //   url:"/pages/admin/article/add/index"
    // })
  },
  toMenuPage() {
    this.setData({
      modalName: null
    })
    apiResult.warn("功能开发中");
    // wx.navigateTo({
    //   url:"/pages/admin/menu/index"
    // })
  },
  toThemePage() {
    this.setData({
      modalName: null
    })
    apiResult.warn("功能开发中");
    // wx.navigateTo({
    //   url:"/pages/admin/theme/index"
    // })
  },
  toAttachmentPage() {
    this.setData({
      modalName: null
    })
    apiResult.warn("功能开发中");
    // wx.navigateTo({
    //   url:"/pages/admin/attachment/index"
    // })
  },
  toSettingPage() {
    this.setData({
      modalName: null
    })
    wx.navigateTo({
      url:"/pages/admin/setting/index"
    })
  },
  
  /**
   * 获取站点及博主信息
   */
  async adminGetStatistics(){
    try {
      const result = await apiService.adminGetStatistics();
      return result;
    } catch (error) {
      return error.message;
    }
  },
})