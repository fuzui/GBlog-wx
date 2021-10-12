const app = getApp();
import apiResult from '../../../../utils/api-result';
import {
  adminGetMenu,
  adminDeleteMenu,
  adminAddMenu,
  adminEditMenu
} from '../../../../services/api/admin/menu';
import {
  ApiBaseUrl
} from '../../../../config/api.js';
Page({
  data: {
    url: ApiBaseUrl,
    logo: "",
    CustomBar: app.globalData.CustomBar,
    menuList: [],
    targetPicker: ['当前窗口','新窗口'],
    currentIndex: null,
    currentId: null,
    modalName: null,
    target: "_self",
    icon: "",
    name: "",
    priority: "",
    team: "",
    url: "",
    parentId: 0,
    operationFlag: "add",
    operationPrompt: "新增菜单",
    loadModal: false
  },
  onLoad: function () {
    var that = this;
    that.setData({
      logo: app.globalData.logo,
    })
  },
  async onShow() {
    var that = this;
    that.setData({
      loadModal: true
    })
    const menuList = await this.adminGetMenu();
    that.setData({
      menuList: menuList,
      loadModal: false
    });
  },

  /**
   * 获取菜单列表
   */
  async adminGetMenu() {
    try {
      const param = {};
      const result = await adminGetMenu(param);
      return result;
    } catch (error) {
      return error.message;
    }
  },
  /**
   * 删除菜单
   */
  async deleteMenu(e) {
    var that = this;
    const index = e.currentTarget.dataset.index;
    const id = e.currentTarget.dataset.id;
    const name = that.data.menuList[index].name;
    wx.showModal({
      title: 'Creator',
      content: '确定要删除' + name + '菜单吗？',
      cancelText: '再想想',
      confirmText: '再见',
      success: async (res) => {
        if (res.confirm) {
          try {
            await adminDeleteMenu(id);
            //视图删除，不刷新调用接口
            that.data.menuList.splice(index, 1)
            that.setData({
              menuList: that.data.menuList
            });
            apiResult.success("已删除");
          } catch (error) {
            apiResult.error(error.message);
            return error.message;
          }
        }
        that.setData({
          modalName: null,
          currentIndex: null,
          currentId: null
        });
      }
    })
  },

  /**
   * 新建菜单
   */
  async addMenu(){
    var that = this;
    if(!that.data.name){
      apiResult.warn("名称为空");
      return ;
    }
    if(!that.data.url){
      apiResult.warn("url为空");
      return ;
    }
    const param = {
      target: that.data.target,
      icon: that.data.icon,
      name: that.data.name,
      priority: that.data.priority,
      team: that.data.team,
      url: that.data.url,
      parentId: that.data.parentId
    }
    try {
      const result = await adminAddMenu(param);
      //视图添加，而非重新调用接口刷新
      that.data.menuList.unshift(result);
      that.setData({
        menuList:that.data.menuList
      })
      apiResult.success("添加成功");
      that.hideModal();
    } catch (error) {
      return error.message;
    }
  },

  /**
   * 修改菜单
   */
  async editMenu(){
    var that = this;
    const menuId = that.data.currentId;
    const index = that.data.currentIndex;
    if(!that.data.name){
      apiResult.warn("名称为空");
      return ;
    }
    if(!that.data.url){
      apiResult.warn("url为空");
      return ;
    }
    if(!menuId || !index){
      apiResult.warn("未选中");
      return ;
    }
    const param = {
      target: that.data.target,
      icon: that.data.icon,
      name: that.data.name,
      priority: that.data.priority,
      team: that.data.team,
      url: that.data.url,
      parentId: that.data.parentId
    }
    try {
      const result = await adminEditMenu(menuId,param);
      // //视图修改，而非重新调用接口刷新
      that.data.menuList.splice(index,1,result);
      that.setData({
        menuList:that.data.menuList
      })
      apiResult.success("修改成功");
      this.hideModal();
    } catch (error) {
      return error.message;
    }
  },

  /**
   * 输入菜单信息
   */
  nameInput(e){
    this.setData({
      name: e.detail.value
    });
  },
  urlInput(e){
    this.setData({
      url: e.detail.value
    });
  },
  iconInput(e){
    this.setData({
      icon: e.detail.value
    });
  },
  targetInput(e){
    var target = "_self";
    if(e.detail.value == "1"){
      target = "_blank"
    }
    this.setData({
      target: target
    });
  },
  priorityInput(e){
    this.setData({
      priority: e.detail.value
    });
  },
  teamInput(e){
    this.setData({
      team: e.detail.value
    });
  },
  parentIdInput(e){
    var that = this;
    let parentId = 0;
    if(that.data.currentIndex == e.detail.value){
      apiResult.warn("不可选自己");
      return ;
    }
    parentId = that.data.menuList[e.detail.value].id;
    this.setData({
      parentId: parentId
    });
  },

  showModal(e) {
    var that = this;
    if(e.currentTarget.dataset.flag=='edit'){
      const index = e.currentTarget.dataset.index;
      const menu = that.data.menuList[index];
      that.setData({
        target: menu.target,
        icon: menu.icon,
        name: menu.name,
        priority: menu.priority,
        team: menu.team,
        url: menu.url,
        parentId: menu.parentId,
        operationFlag: "edit",
        operationPrompt: "修改菜单",
        currentId: menu.id,
        currentIndex: index
      })
    }
    that.setData({
      modalName: e.currentTarget.dataset.target
    })
  },
  hideModal(e) {
    this.setData({
      currentIndex: null,
      currentId: null,
      modalName: null,
      target: "_self",
      icon: "",
      name: "",
      priority: "",
      team: "",
      url: "",
      parentId: 0,
      operationFlag: "add",
      operationPrompt: "新增菜单"
    })
  },
})