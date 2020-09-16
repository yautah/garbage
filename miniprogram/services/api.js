import wxp from '../utils/wxp'

//查询支持城市
export async function queryCities(){
  try {
    const db = wxp.wx.cloud.database()
    const res = await db.collection('cities').get()
    return res.data
  } catch (e) {
    console.error(e)
    return []
  }
}


//查询城市下的辣鸡分类目录
export async function queryCategories(currentCity){
  try {
    const db = wxp.wx.cloud.database()
    const res = await db.collection(`categories-${currentCity.short}`).get()
    return res.data
  } catch (e) {
    console.error(e)
    return []
  }
}



//查询首页数据
export async function queryIndex(city) {
  try {
    const {result} = await wx.cloud.callFunction({
      // 云函数名称
      name: 'api',
      // 传给云函数的参数
      data: {
        $url: '/home/index',
        payload: { city }
      }
    })
    return result
  } catch (e) {
    console.error(e)
    return {}
  }
}

//根据城市和分类查询辣鸡
export async function queryGarbages(city, category) {
  try {
    const {result} = await wx.cloud.callFunction({
      // 云函数名称
      name: 'api',
      // 传给云函数的参数
      data: {
        $url: '/garbages/list',
        payload: { city, category }
      }
    })
    return result
  } catch (e) {
    console.error(e)
    return {}
  }
}

//根据关键词检索当前城市下的辣鸡
export async function searchGarbages(city, q) {
  try {
    const {result} = await wx.cloud.callFunction({
      // 云函数名称
      name: 'api',
      // 传给云函数的参数
      data: {
        $url: '/garbages/search',
        payload: { city, q }
      }
    })
    return result
  } catch (e) {
    console.error(e)
    return {}
  }
}



//查询文章详情
export async function queryArticle(id){
  try {
    const db = wxp.wx.cloud.database()
    const res =  await db.collection('articles').doc(id).get()
    return res.data
  } catch (e) {
    console.error(e)
    return []
  }
}
