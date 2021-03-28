import apiRequest from './../../../utils/api-request';
import { ApiBaseUrl } from '../../../config/api';
const moduleName = ApiBaseUrl + '/api/content/tags';

/**
 * 获取标签
 * @param {*} params 
 */
function getTags(params) {
  return new Promise((resolve, reject) => {
    apiRequest.Get(moduleName, params)
      .then(r => {
        resolve(r)
      }, e => {
        reject(e)
      })
  })
}

/**
 * 获取标签下的文章
 * @param {标签别名} slug 
 * @param {*} params 
 */
function getTagsArticle(slug,params) {
  const url = moduleName + '/' + slug + '/posts';
  return new Promise((resolve, reject) => {
    apiRequest.Get(url, params)
      .then(r => {
        resolve(r)
      }, e => {
        reject(e)
      })
  })
}

module.exports = {
  getTags,
  getTagsArticle
}