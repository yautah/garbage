import { toJS, observable, action } from 'mobx-miniprogram'
import wxp from '../utils/wxp.js'
import {searchGarbages} from '../services/api'


export default observable({

  garbages:[],


  searchGarbages: action(async function(q){
    const that = this
    wxp.showLoading({title: '请稍候'})


    if (q.trim().length == 0) {
      this.garbages = []
      return
    }

    try {
      const result = await searchGarbages(wxp.store.globalStore.currentCity.short,q)
      wxp.hideLoading()

      if (result.code==0) {
        this.garbages = result.data
        return result.data
      }
      return []
    } catch (e) {
      console.error(e)
      return []
    }


  }),


})
