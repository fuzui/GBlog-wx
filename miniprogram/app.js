import { CloudConfig, Config, RandomImage } from 'config/api.js'
import { compareVersion } from './utils/utils'
import { getOptions } from './services/api/content/option';
import { STORAGE_KEY, HALO_OPTION_KEY } from './services/const-data/const-data';
import { getRandomGraph } from './services/api/cloud/cloud';
App({
  async onLaunch() {
    if(CloudConfig.isOpen) {
      if (!wx.cloud) {
        console.error('请使用 2.2.3 或以上的基础库以使用云能力')
      } else {
        wx.cloud.init({
          env: CloudConfig.env,
          traceUser: true,
        })
      }
    }
    wx.showLoading({
      title: '初始化中',
      mask: true
    })
    await this.updateManager();
    await this.init();
    wx.hideLoading()
  },
  globalData: {
    logo: Config.logo,
    blogTitle: Config.blogTitle,
    windowHeight: 1334,
    unitConversionRatio: 2,
    randomGraphs: []
  },
  async init() {
    await this.loadFontFace();
    await this.getRandomGraph();
    await this.getOptions();
    this.globalData.hasInit = true
  },
  async getOptions () {
    var options = wx.getStorageSync(STORAGE_KEY.options);
    if(!options) {
      const optionOrigin =  await getOptions();
      options = {}
      optionOrigin.forEach(option => {
        options[option.key] = option.value
      });
      wx.setStorageSync(STORAGE_KEY.options, options)
    }
    if(this.globalData.logo=="") {
      this.globalData.logo = options[HALO_OPTION_KEY.blogFavicon];
    }
    if(this.globalData.blogTitle=="") {
      this.globalData.blogTitle = options[HALO_OPTION_KEY.blogTitle];
    }
  },
  async getRandomGraph () {
    if(CloudConfig.isOpen && CloudConfig.randomGraphOpen) {
      var randomGraphs = wx.getStorageSync(STORAGE_KEY.randomGraph);
      if(!randomGraphs) {
        randomGraphs =  await getRandomGraph();
        wx.setStorageSync(STORAGE_KEY.randomGraph, randomGraphs)
      }
      this.globalData.randomGraphs = randomGraphs
    } else {
      this.globalData.randomGraphs = RandomImage
    }
  },
  async loadFontFace() {
    wx.loadFontFace({
      global: true,
      family: 'JetBrainsMono',
      source: 'url("https://cdn.jsdelivr.net/gh/JetBrains/JetBrainsMono/ttf/JetBrainsMono-Regular.ttf")',
      success: (res) => {
      },
      fail: function (res) {
      },
      complete: function (res) {
      }
    });
    wx.loadFontFace({
      global: true,
      family: 'Ali',
      source: 'url("https://at.alicdn.com/t/webfont_8of3cuhq013.ttf")',
      success: (res) => {
      },
      fail: function (res) {
      },
      complete: function (res) {

      }
    });
  },
  // 更新小程序以及系统信息获取校验
  updateManager: function () {
    //获取系统信息 客户端基础库
    var that = this;
    wx.getSystemInfo({
      success: function (res) {
        // 全局设置
        that.globalData.windowHeight = res.windowHeight * (750/res.windowWidth);
        that.globalData.StatusBar = res.statusBarHeight;
        // px换算rpx
        that.globalData.unitConversionRatio = 750/res.windowWidth
        let custom = wx.getMenuButtonBoundingClientRect();
        that.globalData.Custom = custom;  
        that.globalData.CustomBar = custom.bottom + custom.top - res.statusBarHeight;
        // 基础库版本比较，版本更新必须是1.9.90以上
        // wx.getUserProfile，版本必须是2.10.4及以上
        const v = compareVersion(res.SDKVersion, '2.10.4');
        if (v >= 0) {
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
