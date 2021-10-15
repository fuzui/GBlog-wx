//获取应用实例
const app = getApp();
import { getComments, getArticleDetails } from '../../../services/api/content/article';
import { getCommentsBySheetId, getSheetDetails } from '../../../services/api/content/sheet';
import { STORAGE_KEY, COMMENT_TYPE } from '../../../services/const-data/const-data';
import apiResult from '../../../utils/api-result';

Page({
  data: {
    logo: "",
    title: "评论",
    pageNo: 0,
    loadingComplete: false,
    currentOpenId: 0,
    commmentPid: 0,
    isLoadComment: false,
    comments: [],
    type: 'post',
    disallowComment: false,
    commentCount: 0
  },
  
  async onLoad(options) {
    //加载  
    var that = this;
    var id = options.id;
    var type = options.type
    that.setData({
      type: type
    })
    if (type == COMMENT_TYPE.guestbook) {
      that.setData({
        title: "留言"
      })
    }
    if (!app.globalData.hasInit) {
      await app.init()
    }
    const detail = await this.getDetails(id);
    that.setData({
      logo: app.globalData.logo,
      id: id,
      disallowComment: detail.disallowComment,
      commentCount: detail.commentCount
    })
    const comments = await this.getComments(id);
    that.setData({
      comments: comments,
    });
    
  },
  async onShow() {
  },
  addCommentByComponent(e) {
    this.selectComponent("#commentComponent").addComment(e)
  },
  /**
   * 评论
   */
  addComment(e) {
    // 判断该文章评论功能是否关闭
    if(this.data.disallowComment == 'true'){
      apiResult.warn(this.data.tiitle + "已关闭");
      return ;
    }
    const userInfo = wx.getStorageSync(STORAGE_KEY.user);
    if(!userInfo.nickName){
      this.setData({
        modalName: "loginModal",
      })
    }else{
      wx.navigateTo({
        url: '/pages/comment/publish/index?id=' + this.data.id
          + '&commmentPid=' + e.detail.commmentPid
          + '&commmentPname=' + e.detail.commmentPname
          + '&type=' + this.data.type
      })
    }
  },
  /**
   * 获取文章/sheet详情
   */
  async getDetails(id) {
    var that = this;
    var result = {};
    const param = {   
      formatDisabled: false
    };
    if (that.data.type == COMMENT_TYPE.post) {
      result = await getArticleDetails(id,param);
    } else {
      result = await getSheetDetails(id, param)
    }
    return result
  },
  /**
   * 获取文章评论
   */
  async getComments(postId) {
    var that = this;
    try {
      var pageNo = that.data.pageNo;
      const param = {
        page: pageNo,
        sort: 'createTime,desc'
      };
      var result;
      if (that.data.type == COMMENT_TYPE.post) {
        result = await getComments(postId,param);
      } else {
        result = await getCommentsBySheetId(postId,param);
      }
      for(var i = 0;i<result.content.length;i++){
        if(result.content[i].children){
          const children = that.getChildren(result.content[i].children);
          result.content[i].children = children;
        }
      }
      if (result.page < result.pages) {
        if(result.total<=result.rpp){
          that.setData({
            loadingComplete: true
          });
        }
        return that.data.comments.concat(result.content);
      } else {
        that.setData({
          loadingComplete: true
        });
        return that.data.comments;
      }
    } catch (error) {
      return error.message;
    }
  },
  /**
   * 子评论处理
   * 也就是将树一级节点下的子节点归纳为同一级
   */
  getChildren(children){
    var that = this;
    //复制一下，避免队列追加后有变，c用于控制循环
    var c = children;
    for(var i = 0; i < c.length; i++){
      if(c[i].children){
        // c[i].children[parentAuthor] = c[i].author
        var subChildren = c[i].children
        for (var j = 0; j < c[i].children.length; j++) {
          c[i].children[j].parentAuthor = c[i].author
        }
        children = children.concat(that.getChildren(c[i].children));
      }
    }
    return children;
  },
  /**
   * 向下滑动拉去下一页
   */
  async onReachBottom() {
    var that = this;
    if (!that.data.loadingComplete) {
      var pageNo = ++that.data.pageNo;
      that.setData({
        pageNo: pageNo,
      });
      const comments = await that.getComments(that.data.id);
      that.setData({
        comments: comments
      });
    }
  
  },
  toDetailPage (event) {
    const slug = event.currentTarget.dataset.slug;
    const name = event.currentTarget.dataset.name;
    //详情页跳转
    wx.navigateTo({
      url: '/pages/type/details/index?slug=' + slug + '&name=' + name
    })
  },
});