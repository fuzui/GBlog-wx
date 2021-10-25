import apiRequest from './../../../utils/api-request';
import { ApiBaseUrl } from '../../../config/api'
import { STORAGE_KEY } from '../../const-data/const-data'
const moduleName = ApiBaseUrl + '/api/admin/login';

/**
 * 登录
 * @param {*} params 
 */
function adminLogin(params) {
  const adminToken = {
    admin_token: wx.getStorageSync(STORAGE_KEY.adminToken)
  }
  return new Promise((resolve, reject) => {
    apiRequest.Post(moduleName, params, adminToken)
      .then(r => {
        resolve(r)
      }, e => {
        reject(e)
      })
  })
}

/**
 * 登录前置检查
 * @param {*} params 
 */
function adminLoginPreCheck(params) {
  const url = moduleName + '/precheck';
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
  adminLogin,
  adminLoginPreCheck
}