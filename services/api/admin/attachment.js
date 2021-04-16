import apiRequest from './../../../utils/api-request';
import { ApiBaseUrl } from '../../../config/api'
import { STORAGE_KEY } from '../../const-data/const-data'
const moduleName = ApiBaseUrl + '/api/admin/attachments';

/**
 * 新建附件
 */
function adminAddAttachment(data) {
  const adminToken = {
    admin_token: wx.getStorageSync(STORAGE_KEY.adminToken)
  }
  const url = moduleName + '/upload';
  return new Promise((resolve, reject) => {
    apiRequest.Upload(url, data, adminToken)
      .then(r => {
        resolve(r)
      }, e => {
        console.log(e)
        reject(e)
      })
  })
}

/**
 * 获取附件详情
 */
function adminGetAttachmentDetails(attachmentId) {
  const url = moduleName + '/' + attachmentId;
  const adminToken = {
    admin_token: wx.getStorageSync(STORAGE_KEY.adminToken)
  }
  return new Promise((resolve, reject) => {
    apiRequest.Get(url, {})
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
 * 根据id删除附件
 */
function adminDeleteAttachment(attachmentId) {
  const url = moduleName + '/' + attachmentId;
  const adminToken = {
    admin_token: wx.getStorageSync(STORAGE_KEY.adminToken)
  }
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
 * 根据id删除附件
 */
function adminBatchDeleteAttachment(param) {
  const url = moduleName + '/' + attachmentId;
  const adminToken = {
    admin_token: wx.getStorageSync(STORAGE_KEY.adminToken)
  }
  return new Promise((resolve, reject) => {
    apiRequest.Delete(url, Object.assign(adminToken, param))
      .then(r => {
        resolve(r)
      }, e => {
        reject(e)
      })
  })
}

/**
 * 根据附件id修改附件
 */
function adminEditAttachmentDetails(attachmentId,param) {
  const url = moduleName + '/' + attachmentId;
  const adminToken = {
    admin_token: wx.getStorageSync(STORAGE_KEY.adminToken)
  }
  return new Promise((resolve, reject) => {
    apiRequest.Put(url, param, adminToken)
      .then(r => {
        resolve(r)
      }, e => {
        reject(e)
      })
  })
}

module.exports = {
  adminAddAttachment,
  adminGetAttachment,
  adminDeleteAttachment,
  adminBatchDeleteAttachment,
  adminEditAttachmentDetails,
  adminGetAttachmentDetails
}