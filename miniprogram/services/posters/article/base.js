export default class LastMayday {
  palette(bolgName, name, avatar, articleImage, articleTitle, articleContext, qrcode) {
    return {
      borderRadius: '20rpx',
      width: '650rpx',
      height: '900rpx',
      background: '#ffffff',
      views: [
        {
          type: 'image',
          url: articleImage,
          css: {
            width: '650rpx',
            height: '400rpx',
            top: '0rpx',
            left: '0rpx',
            rotate: '0',
            borderRadius: '20rpx',
            borderWidth: '',
            borderColor: '#000000',
            shadow: '',
            mode: 'scaleToFill'
          }
        },
        {
          type: 'image',
          url: avatar,
          css: {
            width: '110rpx',
            height: '110rpx',
            top: '90rpx',
            left: '270rpx',
            rotate: '0',
            borderRadius: '55rpx',
            borderWidth: '',
            borderColor: '#000000',
            shadow: '',
            mode: 'scaleToFill'
          }
        },
        {
          type: 'text',
          text: name,
          css: {
            color: '#ffffff',
            background: 'rgba(0,0,0,0)',
            width: '210rpx',
            height: '35rpx',
            top: '230rpx',
            left: '220rpx',
            rotate: '0',
            borderRadius: '',
            borderWidth: '',
            borderColor: '#000000',
            shadow: '',
            padding: '0rpx',
            fontSize: '22rpx',
            fontWeight: 'normal',
            maxLines: '2',
            lineHeight: '36.07500000000001rpx',
            textStyle: 'fill',
            textDecoration: 'none',
            fontFamily: '',
            textAlign: 'center'
          }
        },
        {
          type: 'text',
          text: articleTitle,
          css: {
            color: '#ffffff',
            background: 'rgba(0,0,0,0)',
            width: '410rpx',
            height: '50rpx',
            top: '280rpx',
            left: '120rpx',
            rotate: '0',
            borderRadius: '',
            borderWidth: '',
            borderColor: '#000000',
            shadow: '',
            padding: '0rpx',
            fontSize: '32rpx',
            fontWeight: 'bold',
            maxLines: '2',
            lineHeight: '43rpx',
            textStyle: 'fill',
            textDecoration: 'none',
            fontFamily: '',
            textAlign: 'center'
          }
        },
        {
          type: 'text',
          text: '—— ' + bolgName + ' ——',
          css: {
            color: '#ffffff',
            background: 'rgba(0,0,0,0)',
            width: '500rpx',
            height: '25rpx',
            top: '25rpx',
            left: '75rpx',
            rotate: '0',
            borderRadius: '',
            borderWidth: '',
            borderColor: '#000000',
            shadow: '',
            padding: '0rpx',
            fontSize: '18rpx',
            fontWeight: 'normal',
            maxLines: '2',
            lineHeight: '25rpx',
            textStyle: 'fill',
            textDecoration: 'none',
            fontFamily: '',
            textAlign: 'center'
          }
        },
        {
          type: 'text',
          text: articleContext,
          css: {
            color: '#666666',
            background: '',
            width: '540rpx',
            height: '30rpx',
            top: '420rpx',
            left: '55rpx',
            rotate: '0',
            borderRadius: '',
            borderWidth: '',
            borderColor: '#000000',
            shadow: '',
            padding: '0rpx',
            fontSize: '22rpx',
            fontWeight: 'normal',
            maxLines: '4',
            lineHeight: '50rpx',
            textStyle: 'fill',
            textDecoration: 'none',
            fontFamily: '',
            textAlign: 'center'
          }
        },
        {
          type: 'image',
          url: qrcode,
          css: {
            width: '200rpx',
            height: '200rpx',
            bottom: '80rpx',
            left: '225rpx',
            rotate: '0',
            borderRadius: '',
            borderWidth: '',
            borderColor: '#000000',
            shadow: '',
            mode: 'scaleToFill'
          }
        },
        {
          type: 'text',
          text: '长按扫描二维码，一起聊技术',
          css: {
            color: '#CCCCCC',
            background: '',
            width: '410rpx',
            height: '29.34rpx',
            bottom: '20rpx',
            left: '120rpx',
            rotate: '0',
            borderRadius: '',
            borderWidth: '',
            borderColor: '#000000',
            shadow: '',
            padding: '0rpx',
            fontSize: '18rpx',
            fontWeight: 'normal',
            maxLines: '1',
            lineHeight: '30rpx',
            textStyle: 'fill',
            textDecoration: 'none',
            fontFamily: '',
            textAlign: 'center'
          }
        }
      ]
    }
  }
}
