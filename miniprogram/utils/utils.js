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

const mergeJsonObject = (jsonObject1 = {}, jsonObject2 = {}) => {
  const resultJsonObject = {}
  for (const attr in jsonObject1) {
    resultJsonObject[attr] = jsonObject1[attr]
  }
  for (const attr in jsonObject2) {
    resultJsonObject[attr] = jsonObject2[attr]
  }
  return resultJsonObject
}

const compareVersion = (v1, v2) => {
  v1 = v1.split('.')
  v2 = v2.split('.')
  const len = Math.max(v1.length, v2.length)

  while (v1.length < len) {
    v1.push('0')
  }
  while (v2.length < len) {
    v2.push('0')
  }

  for (let i = 0; i < len; i++) {
    const num1 = parseInt(v1[i])
    const num2 = parseInt(v2[i])

    if (num1 > num2) {
      return 1
    } else if (num1 < num2) {
      return -1
    }
  }
  return 0
}
const getRandomImage = (arr = []) => {
  return arr[Math.floor(Math.random() * arr.length)]
}

module.exports = {
  buildURL,
  decodeQuery,
  mergeJsonObject,
  compareVersion,
  getRandomImage
}
