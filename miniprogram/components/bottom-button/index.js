import { language } from '../../utils/conf.js'
import wxp from '../../utils/wxp'

Component({
  options: {
    addGlobalClass: true,
  },

  properties: {
    authSetting: {
      type: Object,
      observer: function(newVal, oldVal) {
        if (!newVal) {
          this.setData({ authStatus: 'unauthed' })
          return
        }

        if (newVal[`scope-record`]) {
          this.setData({ authStatus: 'authed' })
        } else if (newVal[`scope-record`] === false) {
          this.setData({ authStatus: 'refused' })
        } else {
          this.setData({ authStatus: 'unauthed' })
        }
      },
    },
  },

  data: {
    currentButtonType: 'normal',
    authStatus: 'unauthed',
  },

  ready: function() {
    // console.log(this.data.buttonEvent,)
  },

  async attached() {},

  methods: {
    /**
     * 按下按钮开始录音
     */
    streamRecord(e) {
      if (this.data.buttonDisabled) {
        return
      }
      // 先清空背景音
      wx.stopBackgroundAudio()

      this.changeButtonType('press')

      this.triggerEvent('recordstart', {})

      var animation = 'scale-down'

      var that = this
      this.ticker = setInterval(() => {
        that.setData({
          animation: that.data.animation ? '' : animation,
        })
      }, 500)
    },

    /**
     * 松开按钮结束录音
     */
    endStreamRecord(e) {
      this.triggerEvent('recordend', {})
      if (this.ticker) {
        clearInterval(this.ticker)
      }
      this.setData({
        animation: '',
      })
    },

    /**
     * 修改按钮样式
     */
    changeButtonType(buttonType, buttonLang) {
      this.setData({})
    },

    handleSetting() {
      wxp.store.globalStore.getAuthSetting()
    },

    async getAuthSetting() {
      const res = await wxp.getSetting()
      const authSetting = res.authSetting
    },
  },
})
