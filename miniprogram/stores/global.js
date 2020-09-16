import { autorun, toJS, observable, action } from 'mobx-miniprogram'
import wxp from '../utils/wxp.js'
import {queryCities, queryCategories} from '../services/api'

export default observable({

  cities: [],
  categories : [],
  currentCity : null,
  currentCityIndex : 0,
  authSetting: {},


  init: action(async function(){

    const that = this
    autorun(() => {
      if (that.currentCity) {
        that.fetchCategories()
      }
    })

    this.initCities()
    this.getAuthSetting()
  }),

  initCities: action(async function() {

    try {
      const localCity = await wxp.getStorage({
        key: 'currentCity',
      })
      this.currentCity = localCity.data
    } catch (e) {
      console.error(e)
    }

    this.cities = await queryCities()
    if (!this.currentCity) {
      this.currentCity = this.cities[0]
      wxp.setStorage({ key: 'currentCity', data: this.cities[0] })
    }
  }),


  fetchCategories: (async function() {
    this.categories = await queryCategories(this.currentCity)
  }),

  getAuthSetting: action(async function() {
    const res = await wxp.getSetting()
    let authSetting = {}
    for (var i in res.authSetting) {
      authSetting[i.replace(/\./, '-')] = res.authSetting[i]
    }
    this.authSetting = authSetting
  }),


  setCurrentCity: action(function(index){
    this.currentCity = this.cities[index]
    wxp.setStorage({ key: 'currentCity', data: this.currentCity })
  }),

  get currentCityIndex() {
    if (!this.currentCity || !this.cities) return 0
    return this.cities.findIndex(c => c.code == this.currentCity.code)
  }

})
