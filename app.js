App({
  onLaunch: function() {
    wx.getSystemInfo({
      success: e => {
        this.globalData.StatusBar = e.statusBarHeight;
        let custom = wx.getMenuButtonBoundingClientRect();
        this.globalData.Custom = custom;  
        this.globalData.CustomBar = custom.bottom + custom.top - e.statusBarHeight;
      }
    })
  },
  globalData: {
    logo: "",
    themeSettings: {},
    blogTitle: "",
    topImage: "https://fuzui.oss-cn-shenzhen.aliyuncs.com/img/nav01.png",
    userInfo: {
      nickName: "",
      avatarUrl: ""
    },
  },
  // 更新小程序
  updateManager: function () {
    //获取系统信息 客户端基础库
    wx.getSystemInfo({
      success: function (res) {
        //基础库版本比较，版本更新必须是1.9.90以上
        const v = util.compareVersion(res.SDKVersion, '1.9.90');
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
