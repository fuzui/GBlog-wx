import apiRequest from './../../../utils/api-request';
import { ApiBaseUrl } from '../../../config/api'
const moduleName = ApiBaseUrl + '/api/content/links';

/**
 * 获取友链
 * @param {*} params 
 */
function getLinks(params) {
  return new Promise((resolve, reject) => {
    apiRequest.Get(moduleName, params)
      .then(r => {
        resolve(r)
      }, e => {
        reject(e)
      })
  })
}

module.exports = {
  getLinks
}