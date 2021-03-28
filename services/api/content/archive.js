import apiRequest from './../../../utils/api-request';
import { ApiBaseUrl } from '../../../config/api'
const moduleName = ApiBaseUrl + '/api/content/archives';

/**
 * 获取归档
 */
function getArchives() {
  const url = moduleName + '/months'
  return new Promise((resolve, reject) => {
    apiRequest.Get(url, {})
      .then(r => {
        resolve(r)
      }, e => {
        reject(e)
      })
  })
}

module.exports = {
  getArchives
}