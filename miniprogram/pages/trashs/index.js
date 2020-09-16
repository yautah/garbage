//index.js
import { storeBindingsBehavior } from 'mobx-miniprogram-bindings'
import wxp from '../../utils/wxp'



Page({

  behaviors: [storeBindingsBehavior],
  storeBindings: [{
    store: wxp.store.trashStore,
    fields: ['garbages'],
    actions: ['setCurrentCategory', 'fetchGarbages'],
  },{
    store: wxp.store.globalStore,
    fields: ['categories'],
    // actions: ['setCurrentCategory', 'fetchGarbages'],
  }],

  data: {
    list: [
      'A',
      'B',
      'D',
      'E',
      'F',
      'G',
      'H',
      'I',
      'J',
      'K',
      'L',
      'M',
      'N',
      'O',
      'P',
      'Q',
      'R',
      'S',
      'T',
      'U',
      'V',
      'W',
      'X',
      'Y',
      'Z',
    ],
    listCur: 'A',

    StatusBar: wxp.app.globalData.StatusBar,
    CustomBar: wxp.app.globalData.CustomBar,
    hidden: true,
    TabCur: 0,
  },

  tabSelect(e) {

    this.setData({
      TabCur: e.currentTarget.dataset.index,
      scrollLeft: (e.currentTarget.dataset.index - 1) * 60,
      listCur: 'A',
      listCurID: 'A',
    })

    const {categories} = this.data
    const category = categories.find(c=>c.key==e.currentTarget.dataset.key)
    this.setCurrentCategory(category)
    this.fetchGarbages()
  },

  onLoad: function() {},

  onShareAppMessage() {},

  onReady() {
    let that = this
    wx
      .createSelectorQuery()
      .select('.indexBar-box')
      .boundingClientRect(function(res) {
        that.setData({
          boxTop: res.top,
        })
      })
      .exec()
    wx
      .createSelectorQuery()
      .select('.indexes')
      .boundingClientRect(function(res) {
        that.setData({
          barTop: res.top,
        })
      })
      .exec()


    const {categories} = this.data
    this.setCurrentCategory(categories[0])
    this.fetchGarbages()
  },

  onShow: function() {
    if (typeof this.getTabBar === 'function' && this.getTabBar()) {
      this.getTabBar().setData({
        selected: 1,
      })
    }
  },

  //获取文字信息
  getCur(e) {
    this.setData({
      hidden: false,
      listCur: this.data.list[e.target.id],
    })
  },

  setCur(e) {
    this.setData({
      hidden: true,
      listCur: this.data.listCur,
    })
  },

  //滑动选择Item
  tMove(e) {
    let y = e.touches[0].clientY,
      offsettop = this.data.boxTop,
      that = this
    //判断选择区域,只有在选择区才会生效
    if (y > offsettop) {
      let num = parseInt((y - offsettop) / 20)
      this.setData({
        listCur: that.data.list[num],
      })
    }
  },

  //触发全部开始选择
  tStart() {
    this.setData({
      hidden: false,
    })
  },

  //触发结束选择
  tEnd() {
    this.setData({
      hidden: true,
      listCurID: this.data.listCur,
    })
  },

  indexSelect(e) {
    let that = this
    let barHeight = this.data.barHeight
    let list = this.data.list
    let scrollY = Math.ceil(list.length * e.detail.y / barHeight)
    for (let i = 0; i < list.length; i++) {
      if (scrollY < i + 1) {
        that.setData({
          listCur: list[i],
          movableY: i * 20,
        })
        return false
      }
    }
  },
})
