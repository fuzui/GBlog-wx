import { CustomStyle, MpHtmlStyle } from '../../config/api'
import { STORAGE_KEY, DEFAULT_VALUE, HALO_OPTION_KEY } from '../../services/const-data/const-data'
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
    }
  },
  options: {
    addGlobalClass: true
  },
  lifetimes: {
    async attached() {
      const options = wx.getStorageSync(STORAGE_KEY.options)
      let gravatarSource = options[HALO_OPTION_KEY.gravatarSource]
      if (!gravatarSource) {
        gravatarSource = DEFAULT_VALUE.gravatarSource
      }
      let gravatarDefault = options[HALO_OPTION_KEY.gravatarDefault]
      if (!gravatarDefault) {
        gravatarDefault = DEFAULT_VALUE.gravatarDefault
      }
      this.setData({
        gravatarSource: gravatarSource,
        gravatarDefault: gravatarDefault
      })
    }
  },
  methods: {
    addComment(e) {
      console.log(e.currentTarget.dataset.pid)
      const detail = {
        modalName: e.currentTarget.dataset.target,
        commmentPid: e.currentTarget.dataset.pid,
        commmentPname: e.currentTarget.dataset.pname
      }
      this.triggerEvent('addComment', detail)
    },
    binderrorimg: function (e) {
      const errorImgIndex = e.target.dataset.errorimg
      const errorChildrenImgIndex = e.target.dataset.errorchildrenimg
      const comments = this.data.comments
      const gravatarMd5 = e.target.dataset.gravatarmd5
      const comment = comments[errorImgIndex]
      if (errorChildrenImgIndex || errorChildrenImgIndex === 0) {
        const childrenComment = comment.children[errorChildrenImgIndex]
        childrenComment.authorUrl = this.data.gravatarSource + gravatarMd5 + '?s=32&d=' + this.data.gravatarDefault
        comment.children[errorChildrenImgIndex] = childrenComment
      } else {
        comment.authorUrl = this.data.gravatarSource + gravatarMd5 + '?s=64&d=' + this.data.gravatarDefault
      }
      comments[errorImgIndex] = comment
      this.setData({
        comments: comments
      })
    }
  }
})
