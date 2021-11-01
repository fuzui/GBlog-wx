import { CloudConfig } from '../../../config/api'
/**
 * 检查用户
 */
function checkUser(openid) {
  return new Promise((resolve, reject) => {
    const db = wx.cloud.database({
      env: CloudConfig.env
    })
    db.collection('admin_user').get({
      success: function (res) {
        if (res.data.length === 0) {
          resolve({})
        } else {
          resolve(res.data[0])
        }
      },
      fail(e) {
        reject(e)
      }
    })
  })
}

/**
 * 创建用户
 */
function createUser(param) {
  return new Promise((resolve, reject) => {
    const db = wx.cloud.database({
      env: CloudConfig.env
    })
    db.collection('admin_user').add({
      data: {
        username: param.username,
        password: param.password
      },
      success: function (res) {
        resolve(res.data)
      },
      fail(e) {
        reject(e)
      }
    })
  })
}

/**
 * 更新用户
 */
function updateUser(param) {
  return new Promise((resolve, reject) => {
    const db = wx.cloud.database({
      env: CloudConfig.env
    })
    db.collection('admin_user')
      .doc(param.id)
      .update({
        data: {
          username: param.username,
          password: param.password
        },
        success: function (res) {
          resolve(res.data)
        },
        fail(e) {
          reject(e)
        }
      })
  })
}

module.exports = {
  checkUser,
  createUser,
  updateUser
}
