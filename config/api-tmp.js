
// const ApiBaseUrl = 'https://www.geekera.cn';//生产上
// const ApiBaseUrl = 'http://127.0.0.1:8090';//本地
const ApiBaseUrl = 'https://www.geekera.cn';//测试

const Config = {
  AccessKey: '',  //接口key，必填
  User: 'geUserInfo',
  guestbookSheetId: 2,  //留言页sheet的id
}
//订阅配置
const PushConfig = {
  isOpen: false,
  updateKey: "",//更新推送模板id
  messageKey: "",//留言审核推送模板id，
  SubscribeUrl: "",//订阅服务地址
}
//海报分享配置
const ShareConfig = {
  isOpen: false,
  env: ''
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
  journal: 10 //每页日记数
}

//随机默认图，可加减数组
const RandomImage = [
  "https://cdn.fuzui.net/blog/bg2_1592326421605.jpg",
  "https://cdn.fuzui.net/blog/bg1_1592326421605.jpg"
]

//自定义部分样式
const CustomStyle = {
  topImage: "https://fuzui.oss-cn-shenzhen.aliyuncs.com/img/nav01.png"
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

//全局字段url
function getOptionByKey(key){
  return ApiBaseUrl + '/api/content/options/keys/'+key;
}

//根据分类名获取分类文章url
function getCategoriesArticle(slug){
  return ApiBaseUrl + '/api/content/categories/'+slug+'/posts';
}
//获取文章详情url
function getArticleDetails(id){
  return ApiBaseUrl + '/api/content/posts/'+id;
}
//点赞url
function doPraise(postId){
  return ApiBaseUrl + '/api/content/posts/'+postId+'/likes';
}
//获取评论
function getComments(postId){
  return ApiBaseUrl + '/api/content/posts/'+postId+'/comments/tree_view';
}
//获取sheet评论
function getCommentsBySheetId(postId){
  return ApiBaseUrl + '/api/content/sheets/'+postId+'/comments/tree_view';
}
//根据标签别名获取文章
function getTagsArticle(slug){
  return ApiBaseUrl + '/api/content/tags/'+slug+'/posts';
}

module.exports = {
  getOptionByKey: getOptionByKey,
  getCategories: ApiBaseUrl + '/api/content/categories',
  getTags: ApiBaseUrl + '/api/content/tags',
  getCategoriesArticle: getCategoriesArticle,
  getArticleList: ApiBaseUrl + '/api/content/posts',
  getJournals: ApiBaseUrl + '/api/content/journals',
  getSwiper: ApiBaseUrl + '/api/content/posts',
  searchArticle: ApiBaseUrl + '/api/content/posts/search',
  getArticleDetails: getArticleDetails,
  doPraise: doPraise,
  getArchives: ApiBaseUrl + '/api/content/archives/months',
  getLinks: ApiBaseUrl + '/api/content/links',
  getPhotos: ApiBaseUrl + '/api/content/photos',
  getGuestbook: ApiBaseUrl + '/wxApi/getGuestbook',
  getStatistics: ApiBaseUrl + '/api/content/statistics/user',
  writeComment: ApiBaseUrl + '/api/content/posts/comments',
  getComments,
  getCommentsBySheetId,
  getTagsArticle: getTagsArticle,
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