//获取应用实例
const app = getApp();
import apiService from '../../utils/api-service';
import {PageSize,RandomImage,CustomStyle} from '../../config/api';

Page({
  data: {
    RandomImage: RandomImage,
    topImage: CustomStyle.topImage,
    swiperImage: CustomStyle.swiperImage,
    logo: "",
    cardCur: 0,
    pageNo: 0,  //起始页
    scrollLeft: 0, //滚动条的位置
    content: [],  //文章
    swiper: [],  //轮播图
    indicatorDots: true, //是否显示面板指示点
    autoplay: true, //是否自动切换
    interval: 5000, //自动切换时间间隔
    duration: 1000, //滑动动画时长
    loading: false
  },
  /**
   * 轮播图点击
   */
  swaper: function (event) {
    wx.navigateTo({
      url: '../details/index?id=' + event.target.dataset.id
    });
  },
  /**
   * 搜索
   */
  onSearch: function(event) {
    wx.navigateTo({
      url: '../search/index?keyword=' + event.detail.value
    });
  },

  async onLoad() {
    var that = this;
    //加载 
    this.setData({
      loadModal:true
    })
    /* 加载全局globalData */
    
    if(app.globalData.logo==""){
      app.globalData.logo = await apiService.getOptionByKey("blog_logo");
    }
    if(app.globalData.blogTitle==""){
      app.globalData.blogTitle = await apiService.getOptionByKey("blog_title");
    }
    this.setData({
      logo: app.globalData.logo,
      blogTitle: app.globalData.blogTitle,
    })
    const swiper = await this.getSwiper();
    const content = await this.getArticleList(true, 0);
    that.setData({
      content: content,
      swiper: swiper,
      loadModal:false
    });
  },
  async onShow() {},
  /**
   * 顶部刷新
   */
  async onPullDownRefresh() {
    var that = this;
    // 显示顶部刷新图标
    wx.showNavigationBarLoading();
    const content = await this.getArticleList(true, 0);
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
    const content = await this.getArticleList(false, 0);
    that.setData({
      content: content
    });
  },
  /**
   * 分享
   * @param {*} res 
   */
  onShareAppMessage: function (res) {
    return {
      title: app.globalData.blogTitle,
      imageUrl: app.globalData.logo,
      path: '/pages/index/index'
    }
  },
  onShareTimeline: function (res) {
    return {
      title: app.globalData.blogTitle,
      imageUrl: app.globalData.logo
    }
  },
  /**
   * 详情页跳转
   */
  details(e) {
    wx.navigateTo({
      url: '../details/index?id=' + e.currentTarget.id
    })
  },
  /**
   * 获取轮播图
   * 这里使用访问次数最多的五条
   */
  async getSwiper(){
    try {
      const param = {
        page: PageSize.swiperPage,
        size: PageSize.swiperSize,
        sort: 'visits,desc'
      };
      const result = await apiService.getSwiper(param);
      return result.content;
    } catch (error) {
      return await Promise.reject(error)
    }
  },
  /**
   * 获取文章列表
   */
  async getArticleList(init, typeId) {
    try {
      const that = this;
      if (init) {
        this.initParams();
      }
      var pageNo = that.data.pageNo;
      if (pageNo != 1) {
        that.setData({
          loading: true,
        });
      } else {
        that.setData({
          loading: false,
        });
      }
      const param = {
        page: pageNo,
        size: PageSize.indexSize,
        sort: 'createTime,desc'
      };
      const result = await apiService.getArticleList(param);
      if (result.page < result.pages) {
        if(result.total<=result.rpp){
          that.setData({
            loading: false,
          });
        }
        return that.data.content.concat(result.content);
      } else {
        that.setData({
          loading: false,
          tip: "到底了鸭"
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
  DotStyle(e) {
    this.setData({
      DotStyle: e.detail.value
    })
  },
  // cardSwiper
  cardSwiper(e) {
    this.setData({
      cardCur: e.detail.current
    })
  },

});