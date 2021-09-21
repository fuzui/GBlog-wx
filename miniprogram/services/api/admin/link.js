import apiRequest from './../../../utils/api-request';
import { ApiBaseUrl } from '../../../config/api'
import { STORAGE_KEY } from '../../const-data/const-data'
const moduleName = ApiBaseUrl + '/api/admin/links';

/**
 * 新建友链
 */
function adminAddLink(data) {
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
 * 获取友链列表
 */
function adminGetLink(param) {
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
 * 根据id删除友链
 */
function adminDeleteLink(linkId) {
  const adminToken = {
    admin_token: wx.getStorageSync(STORAGE_KEY.adminToken)
  }
  const url = moduleName + '/' + linkId;
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
 * 根据友链id修改友链
 */
function adminEditLink(linkId,param) {
  const adminToken = {
    admin_token: wx.getStorageSync(STORAGE_KEY.adminToken)
  }
  const url = moduleName + '/' + linkId;
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
  adminAddLink,
  adminGetLink,
  adminDeleteLink,
  adminEditLink,
}