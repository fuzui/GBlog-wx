import apiRequest from './../../../utils/api-request';
import { ApiBaseUrl } from '../../../config/api'
import { STORAGE_KEY } from '../../const-data/const-data'
const moduleName = ApiBaseUrl + '/api/admin/menus';

/**
 * 获取菜单列表
 */
function adminGetMenu(param) {
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
 * 添加菜单
 */
function adminAddMenu(data) {
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
 * 根据id编辑菜单
 */
function adminEditMenu(menuId,param) {
  const adminToken = {
    admin_token: wx.getStorageSync(STORAGE_KEY.adminToken)
  }
  const url = moduleName + '/' + menuId;
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
 * 根据id删除菜单
 */
function adminDeleteMenu(menuId) {
  const adminToken = {
    admin_token: wx.getStorageSync(STORAGE_KEY.adminToken)
  }
  const url = moduleName + '/' + menuId;
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
  adminGetMenu,
  adminAddMenu,
  adminEditMenu,
  adminDeleteMenu
}