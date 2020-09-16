// components/garbage-tag/index.js
import { storeBindingsBehavior } from 'mobx-miniprogram-bindings'
import { when, autorun, toJS, observable, action } from 'mobx-miniprogram'
import wxp from '../../utils/wxp'

Component({
  options: {
    addGlobalClass: true,
  },


  behaviors: [storeBindingsBehavior],
  storeBindings: {
    store: wxp.store.globalStore,
    fields: ['categories', ],
  },

  properties: {
    garbage: {
      type: Object,
      value: {},
      // observer: 'init',
    },
  },

  created(){
  },

  async ready(){
    const that = this
    await when(()=> that.data.categories &&that.data.categories.length>0)

    this.init()
  },

  /**
   * 组件的初始数据
   */
  data: {},

  /**
   * 组件的方法列表
   */
  methods: {
    init: async function() {
      const {categories, garbage} = this.data
      const target = categories.find(c => c.value == garbage.category)
      if (target) {
        this.setData({
          category: {
            name: target.name,
            color: this._renderColor(target.value),
          },
        })
      }
    },

    _renderColor: function(category) {
      switch (category) {
        case 1:
          return 'olive'
        case 2:
          return 'red'
        case 4:
          return 'blue'
        case 8:
          return 'orange'
      }
    },
  },
})
