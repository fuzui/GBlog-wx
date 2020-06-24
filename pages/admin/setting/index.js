const app = getApp();
import apiResult from '../../../utils/api-result';
import apiService from '../../../utils/api-service'; 
import {ApiBaseUrl,CustomStyle} from '../../../config/api.js';
Page({
  data: {
    url: ApiBaseUrl,
    CustomBar: app.globalData.CustomBar,
    topImage: CustomStyle.topImage,
    options: {},
    settingType: 0,
    TabCur: 0,
    HighTabCur: 0,
    SmtpTabCur: 0,
    scrollLeft:0,
    isEmailPassword: true,
    isAccessKeyPassword: true,
  },
  onLoad: function () { 
    
  },
  async onShow() {
    var that = this;
    that.setData({
      loadModal:true
    })
    const options = await this.adminGetOption();
    that.setData({
      options: options,
      loadModal:false
    });
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
  /**
   * 获取设置信息
   */
  async adminGetOption(){
    try {
      const result = await apiService.adminGetOption();
      return result;
    } catch (error) {
      return error.message;
    }
  },
  tabSelect(e) {
    this.setData({
      TabCur: e.currentTarget.dataset.id,
    })
  },
  highTabSelect(e) {
    this.setData({
      HighTabCur: e.currentTarget.dataset.id,
    })
  },
  SmtpTabSelect(e) {
    this.setData({
      SmtpTabCur: e.currentTarget.dataset.id,
    })
  },
  /**
   * 密码框是否可见
   * @param {*} e 
   */
  viewPassword(e){
    var that = this;
    const passwordType = e.currentTarget.dataset.type;
    if(passwordType == 'isEmailPassword'){
      let falg = true;
      if(that.data.isEmailPassword){
        falg = false;
      }
      this.setData({
        isEmailPassword: falg,
      })
    }
    if(passwordType == 'isAccessKeyPassword'){
      let falg = true;
      if(that.data.isAccessKeyPassword){
        falg = false;
      }
      this.setData({
        isAccessKeyPassword: falg,
      })
    }
  },
  selectSettingType(){
    var that = this;
    let falg = 0;
    if(that.data.settingType == 0){
      falg = 1;
    }
    that.setData({
      TabCur: 0,
      HighTabCur: 0,
      settingType: falg
    })
  },
  saveSettings(){
    apiResult.warn("功能开发中");
  }
})