//获取应用实例
const app = getApp();
import apiService from '../../../utils/api-service'; 
import apiResult from '../../../utils/api-result';
import { Config,ParserStyle,CustomStyle } from './../../../config/api';
Page({
  data: {
    parserStyle:ParserStyle,
    topImage: CustomStyle.topImage,
    logo: "",
    username: "",
    password: "",
    loginMessage: false
  },
  async onLoad() { 
    var that = this;
    that.setData({
      logo: app.globalData.logo,
    })
  },
  async onShow() {
    var that = this;
    that.setData({
      loginMessage: false
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
      apiResult.success("登录成功");
      wx.switchTab({
        url:'/pages/admin/home/index'  
      });  
    } catch (error) {
      return error.message;
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
  }
  
})