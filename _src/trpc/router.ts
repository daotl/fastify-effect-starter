import { router as helloRouter } from '~/hello/trpc.js'
import { router as postRouter } from '~/post/trpc.js'

import { t } from './trpc.js'

export const trpcRouter = t.router({
  hello: helloRouter(),
  post: postRouter(),
})

export type TrpcRouter = typeof trpcRouter
