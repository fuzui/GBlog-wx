//获取应用实例
const app = getApp();
import apiResult from '../../utils/api-result';
import { Config } from '../../config/api';
Component({
  data: {
  },
  properties: {
    modalName: {
      type: String,
      value: null
    },
  },
  options: {
    addGlobalClass: true,
  },
  methods: {
    hideModal(e) {
      this.setData({
        modalName: null
      })
    },
    /**
     * 获取用户信息
     * @param {*} e 
     */
    getUser(e){
      if (!e.detail.userInfo) {
        return apiResult.error("登录失败");
      } else {
        wx.setStorageSync(Config.User, e.detail.userInfo);
        this.setData({
          modalName: null,
        })
        return apiResult.success("登录成功");
      }
    },
  }
})
