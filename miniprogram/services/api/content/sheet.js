import apiRequest from './../../../utils/api-request'
import { ApiBaseUrl } from '../../../config/api'
const moduleName = ApiBaseUrl + '/api/content/sheets'

/**
 * 获取sheet详情
 * @param {*} id
 * @param {*} params
 */
function getSheetDetails(id, params) {
  const url = moduleName + '/' + id
  return new Promise((resolve, reject) => {
    apiRequest.Get(url, params).then(
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
 * 获取sheet评论
 * @param {sheet id} id
 * @param {*} params
 */
function getCommentsBySheetId(id, params) {
  const url = moduleName + '/' + id + '/comments/tree_view'
  return new Promise((resolve, reject) => {
    apiRequest.Get(url, params).then(
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
 * 撰写sheet评论
 * @param {*} params
 */
function writeSheetComment(params) {
  const url = moduleName + '/comments'
  return new Promise((resolve, reject) => {
    apiRequest.Post(url, params, {}).then(
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
  getSheetDetails,
  getCommentsBySheetId,
  writeSheetComment
}
