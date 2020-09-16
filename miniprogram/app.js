//app.js

import Store from './stores/index.js'
import wxp from './utils/wxp'

const utils = require('./utils/util.js')

if (!wxp.wx.cloud) {
  console.error('请使用 2.2.3 或以上的基础库以使用云能力')
} else {
  wxp.wx.cloud.init({
    env: 'garbage-dev',
    traceUser: true,
  })
}

//初始化 store
wxp.store = new Store()
wxp.store.globalStore.init()

App({
  onLaunch: function() {
    wx.getStorage({
      key: 'history',
      success: res => {
        this.globalData.history = res.data
      },
      fail: res => {
        console.log('get storage failed')
        console.log(res)
        this.globalData.history = []
      },
    })

    wx.getSystemInfo({
      success: e => {
        this.globalData.StatusBar = e.statusBarHeight
        let custom = wx.getMenuButtonBoundingClientRect()
        this.globalData.Custom = custom
        this.globalData.CustomBar = custom.bottom + custom.top - e.statusBarHeight
      },
    })
  },
  // 权限询问
  getRecordAuth: function() {
    wx.getSetting({
      success(res) {
        console.log('succ')
        console.log(res)
        if (!res.authSetting['scope.record']) {
          wx.authorize({
            scope: 'scope.record',
            success() {
              // 用户已经同意小程序使用录音功能，后续调用 wx.startRecord 接口不会弹窗询问
              console.log('succ auth')
              wxp.store.globalStore.getAuthSetting()
            },
            fail() {
              console.log('fail auth')
              wxp.store.globalStore.getAuthSetting()
            },
          })
        } else {
          console.log('record has been authed')
        }
      },
      fail(res) {
        console.log('fail')
        console.log(res)
      },
    })
  },

  onHide: function() {},
  globalData: {
    history: [],
  },
})
