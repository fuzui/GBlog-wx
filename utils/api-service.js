import api from '../config/api';
import apiRequest from './api-request';

/**
 * 获取主题配置
 */
function getThemeSettings() {
  return new Promise((resolve, reject) => {
    apiRequest.Get(api.getThemeSettings, {})
      .then(r => {
        resolve(r)
      }, e => {
        reject(e)
      })
  })
}
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
  getThemeSettings,
  getPhotos,
  getStatistics,
  getComments,
  getCommentsBySheetId,
  writeComment
}