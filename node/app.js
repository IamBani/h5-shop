const Koa = require('koa')
const Router = require('koa-router')
const app = new Koa()
const router = new Router()

router.get('/', async ctx => {
  ctx.body = '<h1>hello world!</h1>'
})
router.get('/api', async ctx => {
  console.log('object')
  ctx.body = {
    a: 123
  }
})
app.use(router.routes())
app.use(
  router.allowedMethods({
    throw: true // 抛出错误，代替设置响应头状态
    // notImplemented: () => '不支持当前请求所需要的功能',
    // methodNotAllowed: () => '不支持的请求方式'
  })
)

app.listen(3000, () => {
  console.log('应用已经启动，http://localhost:3000')
})
