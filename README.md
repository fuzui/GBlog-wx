# 介绍

GBlog-wx：微信小程序博客

[halo](https://halu.run)作为后台，小程序样式采用[color-ui组件](https://www.color-ui.com/)。

### 一、展示

![展示图](https://cdn.fuzui.net/blog/view.png)

### 二、在线体验

![qrcode](https://cdn.fuzui.net/blog/qrcode_1588864925914.png)

### 三、说明

本项目采用[halo](https://halu.run)作为后台，调用halo接口。小程序样式使用[color-ui组件](https://www.color-ui.com/)组件。markdown转换使用[html2wxml](https://github.com/qwqoffice/html2wxml)组件服务。

#### 海报功能
* miniprogram作为小程序目录
* miniprogram\app.js 中填入自己的云函数环境ID以及博客名字(虽然不填也可以获取，但我建议还是自己手动填上)
* 小程序后台配置download合法域名，加入自己缩略图的域名
#### 预览
![poster](https://ae01.alicdn.com/kf/Hb84abd2bec884beba0eca0aa3cdd8deam.jpg)

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
    guestbookSheetId: 2,
    html2wxmlUrl: 'https://html2wxml.qwqoffice.com/api/',
  }
  ```

  1.`ApiBaseUrl`为halo后台地址，上线必须为域名，在开发者工具中可点击`右上角详情——本地设置`，将不校验合法域名打勾。

  2.`AccessKey`为halo api的AccessKey。进入halo后台管理系统，在`系统——博客设置——高级选项——API设置`中，将API 服务开启，并设置Access key。将此Access key填入上述js文件中对应位置。

  ![123](https://cdn.fuzui.net/blog/123_1588867938268.png)

  3.`html2wxmlUrl`为html2wxml组件[qwqoffice](https://www.qwqoffice.com/)提供的解析服务api。也可以自行参考[html2wxml](https://github.com/qwqoffice/html2wxml)搭建组件解析服务，这时将其`html2wxmlUrl`改为自己的api即可。（使用默认无需修改）

  4.`guestbookSheetId`该值是留言板页面id，默认为关于页的评论，可自行前往表结构中查看。（默认2）

* 配置合法域名

  在[微信公众平台](https://mp.weixin.qq.com/)中，`开发——开发设置——服务器域名`中添加request合法域名，将上述`ApiBaseUrl`与`html2wxmlUrl`域名添加进去，例如`www.geekera.com`与`html2wxml.qwqoffice.com`。（在开发者工具中可勾选不校验合法域名运行）

### 五、结构

```
GBLOG-WX     
├── colorui            // color-ui组件库 
├── component           // 自定义组件
│       └── article-list                  // 文章列表
│       └── html2wxml-component           // html2wxml组件
├── config 				// 配置文件
├── images      		// 图片
├── pages   			// 页面代码
├── utils      			// 公用js

```

### 六、功能

* 文章浏览
* 文章分类
* 文章评论
* 文章点赞
* 文章搜索
* 光影照片
* 日记
* 文章归档
* 留言
* 友情链接
* 站点统计

### 

### 七、致谢

* [halo](https://github.com/halo-dev/halo) 一个优秀的开源博客发布应用
* [ColorUI](https://github.com/weilanwl/ColorUI) 鲜亮的高饱和色彩，专注视觉的小程序组件库

* [html2wxml](https://github.com/qwqoffice/html2wxml) 用于微信小程序的HTML和Markdown格式的富文本渲染组件
* [Hux Blog](https://huangxuan.me/)的背景图