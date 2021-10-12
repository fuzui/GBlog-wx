//获取应用实例
const app = getApp();
import { adminGetPost, adminDeletePost, adminEditPostStatus } from '../../../services/api/admin/post';
import { adminGetSheet, adminDeleteSheet, adminEditSheetStatus } from '../../../services/api/admin/sheet';
import apiResult from '../../../utils/api-result';
import { PageSize } from './../../../config/api';
Page({
  data: {
    logo: "",
    articleList: [],
    pageNo: 0,
    bottomFlag: false,
    type: 1,
  },
  async onLoad() { 
    var that = this;
    that.setData({
      logo: app.globalData.logo,
    })
  },
  async onShow() {
    var that = this;
    that.setData({
      loadModal:true
    })
    const articleList = await this.getArticle();
    that.setData({
      articleList: articleList,
      loadModal:false
    });
  },
  
  /**
   * 获取文章列表
   */
  async getArticle() {
    var that = this;
    try {
      const type = that.data.type;
      const param = {
        page: that.data.pageNo,
        size: PageSize.journalSize,
        sort: 'createTime,desc'
      };
      var result = [];
      if(type == 1){
        result = await adminGetPost(param);
      }else{
        result = await adminGetSheet(param);
      }
      if(result.page < result.pages){
        return that.data.articleList.concat(result.content);
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
   * 加入文章到回收站
   * @param {*} e 
   */
  async recyclingArticle(e) {
    var that = this;
    const index = e.currentTarget.dataset.index;
    const id = e.currentTarget.dataset.id;
     wx.showModal({
      title: 'Creator',
      content: '确定要将此评论加入回收站？',
      cancelText: '再看看',
      confirmText: '回收',
      success: async(res) => {
        if (res.confirm) {
          await that.editArticle(id,'RECYCLE',index); 
        }
      }
    })
  },
  /**
   * 发布
   * @param {*} e 
   */
  async auditArticle(e) {
    var that = this;
    const index = e.currentTarget.dataset.index;
    const id = e.currentTarget.dataset.id;
    await that.editArticle(id,'PUBLISHED',index); 
  },

  /**
   * 删除文章
   * @param {*} e 
   */
  async deleteArticle(e) {
    var that = this;
    const type = that.data.type;
    const index = e.currentTarget.dataset.index;
    const id = e.currentTarget.dataset.id;
     wx.showModal({
      title: 'Creator',
      content: '确定要删除这个文章吗？',
      cancelText: '再看看',
      confirmText: '再见',
      success: async(res) => {
        if (res.confirm) {
          try {
            if(type == 1){
              await adminDeletePost(id);
            }else{
              await adminDeleteSheet(id);
            }
            //视图删除，不刷新调用接口
            that.data.articleList.splice(index,1)
            that.setData({
              articleList: that.data.articleList
            });
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
   * 修改文章状态
   */
  async editArticle(id,status,index){
    var that = this;
    const type = that.data.type;
    var result = {}
    try {
      if(type == 1){
        result = await adminEditPostStatus(id,status);
      }else{
        result = await adminEditSheetStatus(id,status);
      }
      // //视图修改，而非重新调用接口刷新
      that.data.articleList.splice(index,1,result);
      that.setData({
        articleList:that.data.articleList
      })
      apiResult.success("操作成功");
    } catch (error) {
      apiResult.error(error.message);
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
    const content = await this.getArticle();
    if(content){
      that.setData({
        articleList: content
      });
    }
  },

  async tabSelect(e){
    var that = this;
    var type = e.currentTarget.dataset.type;
    that.setData({
      type: type,
      articleList: [],
      pageNo: 0,
      bottomFlag: false,
    })
    await that.onShow();
  }
})