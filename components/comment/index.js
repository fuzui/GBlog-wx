//获取应用实例
const app = getApp();
import { CustomStyle, MpHtmlStyle } from '../../config/api';
Component({
  data: {
    noContentImage: CustomStyle.noContentImage,
    mpHtmlStyle: MpHtmlStyle
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
  methods: {
    addComment(e) {
      const detail = {
        modalName: e.currentTarget.dataset.target,
        commentPrompt: e.currentTarget.dataset.prompt,
        commmentPid: e.currentTarget.dataset.pid
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
  }
})
