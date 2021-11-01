import apiResult from './api-result'
import qs from './qs'
import { Config } from './../config/api'

function Get(url, data) {
  return new Promise((resolve, reject) => {
    if (data) {
      url = url.concat('?', qs.stringify(data, { skipNulls: true, arrayFormat: 'repeat' }))
    }
    wx.request({
      url: url,
      method: 'GET',
      header: {
        'Content-Type': 'application/json',
        'API-Authorization': Config.AccessKey
      },
      success(res) {
        if (res.data.status === apiResult.StateCode.success) {
          resolve(res.data.data)
        } else {
          apiResult.requestError(res.data)
          reject(res.data)
        }
      },
      fail(err) {
        apiResult.error('网络连接失败')
        reject(err)
      }
    })
  })
}

function Post(url, data = {}, param) {
  if (param) {
    url = url.concat('?', qs.stringify(param, { skipNulls: true, arrayFormat: 'repeat' }))
  }
  return new Promise((resolve, reject) => {
    wx.request({
      url: url,
      data: data,
      method: 'POST',
      header: {
        'Content-Type': 'application/json',
        'API-Authorization': Config.AccessKey
      },
      success(res) {
        if (res.data.status === apiResult.StateCode.success) {
          resolve(res.data.data)
        } else {
          apiResult.requestError(res.data)
          reject(res.data)
        }
      },
      fail(err) {
        apiResult.error('网络连接失败')
        reject(err)
      }
    })
  })
}

function Upload(url, data = {}, param) {
  if (param) {
    url = url.concat('?', qs.stringify(param, { skipNulls: true, arrayFormat: 'repeat' }))
  }
  return new Promise((resolve, reject) => {
    wx.uploadFile({
      url: url,
      filePath: data.path,
      name: 'file',
      formData: {},
      success(res) {
        if (JSON.parse(res.data).status === apiResult.StateCode.success) {
          resolve(JSON.parse(res.data).data)
        } else {
          apiResult.requestError(JSON.parse(res.data))
          reject(JSON.parse(res.data))
        }
      },
      fail(err) {
        apiResult.error('网络连接失败')
        reject(err)
      }
    })
  })
}

function Delete(url, data) {
  if (data) {
    url = url.concat('?', qs.stringify(data, { skipNulls: true, arrayFormat: 'repeat' }))
  }
  return new Promise((resolve, reject) => {
    wx.request({
      url: url,
      data: data,
      method: 'DELETE',
      header: {
        'Content-Type': 'application/json',
        'API-Authorization': Config.AccessKey
      },
      success(res) {
        if (res.data.status === apiResult.StateCode.success) {
          resolve(res.data.data)
        } else {
          apiResult.requestError(res.data)
          reject(res.data)
        }
      },
      fail(err) {
        apiResult.error('网络连接失败')
        reject(err)
      }
    })
  })
}

function Put(url, data = {}, param) {
  if (param) {
    url = url.concat('?', qs.stringify(param, { skipNulls: true, arrayFormat: 'repeat' }))
  }
  return new Promise((resolve, reject) => {
    wx.request({
      url: url,
      data: data,
      method: 'PUT',
      header: {
        'Content-Type': 'application/json',
        'API-Authorization': Config.AccessKey
      },
      success(res) {
        if (res.data.status === apiResult.StateCode.success) {
          resolve(res.data.data)
        } else {
          apiResult.requestError(res.data)
          reject(res.data)
        }
      },
      fail(err) {
        apiResult.error('网络连接失败')
        reject(err)
      }
    })
  })
}

module.exports = {
  Get,
  Post,
  Delete,
  Put,
  Upload
}
