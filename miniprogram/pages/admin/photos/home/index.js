const app = getApp();
import apiResult from '../../../../utils/api-result';
import { adminGetPhoto, adminAddPhoto } from '../../../../services/api/admin/photo';
import { adminAddAttachment } from '../../../../services/api/admin/attachment';
import config from '../../../../config/api';
Page({
  data: {
    CustomBar: app.globalData.CustomBar,
    topImage: config.CustomStyle.topImage,
    logo: "",
    imgPath: "",
    pageNo: 0,
    bottomFlag: false,
    uploadModal: false,
    content: [],
    batchView: false,
    indexs: [],
    selectAttachment: null
  },
  async onLoad() { 
    var that = this;
    that.setData({
      logo: app.globalData.logo
    })
    
  },
  async onShow() {
    var that = this;
    const selectAttachment = that.data.selectAttachment;
    if(selectAttachment){
      that.setData({
        uploadModal: true
      })
      await that.adminAddPhoto(selectAttachment);
      that.setData({
        selectAttachment: null
      })
      that.returnTop();
      that.setData({
        uploadModal: false
      })
      apiResult.success("上传成功")

    }
    that.setData({
      loadModal:true,
      content: [],
      pageNo: 0,
      indexs: []
    })
    var content = await this.getPhotos();
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
    const content = await this.getPhotos();
    if(content){
      that.setData({
        content: content
      });
    }
    
  },
  /**
   * 获取图库列表
   */
  async getPhotos() {
    var that = this;
    try {
      const param = {
        page: that.data.pageNo,
        size: config.PageSize.attachmentSize,
        sort: 'takeTime,desc'
      };
      const result = await adminGetPhoto(param);
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
  async adminAddAttachment(imgPath){
    try{
      const param = {
        path: imgPath
      }
      const result = await adminAddAttachment(param);
      return result
    } catch (error) {
      this.setData({
        uploadModal: false,
        modalName: null
      })
      return await Promise.reject(error)
    }
  },
  async adminAddPhoto(imgInfo){
    try{
      const param = {
        thumbnail: imgInfo.thumbPath,
        url: imgInfo.path,
        name: imgInfo.name,
        takeTime: imgInfo.createTime
      }
      const result = await adminAddPhoto(param);
      return result
    } catch (error) {
      this.setData({
        uploadModal: false,
        modalName: null
      })
      return await Promise.reject(error)
    }
  },
  showModal(e) {
    this.setData({
      modalName: e.currentTarget.dataset.target
    })
  },
  hideModal(e) {
    this.setData({
      modalName: null,
      uploadModal: false
    })
  },
  /**
   * 选择图片
   */
  async chooseImage(event) {
    var that = this;
    const type = event.currentTarget.dataset.type;
    const sourceType = [type];
    that.setData({
      uploadModal: true,
      modalName: null
    })
    wx.chooseImage({
      count: 1, //默认9
      sizeType: ['original', 'compressed'], //可以指定是原图还是压缩图，默认二者都有
      sourceType: sourceType, //从相册选择
      success: async(res) => {
        const imgInfo = await that.adminAddAttachment(res.tempFilePaths[0]);
        const result = await that.adminAddPhoto(imgInfo);
        that.data.content.unshift(result);
        that.setData({
          content: that.data.content
        })
        that.returnTop();
        that.setData({
          uploadModal: false
        })
        apiResult.success("上传成功")
        
      },
      fail: err=>{
        that.setData({
          uploadModal: false
        })
        apiResult.warn("取消上传")
      }
    }); 
  },
  
  /**
   * 跳到详情页
   * @param {*} event 
   */
  toDetailsPage: function (event) {
    const id = event.currentTarget.dataset.id;
    wx.navigateTo({
      url:'/pages/admin/photos/details/index?id='+id
    })
  },
  toChooseAttachment: function () {
    wx.navigateTo({
      url:'/pages/admin/attachment/select/index?type=1'
    })
  },

  returnTop() {
    if (wx.pageScrollTo) {
      wx.pageScrollTo({
        scrollTop: 0
      })
    } else {
      wx.showModal({
        title: '提示',
        content: '当前微信版本过低，无法使用该功能，请升级到最新微信版本后重试。'
      })
    }
  }

})
