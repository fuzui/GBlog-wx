const app = getApp();
import apiResult from '../../../../utils/api-result';
import {
  adminGetPhotoDetails,
  adminEditPhotoDetails,
  adminDeletePhoto
} from '../../../../services/api/admin/photo';
import config from '../../../../config/api';
Page({
  data: {
    CustomBar: app.globalData.CustomBar,
    topImage: config.CustomStyle.topImage,
    logo: "",
    imgPath: "",
    photo: {},
    id: null,
    name: "",
    thumbnail: "",
    location: "",
    team: "",
    description: "",
    takeTime: ""
  },
  async onLoad(options) { 
    var that = this;
    const id = options.id;
    that.setData({
      logo: app.globalData.logo
    })
    that.setData({
      loadModal:true
    })
    var photo = await this.adminGetPhotoDetails(id);
    that.setData({
      photo: photo,
      id: photo.id,
      name: photo.name,
      thumbnail: photo.thumbnail,
      location: photo.location,
      team: photo.team,
      description: photo.description,
      takeTime: photo.takeTime,
      url:photo.url,
      loadModal:false
    });
  },
  async onShow() {
    
  },
  
  /**
   * 获取图库详情
   */
  async adminGetPhotoDetails(id) {
    try {
      const result = await adminGetPhotoDetails(id);
      return result;
    } catch (error) {
      return await Promise.reject(error)
    }
  },
  
  showModal(e) {
    this.setData({
      modalName: e.currentTarget.dataset.target
    })
  },
  hideModal(e) {
    const photo = this.data.photo
    this.setData({
      modalName: null,
      id: photo.id,
      name: photo.name,
      thumbnail: photo.thumbnail,
      location: photo.location,
      team: photo.team,
      description: photo.description,
      takeTime: photo.takeTime,
      url:photo.url
    })
    
  },
  nameInput(e){
    this.setData({
      name: e.detail.value
    });
  },
  thumbnailInput(e){
    this.setData({
      thumbnail: e.detail.value
    });
  },
  takeTimeInput(e){
    var dateStr = e.detail.value;
    dateStr = dateStr.replace(/-/g,'/');
    var date = new Date(dateStr);
    this.setData({
      takeTime: date.getTime()
    });
  },
  locationInput(e){
    this.setData({
      location: e.detail.value
    });
  },
  teamInput(e){
    this.setData({
      team: e.detail.value
    });
  },
  descriptionInput(e){
    this.setData({
      description: e.detail.value
    });
  },

  /**
   * 编辑
   */
  async editPhoto(){
    var that = this;
    const id = that.data.photo.id;
    if(!that.data.name){
      apiResult.warn("不能为空");
      return ;
    }
    if(!that.data.thumbnail){
      apiResult.warn("不能为空");
      return ;
    }
    const param = {
      name: that.data.name,
      thumbnail: that.data.thumbnail,
      location: that.data.location,
      team: that.data.team,
      description: that.data.description,
      takeTime: that.data.takeTime,
      url: that.data.url
    }
    try {
      const result = await adminEditPhotoDetails(id,param);
      that.setData({
        photo: result,
        modalName: null
      })
    } catch (error) {
      return await Promise.reject(error)
    }
  },

  /**
   * 删除
   */
  async deletePhoto() {
    var that = this;
    const id = that.data.photo.id;
     wx.showModal({
      title: 'Creator',
      content: '确定要删除这幅美景吗？',
      cancelText: '再看看',
      confirmText: '再见',
      success: async(res) => {
        if (res.confirm) {
          try {
            await adminDeletePhoto(id);
            apiResult.success("已删除");
            //无需刷新，直接返回图库列表
            let pages = getCurrentPages();
            let beforePage = pages[pages.length - 2];
            beforePage.onLoad();
            wx.navigateBack({
              delta: 1,
            })
          } catch (error) {
            apiResult.error("网络异常");
            return error.message;
          }
        }
      }
    })
  },

  /**
   * 复制
   * @param {*} e 
   */
  copyLink(e) {
    wx.setClipboardData({
      data: e.currentTarget.dataset.link,
      success: res => {
        wx.showToast({
          title: '已复制',
          duration: 1000,
        })
      }
    })
  }
})