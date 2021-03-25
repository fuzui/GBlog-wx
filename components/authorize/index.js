//获取应用实例
const app = getApp();
import apiResult from '../../utils/api-result';
import { STORAGE_KEY } from '../../services/const-data/const-data';
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
    getUserProfile(e) {
      wx.getUserProfile({
        desc: '用于昵称、头像展示', 
        lang: 'cn',
        success: (res) => {
          wx.setStorageSync(STORAGE_KEY.user, res.userInfo);
          this.setData({
            modalName: null,
          })
          return apiResult.success("登录成功");
        }
      })
    },
    // 阻止滑动
    preventTouchMove() {
    }
  }
})
