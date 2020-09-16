import { language } from '../../utils/conf.js'

Component({
  options: {
    addGlobalClass: true,
  },
  properties: {
    /*
    item 格式
    {
      create: '04/27 15:37',
      text: '一二三四五',
      translateText: '12345',
      voicePath: '',
      translateVoicePath: '',
      id: 0,
    },*/
    item: {
      type: Object,
      value: {},
    },

    index: {
      type: Number,
    },

    currentTranslateVoice: {
      type: String,
      observer: function(newVal, oldVal) {
        if (newVal != '' && newVal != this.data.item.translateVoicePath) {
          this.playAnimationEnd()
        }
      },
    },

    recordStatus: {
      type: Number,
      value: 2, // 0：正在识别，1：正在翻译，2：翻译完成
    },
  },

  data: {
    tips_language: language[0], // 目前只有中文

    expanded: false,
  },

  ready: function() {},

  // 组件生命周期函数，在组件实例被从页面节点树移除时执行
  detached: function() {
    // console.log("detach")
  },

  methods: {
    toggleMore: function() {
      this.setData({ expanded: !this.data.expanded })
    },

    deleteItem() {
      const { item } = this.data
      this.triggerEvent(
        'itemdelete',
        {
          item: this.data.item,
          index: this.data.index,
        },
        { bubbles: true, composed: true },
      )
    },
  },
})
