//获取应用实例
const app = getApp();
import {RandomImage} from '../../config/api';
Component({
  data: {
    RandomImage: RandomImage,
  },
  properties: {
    content: {
      type: Array,
      value: []
    },
  },
  options: {
    addGlobalClass: true,
  },
  methods: {
    details(e) {
      //详情页跳转
      wx.navigateTo({
        url: '/pages/details/index?id=' + e.currentTarget.id
      })
    },
  }
})
