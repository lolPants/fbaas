import { Middleware } from 'koa'
import signale from '../signale'

export const logger: Middleware = async (ctx, next) => {
  await next()

  const ip =
    ctx.headers['cf-connecting-ip'] || ctx.headers['x-forwarded-for'] || ctx.ip

  const httpVersion = `${ctx.req.httpVersionMajor}.${ctx.req.httpVersionMinor}`

  const reqInfo = `${ctx.method} ${ctx.url} HTTP/${httpVersion}`
  const resInfo = `${ctx.status} ${ctx.response.length || -1}`
  const referrer = ctx.headers.referer || ctx.headers.referrer || ''
  const ua = ctx.headers['user-agent'] || ''
  const headers = `"${referrer}" "${ua}"`

  signale.info(`${ip} - "${reqInfo}" ${resInfo} ${headers}`)
}
