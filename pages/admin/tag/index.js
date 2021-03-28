const app = getApp()
import apiResult from '../../../utils/api-result';
import { adminGetTag, adminAddTag, adminEditTag, adminDeleteTag } from '../../../services/api/admin/tag';
import { adminAddAttachment } from '../../../services/api/admin/attachment';
import { CustomStyle } from '../../../config/api';
Page({
  data: {
    CustomBar: app.globalData.CustomBar,
    topImage: CustomStyle.topImage,
    logo: "",
    loadModal: false,
    tagCur: 0,
    tagNavTop: 0,
    logo: "",
    id: null,
    fullPath: "",
    name: "",
    slug: "",
    thumbnail: "",
    tagCur: 0,
    tagList: [],
    loading: false
  },
  async onLoad() {
    var that = this;
    that.setData({
      logo: app.globalData.logo,
      loadModal:true
    })
    const tagList = await this.getTags();
    const tag = tagList[that.data.tagCur];
    that.setData({
      tagList: tagList,
      loadModal:false
    });
    that.setResult(that.data.tagCur,tag);
  },
  onShow() {
    var that = this;
    const selectAttachment = that.data.selectAttachment;
    if(selectAttachment){
      const tagList = that.data.tagList;
      const tag = tagList[that.data.tagCur];
      that.setData({
        loadModal:false
      });
      that.setResult(that.data.tagCur,tag);
    }
  },
  onReady() {
    wx.hideLoading()
  },
  async tagSelect(e) {
    var that = this;
    const tagCur = e.currentTarget.dataset.index;
    let tag  ={
      id: "",
      fullPath: "",
      name: "",
      slug: "",
      thumbnail: "",
    }
    if(tagCur != -1){
      tag = that.data.tagList[tagCur];
    }
    that.setData({
      tagCur: tagCur
    })
    that.setResult(tagCur,tag)
  },
  /**
   * 获取标签
   */
  async getTags() {
    try {
      const param={};
      const result = await adminGetTag(param);
      return result;
    } catch (error) {
      return await Promise.reject(error)
    }
  },
  showModal(e) {
    var that = this;
    that.setData({
      modalName: e.currentTarget.dataset.target
    })
  },
  hideModal(e) {
    this.setData({
      modalName: null,
    })
  },
  nameInput(e){
    this.setData({
      name: e.detail.value
    });
  },
  slugInput(e){
    this.setData({
      slug: e.detail.value
    });
  },
  thumbnailInput(e){
    this.setData({
      thumbnail: e.detail.value
    });
  },
  /**
   * 新建标签
   */
  async addTag(){
    var that = this;
    if(!that.data.name){
      apiResult.warn("名字不能为空");
      return ;
    }
    const param = {
      name: that.data.name,
      slug: that.data.slug,
      thumbnail: that.data.thumbnail
    }
    try {
      const result = await adminAddTag(param);
      let tagList = that.data.tagList;
      tagList.unshift(result);
      that.setData({
        tagList:tagList,
      })
      that.setResult(0,result);
      apiResult.success("新建成功");
    } catch (error) {
      return error.message;
    }
  },
  /**
   * 编辑标签
   */
  async editTag(){
    var that = this;
    const id = that.data.id;
    if(!that.data.name){
      apiResult.warn("名字不能为空");
      return ;
    }
    const param = {
      name: that.data.name,
      slug: that.data.slug,
      thumbnail: that.data.thumbnail
    }
    try {
      const result = await adminEditTag(id,param);
      let tagList = that.data.tagList;
      tagList.splice(that.data.tagCur,1,result);
      that.setData({
        tagList:tagList
      })
      that.setResult(that.data.tagCur,result)
      apiResult.success("编辑成功");
    } catch (error) {
      return error.message;
    }
  },
  /**
   * 删除标签
   */
  async deleteTag() {
    var that = this;
    const id = that.data.id;
     wx.showModal({
      title: 'Creator',
      content: '确定要删除'+that.data.name+'标签吗？',
      cancelText: '再看看',
      confirmText: '再见',
      success: async(res) => {
        if (res.confirm) {
          try {
            await adminDeleteTag(id);
            //视图删除，不刷新调用接口
            let tagList = that.data.tagList;
            tagList.splice(that.data.tagCur,1)
            let tag = tagList[0];
            that.setData({
              tagList: tagList,
            });
            that.setResult(0,tag);
            apiResult.success("已删除");
          } catch (error) {
            apiResult.error("网络异常");
            return error.message;
          }
        }
      }
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
        that.setData({
          thumbnail:imgInfo.path
        })
        that.setData({
          uploadModal: false
        })
        
      },
      fail: err=>{
        that.setData({
          uploadModal: false
        })
        apiResult.warn("取消上传")
      }
    }); 
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
        modalName: null
      })
      return await Promise.reject(error)
    }
  },
  toChooseAttachment: function () {
    var that = this;
    that.hideModal();
    wx.navigateTo({
      url:'/pages/admin/attachment/select/index?type=3&tagCur='+that.data.tagCur
    })
  },
  setResult(tagCur,tag){
    var that = this;
    that.setData({
      tagCur: tagCur,
      id: tag.id,
      fullPath: tag.fullPath,
      name: tag.name,
      slug: tag.slug,
      thumbnail: tag.thumbnail,
      tagNavTop: (tagCur - 1) * 50
    });
  }
})