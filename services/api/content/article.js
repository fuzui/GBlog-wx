import apiRequest from './../../../utils/api-request';
import { ApiBaseUrl } from '../../../config/api';
const moduleName = ApiBaseUrl + '/api/content/posts';

/**
 * 获取全部文章
 * @param {*} params 
 */
function getArticleList(params) {
  return new Promise((resolve, reject) => {
    apiRequest.Get(moduleName, params)
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
  const url = moduleName + '/search'
  return new Promise((resolve, reject) => {
    apiRequest.Post(url, params)
      .then(r => {
        resolve(r)
      }, e => {
        reject(e)
      })
  })
}

/**
 * 获取文章详情
 * @param {*} id 
 * @param {*} params 
 */
function getArticleDetails(id,params) {
  const url = moduleName + '/' + id
  return new Promise((resolve, reject) => {
    apiRequest.Get(url, params)
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
  const url = moduleName + '/' + postId + '/likes'
  return new Promise((resolve, reject) => {
    apiRequest.Post(url, params)
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
  const url = moduleName + '/' + id + '/comments/tree_view'
  return new Promise((resolve, reject) => {
    apiRequest.Get(url, params)
      .then(r => {
        resolve(r)
      }, e => {
        reject(e)
      })
  })
}
/**
 * 发布文章评论
 * @param {*} params 
 */
function writeComment(params) {
  const url = moduleName + '/comments'
  return new Promise((resolve, reject) => {
    apiRequest.Post(url, params, {})
      .then(r => {
        resolve(r)
      }, e => {
        reject(e)
      })
  })
}

module.exports = {
  getArticleList,
  searchArticle,
  getArticleDetails,
  doPraise,
  getComments,
  writeComment
}