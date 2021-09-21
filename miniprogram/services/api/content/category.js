import apiRequest from './../../../utils/api-request';
import { ApiBaseUrl } from '../../../config/api';
const moduleName = ApiBaseUrl + '/api/content/categories';

/**
 * 获取分类
 * @param {*} params 
 */
function getCategories(params) {
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
 * 获取分类下的文章
 * @param {分类名} slug 
 * @param {*} params 
 */
function getCategoriesArticle(slug,params) {
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
  getCategories,
  getCategoriesArticle
}