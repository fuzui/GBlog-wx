export default class LastMayday {
  palette(bolgName, name, avatar, articleImage, articleTitle, articleContext, qrcode) {
    return (
      {
        "borderRadius": "20rpx",
        "width": "720rpx",
        "height": "1000rpx",
        "background": "#ffffff",
        "views": [
          {
            "type": "image",
            "url": articleImage,
            "css": {
              "width": "720rpx",
              "height": "450rpx",
              "top": "0rpx",
              "left": "0rpx",
              "rotate": "0",
              "borderRadius": "20rpx",
              "borderWidth": "",
              "borderColor": "#000000",
              "shadow": "",
              "mode": "scaleToFill"
            }
          },
          {
            "type": "image",
            "url": avatar,
            "css": {
              "width": "120rpx",
              "height": "120rpx",
              "top": "96rpx",
              "left": "300rpx",
              "rotate": "0",
              "borderRadius": "60rpx",
              "borderWidth": "",
              "borderColor": "#000000",
              "shadow": "",
              "mode": "scaleToFill"
            }
          },
          {
            "type": "text",
            "text": name,
            "css": {
              "color": "#ffffff",
              "background": "rgba(0,0,0,0)",
              "width": "220rpx",
              "height": "35.74999999999999rpx",
              "top": "230rpx",
              "left": "250rpx",
              "rotate": "0",
              "borderRadius": "",
              "borderWidth": "",
              "borderColor": "#000000",
              "shadow": "",
              "padding": "0rpx",
              "fontSize": "25rpx",
              "fontWeight": "normal",
              "maxLines": "2",
              "lineHeight": "36.07500000000001rpx",
              "textStyle": "fill",
              "textDecoration": "none",
              "fontFamily": "",
              "textAlign": "center"
            }
          },
          {
            "type": "text",
            "text": articleTitle,
            "css": {
              "color": "#ffffff",
              "background": "rgba(0,0,0,0)",
              "width": "420rpx",
              "height": "42.89999999999999rpx",
              "top": "329rpx",
              "left": "150rpx",
              "rotate": "0",
              "borderRadius": "",
              "borderWidth": "",
              "borderColor": "#000000",
              "shadow": "",
              "padding": "0rpx",
              "fontSize": "30rpx",
              "fontWeight": "bold",
              "maxLines": "1",
              "lineHeight": "43.290000000000006rpx",
              "textStyle": "fill",
              "textDecoration": "none",
              "fontFamily": "",
              "textAlign": "center"
            }
          },
          {
            "type": "text",
            "text": "—— " + bolgName + " ——",
            "css": {
              "color": "#ffffff",
              "background": "rgba(0,0,0,0)",
              "width": "600rpx",
              "height": "25.740000000000002rpx",
              "top": "25.000000000000004rpx",
              "left": "60rpx",
              "rotate": "0",
              "borderRadius": "",
              "borderWidth": "",
              "borderColor": "#000000",
              "shadow": "",
              "padding": "0rpx",
              "fontSize": "18rpx",
              "fontWeight": "normal",
              "maxLines": "2",
              "lineHeight": "25.974000000000004rpx",
              "textStyle": "fill",
              "textDecoration": "none",
              "fontFamily": "",
              "textAlign": "center"
            }
          },
          {
            "type": "text",
            "text": articleContext,
            "css": {
              "color": "#666666",
              "background": "",
              "width": "600rpx",
              "height": "167.04599999999996rpx",
              "top": "526rpx",
              "left": "60rpx",
              "rotate": "0",
              "borderRadius": "",
              "borderWidth": "",
              "borderColor": "#000000",
              "shadow": "",
              "padding": "0rpx",
              "fontSize": "22rpx",
              "fontWeight": "normal",
              "maxLines": "4",
              "lineHeight": "41.514rpx",
              "textStyle": "fill",
              "textDecoration": "none",
              "fontFamily": "",
              "textAlign": "left"
            }
          },
          {
            "type": "image",
            "url": qrcode,
            "css": {
              "width": "200rpx",
              "height": "200rpx",
              "top": "714rpx",
              "left": "260rpx",
              "rotate": "0",
              "borderRadius": "",
              "borderWidth": "",
              "borderColor": "#000000",
              "shadow": "",
              "mode": "scaleToFill"
            }
          },
          {
            "type": "text",
            "text": "长按扫描二维码，与一起聊技术",
            "css": {
              "color": "#CCCCCC",
              "background": "",
              "width": "400rpx",
              "height": "29.34rpx",
              "top": "942rpx",
              "left": "160rpx",
              "rotate": "0",
              "borderRadius": "",
              "borderWidth": "",
              "borderColor": "#000000",
              "shadow": "",
              "padding": "0rpx",
              "fontSize": "18rpx",
              "fontWeight": "normal",
              "maxLines": "1",
              "lineHeight": "29.97rpx",
              "textStyle": "fill",
              "textDecoration": "none",
              "fontFamily": "",
              "textAlign": "center"
            }
          }
        ]
      }
    );
  }
}
