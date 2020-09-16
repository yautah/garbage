
// pages/category/index.js
import { storeBindingsBehavior } from 'mobx-miniprogram-bindings'
import wxp from "../../utils/wxp"
import { when } from 'mobx-miniprogram'


Page({

  behaviors: [storeBindingsBehavior],
  storeBindings: {
    store: wxp.store.globalStore,
    fields: ['categories'],
  },
  /**
   * 页面的初始数据
   */
  data: {

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: async function (options) {
    const {id} = options


    const {categories} = wxp.store.globalStore
    await when(()=>  categories && categories.length>0)
    this.setData({category: categories.find(c=>c.value==id)})

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})
