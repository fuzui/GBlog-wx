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
    console.log(journalList)
    that.setData({
      journalList: journalList,
      loadModal:false
    });
  },

  /**
   * 发布捕捉
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
  ChooseImage() {
    wx.chooseImage({
      count: 4, //默认9
      sizeType: ['original', 'compressed'], //可以指定是原图还是压缩图，默认二者都有
      sourceType: ['album'], //从相册选择
      success: (res) => {
        if (this.data.imgList.length != 0) {
          this.setData({
            imgList: this.data.imgList.concat(res.tempFilePaths)
          })
        } else {
          this.setData({
            imgList: res.tempFilePaths
          })
        }
      }
    });
  },
  
})