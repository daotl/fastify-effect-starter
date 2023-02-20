import { z } from 'zod'
import { publicProcedure, router } from '../trpcRouter/index.js'

export const helloRouter = router({
  hello: publicProcedure
    .input(z.object({ username: z.string().nullish() }).nullish())
    .query(({ input, ctx }) => {
      return {
        text: `hello ${input?.username ?? ctx.user?.name ?? 'world'}`,
      }
    }),
})
