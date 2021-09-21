import apiRequest from './../../../utils/api-request';
import { ApiBaseUrl } from '../../../config/api'
import { STORAGE_KEY } from '../../const-data/const-data'
const moduleName = ApiBaseUrl + '/api/admin/tags';

/**
 * 获取标签列表
 */
function adminGetTag(param) {
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
 * 添加标签
 */
function adminAddTag(data) {
  const adminToken = {
    admin_token: wx.getStorageSync(STORAGE_KEY.adminToken)
  }
  return new Promise((resolve, reject) => {
    apiRequest.Post(moduleName, data, adminToken)
      .then(r => {
        resolve(r)
      }, e => {
        reject(e)
      })
  })
}

/**
 * 根据id编辑标签
 */
function adminEditTag(tagId,param) {
  const adminToken = {
    admin_token: wx.getStorageSync(STORAGE_KEY.adminToken)
  }
  const url = moduleName + '/' + tagId;
  return new Promise((resolve, reject) => {
    apiRequest.Put(url, param, adminToken)
      .then(r => {
        resolve(r)
      }, e => {
        reject(e)
      })
  })
}

/**
 * 根据id删除标签
 */
function adminDeleteTag(tagId) {
  const adminToken = {
    admin_token: wx.getStorageSync(STORAGE_KEY.adminToken)
  }
  const url = moduleName + '/' + tagId;
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
  adminGetTag,
  adminAddTag,
  adminEditTag,
  adminDeleteTag
}