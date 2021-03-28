import apiRequest from './../../../utils/api-request';
import { ApiBaseUrl } from '../../../config/api'
import { STORAGE_KEY } from '../../const-data/const-data'
const moduleName = ApiBaseUrl + '/api/admin/posts';

/**
 * 获取文章列表
 */
function adminGetPost(param) {
  const adminToken = {
    admin_token: wx.getStorageSync(STORAGE_KEY.adminToken)
  }
  return new Promise((resolve, reject) => {
    apiRequest.Get(moduleName, Object.assign(adminToken, param))
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
  const adminToken = {
    admin_token: wx.getStorageSync(STORAGE_KEY.adminToken)
  }
  const url = moduleName + '/' + postId + '/status/' + status;
  return new Promise((resolve, reject) => {
    apiRequest.Put(url, {}, adminToken)
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
  const adminToken = {
    admin_token: wx.getStorageSync(STORAGE_KEY.adminToken)
  }
  const url = moduleName + '/' + postId;
  return new Promise((resolve, reject) => {
    apiRequest.Delete(url, adminToken)
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
  const adminToken = {
    admin_token: wx.getStorageSync(STORAGE_KEY.adminToken)
  }
  const url = moduleName + '/comments'
  return new Promise((resolve, reject) => {
    apiRequest.Get(url, Object.assign(adminToken, param))
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
function adminAddPostComment(data) {
  const adminToken = {
    admin_token: wx.getStorageSync(STORAGE_KEY.adminToken)
  }
  const url = moduleName + '/comments'
  return new Promise((resolve, reject) => {
    apiRequest.Post(url, data, adminToken)
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
  const adminToken = {
    admin_token: wx.getStorageSync(STORAGE_KEY.adminToken)
  }
  const url = moduleName + '/comments/' + commentId + '/status/' + status;
  return new Promise((resolve, reject) => {
    apiRequest.Put(url, {}, adminToken)
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
  const adminToken = {
    admin_token: wx.getStorageSync(STORAGE_KEY.adminToken)
  }
  const url = moduleName + '/comments/' + commentId;
  return new Promise((resolve, reject) => {
    apiRequest.Delete(url, adminToken)
      .then(r => {
        resolve(r)
      }, e => {
        reject(e)
      })
  })
}

module.exports = {
  adminGetPost,
  adminEditPostStatus,
  adminDeletePost,
  adminGetPostComment,
  adminAddPostComment,
  adminEditPostCommentStatus,
  adminDeletePostComment
}