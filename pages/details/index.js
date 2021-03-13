//获取应用实例
const app = getApp();
import apiService from '../../services/api/api-service'; 
import apiResult from '../../utils/api-result';
import { Config,ShareConfig,ParserStyle,CustomStyle } from '../../config/api';
import LastMayday from '../../services/posters/article/base';

Page({
  data: {
    noContentImage: CustomStyle.noContentImage,
    shareIsOpen: ShareConfig.isOpen,
    parserStyle: ParserStyle,
    
    isLoadComment: false,
    commentPage: 0,
    commmentPid: 0,
    commentMail: "",
    commentPrompt: "发表您的观点",
    modalShare: false,
    topImage: CustomStyle.topImage,
    logo: "",
    floorstatus: false, //是否显示回到顶端图标
		star_img: '/images/star.png',
    // 点赞数
    loveCount: 0,
    articleDetails: {
      // 评论数
      commentCount: 0,
      wordCount: 0,
      visits: 0,
      // 文章标签
      tags: [], 
      topPriority: false,
      disallowComment: false,
      createTime: 0
    },
    
    userInfo: {},
    checkStatus: true, //评论开关
    comments: [],
    childrenComments: [],
    //海报相关
    visible: false,
    imgsInfo: {},
    scene: "",
    notifiStatus: false
  },
  /**
   * 分享
   */
  async share(event) {
    var that = this;
    that.setData({
      modalShare: true
    })
  },
  /**
   * 取消分享
   */
  async hideModalshare(event) {
    var that = this;
    that.setData({
      modalShare: false
    })
  },
  /**
   * 分享
   * @param {*} res 
   */
  onShareAppMessage: function (res) {
    return {
      title: this.data.articleDetails.title,
      imageUrl: this.data.articleDetails.thumbnail?this.data.articleDetails.thumbnail:app.globalData.logo,
      path: '/pages/details/index?id='+this.data.id
    }
  },
  onShareTimeline: function (res) {
    return {
      title: this.data.articleDetails.title,
      imageUrl: this.data.articleDetails.thumbnail?this.data.articleDetails.thumbnail:app.globalData.logo,
      query: 'id='+this.data.id
    }
  },
  async onLoad(options) {
    var id = 0;
    // 扫码打开
    if (options.scene && !options.id) {
      const scene = decodeURIComponent(options.scene);
      var param = this.parseQuery(scene);
      id = param.id;
    } else {
      id = options.id;
    }
    this.setData({
      logo: app.globalData.logo,
      loadModal: true,
      scene: "id=" + id,
    })

    var that = this;
    const articleDetails = await this.getArticleDetails(id);
    const comments = await this.getComments(id,0);
    if(comments.pages > comments.page+1){
      that.setData({
        isLoadComment: true
      })
    }
    const html = articleDetails.formatContent;
    that.setData({
      articleDetails: articleDetails,
      id: articleDetails.id,
      content: html,
      loveCount: articleDetails.likes,
      comments: comments.content,
    });
    this.setData({
      loadModal:false
    })
  },
  async onShow() {
    var that = this;
    var pages = getCurrentPages();
    var currentPage = pages[pages.length - 1];
    that.setData({
      currentPage: currentPage
    })
  },
  wxmlTagATap(e) {
  },
  /**
   * 上滑刷新
   */
  onPullDownRefresh() {
    // 显示顶部刷新图标
    wx.showNavigationBarLoading();
    this.onLoad();
    setTimeout(function() {
      // 隐藏导航栏加载框
      wx.hideNavigationBarLoading();
      //停止当前页面下拉刷新。
      wx.stopPullDownRefresh()
    }, 1000);
  },
  /**
   * 获取文章详情
   */
  async getArticleDetails(id){
    try {
      const param = {   
        formatDisabled: false
      };
      const result = await apiService.getArticleDetails(id,param);
      return result;
    } catch (error) {
      return await Promise.reject(error)
    }
  },
  /**
   * 跳转海报页
   */
  toSharePage(event) {
    wx.hideLoading();
    wx.navigateTo({
      url: '/pages/share/index',
      success: (res) => {
        res.eventChannel.emit('shareImage', {
          shareImage: event.detail.path,
          id: this.data.id
        })
      }
    })
  },
  // 分享海报
  shareFriends() {
    const that = this;
    that.setData({
      modalShare: false
    })
    // 需要用户登陆
    var userInfo = wx.getStorageSync(Config.User);
    if (!userInfo.nickName) {
      that.setData({
        modalName: "loginModal",
      })
      return false;
    }
    wx.showLoading({
      title: '生成中',
    })
    wx.cloud.callFunction({
      name: "get_qrcode",
      data: {
        scene: that.data.scene,
        path: that.data.currentPage.route
      },
      success(res) {
        const filePath = wx.env.USER_DATA_PATH + '/' + Date.parse(new Date()) + '_buffer2file.jpg';
        let fileManager = wx.getFileSystemManager();
        fileManager.writeFile({
          filePath: filePath,
          encoding: 'binary',
          data: res.result.buffer,
          success(res) {
            const palette = new LastMayday().palette(
              app.globalData.blogTitle,
              userInfo.nickName,
              userInfo.avatarUrl,
              '/images/bg/background-share.png',
              that.data.articleDetails.title,
              that.data.articleDetails.summary,
              filePath);
            that.setData({
              palette: palette,
            })
          },
          fail(err) {
            console.log(err);
          }
        })
      }
    })
  },

  //关闭海报展示
  close() {
    this.setData({
      visible: false,
    })
  },

  /**
   * 点赞执行
   */
  async doPraise(postId) {
    try {
      const param = {};
      const result = await apiService.doPraise(postId,param);
      return result;
    } catch (error) {
      return error.message;
    }
  },
  /**
   * 点赞结果
   */
  async addStar(event) {
    var that = this;
    var count = event.currentTarget.dataset.lovecount;
    const postId = event.currentTarget.dataset.gid;
    const result = await this.doPraise(postId);
    if (result==null){
      //点赞数加一以界面不刷新显示
      that.setData({
        loveCount: count + 1
      });
      this.setData({
        msgFlag: true,
        msgData: "点赞成功"
      })
      setTimeout(()=> {
        this.setData({
          msgFlag: false
        })
      }, 1000)
    }else{
      this.setData({
        msgFlag: true,
        msgData: result
      })
      setTimeout(()=> {
        this.setData({
          msgFlag: false
        })
      }, 1000)
    }	
  },
  /**
   * 评论
   */
  addComment(e) {
    // 判断该文章评论功能是否关闭
    if(this.data.articleDetails.disallowComment){
      apiResult.warn("评论已关闭");
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
   * 查询字符串转对象
   */
  parseQuery(query) {
    var reg = /([^=&\s]+)[=\s]*([^&\s]*)/g;
    var obj = {};
    while (reg.exec(query)) {
      obj[RegExp.$1] = RegExp.$2;
    }
    return obj;
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
    var that = this;
    if (e.detail.value){
      that.setData({
        notifiStatus: true,
      })
    }
  },
  /**
   * 发表评论
   */
  async writeComment(){
    var that = this;
    if(!this.data.commentContent){
      apiResult.warn("内容不能为空");
      return ;
    }
    if(!this.data.commentMail){
      apiResult.warn("邮箱不能为空");
      return ;
    }
    wx.showLoading({
      title: '发布中',
      mask: true,
    })
    const param = {
      allowNotification: this.data.notifiStatus,
      author: this.data.userInfo.nickName,
      authorUrl: this.data.userInfo.avatarUrl,
      content: this.data.commentContent,
      email: this.data.commentMail,
      parentId: this.data.commmentPid,
      postId: this.data.id
    }
    apiService.writeComment(param).then(ress => {
      wx.hideLoading().then(()=>{
        that.setData({
          modalName: null
        })
        apiResult.success("发表成功");
      })
    }, err => {
      wx.hideLoading().then(()=>{
        that.setData({
          modalName: null
        })
        apiResult.success("发表失败");
      })
    }).catch(error=>{
        return error.message;
    })
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
      const result = await apiService.getComments(postId,param);
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
   * 点击上一篇
   */
  clickUp() {
    var that = this;
    if (!this.data.upUrl) {
      that.setData({
        modalMsg:"已经是第一篇了"
      })
    }else{
      wx.redirectTo({
        url: this.data.upUrl,
      })
    }
  },
  /**
   * 点击下一篇
   */
  clickDown() {
    var that = this;
    if (!this.data.downUrl) {
      that.setData({
        modalMsg:"已经是最后一篇了"
      })
    }else{
      wx.redirectTo({
        url: this.data.downUrl,
      })
    }
  },
  /**
   * 隐藏消息提示
   */
  hideMsg(){
    this.setData({
      modalMsg:""
    })
  },

  /**
   * 滚动条位置判断，从而隐藏/显示回到顶端图标
   * @param {*} e 
   */
  onPageScroll: function (e) {
    if (e.scrollTop > 100) {
      this.setData({
        floorstatus: true
      });
    } else {
      this.setData({
        floorstatus: false
      });
    }
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

  toTagPage(event) {
    wx.navigateTo({
      url: '../tag/index?id=' + event.currentTarget.dataset.id
    });
  },
  binderrorimg:function(e){  
    var errorImgIndex= e.target.dataset.errorimg ;
    var errorChildrenImgIndex = e.target.dataset.errorchildrenimg;
    var comments=this.data.comments;
    var gravatarMd5 = e.target.dataset.gravatarmd5;
    var comment = comments[errorImgIndex];
    if(errorChildrenImgIndex || errorChildrenImgIndex == 0) {
      var childrenComment = comment.children[errorChildrenImgIndex];
      childrenComment.authorUrl = "https://cdn.v2ex.com/gravatar/"+gravatarMd5+"?s=32&d=monsterid";
      comment.children[errorChildrenImgIndex] = childrenComment;
    }else {
      comment.authorUrl = "https://cdn.v2ex.com/gravatar/"+gravatarMd5+"?s=64&d=monsterid";
    }
    comments[errorImgIndex] = comment;
    this.setData({
      comments:comments
    });
  }
});