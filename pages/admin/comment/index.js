//获取应用实例
const app = getApp();
import apiService from '../../../utils/api-service'; 
import apiResult from '../../../utils/api-result';
import { ApiBaseUrl,PageSize,ParserStyle,CustomStyle } from './../../../config/api';
Page({
  data: {
    parserStyle:ParserStyle,
    topImage: CustomStyle.topImage,
    logo: "",
    commentContent: "",
    modalName: null,
    currentId: null,
    currentPostId: null,
    currentName: "",
    currentIndex: null,
    commentList: [],
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
    const commentList = await this.getComment();
    that.setData({
      commentList: commentList,
      loadModal:false
    });
  },
  
  /**
   * 输入评论
   */
  commentInput(e){
    this.setData({
      commentContent: e.detail.value
    });
  },

  /**
   * 回复评论
   */
  async replyComment(){
    var that = this;
    if(!that.data.commentContent){
      apiResult.warn("不能为空");
      return ;
    }
    that.setData({
      loadModal:true
    })
    const type = that.data.type;
    try {
      const user = await apiService.adminGetUserProfile();
      const param = {
        allowNotification: true,
        author: user.nickname,
        authorUrl: ApiBaseUrl,
        content: that.data.commentContent,
        email: user.email,
        parentId: that.data.currentId,
        postId: that.data.currentPostId
      };
      var result = {};
      if(type == 1){
        result = await apiService.adminAddPostComment(param);
      }else{
        result = await apiService.adminAddSheetComment(param);
      }
      that.data.commentList.unshift(result);
      that.setData({
        commentList:that.data.commentList
      })
      that.hideModal()
      apiResult.success("回复成功");
       
    } catch (error) {
      that.hideModal()
      apiResult.error(error);
    }
  },

  /**
   * 获取评论列表
   */
  async getComment() {
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
        result = await apiService.adminGetPostComment(param);
      }else{
        result = await apiService.adminGetSheetComment(param);
      }
      if(result.page < result.pages){
        return that.data.commentList.concat(result.content);
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
   * 加入评论到回收站
   * @param {*} e 
   */
  async recyclingComment(e) {
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
          await that.editComment(id,'RECYCLE',index); 
        }
      }
    })
  },
  /**
   * 通过审核
   * @param {*} e 
   */
  async auditComment(e) {
    var that = this;
    const index = e.currentTarget.dataset.index;
    const id = e.currentTarget.dataset.id;
    await that.editComment(id,'PUBLISHED',index); 
  },

  /**
   * 删除评论
   * @param {*} e 
   */
  async deleteComment(e) {
    var that = this;
    const type = that.data.type;
    const index = e.currentTarget.dataset.index;
    const id = e.currentTarget.dataset.id;
     wx.showModal({
      title: 'Creator',
      content: '确定要删除这个评论吗？',
      cancelText: '再看看',
      confirmText: '再见',
      success: async(res) => {
        if (res.confirm) {
          try {
            if(type == 1){
              await apiService.adminDeletePostComment(id);
            }else{
              await apiService.adminDeleteSheetComment(id);
            }
            //视图删除，不刷新调用接口
            that.data.commentList.splice(index,1)
            that.setData({
              commentList: that.data.commentList
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
   * 修改评论状态
   */
  async editComment(id,status,index){
    var that = this;
    const type = that.data.type;
    var result = {}
    try {
      if(type == 1){
        result = await apiService.adminEditPostCommentStatus(id,status);
      }else{
        result = await apiService.adminEditSheetCommentStatus(id,status);
      }
      // //视图修改，而非重新调用接口刷新
      that.data.commentList.splice(index,1,result);
      that.setData({
        commentList:that.data.commentList
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
    const content = await this.getComment();
    if(content){
      that.setData({
        commentList: content
      });
    }
    
  },

  showModal(e) {
    var that = this;
    const index = e.currentTarget.dataset.index;
    const currentComment = that.data.commentList[index];
    var currentPostId = 0;
    if(that.data.type == 1){
      currentPostId = currentComment.post.id;
    }else{
      currentPostId = currentComment.sheet.id;
    }
    that.setData({
      modalName: e.currentTarget.dataset.target,
      currentId: currentComment.id,
      currentName: currentComment.author,
      currentIndex: index,
      currentPostId: currentPostId
    })

  },
  hideModal(e) {
    this.setData({
      loadModal: false,
      modalName: null,
      currentId: null,
      currentName: "",
      currentIndex: null
    })
  },

  async tabSelect(e){
    var that = this;
    var type = e.currentTarget.dataset.type;
    that.setData({
      type: type,
      commentList: [],
      pageNo: 0,
      bottomFlag: false,
    })
    await that.onShow();
  }
})