import { ApiBaseUrl, CustomStyle } from '../../config/api'

Component({
  externalClasses: ['custom-class'],
  properties: {
    defaultImage: {
      type: String,
      value: CustomStyle.placeholderImage
    },
    loadErrorImage: {
      type: String,
      value: CustomStyle.loadErrorImage
    },
    originalImage: {
      type: String,
      value: ''
    },
    width: {
      type: String,
      value: ''
    },
    height: {
      type: String,
      value: ''
    },
    mode: {
      type: String,
      value: 'widthFix'
    },
    randomGraphs: {
      type: Array,
      value: []
    }
  },
  data: {
    ApiBaseUrl,
    finishLoadFlag: false,
    loadErrorFlag: false
  },
  methods: {
    finishLoad: function (e) {
      this.setData({
        finishLoadFlag: true
      })
    },
    loadError: function (e) {
      this.setData({
        loadErrorFlag: true
      })
    }
  }
})
