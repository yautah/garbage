import wxp from '../../utils/wxp'
import { storeBindingsBehavior } from 'mobx-miniprogram-bindings'

Page( {


  behaviors: [storeBindingsBehavior],


  storeBindings: {
    store: wxp.store.searchStore,
    fields: ['garbages'],
    actions: ['searchGarbages'],
  },
    /**
     * 页面的初始数据
     */
    data: {
      searchKey: '',
      StatusBar: wxp.app.globalData.StatusBar,
      CustomBar: wxp.app.globalData.CustomBar,
      scrollHeight: 0,
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function(options) {},

    onReady() {
      let that = this
      wx
        .createSelectorQuery()
        .selectAll('.container, .search-bar')
        .boundingClientRect(function(res) {
          console.log(res)
          that.setData({
            scrollHeight: res[0].height - res[1].height - wxp.app.globalData.CustomBar,
            scrollTop: res[1].height,
          })
        })
        .exec()
    },

    //搜索
    handleSearchChange(e) {
      let qString = e.detail.value.replace(/(^[ \t\n\r]+)|([ \t\n\r]+$)/g, '')
      this.setData({
        searchKey: qString,
      })

    },

  handleSearch(){
    const {searchKey} = this.data
    if (searchKey.length==0) return;
    this.searchGarbages(searchKey)
  },


    handleClear() {
      this.setData({
        searchKey: '',
      })
    },

    handleToggle(e) {
      this.setData({
        showModal: false,
      })
    },
  }
)
