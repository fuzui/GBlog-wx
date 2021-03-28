const app = getApp();
import apiResult from '../../../utils/api-result';
import { adminGetOption } from '../../../services/api/admin/option';
import { ApiBaseUrl, CustomStyle } from '../../../config/api.js';
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
      const result = await adminGetOption();
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
      let flag = true;
      if(that.data.isEmailPassword){
        flag = false;
      }
      this.setData({
        isEmailPassword: flag,
      })
    }
    if(passwordType == 'isAccessKeyPassword'){
      let flag = true;
      if(that.data.isAccessKeyPassword){
        flag = false;
      }
      this.setData({
        isAccessKeyPassword: flag,
      })
    }
  },
  selectSettingType(){
    var that = this;
    let flag = 0;
    if(that.data.settingType == 0){
      flag = 1;
    }
    that.setData({
      TabCur: 0,
      HighTabCur: 0,
      settingType: flag
    })
  },
  saveSettings(){
    apiResult.warn("功能开发中");
  }
})