import apiRequest from './../../../utils/api-request'
import { ApiBaseUrl } from '../../../config/api'
const moduleName = ApiBaseUrl + '/api/content/photos'

/**
 * 光影相册
 * @param {*} params
 */
function getPhotos(params) {
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

/**
 * 光影分组
 * @param {*} params
 */
function getPhotoTeams() {
  return new Promise((resolve, reject) => {
    const url = moduleName + '/teams'
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
  getPhotos,
  getPhotoTeams
}
