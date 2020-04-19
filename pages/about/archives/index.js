const app = getApp();
import apiService from '../../../utils/api-service';
Page({
  data: {
    topImage: app.globalData.topImage,
    archives: [],
    categoryNum: 0,
    tagNum: 0,
    articleNum: 0
  },
  onLoad: function () {
    var that = this;
    that.setData({
      logo: app.globalData.logo
    })
  },
  async onShow() {
    var that = this;
    that.setData({
      loadModal:true
    })
    var archives = await this.getArchives();
    var statistics = await this.getStatistics();
    that.setData({
      archives: archives,
      loadModal:false
    });
    //累加效果
    for(var i = 0;i < 30;i++){
      setTimeout(function () {
        let cNum = that.data.categoryNum;
        let tNum = that.data.tagNum;
        let aNum = that.data.articleNum;
        if(cNum<statistics.categoryCount){
          that.setData({
            categoryNum: cNum+1
          });
        }
        if(aNum<statistics.postCount){
          that.setData({
            articleNum: aNum+1
          });
        }
        if(tNum<statistics.tagCount){
          that.setData({
            tagNum: tNum+1
          });
        }
        if(i == 30){
          that.setData({
            categoryNum: statistics.categoryCount,
            tagNum: statistics.tagCount,
            articleNum: statistics.postCount
          });
        }
      }, 100)
    };
    
    
  },
  /**
   * 获取归档
   */
  async getArchives() {
    try {
      const result = await apiService.getArchives();
      return result;
    } catch (error) {
      return await Promise.reject(error)
    }
  },
  /**
   * 获取统计信息
   */
  async getStatistics() {
    try {
      const result = await apiService.getStatistics();
      return result;
    } catch (error) {
      return await Promise.reject(error)
    }
  },
});
