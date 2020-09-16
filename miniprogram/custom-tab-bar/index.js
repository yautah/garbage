Component({
  options: {
    addGlobalClass: true,
  },

  data: {
    selected: 0,
    color: '#7A7E83',
    selectedColor: '#3cc51f',
    list: [
      {
        pagePath: '/pages/home/index',
        text: '语音',
        iconPath: '/images/tabs/index.png',
        selectedIconPath: '/images/tabs/index_focus.png',
      },
      {
        pagePath: '/pages/about/index',
        text: '设置',
        iconPath: '/images/tabs/mine.png',
        selectedIconPath: '/images/tabs/mine_focus.png',
      },
    ],
  },
  attached() {},
  methods: {
    switchTab(e) {
      const { index } = e.currentTarget.dataset
      const data = this.data.list[index]
      const url = data.pagePath

      this.setData({
        selected: index,
      })
      wx.switchTab({ url })
    },

    streamRecord(e) {
      // var animation = 'animated heartBeat infinite'
      var animation1 = 'animated pulse infinite'
      var animation2 = 'animated pulse infinite delay-1s'
      var animation3 = 'animated pulse infinite delay-2s'
      // var animation = 'animated scale-down infinite'
      // var animation = 'animation-scale-down'
      this.setData({
        animation1,
        animation2,
        animation3,
      })
    },

    endStreamRecord(e) {
      this.setData({
        animation1: '',
        animation2: '',
        animation3: '',
      })
    },

    handleTapVoice() {
      wx.navigateTo({
        url: '/pages/index/index',
      })
    },
  },
})
