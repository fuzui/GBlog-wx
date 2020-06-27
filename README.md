# 介绍

GBlog-wx：微信小程序博客

> 我们只是搬运工，将color-ui样式与halo接口结合了一下。

[![star](https://gitee.com/GeekEra/GBlog-wx/badge/star.svg?theme=dark)](https://gitee.com/GeekEra/GBlog-wx/stargazers)[![star](https://img.shields.io/github/stars/GeekEra/GBlog-wx.svg?style=social)](https://github.com/GeekEra/GBlog-wx)

[halo](https://halu.run)作为后台，小程序样式采用[color-ui组件](https://www.color-ui.com/)。

### 一、展示

![展示图](https://cdn.fuzui.net/blog/view.png)

![](https://oss.fuzui.net/img/20200529022512.png)

![](https://oss.fuzui.net/img/gblogadmin.png)

### 二、在线体验

![qrcode](https://cdn.fuzui.net/blog/qrcode_1588864925914.png)

### 三、说明

本项目采用[halo](https://halu.run)作为后台，调用halo接口。小程序样式使用[color-ui组件](https://www.color-ui.com/)组件。

### 四、使用

#### 1.后台搭建

采用halo搭建，具体可查看halo文档：https://halo.run

#### 2.小程序导入

* 拉取代码

  ```shell
  git clone git@github.com:GeekEra/GBlog-wx.git
  ```

* 导入工具

  通过[微信公众平台](https://mp.weixin.qq.com/)注册小程序账号，登录后在`开发——开发设置`中查看AppID；

  下载微信开发者工具，选择`小程序——导入项目`，选择刚刚clone的文件夹并填写自己的AppID.

  ![1](https://cdn.fuzui.net/blog/1_1588866821272.png)

* 配置

  将`config`中有个`api-tmp.js`文件重命名为`api.js`。

  修改如下配置：

  ```javascript
  const ApiBaseUrl = '';//生产上
  const Config = {
    AccessKey: '',
    guestbookSheetId: 2
  }
  ```
  
  1.`ApiBaseUrl`为halo后台地址，上线必须为域名，在开发者工具中可点击`右上角详情——本地设置`，将不校验合法域名打勾。
  
  2.`AccessKey`为halo api的AccessKey。进入halo后台管理系统，在`系统——博客设置——高级选项——API设置`中，将API 服务开启，并设置Access key。将此Access key填入上述js文件中对应位置。
  
  ![123](https://cdn.fuzui.net/blog/123_1588867938268.png)
  
  3.`guestbookSheetId`该值是留言板页面id，默认为关于页的评论，可自行前往表结构中查看。（默认2）



* 配置合法域名

  在[微信公众平台](https://mp.weixin.qq.com/)中，`开发——开发设置——服务器域名`中添加request、uploadFile、downloadFile合法域名。将上述`ApiBaseUrl`域名添加到request合法域名，例如`www.geekera.com`。
  
  ![](https://oss.fuzui.net/img/20200529020312.png)
  
  ![](https://oss.fuzui.net/img/20200628014304.png)

#### 3.高级功能配置(非必须)

* 海报分享

  [开启文章分享海报功能](https://gitee.com/GeekEra/GBlog-wx/wikis/[高级功能]开启海报分享?sort_id=2322392)

* 文章订阅、评论通知

  [开启新文章订阅、评论回复通知](https://gitee.com/GeekEra/GBlog-wx/wikis/[高级功能]开启文章订阅、评论通知?sort_id=2322404)

* 自定义文章内容样式

  [修改文章、日记、评论解析样式](https://gitee.com/GeekEra/GBlog-wx/wikis/[高级功能]自定义文章内容样式?sort_id=2322419)

### 五、结构

```
GBLOG-WX     
├── cloudfunctions		// 云服务
├── colorui            	// color-ui组件库 
├── component           // 自定义组件
│       └── article-list                  // 文章列表
│       └── canvas-share                  // 海报生成
│       └── parser           // parser富文本组件
├── config 				// 配置文件
├── images      		// 图片
├── pages   			// 页面代码
├── utils      			// 公用js

```

### 六、功能

**浏览页面功能：**

* 文章浏览、评论、点赞、搜索
* 文章分类、标签、归档
* 光影照片
* 日记
* 留言
* 友情链接
* 站点统计
* 文章分享海报
* 新文章订阅
* 评论回复通知

**管理页面功能：**

> 目前管理页面不支持开启**二步验证**登录！

* 后台登录
* 站点信息
* 个人信息修改
* 服务器信息查看
* 博客设置浏览
* 友链管理
* 日记管理
* 文章/分类/标签管理
* 附件上传、图库管理
* 评论审核、回复
* 主题切换、菜单编辑

### 七、致谢

* [halo](https://github.com/halo-dev/halo) 一个优秀的开源博客发布应用
* [ColorUI](https://github.com/weilanwl/ColorUI) 鲜亮的高饱和色彩，专注视觉的小程序组件库
* [Parser](https://github.com/jin-yufeng/Parser) 小程序富文本插件（html 渲染）
* [Hux Blog](https://huangxuan.me/)的背景图

### 八、联系

如果您发现了什么bug，或者有什么界面建议或意见，

欢迎 [issue](https://github.com/GeekEra/GBlog-wx/issues)，当然也可以直接点小程序关于栏中的“联系我”或“意见反馈”或“留言”。