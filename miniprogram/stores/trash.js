import { toJS, observable, action } from 'mobx-miniprogram'
import wxp from '../utils/wxp.js'
import {queryGarbages} from '../services/api'


export default observable({

  currentCategory : null,
  garbages : null,


  setCurrentCategory: action(function(category){
    this.currentCategory = category
  }),

  fetchGarbages: action(async function(){
    const that = this
    wxp.showLoading({text: '请稍候'})
    const result = await queryGarbages(wxp.store.globalStore.currentCity.short, this.currentCategory.value)
    wxp.hideLoading()

    if (result.code==0) {
      this.garbages = result.data
    }

  }),


})
