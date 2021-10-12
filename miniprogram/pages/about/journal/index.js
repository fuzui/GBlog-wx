const app = getApp();
import { getJournals } from '../../../services/api/content/journal';
import { PageSize, MpHtmlStyle } from './../../../config/api';
Page({
  data: {
    mpHtmlStyle:MpHtmlStyle,
    logo: "",
    pageNo: 0,
    bottomFlag: false,
    content: [],
    bgColor: [
      "green",
      "red",
      "grey",
      "blue",
      "cyan",
      "purple"
    ]
  },
  onLoad: function () { 
    var that = this;
    that.setData({
      logo: app.globalData.logo
    })
  },
  async onShow() {
    var that = this;
    that.setData({
      loadModal:true
    })
    var content = await this.getJournals();
    that.setData({
      content: content,
      loadModal:false
    });
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
    const content = await this.getJournals();
    if(content){
      that.setData({
        content: content
      });
    }
    
  },
  /**
   * 获取日记
   */
  async getJournals() {
    var that = this;
    try {
      const param = {
        page: that.data.pageNo,
        size: PageSize.journalSize,
        sort: 'createTime,desc'
      };
      const result = await getJournals(param);
      if(result.page < result.pages){
        return that.data.content.concat(result.content);
      }else{
        that.setData({
          bottomFlag: true
        })
      }
    } catch (error) {
      return await Promise.reject(error)
    }
  },
  onShareAppMessage: function(res) {
    return {
      title: app.globalData.blogTitle+'的日记本',
      path: '/pages/about/journal/index'
    }
  },
  onShareTimeline: function (res) {
    return {
      title: app.globalData.blogTitle+'的日记本',
      imageUrl: app.globalData.logo
    }
  },
});
