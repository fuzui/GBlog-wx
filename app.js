import {ShareConfig} from 'config/api.js'
import { compareVersion } from './utils/utils'
App({
  onLaunch: function() {
    if(ShareConfig.isOpen){
      if (!wx.cloud) {
        console.error('请使用 2.2.3 或以上的基础库以使用云能力')
      } else {
        wx.cloud.init({
          env: ShareConfig.env,
          traceUser: true,
        })
      }
    }
    this.updateManager();
  },
  globalData: {
    logo: "",
    blogTitle: "",
    userInfo: {
      nickName: "",
      avatarUrl: ""
    },
    windowHeight: 1334
  },
  // 更新小程序以及系统信息获取
  updateManager: function () {
    //获取系统信息 客户端基础库
    var that = this;
    wx.getSystemInfo({
      success: function (res) {
        // 全局设置
        that.globalData.windowHeight = res.windowHeight * (750/res.windowWidth);
        that.globalData.StatusBar = res.statusBarHeight;
        let custom = wx.getMenuButtonBoundingClientRect();
        that.globalData.Custom = custom;  
        that.globalData.CustomBar = custom.bottom + custom.top - res.statusBarHeight;
        //基础库版本比较，版本更新必须是1.9.90以上
        const v = compareVersion(res.SDKVersion, '1.9.90');
        if (v > 0) {
          const manager = wx.getUpdateManager();
          manager.onCheckForUpdate(function (res) {
            // 请求完新版本信息的回调
          });
          manager.onUpdateReady(function () {
            wx.showModal({
              title: '更新提示',
              content: '新版本已经准备好，是否重启应用？',
              success: function (res) {
                if (res.confirm) {
                  // 新的版本已经下载好，调用 applyUpdate 应用新版本并重启
                  manager.applyUpdate();
                }
              }
            })
          });
          manager.onUpdateFailed(function () {
            // 新的版本下载失败
          });
        } else {
          wx.showModal({
            title: '温馨提示',
            content: '当前微信版本过低，无法更好体验程序，请升级到最新微信版本后重试。'
          });
        }
      },
    });
  }
});
