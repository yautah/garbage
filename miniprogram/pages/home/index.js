import { storeBindingsBehavior } from 'mobx-miniprogram-bindings'
import wxp from '../../utils/wxp'
Page({
  behaviors: [storeBindingsBehavior],
  storeBindings: [{
    store: wxp.store.globalStore,
    fields: ['cities', 'currentCity','currentCityIndex', 'categories', ],
    actions: ['setCurrentCity'],
  },{
    store: wxp.store.homeStore,
    fields: ['homeData', 'topBg'],
    actions: ['init', 'setTopBg'],
  }],

  data: {
    StatusBar: wxp.app.globalData.StatusBar,
    CustomBar: wxp.app.globalData.CustomBar,
    tipsExpanded: false,
    fixedNav: false,
  },

  onLoad: function(options) {
    this.init()
  },

  onReady: function() {
    const that = this

    this._observer = wxp.createIntersectionObserver(this, {
      initialRatio: 1,
      thresholds: [0,1]
    })
    this._observer
      .relativeToViewport({ top: -50})
      .observe('#search', res => {
        that.setData({fixedNav: res.intersectionRatio<1})
      })
  },

  onShow: function() {
    if (typeof this.getTabBar === 'function' && this.getTabBar()) {
      this.getTabBar().setData({ selected: 0 })
    }
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {},


  handleSwiperChange(e) {
    const { current } = e.detail
    const { banners } = this.data.homeData
    this.setTopBg(banners[current].color)
  },

  onCityChange(e) {
    const { value } = e.detail
    this.setCurrentCity(value)
  },

  toggleTipsExpanded(){
    this.setData({tipsExpanded: !this.data.tipsExpanded})
  }
})
