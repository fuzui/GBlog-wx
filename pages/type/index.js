//获取应用实例
const app = getApp();
import apiService from '../../utils/api-service';
import config from '../../config/api';

Page({
  data: {
    title: "分类",
    logo: "",
    typeId: "",
    pageNo: 0,
    selected: 0, //当前选中
    showType: false,
    navBarHeight: 0,
    navlist: [],
    content: [],
    swiper: [],
    indicatorDots: true, //是否显示面板指示点
    autoplay: true, //是否自动切换
    interval: 5000, //自动切换时间间隔
    duration: 1000, //滑动动画时长
    tip: "",
    loading: false
  },


  //切换TAB
  async handleChangeTab(event) {
    var that = this;
    that.setData({
      loadModal:true
    })
    const selected = event.currentTarget.dataset.id;
    const typeId = that.data.navlist[selected].name;
    that.setData({
      typeId: typeId
    });
    that.initParams();
    const content = await this.getArticleList(true, typeId);
    app.globalData.articleTypeTabIndex = selected;
    that.setData({
      content: content,
      selected: event.currentTarget.dataset.id
    });
    that.setData({
      loadModal:false
    })
  },
  
  onLoad: function() {
    //加载  
    var that = this;
    that.setData({
      logo: app.globalData.logo,
    })
  },
  async onShow() {
    var that = this;
    const navlist = await this.getCategories();
    const index = app.globalData.articleTypeTabIndex ? app.globalData.articleTypeTabIndex : 0;
    const content = await this.getArticleList(true, navlist[index].name);
    that.setData({
      navlist: navlist,
      content: content,
      selected: index
    });
  },

  async onPullDownRefresh(){
    var that = this;
    // 显示顶部刷新图标
    wx.showNavigationBarLoading();
    const typeId = that.data.navlist[this.data.selected].name;
    const content = await this.getArticleList(true, typeId);
    that.setData({
      content: content
    });
    setTimeout(function() {
      // 隐藏导航栏加载框
      wx.hideNavigationBarLoading();
      //停止当前页面下拉刷新。
      wx.stopPullDownRefresh();
    }, 1500);
  },
	
  async onReachBottom() {
    var that = this;
    var pageNo = ++that.data.pageNo;
    that.setData({
      pageNo: pageNo,
    });
    const typeId = that.data.navlist[this.data.selected].name;
    const content = await this.getArticleList(false, typeId);
    that.setData({
      content: content
    });
  },
  onShareAppMessage: function(res) {
    return {
      title: app.globalData.blogTitle,
      path: '/pages/index/index'
    }
  },
  details(e) {
    //详情页跳转
    wx.navigateTo({
      url: '../details/index?id=' + e.currentTarget.id
    })
  },
  /**
   * 获取分类
   */
  async getCategories() {
    try {
      const param={};
      const result = await apiService.getCategories(param);
      return result;
    } catch (error) {
      return await Promise.reject(error)
    }
    
  },
  /**
   * 获取文章列表
   */
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
        size: config.PageSize.categorySize,
      };
      const result = await apiService.getCategoriesArticle(slug,param);
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
  //初始化导航栏
  initDomForNavBar(dom) {
    this.initDomForNavBar1(dom, res => {
      const { screenHeight, navBarHeight, tabbarHeight } = res;
      this.setData({
        screenHeight: screenHeight,
        navBarHeight: navBarHeight,
        tabbarHeight: tabbarHeight,
      })
    })
  },
  initDomForNavBar1(dom, callback) {
    const systemInfo = apiService.wxGetSystemInfo();
    var query = wx.createSelectorQuery();
    query.select(dom).boundingClientRect();
    query.exec(res => {

      callback({
        screenHeight: systemInfo.screenHeight,
        navBarHeight: res[0].height,
        tabbarHeight: systemInfo.screenHeight - systemInfo.windowHeight,
      })
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
});