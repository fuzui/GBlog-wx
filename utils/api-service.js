import api from '../config/api';
import apiRequest from './api-request';

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
    apiRequest.Get(api.adminGetEnvironments+wx.getStorageSync(api.Config.Token), {})
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
    apiRequest.Get(api.adminGetStatistics+wx.getStorageSync(api.Config.Token), {})
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
    apiRequest.PostBody(api.adminAddJournal+wx.getStorageSync(api.Config.Token), param)
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
    apiRequest.Get(api.adminGetJournal+wx.getStorageSync(api.Config.Token), param)
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
    apiRequest.Delete(api.adminDeleteJournal(journalId)+wx.getStorageSync(api.Config.Token), {})
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
    apiRequest.Put(api.adminEditJournal(journalId)+wx.getStorageSync(api.Config.Token), param)
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
    apiRequest.PostBody(api.adminAddLink+wx.getStorageSync(api.Config.Token), param)
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
    apiRequest.Get(api.adminGetLink+wx.getStorageSync(api.Config.Token), param)
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
    apiRequest.Delete(api.adminDeleteLink(linkId)+wx.getStorageSync(api.Config.Token), {})
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
    apiRequest.Put(api.adminEditLink(linkId)+wx.getStorageSync(api.Config.Token), param)
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
    apiRequest.Get(api.adminGetOption+wx.getStorageSync(api.Config.Token), {})
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
    apiRequest.Get(api.adminGetAttachment+wx.getStorageSync(api.Config.Token), param)
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
    apiRequest.Upload(api.adminAddAttachment+wx.getStorageSync(api.Config.Token), param)
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
    apiRequest.Get(api.adminGetAttachmentDetails(id)+wx.getStorageSync(api.Config.Token), {})
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
    apiRequest.Put(api.adminEditAttachmentDetails(attachmentId)+wx.getStorageSync(api.Config.Token), param)
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
    apiRequest.Delete(api.adminDeleteAttachment(attachmentId)+wx.getStorageSync(api.Config.Token), {})
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
    apiRequest.Delete(api.adminBatchDeleteAttachment+wx.getStorageSync(api.Config.Token), param)
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
  adminBatchDeleteAttachment
}