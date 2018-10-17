const Koa = require('koa')
const koaLogger = require('koa-logger')
const koaBodyParser = require('koa-bodyparser')
const error = require('./middleware/error')
const xhr = require('./middleware/xhr')
const routing = require('./v1/routes')

const app = new Koa()

app
  .use(koaLogger())
  .use(koaBodyParser({
    jsonLimit: '1kb'
  }))

app
  .use(error)
  .use(xhr)
  .use(routing.routes())
  .use(routing.allowedMethods())

module.exports = {
  path: '/api/v1',
  handler: app.callback()
}
