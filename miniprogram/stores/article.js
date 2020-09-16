import { when, autorun, toJS, observable, action } from 'mobx-miniprogram'
import wxp from '../utils/wxp.js'
import {queryArticle} from '../services/api'


export default observable({
  article: null,

  setArticle: action(function(article){
    this.article = article
  }),


  fetchArticle: action(async function(id){
    wxp.showLoading({title: '请稍候'})
    try {
      const res = await queryArticle(id)
      this.article = res
      wxp.hideLoading()
    } catch (e) {
      wxp.hideLoading()
      console.error(e)
    }
  }),
})
