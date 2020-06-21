import apiResult from './api-result';
import { Config } from './../config/api';


function Get(url, data = {}) {
  return new Promise((resolve, reject) => {
    wx.request({
      url: url,
      data: data,
      method: 'GET',
      header: {
        'Content-Type': 'application/json',
        'API-Authorization': Config.AccessKey
      },
      success(res) {
        if (res.data.status == apiResult.StateCode.success) {
          resolve(res.data.data)
        } else {
          apiResult.requestError(res.data);
          reject(res.data)
        }
      },
      fail(err) {
        apiResult.error('网络连接失败');
        reject(err)
      }
    })
  });
}

function Post(url, data = {}) {
  return new Promise((resolve, reject) => {
    wx.request({
      url: url,
      data: data,
      method: 'POST',
      header: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'API-Authorization': Config.AccessKey
      },
      success(res) {
        if (res.data.status == apiResult.StateCode.success) {
          resolve(res.data.data)
        } else {
          apiResult.requestError(res.data);
          reject(res.data)
        }
      },
      fail(err) {
        apiResult.error('网络连接失败');
        reject(err)
      }
    })
  });
  
}

function PostBody(url, data = {}) {
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
        if (res.data.status == apiResult.StateCode.success) {
          resolve(res.data.data)
        } else {
          apiResult.requestError(res.data);
          reject(res.data)
        }
      },
      fail(err) {
        apiResult.error('网络连接失败');
        reject(err)
      }
    })
  });
  
}

function Delete(url, data = {}) {
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
        if (res.data.status == apiResult.StateCode.success) {
          resolve(res.data.data)
        } else {
          apiResult.requestError(res.data);
          reject(res.data)
        }
      },
      fail(err) {
        apiResult.error('网络连接失败');
        reject(err)
      }
    })
  });
}

function Put(url, data = {}) {
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
        if (res.data.status == apiResult.StateCode.success) {
          resolve(res.data.data)
        } else {
          apiResult.requestError(res.data);
          reject(res.data)
        }
      },
      fail(err) {
        apiResult.error('网络连接失败');
        reject(err)
      }
    })
  });
  
}

module.exports = {
  Get,
  Post,
  PostBody,
  Delete,
  Put
}