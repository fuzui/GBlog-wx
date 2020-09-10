const app = getApp();
import apiService from '../../../utils/api-service';
import utils from '../../../utils/utils';
import {PageSize,CustomStyle} from '../../../config/api';
Page({
  data: {
    logo: "",
    pageNo: 0,
    bottomFlag: false,
    content: [],
    ColorList: app.globalData.ColorList,
    photoImage: CustomStyle.photoImage
  },
  async onLoad() { 
    var that = this;
    that.setData({
      logo: app.globalData.logo
    })
    that.setData({
      loadModal:true
    })
    var content = await this.getPhotos();
    that.setData({
      content: content,
      loadModal:false
    });
  },
  async onShow() {
    if (typeof this.getTabBar === 'function' && this.getTabBar()) {
      this.getTabBar().setData({
        selected: 2
      })
    }
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
    const content = await this.getPhotos();
    if(content){
      that.setData({
        content: content
      });
    }
    
  },
  /**
   * 获取光影相册
   */
  async getPhotos() {
    var that = this;
    try {
      const param = {
        page: that.data.pageNo,
        size: PageSize.photoSize,
        sort: 'takeTime,desc'
      };
      const result = await apiService.getPhotos(param);
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
  
  /**
   * 跳到详情页
   * @param {*} event 
   */
  toDetailsPage: function (event) {
    var that = this;
    const index = event.currentTarget.dataset.index;
    const details = that.data.content[index];
    const url = utils.buildURL('/pages/photos/details/index', {
      item: details
    })
    wx.navigateTo({
      url:url
    })
  },
  /**
   * 分享
   * @param {*} res 
   */
  onShareAppMessage: function (res) {
    return {
      title: app.globalData.blogTitle+"光影",
      imageUrl: CustomStyle.photoImage,
      path: '/pages/photos/home/index'
    }
  },
  onShareTimeline: function (res) {
    return {
      title: app.globalData.blogTitle+"光影",
      imageUrl: CustomStyle.photoImage
    }
  },
})