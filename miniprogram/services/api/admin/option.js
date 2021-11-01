import apiRequest from './../../../utils/api-request'
import { ApiBaseUrl } from '../../../config/api'
import { STORAGE_KEY } from '../../../services/const-data/const-data'
const moduleName = ApiBaseUrl + '/api/admin/options'

/**
 * 获取设置信息
 */
function adminGetOption() {
  const adminToken = {
    admin_token: wx.getStorageSync(STORAGE_KEY.adminToken)
  }
  const url = moduleName + '/map_view'
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

module.exports = {
  adminGetOption
}
