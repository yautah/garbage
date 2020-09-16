import { when, autorun, toJS, observable, action } from 'mobx-miniprogram'
import wxp from '../utils/wxp.js'
import {queryIndex} from '../services/api'


export default observable({
  homeData: null,
  topBg: null,

  init: action(async function(){
    await when(()=>wxp.store.globalStore.currentCity)
    this.fetchIndex()
  }),

  setTopBg: action(function(color){
    this.topBg = color
  }),

  fetchIndex: action(async function(){
    try {
      const res = await queryIndex(wxp.store.globalStore.currentCity)
      if (res.code==0) {
        this.homeData = res.data
        this.topBg = res.data.banners[0].color
      }
    } catch (e) {
      console.error(e)
    }
  }),
})
