import { ApiBaseUrl } from '../../config/api.js';

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

//根据日记id删除日记
function adminDeleteJournal(journalId){
  return ApiBaseUrl + '/api/admin/journals/'+journalId+'?admin_token=';
}
//根据日记id修改日记
function adminEditJournal(journalId){
  return ApiBaseUrl + '/api/admin/journals/'+journalId+'?admin_token=';
}
//根据友链id删除友链
function adminDeleteLink(linkId){
  return ApiBaseUrl + '/api/admin/links/'+linkId+'?admin_token=';
}
//根据友链id修改友链
function adminEditLink(linkId){
  return ApiBaseUrl + '/api/admin/links/'+linkId+'?admin_token=';
}
//获取附件详情
function adminGetAttachmentDetails(id){
  return ApiBaseUrl + '/api/admin/attachments/'+id+'?admin_token=';
}
//编辑附件名
function adminEditAttachmentDetails(attachmentId){
  return ApiBaseUrl + '/api/admin/attachments/'+attachmentId+'?admin_token=';
}
//根据附件id删除附件
function adminDeleteAttachment(attachmentId){
  return ApiBaseUrl + '/api/admin/attachments/'+attachmentId+'?admin_token=';
}

function adminActivatesTheme(thmemId) {
  return ApiBaseUrl + '/api/admin/themes/'+thmemId+'/activation?admin_token=';
}

function adminDeleteTheme(thmemId) {
  return ApiBaseUrl + '/api/admin/themes/'+thmemId+'?admin_token=';
}

function adminFetchingTheme(thmemId) {
  return ApiBaseUrl + '/api/admin/themes/fetching/'+thmemId+'?admin_token=';
}

//获取图库详情
function adminGetPhotoDetails(photoId){
  return ApiBaseUrl + '/api/admin/photos/'+photoId+'?admin_token=';
}
//编辑图库
function adminEditPhotoDetails(photoId){
  return ApiBaseUrl + '/api/admin/photos/'+photoId+'?admin_token=';
}
//根据图库id删除图库
function adminDeletePhoto(photoId){
  return ApiBaseUrl + '/api/admin/photos/'+photoId+'?admin_token=';
}

function adminEditMenu(menuId){
  return ApiBaseUrl + '/api/admin/menus/'+menuId+'?admin_token=';
}
function adminDeleteMenu(menuId){
  return ApiBaseUrl + '/api/admin/menus/'+menuId+'?admin_token=';
}

//修改文章评论状态
function adminEditPostCommentStatus(commentId,status){
  return ApiBaseUrl + '/api/admin/posts/comments/'+commentId+'/status/'+status+'?admin_token=';
}
//删除文章评论
function adminDeletePostComment(commentId){
  return ApiBaseUrl + '/api/admin/posts/comments/'+commentId+'?admin_token=';
}

//修改sheet评论状态
function adminEditSheetCommentStatus(commentId,status){
  return ApiBaseUrl + '/api/admin/sheets/comments/'+commentId+'/status/'+status+'?admin_token=';
}
//删除sheet评论
function adminDeleteSheetComment(commentId){
  return ApiBaseUrl + '/api/admin/sheets/comments/'+commentId+'?admin_token=';
}
//修改标签
function adminEditTag(tagId){
  return ApiBaseUrl + '/api/admin/tags/'+tagId+'?admin_token=';
}
//删除标签
function adminDeleteTag(tagId){
  return ApiBaseUrl + '/api/admin/tags/'+tagId+'?admin_token=';
}
//修改标签
function adminEditCategory(categoryId){
  return ApiBaseUrl + '/api/admin/categories/'+categoryId+'?admin_token=';
}
//删除标签
function adminDeleteCategory(categoryId){
  return ApiBaseUrl + '/api/admin/categories/'+categoryId+'?admin_token=';
}

//修改文章状态
function adminEditPostStatus(postId,status){
  return ApiBaseUrl + '/api/admin/posts/'+postId+'/status/'+status+'?admin_token=';
}
//删除文章
function adminDeletePost(postId){
  return ApiBaseUrl + '/api/admin/posts/'+postId+'?admin_token=';
}
//修改sheet状态
function adminEditSheetStatus(sheetId,status){
  return ApiBaseUrl + '/api/admin/sheets/'+sheetId+'/'+status+'?admin_token=';
}
//删除sheet
function adminDeleteSheet(sheetId){
  return ApiBaseUrl + '/api/admin/sheets/'+sheetId+'?admin_token=';
}

module.exports = {
  getThemeSettings: ApiBaseUrl + '/api/content/themes/activation/settings',
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
  writeSheetComment: ApiBaseUrl + '/api/content/sheets/comments',
  getComments,
  getCommentsBySheetId,
  getTagsArticle: getTagsArticle,
  adminLogin: ApiBaseUrl + '/api/admin/login',
  adminGetEnvironments: ApiBaseUrl + '/api/admin/environments?admin_token=',
  adminGetStatistics: ApiBaseUrl + '/api/admin/statistics/user?admin_token=',
  adminAddJournal: ApiBaseUrl + '/api/admin/journals?admin_token=',
  adminGetJournal: ApiBaseUrl + '/api/admin/journals?admin_token=',
  adminEditJournal: adminEditJournal,
  adminDeleteJournal: adminDeleteJournal,
  adminAddLink: ApiBaseUrl + '/api/admin/links?admin_token=',
  adminGetLink: ApiBaseUrl + '/api/admin/links?admin_token=',
  adminEditLink: adminEditLink,
  adminDeleteLink: adminDeleteLink,
  adminGetOption: ApiBaseUrl + '/api/admin/options/map_view?admin_token=',
  adminGetAttachment: ApiBaseUrl + '/api/admin/attachments?admin_token=',
  adminAddAttachment: ApiBaseUrl + '/api/admin/attachments/upload?admin_token=',
  adminGetAttachmentDetails: adminGetAttachmentDetails,
  adminEditAttachmentDetails: adminEditAttachmentDetails,
  adminDeleteAttachment: adminDeleteAttachment,
  adminBatchDeleteAttachment: ApiBaseUrl + '/api/admin/attachments?admin_token=',
  adminGetTheme: ApiBaseUrl + '/api/admin/themes?admin_token=',
  adminActivatesTheme: adminActivatesTheme,
  adminDeleteTheme: adminDeleteTheme,
  adminFetchingTheme: adminFetchingTheme,
  adminFetchingNewTheme: ApiBaseUrl + '/api/admin/themes/fetching?admin_token=',
  adminGetPhoto: ApiBaseUrl + '/api/admin/photos?admin_token=',
  adminAddPhoto: ApiBaseUrl + '/api/admin/photos?admin_token=',
  adminGetPhotoDetails: adminGetPhotoDetails,
  adminEditPhotoDetails: adminEditPhotoDetails,
  adminDeletePhoto: adminDeletePhoto,
  adminGetMenu: ApiBaseUrl + '/api/admin/menus?admin_token=',
  adminAddMenu: ApiBaseUrl + '/api/admin/menus?admin_token=',
  adminEditMenu: adminEditMenu,
  adminDeleteMenu: adminDeleteMenu,
  adminEditUser: ApiBaseUrl + '/api/admin/users/profiles?admin_token=',
  adminEditPassword: ApiBaseUrl + '/api/admin/users/profiles/password?admin_token=',
  adminGetPostComment: ApiBaseUrl + '/api/admin/posts/comments?admin_token=',
  adminAddPostComment: ApiBaseUrl + '/api/admin/posts/comments?admin_token=',
  adminEditPostCommentStatus: adminEditPostCommentStatus,
  adminDeletePostComment: adminDeletePostComment,
  adminGetSheetComment: ApiBaseUrl + '/api/admin/sheets/comments?admin_token=',
  adminAddSheetComment: ApiBaseUrl + '/api/admin/sheets/comments?admin_token=',
  adminEditSheetCommentStatus: adminEditSheetCommentStatus,
  adminDeleteSheetComment: adminDeleteSheetComment,
  adminGetUserProfile: ApiBaseUrl + '/api/admin/users/profiles?admin_token=',
  adminGetTag: ApiBaseUrl + '/api/admin/tags?admin_token=',
  adminAddTag: ApiBaseUrl + '/api/admin/tags?admin_token=',
  adminEditTag: adminEditTag,
  adminDeleteTag: adminDeleteTag,
  adminGetCategory: ApiBaseUrl + '/api/admin/categories?admin_token=',
  adminAddCategory: ApiBaseUrl + '/api/admin/categories?admin_token=',
  adminEditCategory: adminEditCategory,
  adminDeleteCategory: adminDeleteCategory,
  adminGetPost: ApiBaseUrl + '/api/admin/posts?admin_token=',
  adminEditPostStatus: adminEditPostStatus,
  adminDeletePost: adminDeletePost,
  adminGetSheet: ApiBaseUrl + '/api/admin/sheets?admin_token=',
  adminEditSheetStatus: adminEditSheetStatus,
  adminDeleteSheet: adminDeleteSheet
}