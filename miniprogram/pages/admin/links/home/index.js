//获取应用实例
const app = getApp();
import apiResult from '../../../../utils/api-result';
import { adminAddLink, adminEditLink, adminGetLink, adminDeleteLink } from '../../../../services/api/admin/link';
Page({
  data: {
    appLogo: app.globalData.logo,
    logo: "",
    name: "",
    url: "",
    description: "",
    team: "",
    priority: "",
    operationPrompt: "新增友链",
    operationFlag: "add",
    linkContent: "",
    links: [],
    pageNo: 0,
    bottomFlag: false,
    bgColor: [
      "green",
      "red",
      "grey",
      "blue",
      "cyan",
      "purple"
    ]
  },
  async onLoad() { 
    var that = this;
    // that.setData({
    //   logo: app.globalData.logo,
    // })
  },
  async onShow() {
    var that = this;
    that.setData({
      loadModal:true
    })
    const links = await this.adminGetLink();
    that.setData({
      links: links,
      loadModal:false
    });
  },
  
  /**
   * 输入友链信息
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
  logoInput(e){
    this.setData({
      logo: e.detail.value
    });
  },
  descriptionInput(e){
    this.setData({
      description: e.detail.value
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
  /**
   * 新建友链
   */
  async addLink(){
    var that = this;
    if(!this.data.name){
      apiResult.warn("网站名为空");
      return ;
    }
    if(!this.data.logo){
      apiResult.warn("logo为空");
      return ;
    }
    if(!this.data.url){
      apiResult.warn("url为空");
      return ;
    }
    const param = {
      description: this.data.description,
      logo: this.data.logo,
      name: this.data.name,
      priority: this.data.priority,
      team: this.data.team,
      url: this.data.url
    }
    try {
      const result = await adminAddLink(param);
      //视图添加，而非重新调用接口刷新
      that.data.links.unshift(result);
      that.setData({
        links:that.data.links
      })
      apiResult.success("发表成功");
      this.hideModal();
    } catch (error) {
      return error.message;
    }
  },

  /**
   * 修改友链
   */
  async editLink(){
    var that = this;
    const linkId = that.data.currentId;
    const index = that.data.currentIndex;
    if(!this.data.name){
      apiResult.warn("网站名为空");
      return ;
    }
    if(!this.data.logo){
      apiResult.warn("logo为空");
      return ;
    }
    if(!this.data.url){
      apiResult.warn("url为空");
      return ;
    }
    if(!linkId || !index){
      apiResult.warn("未选中");
      return ;
    }
    const param = {
      description: this.data.description,
      logo: this.data.logo,
      name: this.data.name,
      priority: this.data.priority,
      team: this.data.team,
      url: this.data.url
    }
    try {
      const result = await adminEditLink(linkId,param);
      // //视图修改，而非重新调用接口刷新
      that.data.links.splice(index,1,result);
      that.setData({
        links:that.data.links
      })
      apiResult.success("发表成功");
      this.hideModal();
    } catch (error) {
      return error.message;
    }
  },

  /**
   * 获取友链
   */
  async adminGetLink() {
    try {
      const param = {
        sort: 'createTime,desc'
      };
      const result = await adminGetLink(param);
      return result;
    } catch (error) {
      return await Promise.reject(error)
    }
  },
  
  /**
   * 删除友链
   * @param {*} e 
   */
  async deleteLink(e) {
    var that = this;
    const index = e.currentTarget.dataset.index;
    const id = e.currentTarget.dataset.id;
     wx.showModal({
      title: 'Creator',
      content: '确定要删除这份友谊吗？',
      cancelText: '再缓缓',
      confirmText: '再见',
      success: async(res) => {
        if (res.confirm) {
          try {
            await adminDeleteLink(id);
            //视图删除，不刷新调用接口
            that.data.links.splice(index,1)
            that.setData({
              links: that.data.links
            });
            apiResult.success("已删除");
          } catch (error) {
            apiResult.error("网络异常");
            return error.message;
          }
        }
      }
    })
  },
  openEditModel(){
    apiResult.warn("编辑功能开发中···");
  },

  showModal(e) {
    var that = this;
    if(e.currentTarget.dataset.flag=='edit'){
      const index = e.currentTarget.dataset.index;
      const link = that.data.links[index];
      that.setData({
        description: link.description,
        logo: link.logo,
        name: link.name,
        priority: link.priority,
        team: link.team,
        url: link.url,
        operationFlag: "edit",
        operationPrompt: "修改友链",
        currentId: link.id,
        currentIndex: index
      })
    }
    this.setData({
      modalName: e.currentTarget.dataset.target
    })
  },
  hideModal(e) {
    this.setData({
      modalName: null,
      description: "",
      logo: "",
      name: "",
      priority: "",
      team: "",
      url: "",
      operationFlag: "add",
      operationPrompt: "新增友链"
    })
  },
  /**
   * 复制
   * @param {*} e 
   */
  copyLink(e) {
    wx.setClipboardData({
      data: e.currentTarget.dataset.link,
      success: res => {
        wx.showToast({
          title: '已复制',
          duration: 1000,
        })
      }
    })
  }
})