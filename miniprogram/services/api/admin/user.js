import apiRequest from './../../../utils/api-request'
import { ApiBaseUrl } from '../../../config/api'
import { STORAGE_KEY } from '../../const-data/const-data'
const moduleName = ApiBaseUrl + '/api/admin/users'

/**
 * 获取用户信息
 */
function adminGetUserProfile() {
  const adminToken = {
    admin_token: wx.getStorageSync(STORAGE_KEY.adminToken)
  }
  const url = moduleName + '/profiles'
  return new Promise((resolve, reject) => {
    apiRequest.Get(url, adminToken).then(
      r => {
        resolve(r)
      },
      e => {
        reject(e)
      }
    )
  })
}

/**
 * 修改用户信息
 */
function adminEditUser(param) {
  const adminToken = {
    admin_token: wx.getStorageSync(STORAGE_KEY.adminToken)
  }
  const url = moduleName + '/profiles'
  return new Promise((resolve, reject) => {
    apiRequest.Put(url, param, adminToken).then(
      r => {
        resolve(r)
      },
      e => {
        reject(e)
      }
    )
  })
}

/**
 * 修改用户信息
 */
function adminEditPassword(param) {
  const adminToken = {
    admin_token: wx.getStorageSync(STORAGE_KEY.adminToken)
  }
  const url = moduleName + '/profiles/password'
  return new Promise((resolve, reject) => {
    apiRequest.Put(url, param, adminToken).then(
      r => {
        resolve(r)
      },
      e => {
        reject(e)
      }
    )
  })
}

module.exports = {
  adminGetUserProfile,
  adminEditUser,
  adminEditPassword
}
