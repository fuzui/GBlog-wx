// 构建url
const buildURL = (url, query = {}, isSequence = true) => {
  if (!query) return url
  const joiner = url.match(/\?/) ? '&' : '?'
  const queryStr = Object.keys(query)
    .map(key => `${key}=${encodeURIComponent(isSequence ? JSON.stringify(query[key]) : query[key])}`)
    .join('&')
  return url + joiner + queryStr
}
 
// 解析query对象
const decodeQuery = (originQuery = {}, isSequence = true) => {
  const result = {}
  if (!originQuery) return {}
  return Object.keys(originQuery).reduce((prev, curr) => {
    result[curr] = decodeURIComponent(originQuery[curr])
    if (isSequence) {
      result[curr] = JSON.parse(result[curr])
    }
    return result
  }, result)
}
 
module.exports = {
  buildURL,
  decodeQuery
}