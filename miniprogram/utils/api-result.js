import { STORAGE_KEY } from '../services/const-data/const-data'
function requestError(data) {
  wx.showToast({
    title: data.message,
    duration: 1200,
    mask: true,
    image: '/images/prompt/fail.svg'
  })
  if (data.status === 401) {
    wx.setStorageSync(STORAGE_KEY.adminToken, '')
    const pages = getCurrentPages()
    const currentPage = pages[pages.length - 1].route
    if (currentPage !== 'pages/admin/login/index') {
      wx.navigateTo({
        url: '/pages/admin/login/index'
      })
    }
  }
}

function error(msg) {
  wx.showToast({
    title: msg,
    duration: 1500,
    mask: true,
    image: '/images/prompt/fail.svg'
  })
}
function warn(msg) {
  wx.showToast({
    title: msg,
    duration: 1500,
    mask: true,
    image: '/images/prompt/warn.svg'
  })
}
function success(msg) {
  wx.showToast({
    title: msg,
    duration: 2000,
    mask: true,
    image: '/images/prompt/success.svg'
  })
}

const StateCode = {
  success: 200,
  error: 500
}

module.exports = {
  requestError,
  error,
  warn,
  success,
  StateCode
}
