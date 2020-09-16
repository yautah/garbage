// 云函数入口文件
const cloud = require('wx-server-sdk')
const TcbRouter = require('tcb-router')

cloud.init({
  env: cloud.DYNAMIC_CURRENT_ENV
})


//根据城市和分类查询分类下辣鸡，并按字母分组
async function queryGarbages(ctx) {
  const { city, category } = ctx.payload
  const db = cloud.database()

  try {
    const res = await db.collection(`garbage-${city}`).
      orderBy('pinyin', 'asc').
      where({ category: category }).
      limit(9999).
      get()

  let list = {}
  for (let i = 0; i < 26; i++) {
    const letter = String.fromCharCode(65 + i)
    list[letter] = []
    for (const garbage of res.data) {
      if (garbage.pinyin[0] == letter) {
        list[letter].push(garbage)
      }
    }
  }

    ctx.body = { code: 0, data: list }

  } catch (e) {
    console.error(e)
    ctx.body = { code: -1, error: e }
  }
}


//根据城市和关键字查询辣鸡
async function searchGarbages(ctx) {
  const { city, q } = ctx.payload
  const db = cloud.database()
  try {
    const res = await db.collection(`garbage-${city}`).
      orderBy('pinyin', 'asc').
      where({
        name: { $regex: `.*${q}.*` },
      }).
      limit(10).
      get()
    ctx.body = { code: 0, data: res.data }
  } catch (e) {
    console.error(e)
    ctx.body = { code: -1, error: e }
  }
}

//查询首页模块
async function queryIndex(ctx){
  const { city } = ctx.payload
  const db = cloud.database()
  let result ={}
  try {
    const banners = await db.collection(`banners`).
      orderBy('sort', 'desc').
      get()
    result.banners = banners.data
    ctx.body = { code: 0, data: result }
  } catch (e) {
    console.error(e)
    ctx.body = { code: -1, error: e }
  }
}


// 云函数入口函数
exports.main = async (event, context) => {

  console.log('in main -----------------')
  const app = new TcbRouter({ event })

  app.use(async (ctx, next) => {
    // 创建返回data对象
    ctx.payload = ctx._req.event.payload
    ctx.action = ctx._req.url
    // 执行下一中间件
    await next()
  })

  app.router('/home/index', queryIndex)
  app.router('/garbages/list', queryGarbages)
  app.router('/garbages/search', searchGarbages)

  return app.serve()
}
