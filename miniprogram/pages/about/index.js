// pages/about/index.js
import wxp from '../../utils/wxp'
import { storeBindingsBehavior } from 'mobx-miniprogram-bindings'
Page({

  behaviors: [storeBindingsBehavior],
  storeBindings: {
    store: wxp.store.globalStore,
    fields: ['currentCity', 'cities', 'currentCityIndex'],
    actions: ['setCurrentCity'],
  },

  data: {},

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {},

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {},

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {
    if (typeof this.getTabBar === 'function' && this.getTabBar()) {
      this.getTabBar().setData({
        selected: 1,
      })
    }
  },

  onCityChange(e) {
    const { value } = e.detail
    this.setCurrentCity(value)
  },
})
