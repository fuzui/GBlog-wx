import apiRequest from './../../../utils/api-request';
import { ApiBaseUrl } from './../../../config/api'
const moduleName = ApiBaseUrl + '/api/content/options';
/**
 * option
 * @param {*} key 
 */
function getOptionByKey(key) {
  const url = moduleName + '/keys/' + key;
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
  getOptionByKey
}