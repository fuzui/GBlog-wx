const app = getApp();
import apiResult from '../../../../utils/api-result';
import { adminGetTheme, adminActivatesTheme, adminDeleteTheme, adminFetchingTheme, adminFetchingNewTheme } from '../../../../services/api/admin/theme';
import {
  ApiBaseUrl
} from '../../../../config/api.js';
Page({
  data: {
    url: ApiBaseUrl,
    logo: "",
    CustomBar: app.globalData.CustomBar,
    themeList: [],
    message: "加载中...",
    loadModal: false,
    themeUrl: "",
  },
  onLoad: function () {
    var that = this;
    that.setData({
      logo: app.globalData.logo,
    })
  },
  async onShow() {
    var that = this;
    that.setData({
      loadModal: true
    })
    const themeList = await this.adminGetTheme();
    that.setData({
      themeList: themeList,
      loadModal: false
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
   * 获取主题列表
   */
  async adminGetTheme() {
    try {
      const result = await adminGetTheme();
      return result;
    } catch (error) {
      return error.message;
    }
  },

  /**
   * 主题设置
   * 暂不打算写这个页面，请前往电脑端设置
   */
  setTheme() {
    apiResult.warn("暂不可用");
  },

  /**
   * 启用主题
   */
  async activatesTheme(e) {
    var that = this;
    const id = e.currentTarget.dataset.id;
    const index = e.currentTarget.dataset.index;
    const themeList = that.data.themeList;
    if (themeList[index].activated) {
      return;
    }
    wx.showModal({
      title: 'Creator',
      content: '确定要启用' + themeList[index].name + '主题吗？',
      cancelText: '再想想',
      confirmText: '启用',
      success: async (res) => {
        if (res.confirm) {
          try {
            await adminActivatesTheme(id);
            themeList.forEach(theme => {
              if (theme.id == id) {
                theme.activated = true;
              } else {
                theme.activated = false;
              }
            });
            that.setData({
              themeList: themeList
            })
            apiResult.success("启用成功");
          } catch (error) {
            return error.message;
          }
        }
      }
    })
  },

  /**
   * 删除主题
   * @param {*} e 
   */
  async deleteTheme() {
    var that = this;
    const index = that.data.currentIndex;
    const id = that.data.currentId;
    const name = that.data.themeList[index].name;
    wx.showModal({
      title: 'Creator',
      content: '确定要删除' + name + '主题吗？',
      cancelText: '再想想',
      confirmText: '再见',
      success: async (res) => {
        if (res.confirm) {
          try {
            await adminDeleteTheme(id);
            //视图删除，不刷新调用接口
            that.data.themeList.splice(index, 1)
            that.setData({
              themeList: that.data.themeList
            });
            apiResult.success("已删除");
          } catch (error) {
            apiResult.error(error.message);
            return error.message;
          }
        }
        that.setData({
          modalName: null,
          currentIndex: null,
          currentId: null
        });
      }
    })
  },

  /**
   * 更新主题
   */
  async fetchingTheme() {
    var that = this;
    const index = that.data.currentIndex;
    const id = that.data.currentId;
    const name = that.data.themeList[index].name;
    wx.showModal({
      title: 'Creator',
      content: '确定要更新' + name + '主题吗？',
      cancelText: '再想想',
      confirmText: '更新',
      success: async (res) => {
        if (res.confirm) {
          try {
            that.setData({
              loadModal: true,
              message: "更新中···"
            })
            const result = await adminFetchingTheme(id);
            that.setData({
              loadModal: false
            })
            //视图修改，不刷新调用接口
            that.data.themeList.splice(index, 1, result)
            that.setData({
              themeList: that.data.themeList
            });

            apiResult.success("已更新");
          } catch (error) {
            apiResult.error(error.message);
          }
        }
        that.setData({
          modalName: null,
          loadModal: false,
          currentIndex: null,
          currentId: null
        });
      }
    })
  },

  /**
   * 拉取新主题
   */
  async fetchingNewTheme() {
    var that = this;
    if(!that.data.themeUrl){
      apiResult.warn("链接为空");
      return ;
    }
    const themeList = that.data.themeList;
    const param = {
      uri: that.data.themeUrl
    }
    that.setData({
      loadModal: true,
      message: "上传中···"
    })
    try {
      const result = await adminFetchingNewTheme(param);
      that.setData({
        loadModal: false,
        modalName: null,
        themeUrl: ""
      })
      //视图修改，不刷新调用接口
      themeList.push(result)
      that.setData({
        themeList: themeList
      });
      apiResult.success("已添加");
    } catch (error) {
      apiResult.error(error.message);
      that.setData({
        modalName: null,
        themeUrl: "",
        loadModal: false
      });
      
    }
  },

  urlInput(e){
    this.setData({
      themeUrl: e.detail.value
    });
  },

  showModal(e) {
    var that = this;
    const modalName = e.currentTarget.dataset.target;
    if (modalName == 'moreModal') {
      const currentIndex = e.currentTarget.dataset.index;
      const currentId = e.currentTarget.dataset.id;
      that.setData({
        currentIndex: currentIndex,
        currentId: currentId,
      })
    }
    that.setData({
      modalName: modalName
    })
  },
  hideModal(e) {
    this.setData({
      modalName: null,
      currentIndex: null,
      currentId: null,
      themeUrl: ""
    })
  },
})