import apiRequest from './../../../utils/api-request'
import { ApiBaseUrl } from '../../../config/api'
const moduleName = ApiBaseUrl + '/api/content/statistics'

/**
 * 获取统计信息
 */
function getStatistics() {
  const url = moduleName + '/user'
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
  moduleName,
  getStatistics
}
