import { mergeJsonObject } from './../utils/utils';
const ApiBaseUrl = 'https://www.geekera.cn';//生产上
// const ApiBaseUrl = 'http://127.0.0.1:8090';//本地
// const ApiBaseUrl = 'https://test.geekera.cn';//测试

const Config = {
  AccessKey: '', //接口key，必填
  guestbookSheetId: 2,  //留言页sheet的id,
  logo: '', // 选填，填写将提高首页加载速度
  blogTitle: '' // 选填，填写将提高首页加载速度
}
//海报分享配置
const CloudConfig = {
  isOpen: false,
  env: 'fuzui',  //云环境ID
  shareOpen: false,  // 海报分享开启
  randomGraphOpen: false,   // 随机图开启（内容管理）
  checkMessage: false    // 敏感词检测
}
//文章、日记自定义样式
const commonTagStyle = {
  table: 'border-collapse:collapse;border-top:1px solid gray;border-left:1px solid gray;margin: 28rpx 0;',
  th: 'border-right:1px solid gray;border-bottom:1px solid gray;background: #ccc;',
  td: 'border-right:1px solid gray;border-bottom:1px solid gray;',
  blockquote: 'background-color:#e7f6ed;border-left:6px solid #4caf50;color:rgb(136, 136, 136);padding: 20rpx 40rpx 20rpx 30rpx;margin: 28rpx 0;',
  ul: 'padding-left: 25px;',
  ol: 'padding-left: 25px;',
  h1: 'font-size: 1.5em;line-height: 50px;',
  h2: 'font-size: 1.17em;line-height: 40px;',
  h3: 'font-size: 0.83em;line-height: 30px;',
  h4: 'font-size: 0.67em;line-height: 30px;',
  h5: 'font-size: 0.50em;line-height: 30px;',
  'code': 'word-break: break-all;',
  'pre > code': 'white-space:nowrap;',
  video: 'width: 100%'
}
const commentTagStyle = {
  p: 'margin: 0 0;'
}
const MpHtmlStyle = {
  tagStyle: commonTagStyle,
  containerStyle: 'padding: 12px;font-size: 15px;line-height: 25px',
  commentTagStyle: mergeJsonObject(commonTagStyle, commentTagStyle),
  commentContainerStyle: '',
  journalTagStyle: commentTagStyle,
  journalContainerStyle: '',
  loadingImage: '/images/default/image-loading.svg',
  errorImage: '/images/default/image-error.svg'
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
  MpHtmlStyle,
  Config,
  CloudConfig,
  RandomImage,
  CustomStyle,
  PersonalInfo
}