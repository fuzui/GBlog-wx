import apiRequest from './../../../utils/api-request'
import { ApiBaseUrl } from '../../../config/api'
const moduleName = ApiBaseUrl + '/api/content/journals'

/**
 * 获取日记
 * @param {*} params
 */
function getJournals(params) {
  return new Promise((resolve, reject) => {
    apiRequest.Get(moduleName, params).then(
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
  getJournals
}
