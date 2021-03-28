import apiRequest from './../../../utils/api-request';
import { ApiBaseUrl } from '../../../config/api'
import { STORAGE_KEY } from '../../const-data/const-data'
const moduleName = ApiBaseUrl + '/api/admin/sheets';

/**
 * 获取页面列表
 */
function adminGetSheet(param) {
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
 * 根据id修改页面状态
 */
function adminEditSheetStatus(sheetId,status) {
  const adminToken = {
    admin_token: wx.getStorageSync(STORAGE_KEY.adminToken)
  }
  const url = moduleName + '/' + sheetId + '/status/' + status;
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
 * 根据id删除页面
 */
function adminDeleteSheet(sheetId) {
  const adminToken = {
    admin_token: wx.getStorageSync(STORAGE_KEY.adminToken)
  }
  const url = moduleName + '/' + sheetId;
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
 * 获取页面评论列表
 */
function adminGetSheetComment(param) {
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
function adminAddSheetComment(data) {
  const adminToken = {
    admin_token: wx.getStorageSync(STORAGE_KEY.adminToken)
  }
  const url = moduleName + '/comments'
  return new Promise((resolve, reject) => {
    apiRequest.Sheet(url, data, adminToken)
      .then(r => {
        resolve(r)
      }, e => {
        reject(e)
      })
  })
}

/**
 * 根据id修改页面评论状态
 */
function adminEditSheetCommentStatus(commentId,status) {
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
 * 根据id删除页面评论
 */
function adminDeleteSheetComment(commentId) {
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
  adminGetSheet,
  adminEditSheetStatus,
  adminDeleteSheet,
  adminGetSheetComment,
  adminAddSheetComment,
  adminEditSheetCommentStatus,
  adminDeleteSheetComment
}