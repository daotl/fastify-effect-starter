import { p, t } from '~/trpc/trpc.js'

export const router = () =>
  t.router({
    hello: p.public
      .input(z.object({ username: z.string().optional() }).optional())
      .query(({ input, ctx }) => {
        return Effect.succeed({
          text: `hello ${input?.username ?? ctx.user?.name ?? 'world'}`,
        })
      }),
  })
