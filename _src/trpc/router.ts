import * as helloModule from '~/hello/index.js'
import * as postModule from '~/post/index.js'

import { t } from './trpc.js'

export const trpcRouter = t.router({
  hello: helloModule.router(),
  post: postModule.router(),
})

export type TrpcRouter = typeof trpcRouter
