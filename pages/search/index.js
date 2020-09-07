const app = getApp();
import apiService from '../../utils/api-service';
import {PageSize,CustomStyle} from '../../config/api';
Page({
  data: {
    topImage: CustomStyle.topImage,
    noContentImage: CustomStyle.noContentImage,
    title: "文章搜索",
    keyword: "",
    pageNo: 0,
    logo: "",
    loading: false,
    content: []
  },

  async onLoad(options) {
    this.setData({
      logo: app.globalData.logo,
      loadModal: true
    })
    const content = await this.getArticleList(true, options.keyword);
    this.setData({
      keyword: options.keyword,
      content: content,
      loadModal:false
    });
  },

  details(e) {
    wx.navigateTo({
      url: '../details/index?id=' + e.currentTarget.id
    });
  },

  /**
   * 顶部刷新
   */
  async onPullDownRefresh() {
    var that = this;
    // 显示顶部刷新图标
    wx.showNavigationBarLoading();
    const content = await this.getArticleList(true, this.data.keyword);
    that.setData({
      content: content
    });
    setTimeout(function () {
      // 隐藏导航栏加载框
      wx.hideNavigationBarLoading();
      //停止当前页面下拉刷新。
      wx.stopPullDownRefresh();
    }, 1500);
  },
  /**
   * 向下滑动拉去下一页
   */
  async onReachBottom() {
    var that = this;
    var pageNo = ++that.data.pageNo;
    that.setData({
      pageNo: pageNo,
    });
    const content = await this.getArticleList(false,that.data.keyword);
    that.setData({
      content: content
    });
  },
  onShareAppMessage: function() {
    var that = this;
    return {
      title: app.globalData.blogTitle,
      path: '/pages/search/index?keyword='+that.data.keyword
    }
  },
  /**
   * 获取文章列表
   */
  async getArticleList(init, keyword) {
    try {
      const that = this;
      if (init) {
        this.initParams();
      }
      var pageNo = that.data.pageNo;
      if (pageNo != 0) {
        that.setData({
          loading: true,
        });
      } else {
        that.setData({
          loading: false,
        });
      }
      const param = {
        keyword: keyword,
        page: pageNo,
        size: PageSize.searchSize,
        sort: 'createTime,desc'
      };
      const result = await apiService.searchArticle(param);
      if (result.page < result.pages ) {
        return that.data.content.concat(result.content);
      } else {
        that.setData({
          loading: false,
        });
      }
    } catch (error) {
      return await Promise.reject(error)
    }
  },
  /**
   * 初始化文章数与页数
   */
  initParams() {
    var that = this;
    that.setData({
      content: [],
      pageNo: 0,
    });
  },
  toHome(){
    wx.switchTab({
      url: '../index/index'
    });
  },
  backPage(){
    wx.navigateBack({
      delta: 1
    })
  }
});