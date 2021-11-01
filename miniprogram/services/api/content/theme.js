import apiRequest from './../../../utils/api-request'
import { ApiBaseUrl } from '../../../config/api'
const moduleName = ApiBaseUrl + '/api/content/themes'
/**
 * 获取主题设置
 * @param {*} key
 */
function getThemeSettings() {
  const url = moduleName + '/activation/settings'
  return new Promise((resolve, reject) => {
    apiRequest.Get(url, {}).then(
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
  getThemeSettings
}
