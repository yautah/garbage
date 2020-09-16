import { storeBindingsBehavior } from 'mobx-miniprogram-bindings'
import wxp from '../../utils/wxp'

const util = require('../../utils/util.js')

const plugin = requirePlugin('WechatSI')
import { language } from '../../utils/conf.js'
// 获取**全局唯一**的语音识别管理器**recordRecoManager**
const manager = plugin.getRecordRecognitionManager()

Page({

  behaviors: [storeBindingsBehavior],
  storeBindings: [{
    store: wxp.store.globalStore,
    fields: ['authSetting'],
  },{
    store: wxp.store.voiceStore,
    actions: ['searchGarbages']
  }],

  data: {
    dialogList:[],
    scroll_top: 10000, // 竖向滚动条位置

    bottomButtonDisabled: false, // 底部按钮disabled

    initTranslate: {
      // 为空时的卡片内容
      text: '告诉我，你想搜什么？',
      type: 'init',
    },

    currentTranslate: {
      // 当前语音输入内容
      create: '04/27 15:37',
      text: '等待说话',
    },

    recording: false, // 正在录音
    recordStatus: 0, // 状态： 0 - 录音中 1- 查询中 2 - 查询完成

    toView: 'fake', // 滚动位置
    lastId: -1, // dialogList 最后一个item的 id
    currentTranslateVoice: '', // 当前播放语音路径

    customBarHeight: wxp.app.globalData.CustomBar,
  },

  /**
   * 按住按钮开始语音识别
   */
  streamRecord: function(e) {
    manager.start({ lang: 'zh_CN' })

    this.setData({
      recordStatus: 0,
      recording: true,
      currentTranslate: {
        // 当前语音输入内容
        create: util.recordTime(new Date()),
        text: '正在聆听中...',
      },
    })
    this.scrollToNew()
  },

  /**
   * 松开按钮结束语音识别
   */
  streamRecordEnd: async function(e) {
    // 防止重复触发stop函数
    if (!this.data.recording || this.data.recordStatus != 0) {
      console.warn('has finished!')
      return
    }

    manager.stop()

    this.setData({
      bottomButtonDisabled: true,
    })
  },

  /**
   * 寻找垃圾
   */
  queryTrash: async function(item, index) {
    const results = await this.searchGarbages(item.text)

    console.log('resultssssssssssssssss', results)

    let tmpDialogList = this.data.dialogList.slice(0)

    let tmpTranslate = Object.assign({}, item, {
      translateText: '',
      translateVoicePath: '',
      translateVoiceExpiredTime: 0,
      results,
    })

    tmpDialogList[index] = tmpTranslate

    this.setData({
      dialogList: tmpDialogList,
      bottomButtonDisabled: false,
      recording: false,
    })

    this.scrollToNew()
  },

  /**
   * 修改文本信息之后触发翻译操作
   */
  translateTextAction: function(e) {
    // console.log("translateTextAction" ,e)
    let detail = e.detail // 自定义组件触发事件时提供的detail对象
    let item = detail.item
    let index = detail.index

    this.queryTrash(item, index)
  },

  /**
   * 语音文件过期，重新合成语音文件
   */
  expiredAction: function(e) {
    let detail = e.detail || {} // 自定义组件触发事件时提供的detail对象
    let item = detail.item || {}
    let index = detail.index

    if (isNaN(index) || index < 0) {
      return
    }

    let lto = item.lto || 'en_US'

    plugin.textToSpeech({
      lang: lto,
      content: item.translateText,
      success: resTrans => {
        if (resTrans.retcode == 0) {
          let tmpDialogList = this.data.dialogList.slice(0)

          let tmpTranslate = Object.assign({}, item, {
            autoPlay: true, // 自动播放背景音乐
            translateVoicePath: resTrans.filename,
            translateVoiceExpiredTime: resTrans.expired_time || 0,
          })

          tmpDialogList[index] = tmpTranslate

          this.setData({
            dialogList: tmpDialogList,
          })
        } else {
          console.warn('语音合成失败', resTrans, item)
        }
      },
      fail: function(resTrans) {
        console.warn('语音合成失败', resTrans, item)
      },
    })
  },

  /**
   * 初始化为空时的卡片
   */
  initCard: function() {
    let initTranslateNew = Object.assign({}, this.data.initTranslate, {
      create: util.recordTime(new Date()),
    })
    this.setData({
      initTranslate: initTranslateNew,
    })
  },

  /**
   * 删除卡片
   */
  deleteItem: function(e) {
    // console.log("deleteItem" ,e)
    let detail = e.detail
    let item = detail.item

    let tmpDialogList = this.data.dialogList.slice(0)
    let arrIndex = detail.index
    tmpDialogList.splice(arrIndex, 1)

    // 不使用setTImeout可能会触发 Error: Expect END descriptor with depth 0 but get another
    setTimeout(() => {
      this.setData({
        dialogList: tmpDialogList,
      })
      if (tmpDialogList.length == 0) {
        this.initCard()
      }
    }, 0)
  },

  /**
   * 识别内容为空时的反馈
   */
  showRecordEmptyTip: function() {
    this.setData({
      recording: false,
      bottomButtonDisabled: false,
    })
    wx.showToast({
      title: '请说话',
      icon: 'success',
      image: '/images/no_voice.png',
      duration: 1000,
      success: function(res) {},
      fail: function(res) {
        console.log(res)
      },
    })
  },

  /**
   * 初始化语音识别回调
   * 绑定语音播放开始事件
   */
  initRecord: function() {
    //有新的识别内容返回，则会调用此事件
    manager.onRecognize = res => {
      let currentData = Object.assign({}, this.data.currentTranslate, {
        text: res.result,
      })
      this.setData({
        currentTranslate: currentData,
      })
      this.scrollToNew()
    }

    // 识别结束事件
    manager.onStop = res => {
      let text = res.result

      if (text == '') {
        this.showRecordEmptyTip()
        return
      }

      let lastId = this.data.lastId + 1

      let currentData = Object.assign({}, this.data.currentTranslate, {
        text: res.result.replace(/。/, ''),
        translateText: '正在查询中',
        id: lastId,
        voicePath: res.tempFilePath,
      })

      this.setData({
        currentTranslate: currentData,
        recordStatus: 1,
        lastId: lastId,
      })

      this.scrollToNew()

      this.queryTrash(currentData, this.data.dialogList.length)
    }

    // 识别错误事件
    manager.onError = res => {
      this.setData({
        recording: false,
        bottomButtonDisabled: false,
      })
    }

    // 语音播放开始事件
    wx.onBackgroundAudioPlay(res => {
      const backgroundAudioManager = wx.getBackgroundAudioManager()
      let src = backgroundAudioManager.src

      this.setData({
        currentTranslateVoice: src,
      })
    })
  },

  /**
   * 设置语音识别历史记录
   */
  setHistory: function() {
    try {
      let dialogList = this.data.dialogList
      dialogList.forEach(item => {
        item.autoPlay = false
      })
      wx.setStorageSync('history', dialogList)
    } catch (e) {
      console.error('setStorageSync setHistory failed')
    }
  },

  /**
   * 得到历史记录
   */
  getHistory: function() {
    try {
      let history = wx.getStorageSync('history')
      if (history) {
        let len = history.length
        let lastId = this.data.lastId
        if (len > 0) {
          lastId = history[len - 1].id || -1
        }
        this.setData({
          dialogList: history,
          toView: this.data.toView,
          lastId: lastId,
        })
      }
    } catch (e) {
      // Do something when catch error
      this.setData({
        dialogList: [],
      })
    }
  },

  /**
   * 重新滚动到底部
   */
  scrollToNew: function() {
    this.setData({
      toView: this.data.toView,
    })
  },

  onShow: function() {
    if (typeof this.getTabBar === 'function' && this.getTabBar()) {
      this.getTabBar().setData({
        selected: 0,
      })
    }

    this.scrollToNew()

    this.initCard()

    if (this.data.recordStatus == 2) {
      wx.showLoading({
        // title: '',
        mask: true,
      })
    }
  },

  onLoad: function() {
    // this.getHistory()
    this.initRecord()

    this.setData({ toView: this.data.toView })

    wxp.app.getRecordAuth()
  },

  onReady() {
    let that = this
    wx
      .createSelectorQuery()
      .selectAll('.container, .foot-group')
      .boundingClientRect(function(res) {
        that.setData({
          scrollHeight: res[0].height - res[1].height,
        })
      })
      .exec()
  },

  onHide: function() {
    this.setHistory()
  },

  onShareAppMessage() {},
})
