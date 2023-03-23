import { p, t } from '~/trpc/trpc.js'

export const router = () =>
  t.router({
    hello: p.public
      .input(z.object({ username: z.string().nullish() }).nullish())
      .query(({ input, ctx }) => {
        return {
          text: `hello ${input?.username ?? ctx.user?.name ?? 'world'}`,
        }
      }),
  })
