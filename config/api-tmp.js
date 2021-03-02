
const ApiBaseUrl = 'https://www.geekera.cn';//生产上
// const ApiBaseUrl = 'http://127.0.0.1:8090';//本地
// const ApiBaseUrl = 'https://test.geekera.cn';//测试

const Config = {
  AccessKey: '', //接口key，必填
  User: 'geUserInfo',
  Token: 'adminToken',
  guestbookSheetId: 2,  //留言页sheet的id
}
//订阅配置(已失效，待更新)
const PushConfig = {
  isOpen: false,
  updateKey: "vhOJ1·····································",//更新推送模板id
  messageKey: "W56K5·····································",//留言审核推送模板id，
  SubscribeUrl: "http://127.0.0.1:5000",//订阅服务地址
}
//海报分享配置
const ShareConfig = {
  isOpen: false,
  env: 'fuzui'  //云环境ID
}
//文章、日记自定义样式
const ParserStyle = {
  table: 'border-collapse:collapse;border-top:1px solid gray;border-left:1px solid gray;margin: 28rpx 0;',
  th: 'border-right:1px solid gray;border-bottom:1px solid gray;background: #ccc;',
  td: 'border-right:1px solid gray;border-bottom:1px solid gray;',
  pre: 'display: block;background: hsl(30, 20%, 25%);color: white;text-shadow: 0 -.1em .2em black;font-family: monospace;font-size: 1em;text-align: left;white-space: pre;word-spacing: normal;word-break: normal;word-wrap: normal;line-height: 1.5;tab-size: 4;hyphens: none;margin: 28rpx 0;',
  blockquote: 'background-color:#e7f6ed;border-left:6px solid #4caf50;color:rgb(136, 136, 136);padding: 20rpx 40rpx 20rpx 30rpx;margin: 28rpx 0;'
}
const PageSize = {
  indexSize: 6, //每页文章数
  searchSize: 6,  //每页搜索结果数
  swiperPage: 0,  //轮播起始页
  swiperSize: 5,  //轮播数
  categorySize: 6,  //每页分类文章数
  tagSize: 7, //标签每页文章数
  photoSize: 10,  //每页光影数
  journal: 10 ,//每页日记数
  attachmentSize: 12 //每页附件数
}

//随机默认图，可加减数组
const RandomImage = [
  "https://cdn.fuzui.net/blog/bg2_1592326421605.jpg",
  "https://cdn.fuzui.net/blog/bg1_1592326421605.jpg"
]

//自定义部分样式
const CustomStyle = {
  photoImage: "https://cdn.fuzui.net/blog/photo_1587292902110.jpg?x-oss-process=style/sm", //光影顶图
  guestbookImage: "https://cdn.fuzui.net/blog/guestbook_1588604516117.png", //留言板顶图
  topImage: "https://fuzui.oss-cn-shenzhen.aliyuncs.com/img/nav01.png",//多数nav背景图
  swiperImage: "https://cdn.fuzui.net/blog/swiper_1587661045157.png",  //轮播图背景
  noContentImage: "https://cdn.fuzui.net/basis/nocontent.png"  //无内容
}

//关于页面中个人信息，置空不显示
const PersonalInfo = {
  blog: "https://www.geekera.cn",
  qq: "229999223",
  wx: "15555542203",
  mail: "i@geekera.cn",
  github: "https://github.com/fuzui",
  gitee: "https://gitee.com/fuzui"
}

module.exports = {
  ApiBaseUrl,
  PageSize,
  ParserStyle,
  Config,
  PushConfig,
  ShareConfig,
  RandomImage,
  CustomStyle,
  PersonalInfo
}