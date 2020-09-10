//获取应用实例
const app = getApp();
import apiService from '../../../utils/api-service'; 
import apiResult from '../../../utils/api-result';
import { Config,ParserStyle,CustomStyle } from './../../../config/api';
Page({
  data: {
    noContentImage: CustomStyle.noContentImage,
    parserStyle:ParserStyle,
    id: 0,  //留言页postId
    topImage: CustomStyle.topImage,
    guestbookImage: CustomStyle.guestbookImage,
    logo: "",
    disallowComment: false,
    isLoadComment: false,
    commentPage: 0,
    commmentPid: 0,
    commentMail: "",
    allowNotification: true,
    commentPrompt: "发表您的观点",
    floorstatus: false, //是否显示回到顶端图标
    commentCount: 0,  //评论树
    userInfo: {},
    checkStatus: true, //评论开关
    comments: [],
    childrenComments: [],
    commentTotalCount: 0
  },
  async onLoad() { 
    var that = this;
    that.setData({
      logo: app.globalData.logo,
      id: Config.guestbookSheetId
    })
    that.setData({
      loadModal:true
    })
    const comments = await this.getComments(that.data.id,0);
    if(comments.pages > comments.page+1){
      that.setData({
        isLoadComment: true
      })
    }
    that.setData({  
      comments: comments.content,
      commentTotalCount: comments.total
    });
    this.setData({
      loadModal:false
    })
  },
  async onShow() {
  },
  /**
   * 评论
   */
  addComment(e) {
    // 判断该文章评论功能是否关闭
    if(this.data.disallowComment){
      apiResult.warn("留言已关闭");
      return ;
    }
    const userInfo = wx.getStorageSync(Config.User);
    if(!userInfo.nickName){
      this.setData({
        modalName: "loginModal",
      })
    }else{
      this.setData({
        commentContent: "",
        modalName: e.currentTarget.dataset.target,
        commentPrompt: e.currentTarget.dataset.prompt,
        commmentPid: e.currentTarget.dataset.pid,
        userInfo: userInfo,
      })
    }
  },
  /**
   * 获取用户信息
   * @param {*} e 
   */
  getUser(e){
    if (!e.detail.userInfo) {
      return apiResult.error("登录失败");
    } else {
      wx.setStorageSync(Config.User, e.detail.userInfo);
      this.setData({
        modalName: null,
      })
      return apiResult.success("登录成功");
    }
  },
  /**
   * 评论者输入邮箱
   */
  mailInput(e){
    this.setData({
      commentMail: e.detail.value
    });
  },
  /**
   * 评论内容输入
   * @param {*} e 
   */
  commentInput(e){
    this.setData({
      commentContent: e.detail.value
    });
  },
  /**
   * 是否回复邮箱通知
   * @param {*} e 
   */
  isAllowNotification(e){
    this.setData({
      allowNotification: e.detail.value
    });
  },
  /**
   * 发表评论
   */
  async writeSheetComment(){
    if(!this.data.commentContent){
      apiResult.warn("内容不能为空");
      return ;
    }
    if(!this.data.commentMail){
      apiResult.warn("邮箱不能为空");
      return ;
    }
    const param = {
      allowNotification: this.data.allowNotification,
      author: this.data.userInfo.nickName,
      content: this.data.commentContent,
      email: this.data.commentMail,
      parentId: this.data.commmentPid,
      postId: this.data.id
    }
    try {
      await apiService.writeSheetComment(param);
      this.setData({
        modalName: null
      })
      apiResult.success("发表成功");
    } catch (error) {
      return error.message;
    }
  },
  /**
   * 获取文章评论
   */
  async getComments(postId,commentPage) {
    var that = this;
    try {
      const param = {
        page: commentPage,
        sort: 'createTime,desc'
      };
      const result = await apiService.getCommentsBySheetId(postId,param);
      for(var i = 0;i<result.content.length;i++){
        if(result.content[i].children){
          const children = that.getChildren(result.content[i].children);
          result.content[i].children = children;
        }
      }
      return result;
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
        children = children.concat(that.getChildren(c[i].children));
      }
    }
    return children;
  },
  /**
   * 
   */
  returnTop(e) {
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
  },
  showModal(e) {
    this.setData({
      modalName: e.currentTarget.dataset.target
    })
  },
  hideModal(e) {
    this.setData({
      commentContent: "",
      modalName: null
    })
  },
  /**
   * 加载更多评论
   */
  async loadComment(){
    var that = this;
    let currentPage = that.data.commentPage;
    const comments = await this.getComments(that.data.id,currentPage+1);
    if(comments.pages <= comments.page+1){
      that.setData({
        isLoadComment: false
      })
    }
    that.setData({
      commentPage: currentPage+1,
      comments: this.data.comments.concat(comments.content)
    })
  },
  onShareAppMessage: function(res) {
    return {
      title: app.globalData.blogTitle+'的留言板',
      imageUrl: CustomStyle.guestbookImage,
      path: '/pages/about/guestbook/index'
    }
  },
  onShareTimeline: function (res) {
    return {
      title: app.globalData.blogTitle+'的留言板',
      imageUrl: CustomStyle.guestbookImage
    }
  },
})