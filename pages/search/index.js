const app = getApp();
import apiService from '../../services/api/api-service';
import {PageSize,CustomStyle} from '../../config/api';
import {STORAGE_KEY} from '../../services/const-data/const-data';
Page({
  data: {
    StatusBar: app.globalData.StatusBar,
    CustomBar: app.globalData.CustomBar,
    topImage: CustomStyle.topImage,
    noContentImage: CustomStyle.noContentImage,
    historyKeyword: [],
    recommendKeyword: [],
    recommendKeywordIndex: 0,
    recommendKeywordView: true,
    title: "文章搜索",
    keyword: "",
    pageNo: 0,
    logo: "",
    loading: false,
    isSearch: false,
    content: [],
    windowHeight: app.globalData.windowHeight
  },

  async onLoad() {
    this.setData({
      logo: app.globalData.logo
    })
    const historyKeyword = wx.getStorageSync(STORAGE_KEY.searchHistory);
    if(historyKeyword) {
      this.setData({
        historyKeyword: historyKeyword
      })
    }
    var recommendKeyword = wx.getStorageSync(STORAGE_KEY.searchRecommend);
    if(recommendKeyword) {
      this.setData({
        recommendKeyword: recommendKeyword
      })
    }else{
      const tagList = await this.getTags();
      if(tagList){
        var tagItems = [];
        recommendKeyword = []
        for (let i = 0; i < tagList.length; i++) {
          const tag = tagList[i];
          tagItems.push(tag.name);
          if((i+1)%5 == 0) {
            recommendKeyword.push(tagItems)
            tagItems = []
          }
        }
        wx.setStorageSync(STORAGE_KEY.searchRecommend, recommendKeyword)
        this.setData({
          recommendKeyword: recommendKeyword
        })
      }
    }
  },
  /**
   * 搜索
   * @param {*} event 
   */
  async search() {
    const keyword = this.data.keyword
    var historyKeyword = this.data.historyKeyword;
    if(historyKeyword.indexOf(keyword) == -1) {
      historyKeyword.unshift(keyword)
      if(historyKeyword.length > 15) {
        historyKeyword.pop()
      }
      wx.setStorageSync(STORAGE_KEY.searchHistory, historyKeyword)
    }
    this.setData({
      historyKeyword: historyKeyword
    })
    const content = await this.getArticleList(true, keyword);
    this.setData({
      isSearch: true,
      content: content
    });
  },
  async clickSearch(e) {
    this.setData({
      keyword: e.currentTarget.dataset.keyword
    })
    await this.search()
  },
  /**
   * 搜索输入事件
   * @param {s} event 
   */
  searchInput(event) {
    this.setData({
      keyword: event.detail.value,
      isSearch: false
    });
  },
  /**
   * 清空历史搜索关键字
   */
  clearHistoryKeyword() {
    wx.removeStorageSync(STORAGE_KEY.searchHistory)
    this.setData({
      historyKeyword: []
    })
  },
  changeRecommend() {
    var recommendKeywordIndex = this.data.recommendKeywordIndex
    if(recommendKeywordIndex == this.data.recommendKeyword.length-1) {
      recommendKeywordIndex = 0
    }else {
      recommendKeywordIndex++
    }
    this.setData({
      recommendKeywordIndex: recommendKeywordIndex
    })
  },
  changeRecommendView() {
    this.setData({
      recommendKeywordView: !this.data.recommendKeywordView
    })
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
   * 获取标签
   */
  async getTags() {
    try {
      const param={};
      const result = await apiService.getTags(param);
      return result;
    } catch (error) {
      return await Promise.reject(error)
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