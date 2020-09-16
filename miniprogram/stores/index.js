import Global from './global.js'
import Home from './home.js'
import Trash from './trash.js'
import Voice from './voice.js'
import Search from './search.js'
import Article from './article.js'

class Store {
  constructor() {
    this.globalStore = Global
    this.homeStore = Home
    this.trashStore = Trash
    this.voiceStore = Voice
    this.searchStore = Search
    this.articleStore = Article
  }
}

export default Store
