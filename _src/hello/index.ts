import { p, t } from '~/trpc/index.js'

export const helloRouter = () =>
  t.router({
    hello: p.public
      .input(z.object({ username: z.string().nullish() }).nullish())
      .query(({ input, ctx }) => {
        return {
          text: `hello ${input?.username ?? ctx.user?.name ?? 'world'}`,
        }
      }),
  })
