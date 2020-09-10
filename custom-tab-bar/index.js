//获取应用实例
const app = getApp();
Component({
  data: {
    selected: 0,
    color: "#7A7E83",
    selectedColor: "#3cc51f",
    animation: false,
    list: [
			{
				pagePath: "/pages/index/index",
				iconPath: "/images/icon/home.png",
				selectedIconPath: "/images/icon/home-hover.png",
				text: "首页"
			},
      {
        pagePath: "/pages/type/index",
        iconPath: "/images/icon/type.png",
        selectedIconPath: "/images/icon/type-hover.png",
        text: "分类"
      },
      {
        pagePath: "/pages/photos/home/index",
        iconPath: "/images/icon/photo.png",
        selectedIconPath: "/images/icon/photo-hover.png",
        text: "光影"
      },
			{
				pagePath: "/pages/about/home/index",
				iconPath: "/images/icon/about.png",
				selectedIconPath: "/images/icon/about-hover.png",
				text: "关于"
			},
			{
				pagePath: "/pages/admin/home/index",
				iconPath: "/images/icon/admin.png",
				selectedIconPath: "/images/icon/admin-hover.png",
				text: "管理"
			}
		],
    //适配IphoneX的屏幕底部横线
    isIphoneX: app.globalData.isIphoneX
  },
  attached() {},
  methods: {
    switchTab(e) {
      var that = this
      const dataset = e.currentTarget.dataset
      const path = dataset.path
      const index = dataset.index
      //如果是特殊跳转界面
      if (this.data.list[index].isSpecial) {
        wx.navigateTo({
          url: path
        })
      } else {
        //正常的tabbar切换界面
        wx.switchTab({
          url: path
        })
        this.setData({
          selected: index,
          animation: 'slide-top'
        })
        setTimeout(function() {
          that.setData({
            animation: ''
          })
        }, 3000)
      }
    }
  }
})