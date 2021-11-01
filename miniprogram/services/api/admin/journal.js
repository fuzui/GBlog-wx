import apiRequest from './../../../utils/api-request'
import { ApiBaseUrl } from '../../../config/api'
import { STORAGE_KEY } from '../../const-data/const-data'
const moduleName = ApiBaseUrl + '/api/admin/journals'

/**
 * 新建日记
 */
function adminAddJournal(data) {
  const adminToken = {
    admin_token: wx.getStorageSync(STORAGE_KEY.adminToken)
  }
  return new Promise((resolve, reject) => {
    apiRequest.Post(moduleName, data, adminToken).then(
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
 * 获取日记列表
 */
function adminGetJournal(param) {
  const adminToken = {
    admin_token: wx.getStorageSync(STORAGE_KEY.adminToken)
  }
  return new Promise((resolve, reject) => {
    apiRequest.Get(moduleName, Object.assign(adminToken, param)).then(
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
 * 根据id删除日记
 */
function adminDeleteJournal(journalId) {
  const adminToken = {
    admin_token: wx.getStorageSync(STORAGE_KEY.adminToken)
  }
  const url = moduleName + '/' + journalId
  return new Promise((resolve, reject) => {
    apiRequest.Delete(url, adminToken).then(
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
 * 根据日记id修改日记
 */
function adminEditJournal(journalId, param) {
  const adminToken = {
    admin_token: wx.getStorageSync(STORAGE_KEY.adminToken)
  }
  const url = moduleName + '/' + journalId
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
  adminAddJournal,
  adminGetJournal,
  adminDeleteJournal,
  adminEditJournal
}
