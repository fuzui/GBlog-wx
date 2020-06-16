const app = getApp()
import apiService from '../../utils/api-service';
import {PageSize,RandomImage} from '../../config/api';
Page({
  data: {
    RandomImage: RandomImage,
    StatusBar: app.globalData.StatusBar,
    CustomBar: app.globalData.CustomBar,
    Custom: app.globalData.Custom,
    logo: "",
    loadModal: false,
    tagCur: 0,
    mainCur: 0,
    tagNavTop: 0,
    logo: "",
    typeSlug: "",
    pageNo: 0,
    tagList: [],
    content: [],
    tip: "",
    loading: false
  },
  async onLoad(options) {
    var that = this;
    that.setData({
      logo: app.globalData.logo,
      loadModal:true
    })
    wx.showLoading({
      title: '加载中...',
      mask: true
    });
    
    const tagList = await this.getTags();
    let selected = options.id?(tagList || []).findIndex((tag) =>tag.id == options.id):0;
    
    that.setData({
      tagCur:selected
    });
    let tagSlug = tagList[selected].slug;
    const content = await this.getArticleList(true, tagSlug);
    that.setData({
      tagList: tagList,
      content: content,
      loadModal:false
    });
  },
  onReady() {
    wx.hideLoading()
  },
  async tagSelect(e) {
    let tagSlug = e.currentTarget.dataset.slug;
    const content = await this.getArticleList(true, tagSlug);
    this.setData({
      tagCur: e.currentTarget.dataset.index,
      content: content,
      mainCur: e.currentTarget.dataset.index,
      tagNavTop: (e.currentTarget.dataset.index - 1) * 50
    })
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
  async getArticleList(init,slug) {
    try {
      const that = this;
      if (init) {
        this.initParams();
      }
      var pageNo = that.data.pageNo;
      if(pageNo != 0){
        that.setData({
          loading: true,
        });
      }else{
        that.setData({
          loading: false,
        });
      }
      const param={
        page: pageNo,
        size: PageSize.tagSize,
      };
      const result = await apiService.getTagsArticle(slug,param);
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
  async onReachBottomArticleMain() {
    var that = this;
    var pageNo = ++that.data.pageNo;
    that.setData({
      pageNo: pageNo,
    });
    const tagSlug = that.data.tagList[this.data.tagCur].slug;
    const content = await this.getArticleList(false, tagSlug);
    that.setData({
      content: content
    });
  },
  //初始化文章数与页数
  initParams() {
    var that = this;
    that.setData({
      content: [],
      pageNo: 0,
    });
  },
  toDetail(event){
    wx.navigateTo({
      url: '../details/index?id=' + event.currentTarget.dataset.id
    });
  }
})