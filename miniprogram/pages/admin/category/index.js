import {
  adminGetCategory,
  adminAddCategory,
  adminEditCategory,
  adminDeleteCategory
} from '../../../services/api/admin/category'
import { adminAddAttachment } from '../../../services/api/admin/attachment'
import apiResult from '../../../utils/api-result'

const app = getApp()

Page({
  data: {
    CustomBar: app.globalData.CustomBar,
    logo: '',
    loadModal: false,
    tagCur: 0,
    tagNavTop: 0,
    id: null,
    fullPath: '',
    name: '',
    slug: '',
    thumbnail: '',
    description: '',
    parentId: 0,
    categoryList: [],
    loading: false
  },
  async onLoad() {
    const that = this
    that.setData({
      logo: app.globalData.logo,
      loadModal: true
    })
    const categoryList = await this.getCategorys()
    const tag = categoryList[that.data.tagCur]
    that.setData({
      categoryList: categoryList,
      loadModal: false
    })
    that.setResult(that.data.tagCur, tag)
  },
  onShow() {
    const that = this
    const selectAttachment = that.data.selectAttachment
    if (selectAttachment) {
      const categoryList = that.data.categoryList
      const tag = categoryList[that.data.tagCur]
      that.setData({
        loadModal: false
      })
      that.setResult(that.data.tagCur, tag)
    }
  },
  onReady() {
    wx.hideLoading()
  },
  async tagSelect(e) {
    const that = this
    const tagCur = e.currentTarget.dataset.index
    let tag = {
      id: '',
      fullPath: '',
      name: '',
      slug: '',
      thumbnail: '',
      description: '',
      parentId: 0
    }
    if (tagCur !== -1) {
      tag = that.data.categoryList[tagCur]
    }
    that.setData({
      tagCur: tagCur
    })
    that.setResult(tagCur, tag)
  },
  /**
   * 获取分类列表
   */
  async getCategorys() {
    try {
      const param = {}
      const result = await adminGetCategory(param)
      return result
    } catch (error) {
      return await Promise.reject(error)
    }
  },
  showModal(e) {
    const that = this
    that.setData({
      modalName: e.currentTarget.dataset.target
    })
  },
  hideModal(e) {
    this.setData({
      modalName: null
    })
  },
  nameInput(e) {
    this.setData({
      name: e.detail.value
    })
  },
  slugInput(e) {
    this.setData({
      slug: e.detail.value
    })
  },
  thumbnailInput(e) {
    this.setData({
      thumbnail: e.detail.value
    })
  },
  parentIdInput(e) {
    const that = this
    let parentId = 0
    if (that.data.tagCur === e.detail.value) {
      apiResult.warn('不可选自己')
      return
    }
    parentId = that.data.categoryList[e.detail.value].id
    this.setData({
      parentId: parentId
    })
  },
  descriptionInput(e) {
    this.setData({
      description: e.detail.value
    })
  },
  /**
   * 新建分类
   */
  async addCategory() {
    const that = this
    if (!that.data.name) {
      apiResult.warn('名字不能为空')
      return
    }
    const param = {
      name: that.data.name,
      slug: that.data.slug,
      thumbnail: that.data.thumbnail,
      parentId: that.data.parentId,
      description: that.data.description
    }
    try {
      const result = await adminAddCategory(param)
      const categoryList = that.data.categoryList
      categoryList.unshift(result)
      that.setData({
        categoryList: categoryList
      })
      that.setResult(0, result)
      apiResult.success('新建成功')
    } catch (error) {
      return error.message
    }
  },
  /**
   * 编辑分类
   */
  async editCategory() {
    const that = this
    const id = that.data.id
    if (!that.data.name) {
      apiResult.warn('名字不能为空')
      return
    }
    const param = {
      name: that.data.name,
      slug: that.data.slug,
      thumbnail: that.data.thumbnail,
      parentId: that.data.parentId,
      description: that.data.description
    }
    try {
      const result = await adminEditCategory(id, param)
      const categoryList = that.data.categoryList
      categoryList.splice(that.data.tagCur, 1, result)
      that.setData({
        categoryList: categoryList
      })
      that.setResult(that.data.tagCur, result)
      apiResult.success('编辑成功')
    } catch (error) {
      return error.message
    }
  },
  /**
   * 删除分类
   */
  async deleteCategory() {
    const that = this
    const id = that.data.id
    wx.showModal({
      title: 'Creator',
      content: '确定要删除' + that.data.name + '分类吗？',
      cancelText: '再看看',
      confirmText: '再见',
      success: async res => {
        if (res.confirm) {
          try {
            await adminDeleteCategory(id)
            // 视图删除，不刷新调用接口
            const categoryList = that.data.categoryList
            categoryList.splice(that.data.tagCur, 1)
            const tag = categoryList[0]
            that.setData({
              categoryList: categoryList
            })
            that.setResult(0, tag)
            apiResult.success('已删除')
          } catch (error) {
            apiResult.error('网络异常')
            return error.message
          }
        }
      }
    })
  },
  /**
   * 选择图片
   */
  async chooseImage(event) {
    const that = this
    const type = event.currentTarget.dataset.type
    const sourceType = [type]
    that.setData({
      uploadModal: true,
      modalName: null
    })
    wx.chooseImage({
      count: 1, // 默认9
      sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
      sourceType: sourceType, // 从相册选择
      success: async res => {
        const imgInfo = await that.adminAddAttachment(res.tempFilePaths[0])
        that.setData({
          thumbnail: imgInfo.path
        })
        that.setData({
          uploadModal: false
        })
      },
      fail: () => {
        that.setData({
          uploadModal: false
        })
        apiResult.warn('取消上传')
      }
    })
  },
  async adminAddAttachment(imgPath) {
    try {
      const param = {
        path: imgPath
      }
      const result = await adminAddAttachment(param)
      return result
    } catch (error) {
      this.setData({
        modalName: null
      })
      return await Promise.reject(error)
    }
  },
  toChooseAttachment: function () {
    const that = this
    that.hideModal()
    wx.navigateTo({
      url: '/pages/admin/attachment/select/index?type=3&tagCur=' + that.data.tagCur
    })
  },
  setResult(tagCur, category) {
    const that = this
    that.setData({
      tagCur: tagCur,
      id: category.id,
      fullPath: category.fullPath,
      name: category.name,
      slug: category.slug,
      thumbnail: category.thumbnail,
      description: category.description,
      parentId: category.parentId,
      tagNavTop: (tagCur - 1) * 50
    })
  }
})
