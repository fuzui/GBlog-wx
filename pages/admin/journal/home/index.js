//获取应用实例
const app = getApp();
import apiService from '../../../../utils/api-service'; 
import apiResult from '../../../../utils/api-result';
import { PageSize,ParserStyle,CustomStyle } from './../../../../config/api';
Page({
  data: {
    parserStyle:ParserStyle,
    topImage: CustomStyle.topImage,
    logo: "",
    journalContent: "",
    journalList: [],
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
    that.setData({
      logo: app.globalData.logo,
    })
  },
  async onShow() {
    var that = this;
    that.setData({
      loadModal:true
    })
    const journalList = await this.adminGetJournal();
    that.setData({
      journalList: journalList,
      loadModal:false
    });
  },
  
  /**
   * 输入日记
   */
  journalInput(e){
    this.setData({
      journalContent: e.detail.value
    });
  },
  /**
   * 新建日记
   */
  async addJournal(){
    if(!this.data.journalContent){
      apiResult.warn("日志不能为空");
      return ;
    }
    const param = {
      sourceContent: this.data.journalContent,
      type: "PUBLIC"
    }
    try {
      await apiService.adminAddJournal(param);
      apiResult.success("发表成功");
       
    } catch (error) {
      return error.message;
    }
  },

  /**
   * 获取日记列表
   */
  async adminGetJournal() {
    var that = this;
    try {
      const param = {
        page: that.data.pageNo,
        size: PageSize.journalSize,
        sort: 'createTime,desc'
      };
      const result = await apiService.adminGetJournal(param);
      if(result.page < result.pages){
        return that.data.journalList.concat(result.content);
      }else{
        that.setData({
          bottomFlag: true
        })
      }
    } catch (error) {
      return await Promise.reject(error)
    }
  },
  
  /**
   * 删除日记
   * @param {*} e 
   */
  async deleteJournal(e) {
    var that = this;
    const index = e.currentTarget.dataset.index;
    const id = e.currentTarget.dataset.id;
     wx.showModal({
      title: 'Creator',
      content: '确定要删除这段回忆吗？',
      cancelText: '再看看',
      confirmText: '再见',
      success: async(res) => {
        if (res.confirm) {
          try {
            await apiService.adminDeleteJournal(id);
            
            //视图删除，不刷新调用接口
            that.data.journalList.splice(index,1)
            that.setData({
              journalList: that.data.journalList
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
  /**
   * 向下滑动拉去下一页
   */
  async onReachBottom() {
    var that = this;
    var pageNo = ++that.data.pageNo;
    that.setData({
      pageNo: pageNo,
    });
    const content = await this.adminGetJournal();
    if(content){
      that.setData({
        journalList: content
      });
    }
    
  },
})