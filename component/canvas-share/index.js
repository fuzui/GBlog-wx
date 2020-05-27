// rpx转px
function createRpx2px() {
  const { windowWidth } = wx.getSystemInfoSync()
  return function (rpx) {
    return windowWidth / 750 * rpx
  }
}
const rpx2px = createRpx2px()

// canvas转为转存图片
function canvasToTempFilePath(option, context) {
  return new Promise((resolve, reject) => {
    wx.canvasToTempFilePath({
      ...option,
      success: resolve,
      fail: reject,
    }, context)
  })
}

// 保存图片
function saveImageToPhotosAlbum(option) {
  return new Promise((resolve, reject) => {
    wx.saveImageToPhotosAlbum({
      ...option,
      success: resolve,
      fail: reject,
    })
  })
}

Component({
  properties: {
    visible: {
      type: Boolean,
      value: false,
      observer(visible) {
        if (visible && !this.beginDraw) {
          this.draw()
          this.beginDraw = true
        }
      }
    },
    userInfo: {
      type: Object,
      value: false
    },
    imgsInfo: {
      type: Object,
      value: false
    },
  },

  data: {
    beginDraw: false,
    isDraw: false,
    canvasWidth: 843,
    canvasHeight: 1500,
    imageFile: '',
    responsiveScale: 1,
    marginTop: rpx2px(70*2),
  },

  lifetimes: {
    ready() {
      const designWidth = 375
      const designHeight = 603 // 这是在顶部位置定义，底部无tabbar情况下的设计稿高度
      // 以iphone6为设计稿，计算相应的缩放比例
      const { windowWidth, windowHeight } = wx.getSystemInfoSync()
      const responsiveScale =
        windowHeight / ((windowWidth / designWidth) * designHeight)
      if (responsiveScale < 1) {
        this.setData({
          responsiveScale,
        })
      }
    },
  },

  methods: {
    handleClose() {
      this.triggerEvent('close')
    },
    handleSave() {
      const { imageFile } = this.data
      if (imageFile) {
        saveImageToPhotosAlbum({
          filePath: imageFile,
        }).then(() => {
          wx.showToast({
            icon: 'none',
            title: '分享图片已保存至相册',
            duration: 2000,
          })
        })
      }
    },
    draw() {
      const that = this;
      wx.showLoading({
        title: '生成海报',
      })
      const { userInfo, canvasWidth, canvasHeight, imgsInfo } = this.data
      const { avatarUrl, nickName } = userInfo
      // 获取图片资源
      const avatarPromise = getImageInfo(avatarUrl);
      const thumbnailPromise = getImageInfo(imgsInfo.thumbnail);

      Promise.all([avatarPromise, thumbnailPromise])
        .then(([avatar, articlThumbnail]) => {
          const ctx = wx.createCanvasContext('share', this)
          const width = rpx2px(canvasWidth * 2);
          const height = rpx2px(canvasHeight * 2);
          const left = rpx2px(20 * 2);
          ctx.save();
          // 绘制背景
          ctx.drawImage(imgsInfo.bgWhite, 0, 0, width, height)

          //绘制文章缩略图（宽度占满，高度自定义）
          const thumbnailHeight = rpx2px(450 * 2)
          ctx.drawImage(articlThumbnail.path, 0, 0, width, thumbnailHeight);
          ctx.save();

          // 绘制大圆
          const radius = rpx2px(90 * 2)
          ctx.setStrokeStyle('white');
          ctx.beginPath();
          ctx.arc(width / 2, thumbnailHeight, radius + left, 0, Math.PI * 2, false);
          ctx.clip();
          ctx.drawImage(
            imgsInfo.bgWhite, 
            width / 2 - (radius + left), 
            thumbnailHeight - (radius + left), 
            (radius + left) * 2, 
            (radius + left) * 2
          )
          ctx.closePath();
          ctx.restore();
        

          // 绘制头像
          ctx.save();
          ctx.beginPath();
          ctx.setStrokeStyle('white');
          ctx.arc(width / 2, thumbnailHeight, radius, 0, Math.PI * 2, false);
          ctx.clip();
          ctx.drawImage(avatar.path, width / 2 - radius, thumbnailHeight - radius, radius * 2, radius * 2);
          ctx.stroke();
          ctx.closePath();
          ctx.restore();
          
          // 绘制用户名
          ctx.beginPath();
          ctx.setFontSize(40)
          ctx.setTextAlign('center')
          var nameHigh = thumbnailHeight + radius + left + 50
          ctx.fillText(
            nickName,
            width / 2,
            nameHigh,
          )
          ctx.stroke();
          ctx.restore();
          // 绘制描述信息
          ctx.setFontSize(45)
          var shareHigh = nameHigh + 55
          ctx.setTextAlign('center')
          ctx.fillText(
            imgsInfo.detail,
            width / 2,
            shareHigh,
          )


          // 绘制文章标题
          ctx.setFontSize(55)
          ctx.setTextAlign('left')
          var titleHigh = shareHigh + 80 + 55
          this.canvasTextAutoLine(
            imgsInfo.title, 
            ctx, 
            left+20, 
            titleHigh,
            70, 
            width - left-20, 
            4
          );
          ctx.save();
          ctx.restore();

          // 画虚线
          var lineHigh = titleHigh + 3 * (55+20);
          ctx.beginPath();
          ctx.setLineDash([10, 20], 5);
          ctx.moveTo(left, lineHigh);
          ctx.lineTo(width - left, lineHigh);
          ctx.stroke();

          // 画二维码
          ctx.beginPath();
          var qrcodeH = rpx2px(360 * 2);
          var qrcodeW = rpx2px(360 * 2);
          var qrcodeLeft = width - qrcodeW;
          var qrcodeTopToLine = lineHigh + 20;
          ctx.drawImage(imgsInfo.qrcode, qrcodeLeft, qrcodeTopToLine, qrcodeW, qrcodeH);
          ctx.closePath();

          // 分享信息
          ctx.beginPath();
          ctx.setFontSize(40)
          // 字体总宽度
          var shareInfoWidth = width - qrcodeW - 20;
          // 距离虚线的位置
          var shareInfoHigh = lineHigh + (height-lineHigh)/2-80;
          this.canvasTextAutoLine(
            imgsInfo.describe,
            ctx,
            left+10,
            shareInfoHigh,
            60,
            shareInfoWidth,
            4
          );
          ctx.closePath();

          ctx.draw(false, () => {
            canvasToTempFilePath({
              canvasId: 'share',
            }, this).then(({ tempFilePath }) => this.setData({ imageFile: tempFilePath }))
          })

          wx.hideLoading()
          this.setData({ isDraw: true })
        })
        .catch(() => {
          this.setData({ beginDraw: false })
          wx.hideLoading()
        })
    },
    /**
     * str:要绘制的字符串
     * canvas:canvas对象
     * initX:绘制字符串起始x坐标
     * initY:绘制字符串起始y坐标
     * lineHeight:字行高，自己定义个值即可
     * canvasWidth:文本宽度
     * lines: 行数
     */
    canvasTextAutoLine(str, ctx, initX, initY, lineHeight, canvasWidth, lines) {
      var lineWidth = 0;
      var lastSubStrIndex = 0;
      var beginLineHeight = lineHeight;
      var beginY = initY;
      for (let i = 0; i < str.length; i++) {
        lineWidth += ctx.measureText(str[i]).width;
        if (lineWidth > canvasWidth - initX) {//减去initX,防止边界出现的问题
          if (initY >= beginY + beginLineHeight * (lines - 1)) {
            ctx.fillText(str.substring(lastSubStrIndex, i - 1) + '...', initX, initY);
            return;
          } else {
            ctx.fillText(str.substring(lastSubStrIndex, i), initX, initY);
            initY += lineHeight;
            lineWidth = 0;
            lastSubStrIndex = i;
          }
        }
        if (i == str.length - 1) {
          ctx.fillText(str.substring(lastSubStrIndex, i + 1), initX, initY);
        }
      }
    }
  }
})

// 下载图片资源
function getImageInfo(url) {
  return new Promise((resolve, reject) => {
    wx.getImageInfo({
      src: url,
      success: resolve,
      fail: reject,
    })
  })
}