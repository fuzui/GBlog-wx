//获取应用实例
const app = getApp();
import { getCategories, getCategoriesArticle } from '../../services/api/content/category';
import { PageSize, CustomStyle } from '../../config/api';

Page({
  data: {
    noContentImage: CustomStyle.noContentImage,
    title: "分类",
    logo: "",
    typeSlug: "",
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
    loading: false,
    scrollLeft: 0
  },


  //切换TAB
  async handleChangeTab(event) {
    var that = this;
    let offsetLeft = event.currentTarget.offsetLeft
    wx.createSelectorQuery().select('.scroll-view-item').boundingClientRect((rect)=>{
      that.setData({
        scrollLeft: offsetLeft - that.data.scrollViewWidth/2 + rect.width/2
      })
    }).exec()

    that.setData({
      loadModal:true
    })
    const selected = event.currentTarget.dataset.id;
    const typeSlug = that.data.navlist[selected].slug;
    that.setData({
      typeSlug: typeSlug
    });
    that.initParams();
    const content = await this.getArticleList(true, typeSlug);
    app.globalData.articleTypeTabIndex = selected;
    that.setData({
      content: content,
      selected: event.currentTarget.dataset.id
    });
    that.setData({
      loadModal:false
    })
  },
  
  async onLoad() {
    //加载  
    var that = this;
    that.setData({
      logo: app.globalData.logo,
    })
    const navlist = await this.getCategories();
    const index = app.globalData.articleTypeTabIndex ? app.globalData.articleTypeTabIndex : 0;
    const content = await this.getArticleList(true, navlist[index].slug);
    that.setData({
      navlist: navlist,
      content: content,
      selected: index
    });
  },
  async onShow() {
    var that = this;
    if (typeof that.getTabBar === 'function' && that.getTabBar()) {
      that.getTabBar().setData({
        selected: 1
      })
    }
  },
  onReady() {
    wx.createSelectorQuery().select('.scroll-view').boundingClientRect((rect)=>{
      this.data.scrollViewWidth = rect.width
    }).exec()
  },
  /**
   * 下拉分页
   */
  async onReachBottom() {
    var that = this;
    var pageNo = ++that.data.pageNo;
    that.setData({
      pageNo: pageNo,
    });
    const typeSlug = that.data.navlist[this.data.selected].slug;
    const content = await this.getArticleList(false, typeSlug);
    that.setData({
      content: content
    });
  },
  onShareAppMessage: function(res) {
    return {
      title: app.globalData.blogTitle+'之'+this.data.navlist[this.data.selected].name,
      path: '/pages/type/index'
    }
  },
  onShareTimeline: function (res) {
    return {
      title: app.globalData.blogTitle+'之'+this.data.navlist[this.data.selected].name,
      imageUrl: app.globalData.logo
    }
  },
  /**
   * 详情跳转
   * @param {*} e 
   */
  details(e) {
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
      const result = await getCategories(param);
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
        size: PageSize.categorySize,
        sort: ['topPriority,desc','createTime,desc']
      };
      const result = await getCategoriesArticle(slug,param);
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
  //初始化文章数与页数
  initParams() {
    var that = this;
    that.setData({
      content: [],
      pageNo: 0,
    });
  },
});