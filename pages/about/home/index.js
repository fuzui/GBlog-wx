const app = getApp();
import apiResult from '../../../utils/api-result';
import { Config } from '.././../../config/api';
Page({
  data: {
    starCount: 0,
    forksCount: 0,
    visitTotal: 0,
    blogTitle: "",
  },
  onLoad: function () { },
  async onShow() {
    var that = this;
    that.setData({
      blogTitle: app.globalData.blogTitle
    });
  },

  /**
   * 获取用户信息
   * @param {*} e 
   */
  getUser(e) {
    if (!e.detail.userInfo) {
      return apiResult.error("登录失败");
    } else {
      wx.setStorageSync(Config.User, e.detail.userInfo);
      this.setData({
        modalName: null,
      })
      return apiResult.success("登录成功");
    }
  },
  // 用户订阅推送更新
  subscribeUpdate() {
    var that = this;
    var userInfo = wx.getStorageSync(Config.User);
    if (!userInfo.nickName) {
      that.setData({
        modalName: "loginModal",
      })
      return false;
    }
    wx.requestSubscribeMessage({
      tmplIds: [
        app.globalData.updateKey
      ],
      success(res) {
        // 用户拒绝
        if (res[app.globalData.updateKey] == 'reject'){
          wx.showToast({
            title: '订阅失败，以后想订阅就可以点击此处',
            icon: "none",
            mask: true,
            duration: 2500
          })
        }
        // 用户同意
        if (res[app.globalData.updateKey] == 'accept'){
          wx.showLoading({
            title: '订阅中',
            mask: true
          })
          wx.login({
            success(res) {
              console.log(res);
              wx.request({
                url: Config.SubscribeUrl + "/getOpenId",
                method: 'POST',
                data: {
                  code: res.code
                },
                success(res) {
                  console.log(res);
                  if ('openid' in res.data && res.data.openid) {
                    wx.request({
                      url: Config.SubscribeUrl + "/article",
                      method: "POST",
                      data: {
                        openId: res.data.openid,
                        subscribeTimes: 1,
                      },
                      success(res) {
                        console.log(res);
                      },
                      fail(err) {

                      },
                      complete() {
                        wx.hideLoading({
                          success: (res) => {
                            wx.showToast({
                              title: '订阅成功，可选择不再询问，之后只用点击此处即可',
                              icon: "none",
                              mask: true,
                              duration: 2500
                            })
                          },
                        })
                      }
                    })
                  }
                },
                fail(err) {
                  console.log(err);
                }
              })
            },
            fail(err) {

            }
          })
        }
      }
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
   * 跳转到公告页面
   */
  toNoticePage() {
    wx.navigateTo({
      url:"/pages/about/notice/index"
    })
  },
  /**
   * 跳转到归档页面
   */
  toArchivesPage() {
    wx.navigateTo({
      url:"/pages/about/archives/index"
    })
  },
  /**
   * 跳转到留言页面
   */
  toGuestbookPage() {
    wx.navigateTo({
      url:"/pages/about/guestbook/index"
    })
  },
  /**
   * 跳转到日记页面
   */
  toJournalPage() {
    wx.navigateTo({
      url:"/pages/about/journal/index"
    })
  }
})