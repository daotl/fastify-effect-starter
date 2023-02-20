import { helloRouter } from '~/hello/index.js'

import { t } from './trpc.js'

export const trpcRouter = t.router({
  hello: helloRouter(),
})

export type TrpcRouter = typeof trpcRouter
