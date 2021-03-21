import api from './api-url';
import { STORAGE_KEY } from './../../services/const-data/const-data';
import apiRequest from './../../utils/api-request';

/**
 * option
 * @param {*} key 
 * @param {*} params 
 */
function getOptionByKey(key) {
  return new Promise((resolve, reject) => {
    apiRequest.Get(api.getOptionByKey(key), {})
      .then(r => {
        resolve(r)
      }, e => {
        reject(e)
      })
  })
}
/**
 * 获取分类
 * @param {*} params 
 */
function getCategories(params) {
  return new Promise((resolve, reject) => {
    apiRequest.Get(api.getCategories, params)
      .then(r => {
        resolve(r)
      }, e => {
        reject(e)
      })
  })
}
/**
 * 获取标签
 * @param {*} params 
 */
function getTags(params) {
  return new Promise((resolve, reject) => {
    apiRequest.Get(api.getTags, params)
      .then(r => {
        resolve(r)
      }, e => {
        reject(e)
      })
  })
}
/**
 * 获取分类下的文章
 * @param {分类名} slug 
 * @param {*} params 
 */
function getCategoriesArticle(slug,params) {
  return new Promise((resolve, reject) => {
    apiRequest.Get(api.getCategoriesArticle(slug), params)
      .then(r => {
        resolve(r)
      }, e => {
        reject(e)
      })
  })
}
/**
 * 获取全部文章
 * @param {*} params 
 */
function getArticleList(params) {
  return new Promise((resolve, reject) => {
    apiRequest.Get(api.getArticleList, params)
      .then(r => {
        resolve(r)
      }, e => {
        reject(e)
      })
  })
}
/**
 * 获取日记
 * @param {*} params 
 */
function getJournals(params) {
  return new Promise((resolve, reject) => {
    apiRequest.Get(api.getJournals, params)
      .then(r => {
        resolve(r)
      }, e => {
        reject(e)
      })
  })
}
/**
 * 获取轮播图
 * @param {*} params 
 */
function getSwiper(params) {
  return new Promise((resolve, reject) => {
    apiRequest.Get(api.getSwiper, params)
      .then(r => {
        resolve(r)
      }, e => {
        reject(e)
      })
  })
}
/**
 * 搜索文章
 * @param {*} params 
 */
function searchArticle(params) {
  return new Promise((resolve, reject) => {
    apiRequest.Post(api.searchArticle, params)
      .then(r => {
        resolve(r)
      }, e => {
        reject(e)
      })
  })
}

/**
 * 获取文章详情
 * @param {文章id} id 
 * @param {*} params 
 */
function getArticleDetails(id,params) {
  return new Promise((resolve, reject) => {
    apiRequest.Get(api.getArticleDetails(id), params)
      .then(r => {
        resolve(r)
      }, e => {
        reject(e)
      })
  })
}
/**
 * 点赞文章
 * @param {*} url 
 * @param {*} params 
 */
function doPraise(postId,params) {
  return new Promise((resolve, reject) => {
    apiRequest.Post(api.doPraise(postId), params)
      .then(r => {
        resolve(r)
      }, e => {
        reject(e)
      })
  })
}
/**
 * 获取归档
 */
function getArchives() {
  return new Promise((resolve, reject) => {
    apiRequest.Get(api.getArchives, {})
      .then(r => {
        resolve(r)
      }, e => {
        reject(e)
      })
  })
}
/**
 * 获取留言
 */
function getGuestbook() {
  return new Promise((resolve, reject) => {
    apiRequest.Get(api.getGuestbook, {})
      .then(r => {
        resolve(r)
      }, e => {
        reject(e)
      })
  })
}
/**
 * 获取友链
 */
function getLinks(params) {
  return new Promise((resolve, reject) => {
    apiRequest.Get(api.getLinks, params)
      .then(r => {
        resolve(r)
      }, e => {
        reject(e)
      })
  })
}
/**
 * 光影相册
 * @param {*} params 
 */
function getPhotos(params) {
  return new Promise((resolve, reject) => {
    apiRequest.Get(api.getPhotos, params)
      .then(r => {
        resolve(r)
      }, e => {
        reject(e)
      })
  })
}
/**
 * 获取统计信息
 */
function getStatistics() {
  return new Promise((resolve, reject) => {
    apiRequest.Get(api.getStatistics, {})
      .then(r => {
        resolve(r)
      }, e => {
        reject(e)
      })
  })
}
/**
 * 获取文章评论
 * @param {文章id} id 
 * @param {*} params 
 */
function getComments(id,params) {
  return new Promise((resolve, reject) => {
    apiRequest.Get(api.getComments(id), params)
      .then(r => {
        resolve(r)
      }, e => {
        reject(e)
      })
  })
}
/**
 * 获取sheet评论
 * @param {sheet id} id 
 * @param {*} params 
 */
function getCommentsBySheetId(id,params) {
  return new Promise((resolve, reject) => {
    apiRequest.Get(api.getCommentsBySheetId(id), params)
      .then(r => {
        resolve(r)
      }, e => {
        reject(e)
      })
  })
}

function writeComment(params) {
  return new Promise((resolve, reject) => {
    apiRequest.PostBody(api.writeComment, params)
      .then(r => {
        resolve(r)
      }, e => {
        reject(e)
      })
  })
}
function writeSheetComment(params) {
  return new Promise((resolve, reject) => {
    apiRequest.PostBody(api.writeSheetComment, params)
      .then(r => {
        resolve(r)
      }, e => {
        reject(e)
      })
  })
}

/**
 * 获取标签下的文章
 * @param {标签别名} slug 
 * @param {*} params 
 */
function getTagsArticle(slug,params) {
  return new Promise((resolve, reject) => {
    apiRequest.Get(api.getTagsArticle(slug), params)
      .then(r => {
        resolve(r)
      }, e => {
        reject(e)
      })
  })
}

/**
 * 登录
 * @param {*} params 
 */
function adminLogin(params) {
  return new Promise((resolve, reject) => {
    apiRequest.PostBody(api.adminLogin, params)
      .then(r => {
        resolve(r)
      }, e => {
        reject(e)
      })
  })
}

/**
 *  获取服务器配置
 */
function adminGetEnvironments() {
  return new Promise((resolve, reject) => {
    apiRequest.Get(api.adminGetEnvironments+wx.getStorageSync(STORAGE_KEY.adminToken), {})
      .then(r => {
        resolve(r)
      }, e => {
        reject(e)
      })
  })
}

/**
 * 获取站点及博主信息
 */
function adminGetStatistics() {
  return new Promise((resolve, reject) => {
    apiRequest.Get(api.adminGetStatistics+wx.getStorageSync(STORAGE_KEY.adminToken), {})
      .then(r => {
        resolve(r)
      }, e => {
        reject(e)
      })
  })
}

/**
 * 新建日记
 */
function adminAddJournal(param) {
  return new Promise((resolve, reject) => {
    apiRequest.PostBody(api.adminAddJournal+wx.getStorageSync(STORAGE_KEY.adminToken), param)
      .then(r => {
        resolve(r)
      }, e => {
        reject(e)
      })
  })
}

/**
 * 获取日记列表
 */
function adminGetJournal(param) {
  return new Promise((resolve, reject) => {
    apiRequest.Get(api.adminGetJournal+wx.getStorageSync(STORAGE_KEY.adminToken), param)
      .then(r => {
        resolve(r)
      }, e => {
        reject(e)
      })
  })
}

/**
 * 根据id删除日记
 */
function adminDeleteJournal(journalId) {
  return new Promise((resolve, reject) => {
    apiRequest.Delete(api.adminDeleteJournal(journalId)+wx.getStorageSync(STORAGE_KEY.adminToken), {})
      .then(r => {
        resolve(r)
      }, e => {
        reject(e)
      })
  })
}

/**
 * 根据友链id修改友链
 */
function adminEditJournal(journalId,param) {
  return new Promise((resolve, reject) => {
    apiRequest.Put(api.adminEditJournal(journalId)+wx.getStorageSync(STORAGE_KEY.adminToken), param)
      .then(r => {
        resolve(r)
      }, e => {
        reject(e)
      })
  })
}

/**
 * 新建友链
 */
function adminAddLink(param) {
  return new Promise((resolve, reject) => {
    apiRequest.PostBody(api.adminAddLink+wx.getStorageSync(STORAGE_KEY.adminToken), param)
      .then(r => {
        resolve(r)
      }, e => {
        reject(e)
      })
  })
}

/**
 * 获取友链列表
 */
function adminGetLink(param) {
  return new Promise((resolve, reject) => {
    apiRequest.Get(api.adminGetLink+wx.getStorageSync(STORAGE_KEY.adminToken), param)
      .then(r => {
        resolve(r)
      }, e => {
        reject(e)
      })
  })
}

/**
 * 根据id删除友链
 */
function adminDeleteLink(linkId) {
  return new Promise((resolve, reject) => {
    apiRequest.Delete(api.adminDeleteLink(linkId)+wx.getStorageSync(STORAGE_KEY.adminToken), {})
      .then(r => {
        resolve(r)
      }, e => {
        reject(e)
      })
  })
}

/**
 * 根据友链id修改友链
 */
function adminEditLink(linkId,param) {
  return new Promise((resolve, reject) => {
    apiRequest.Put(api.adminEditLink(linkId)+wx.getStorageSync(STORAGE_KEY.adminToken), param)
      .then(r => {
        resolve(r)
      }, e => {
        reject(e)
      })
  })
}

/**
 * 获取设置信息
 */
function adminGetOption() {
  return new Promise((resolve, reject) => {
    apiRequest.Get(api.adminGetOption+wx.getStorageSync(STORAGE_KEY.adminToken), {})
      .then(r => {
        resolve(r)
      }, e => {
        reject(e)
      })
  })
}

/**
 * 获取附件列表
 */
function adminGetAttachment(param) {
  return new Promise((resolve, reject) => {
    apiRequest.Get(api.adminGetAttachment+wx.getStorageSync(STORAGE_KEY.adminToken), param)
      .then(r => {
        resolve(r)
      }, e => {
        reject(e)
      })
  })
}

/**
 * 上传附件
 */
function adminAddAttachment(param) {
  return new Promise((resolve, reject) => {
    apiRequest.Upload(api.adminAddAttachment+wx.getStorageSync(STORAGE_KEY.adminToken), param)
      .then(r => {
        resolve(r)
      }, e => {
        reject(e)
      })
  })
}

/**
 * 获取附件详情
 */
function adminGetAttachmentDetails(id) {
  return new Promise((resolve, reject) => {
    apiRequest.Get(api.adminGetAttachmentDetails(id)+wx.getStorageSync(STORAGE_KEY.adminToken), {})
      .then(r => {
        resolve(r)
      }, e => {
        reject(e)
      })
  })
}

/**
 * 根据id编辑附件名
 */
function adminEditAttachmentDetails(attachmentId,param) {
  return new Promise((resolve, reject) => {
    apiRequest.Put(api.adminEditAttachmentDetails(attachmentId)+wx.getStorageSync(STORAGE_KEY.adminToken), param)
      .then(r => {
        resolve(r)
      }, e => {
        reject(e)
      })
  })
}

/**
 * 根据id删除附件
 */
function adminDeleteAttachment(attachmentId) {
  return new Promise((resolve, reject) => {
    apiRequest.Delete(api.adminDeleteAttachment(attachmentId)+wx.getStorageSync(STORAGE_KEY.adminToken), {})
      .then(r => {
        resolve(r)
      }, e => {
        reject(e)
      })
  })
}

/**
 * 批量删除附件
 */
function adminBatchDeleteAttachment(param) {
  return new Promise((resolve, reject) => {
    apiRequest.Delete(api.adminBatchDeleteAttachment+wx.getStorageSync(STORAGE_KEY.adminToken), param)
      .then(r => {
        resolve(r)
      }, e => {
        reject(e)
      })
  })
}

/**
 * 获取主题列表
 */
function adminGetTheme() {
  return new Promise((resolve, reject) => {
    apiRequest.Get(api.adminGetTheme+wx.getStorageSync(STORAGE_KEY.adminToken), {})
      .then(r => {
        resolve(r)
      }, e => {
        reject(e)
      })
  })
}

/**
 * 启用主题
 */
function adminActivatesTheme(thmemId) {
  return new Promise((resolve, reject) => {
    apiRequest.Post(api.adminActivatesTheme(thmemId)+wx.getStorageSync(STORAGE_KEY.adminToken), {})
      .then(r => {
        resolve(r)
      }, e => {
        reject(e)
      })
  })
}

/**
 * 根据id删除主题
 */
function adminDeleteTheme(thmemId) {
  return new Promise((resolve, reject) => {
    apiRequest.Delete(api.adminDeleteTheme(thmemId)+wx.getStorageSync(STORAGE_KEY.adminToken), {})
      .then(r => {
        resolve(r)
      }, e => {
        reject(e)
      })
  })
}

/**
 * 根据id在线更新主题
 */
function adminFetchingTheme(thmemId) {
  return new Promise((resolve, reject) => {
    apiRequest.Put(api.adminFetchingTheme(thmemId)+wx.getStorageSync(STORAGE_KEY.adminToken), {})
      .then(r => {
        resolve(r)
      }, e => {
        reject(e)
      })
  })
}

/**
 * 拉取新主题
 */
function adminFetchingNewTheme(param) {
  return new Promise((resolve, reject) => {
    apiRequest.Post(api.adminFetchingNewTheme+wx.getStorageSync(STORAGE_KEY.adminToken), param)
      .then(r => {
        resolve(r)
      }, e => {
        reject(e)
      })
  })
}

/**
 * 获取图库列表
 */
function adminGetPhoto(param) {
  return new Promise((resolve, reject) => {
    apiRequest.Get(api.adminGetPhoto+wx.getStorageSync(STORAGE_KEY.adminToken), param)
      .then(r => {
        resolve(r)
      }, e => {
        reject(e)
      })
  })
}

/**
 * 添加图库
 */
function adminAddPhoto(param) {
  return new Promise((resolve, reject) => {
    apiRequest.PostBody(api.adminAddPhoto+wx.getStorageSync(STORAGE_KEY.adminToken), param)
      .then(r => {
        resolve(r)
      }, e => {
        reject(e)
      })
  })
}

/**
 * 获取图库详情
 */
function adminGetPhotoDetails(photoId) {
  return new Promise((resolve, reject) => {
    apiRequest.Get(api.adminGetPhotoDetails(photoId)+wx.getStorageSync(STORAGE_KEY.adminToken), {})
      .then(r => {
        resolve(r)
      }, e => {
        reject(e)
      })
  })
}

/**
 * 根据id编辑图库
 */
function adminEditPhotoDetails(photoId,param) {
  return new Promise((resolve, reject) => {
    apiRequest.Put(api.adminEditPhotoDetails(photoId)+wx.getStorageSync(STORAGE_KEY.adminToken), param)
      .then(r => {
        resolve(r)
      }, e => {
        reject(e)
      })
  })
}

/**
 * 根据id删除图库
 */
function adminDeletePhoto(photoId) {
  return new Promise((resolve, reject) => {
    apiRequest.Delete(api.adminDeletePhoto(photoId)+wx.getStorageSync(STORAGE_KEY.adminToken), {})
      .then(r => {
        resolve(r)
      }, e => {
        reject(e)
      })
  })
}

/**
 * 获取菜单列表
 */
function adminGetMenu(param) {
  return new Promise((resolve, reject) => {
    apiRequest.Get(api.adminGetMenu+wx.getStorageSync(STORAGE_KEY.adminToken), param)
      .then(r => {
        resolve(r)
      }, e => {
        reject(e)
      })
  })
}

/**
 * 添加菜单
 */
function adminAddMenu(param) {
  return new Promise((resolve, reject) => {
    apiRequest.PostBody(api.adminAddMenu+wx.getStorageSync(STORAGE_KEY.adminToken), param)
      .then(r => {
        resolve(r)
      }, e => {
        reject(e)
      })
  })
}

/**
 * 根据id编辑菜单
 */
function adminEditMenu(menuId,param) {
  return new Promise((resolve, reject) => {
    apiRequest.Put(api.adminEditMenu(menuId)+wx.getStorageSync(STORAGE_KEY.adminToken), param)
      .then(r => {
        resolve(r)
      }, e => {
        reject(e)
      })
  })
}

/**
 * 根据id删除菜单
 */
function adminDeleteMenu(menuId) {
  return new Promise((resolve, reject) => {
    apiRequest.Delete(api.adminDeleteMenu(menuId)+wx.getStorageSync(STORAGE_KEY.adminToken), {})
      .then(r => {
        resolve(r)
      }, e => {
        reject(e)
      })
  })
}

/**
 * 修改用户信息
 */
function adminEditUser(param) {
  return new Promise((resolve, reject) => {
    apiRequest.Put(api.adminEditUser+wx.getStorageSync(STORAGE_KEY.adminToken), param)
      .then(r => {
        resolve(r)
      }, e => {
        reject(e)
      })
  })
}

/**
 * 修改密码
 */
function adminEditPassword(param) {
  return new Promise((resolve, reject) => {
    apiRequest.Put(api.adminEditPassword+wx.getStorageSync(STORAGE_KEY.adminToken), param)
      .then(r => {
        resolve(r)
      }, e => {
        reject(e)
      })
  })
}

/**
 * 获取文章评论列表
 */
function adminGetPostComment(param) {
  return new Promise((resolve, reject) => {
    apiRequest.Get(api.adminGetPostComment+wx.getStorageSync(STORAGE_KEY.adminToken), param)
      .then(r => {
        resolve(r)
      }, e => {
        reject(e)
      })
  })
}

/**
 * 回复评论
 */
function adminAddPostComment(param) {
  return new Promise((resolve, reject) => {
    apiRequest.PostBody(api.adminAddPostComment+wx.getStorageSync(STORAGE_KEY.adminToken), param)
      .then(r => {
        resolve(r)
      }, e => {
        reject(e)
      })
  })
}

/**
 * 根据id修改文章评论状态
 */
function adminEditPostCommentStatus(commentId,status) {
  return new Promise((resolve, reject) => {
    apiRequest.Put(api.adminEditPostCommentStatus(commentId,status)+wx.getStorageSync(STORAGE_KEY.adminToken), {})
      .then(r => {
        resolve(r)
      }, e => {
        reject(e)
      })
  })
}

/**
 * 根据id删除文章评论
 */
function adminDeletePostComment(commentId) {
  return new Promise((resolve, reject) => {
    apiRequest.Delete(api.adminDeletePostComment(commentId)+wx.getStorageSync(STORAGE_KEY.adminToken), {})
      .then(r => {
        resolve(r)
      }, e => {
        reject(e)
      })
  })
}

/**
 * 获取sheet评论列表
 */
function adminGetSheetComment(param) {
  return new Promise((resolve, reject) => {
    apiRequest.Get(api.adminGetSheetComment+wx.getStorageSync(STORAGE_KEY.adminToken), param)
      .then(r => {
        resolve(r)
      }, e => {
        reject(e)
      })
  })
}

/**
 * 回复sheet评论
 */
function adminAddSheetComment(param) {
  return new Promise((resolve, reject) => {
    apiRequest.PostBody(api.adminAddSheetComment+wx.getStorageSync(STORAGE_KEY.adminToken), param)
      .then(r => {
        resolve(r)
      }, e => {
        reject(e)
      })
  })
}

/**
 * 根据id修改sheet评论状态
 */
function adminEditSheetCommentStatus(commentId,status) {
  return new Promise((resolve, reject) => {
    apiRequest.Put(api.adminEditSheetCommentStatus(commentId,status)+wx.getStorageSync(STORAGE_KEY.adminToken), {})
      .then(r => {
        resolve(r)
      }, e => {
        reject(e)
      })
  })
}

/**
 * 根据id删除sheet评论
 */
function adminDeleteSheetComment(commentId) {
  return new Promise((resolve, reject) => {
    apiRequest.Delete(api.adminDeleteSheetComment(commentId)+wx.getStorageSync(STORAGE_KEY.adminToken), {})
      .then(r => {
        resolve(r)
      }, e => {
        reject(e)
      })
  })
}

function adminGetUserProfile() {
  return new Promise((resolve, reject) => {
    apiRequest.Get(api.adminGetUserProfile+wx.getStorageSync(STORAGE_KEY.adminToken), {})
      .then(r => {
        resolve(r)
      }, e => {
        reject(e)
      })
  })
}

/**
 * 获取标签列表
 */
function adminGetTag(param) {
  return new Promise((resolve, reject) => {
    apiRequest.Get(api.adminGetTag+wx.getStorageSync(STORAGE_KEY.adminToken), param)
      .then(r => {
        resolve(r)
      }, e => {
        reject(e)
      })
  })
}

/**
 * 添加标签
 */
function adminAddTag(param) {
  return new Promise((resolve, reject) => {
    apiRequest.PostBody(api.adminAddTag+wx.getStorageSync(STORAGE_KEY.adminToken), param)
      .then(r => {
        resolve(r)
      }, e => {
        reject(e)
      })
  })
}

/**
 * 编辑标签
 */
function adminEditTag(tagId,param) {
  return new Promise((resolve, reject) => {
    apiRequest.Put(api.adminEditTag(tagId)+wx.getStorageSync(STORAGE_KEY.adminToken), param)
      .then(r => {
        resolve(r)
      }, e => {
        reject(e)
      })
  })
}

/**
 * 删除标签
 */
function adminDeleteTag(tagId) {
  return new Promise((resolve, reject) => {
    apiRequest.Delete(api.adminDeleteTag(tagId)+wx.getStorageSync(STORAGE_KEY.adminToken), {})
      .then(r => {
        resolve(r)
      }, e => {
        reject(e)
      })
  })
}

/**
 * 获取分类列表
 */
function adminGetCategory(param) {
  return new Promise((resolve, reject) => {
    apiRequest.Get(api.adminGetCategory+wx.getStorageSync(STORAGE_KEY.adminToken), param)
      .then(r => {
        resolve(r)
      }, e => {
        reject(e)
      })
  })
}

/**
 * 添加分类
 */
function adminAddCategory(param) {
  return new Promise((resolve, reject) => {
    apiRequest.PostBody(api.adminAddCategory+wx.getStorageSync(STORAGE_KEY.adminToken), param)
      .then(r => {
        resolve(r)
      }, e => {
        reject(e)
      })
  })
}

/**
 * 编辑分类
 */
function adminEditCategory(categoryId,param) {
  return new Promise((resolve, reject) => {
    apiRequest.Put(api.adminEditCategory(categoryId)+wx.getStorageSync(STORAGE_KEY.adminToken), param)
      .then(r => {
        resolve(r)
      }, e => {
        reject(e)
      })
  })
}

/**
 * 删除分类
 */
function adminDeleteCategory(categoryId) {
  return new Promise((resolve, reject) => {
    apiRequest.Delete(api.adminDeleteCategory(categoryId)+wx.getStorageSync(STORAGE_KEY.adminToken), {})
      .then(r => {
        resolve(r)
      }, e => {
        reject(e)
      })
  })
}

/**
 * 获取文章列表
 */
function adminGetPost(param) {
  return new Promise((resolve, reject) => {
    apiRequest.Get(api.adminGetPost+wx.getStorageSync(STORAGE_KEY.adminToken), param)
      .then(r => {
        resolve(r)
      }, e => {
        reject(e)
      })
  })
}

/**
 * 根据id修改文章状态
 */
function adminEditPostStatus(postId,status) {
  return new Promise((resolve, reject) => {
    apiRequest.Put(api.adminEditPostStatus(postId,status)+wx.getStorageSync(STORAGE_KEY.adminToken), {})
      .then(r => {
        resolve(r)
      }, e => {
        reject(e)
      })
  })
}

/**
 * 根据id删除文章
 */
function adminDeletePost(postId) {
  return new Promise((resolve, reject) => {
    apiRequest.Delete(api.adminDeletePost(postId)+wx.getStorageSync(STORAGE_KEY.adminToken), {})
      .then(r => {
        resolve(r)
      }, e => {
        reject(e)
      })
  })
}

/**
 * 获取sheet列表
 */
function adminGetSheet(param) {
  return new Promise((resolve, reject) => {
    apiRequest.Get(api.adminGetSheet+wx.getStorageSync(STORAGE_KEY.adminToken), param)
      .then(r => {
        resolve(r)
      }, e => {
        reject(e)
      })
  })
}

/**
 * 根据id修改sheet状态
 */
function adminEditSheetStatus(sheetId,status) {
  return new Promise((resolve, reject) => {
    apiRequest.Put(api.adminEditSheetStatus(sheetId,status)+wx.getStorageSync(STORAGE_KEY.adminToken), {})
      .then(r => {
        resolve(r)
      }, e => {
        reject(e)
      })
  })
}

/**
 * 根据id删除sheet
 */
function adminDeleteSheet(sheetId) {
  return new Promise((resolve, reject) => {
    apiRequest.Delete(api.adminDeleteSheet(sheetId)+wx.getStorageSync(STORAGE_KEY.adminToken), {})
      .then(r => {
        resolve(r)
      }, e => {
        reject(e)
      })
  })
}

module.exports = {
  getCategories,
  getTags,
  getCategoriesArticle,
  getArticleList,
  getJournals,
  getSwiper,
  searchArticle,
  getArticleDetails,
  doPraise,
  getArchives,
  getGuestbook,
  getLinks,
  getOptionByKey,
  getPhotos,
  getStatistics,
  getComments,
  getCommentsBySheetId,
  writeComment,
  writeSheetComment,
  getTagsArticle,
  adminLogin,
  adminGetEnvironments,
  adminGetStatistics,
  adminAddJournal,
  adminGetJournal,
  adminDeleteJournal,
  adminEditJournal,
  adminAddLink,
  adminGetLink,
  adminDeleteLink,
  adminEditLink,
  adminGetOption,
  adminGetAttachment,
  adminAddAttachment,
  adminGetAttachmentDetails,
  adminEditAttachmentDetails,
  adminDeleteAttachment,
  adminBatchDeleteAttachment,
  adminGetTheme,
  adminActivatesTheme,
  adminDeleteTheme,
  adminFetchingTheme,
  adminFetchingNewTheme,
  adminGetPhoto,
  adminAddPhoto,
  adminGetPhotoDetails,
  adminEditPhotoDetails,
  adminDeletePhoto,
  adminGetMenu,
  adminAddMenu,
  adminEditMenu,
  adminDeleteMenu,
  adminEditUser,
  adminEditPassword,
  adminGetPostComment,
  adminAddPostComment,
  adminEditPostCommentStatus,
  adminDeletePostComment,
  adminGetSheetComment,
  adminAddSheetComment,
  adminEditSheetCommentStatus,
  adminDeleteSheetComment,
  adminGetUserProfile,
  adminGetTag,
  adminAddTag,
  adminEditTag,
  adminDeleteTag,
  adminGetCategory,
  adminAddCategory,
  adminEditCategory,
  adminDeleteCategory,
  adminGetPost,
  adminEditPostStatus,
  adminDeletePost,
  adminGetSheet,
  adminEditSheetStatus,
  adminDeleteSheet
}