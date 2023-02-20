import { router } from './trpc.js'
import { helloRouter } from '../hello/index.js'

export * from './trpc.js'
export const trpcRouter = router({
  hello: helloRouter,
})

export type TrpcRouter = typeof trpcRouter
