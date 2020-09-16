// miniprogram/pages/articles/index.js

import { storeBindingsBehavior } from 'mobx-miniprogram-bindings'
import wxp from '../../utils/wxp'
Page({

  behaviors: [storeBindingsBehavior],
  storeBindings: {
    store: wxp.store.articleStore,
    fields: ['article'],
    actions: ['fetchArticle', 'setArticle'],
  },
  /**
   * 页面的初始数据
   */
  data: {

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const {id} = options
    this.fetchArticle(id)
  },

  onUnload: function (options) {
    this.setArticle(null)
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})
