//获取应用实例
const app = getApp();
import { getArticleList } from '../../services/api/content/article';
import { PageSize, RandomImage, CustomStyle } from '../../config/api';

Page({
  data: {
    StatusBar: app.globalData.StatusBar,
    CustomBar: app.globalData.CustomBar,
    RandomImage: RandomImage,
    topImage: CustomStyle.topImage,
    swiperImage: CustomStyle.swiperImage,
    logo: "",
    currentNavCode: "recommend",
    navlist: [
      {
        code: "recommend",
        name: "推荐"
      },
      {
        code: "rank",
        name: "榜单"
      }
    ],
    cardCur: 0,
    pageNo: 0,  //起始页
    rankArticlePageNo: 0,
    scrollLeft: 0, //滚动条的位置
    content: [],  //文章
    rankArticleList: [], //榜单文章列表
    currentRankType: 'visits',
    rankType: [
      {
        code: "visits",
        name: "最热"
      },
      {
        code: "likes",
        name: "最赞"
      },
      {
        code: "wordCount",
        name: "最长"
      }
    ],
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
      url: '../search/index'
    });
  },

  async onLoad() {
    var that = this;
    //加载 
    this.setData({
      loadModal:true
    })
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
  onReady() {
    wx.createSelectorQuery().select('.scroll-view').boundingClientRect((rect)=>{
      this.data.scrollViewWidth = rect.width
    }).exec()
  },
  async onShow() {
    var that = this;
    if (typeof that.getTabBar === 'function' && that.getTabBar()) {
      that.getTabBar().setData({
        selected: 0
      })
    }
  },
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
    if (that.data.currentNavCode == 'recommend') {
      var pageNo = ++that.data.pageNo;
      that.setData({
        pageNo: pageNo,
      });
      const content = await this.getArticleList(false, 0);
      that.setData({
        content: content
      });
    } else if (that.data.currentNavCode == 'rank') {
      var pageNo = ++that.data.rankArticlePageNo;
      that.setData({
        rankArticlePageNo: pageNo,
      });
      const content = await this.getRankArticleList(false, that.data.currentRankType);
      that.setData({
        rankArticleList: content
      });
    }
    
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
      const result = await getArticleList(param);
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
        sort: ['topPriority,desc','createTime,desc'],
      };
      const result = await getArticleList(param);
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
   * 获取榜单文章列表
   */
  async getRankArticleList(init,sort) {
    try {
      const that = this;
      if (init) {
        this.initRankArticleParams();
      }
      var rankArticlePageNo = that.data.rankArticlePageNo;
      if (rankArticlePageNo != 1) {
        that.setData({
          loading: true,
        });
      } else {
        that.setData({
          loading: false,
        });
      }
      const param={
        page: rankArticlePageNo,
        size: PageSize.indexSize,
        sort: [sort +',desc','createTime,desc']
      };
      const result = await getArticleList(param);
      if (result.page < result.pages) {
        if(result.total<=result.rpp){
          that.setData({
            loading: false,
          });
        }
        return that.data.rankArticleList.concat(result.content);
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
  initRankArticleParams() {
    var that = this;
    that.setData({
      rankArticleList: [],
      rankArticlePageNo: 0,
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
  async handleChangeNavTab (event) {
    var that = this;
    let offsetLeft = event.currentTarget.offsetLeft
    wx.createSelectorQuery().select('.scroll-view-item').boundingClientRect((rect)=>{
      that.setData({
        scrollLeft: offsetLeft - that.data.scrollViewWidth/2 + rect.width/2
      })
    }).exec()
    const currentNavCode = event.currentTarget.dataset.type;
    that.setData({
      currentNavCode: currentNavCode
    });
    if(currentNavCode == 'rank') {
      const rankArticleList = await that.getRankArticleList(true, that.data.currentRankType);
      that.setData({
        rankArticleList: rankArticleList
      });
    }
  },
  async handleChangeRankType (event) {
    var that = this;
    let offsetLeft = event.currentTarget.offsetLeft
    wx.createSelectorQuery().select('.scroll-view-item').boundingClientRect((rect)=>{
      that.setData({
        scrollLeft: offsetLeft - that.data.scrollViewWidth/2 + rect.width/2
      })
    }).exec()
    const currentRankType = event.currentTarget.dataset.type;
    that.setData({
      currentRankType: currentRankType
    });
    const rankArticleList = await that.getRankArticleList(true, currentRankType);
    that.setData({
      rankArticleList: rankArticleList
    });
  }

});