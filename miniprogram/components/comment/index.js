//获取应用实例
const app = getApp();
import { CustomStyle, MpHtmlStyle } from '../../config/api';
import { STORAGE_KEY, DEFAULT_VALUE, HALO_OPTION_KEY } from '../../services/const-data/const-data';
Component({
  data: {
    noContentImage: CustomStyle.noContentImage,
    mpHtmlStyle: MpHtmlStyle,
    gravatarSource: DEFAULT_VALUE.gravatarSource,
    gravatarDefault: DEFAULT_VALUE.gravatarDefault
  },
  properties: {
    comments: {
      type: Array,
      value: []
    },
  },
  options: {
    addGlobalClass: true,
  },
  lifetimes: {
    async attached() {
      var options = wx.getStorageSync(STORAGE_KEY.options);
      var gravatarSource = options[HALO_OPTION_KEY.gravatarSource];
      if(!gravatarSource) {
        gravatarSource = DEFAULT_VALUE.gravatarSource;
      }
      var gravatarDefault = options[HALO_OPTION_KEY.gravatarDefault];
      if(!gravatarDefault) {
        gravatarDefault = DEFAULT_VALUE.gravatarDefault;
      }
      this.setData({
        gravatarSource: gravatarSource,
        gravatarDefault: gravatarDefault
      })
    }
  },
  methods: {
    addComment(e) {
      const detail = {
        modalName: e.currentTarget.dataset.target,
        commmentPid: e.currentTarget.dataset.pid,
        commmentPname: e.currentTarget.dataset.pname
      }
      this.triggerEvent('addComment', detail)
    },
    binderrorimg:function(e){  
      var errorImgIndex= e.target.dataset.errorimg;
      var errorChildrenImgIndex = e.target.dataset.errorchildrenimg;
      var comments=this.data.comments;
      var gravatarMd5 = e.target.dataset.gravatarmd5;
      var comment = comments[errorImgIndex];
      if(errorChildrenImgIndex || errorChildrenImgIndex == 0) {
        var childrenComment = comment.children[errorChildrenImgIndex];
        childrenComment.authorUrl = this.data.gravatarSource+gravatarMd5 + "?s=32&d=" + this.data.gravatarDefault;
        comment.children[errorChildrenImgIndex] = childrenComment;
      }else {
        comment.authorUrl = this.data.gravatarSource+gravatarMd5 + "?s=64&d=" + this.data.gravatarDefault;
      }
      comments[errorImgIndex] = comment;
      this.setData({
        comments:comments
      });
    }
  }
})
