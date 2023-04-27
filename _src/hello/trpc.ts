import { p, t } from '~/trpc/trpc.js'

export const router = () =>
  t.router({
    hello: p.public
      .input(
        Schema.parse(
          Schema.struct({ username: Schema.optional(Schema.string) }),
        ),
      )
      .output(Schema.parse(Schema.struct({ text: Schema.string })))
      .query(({ input, ctx }) => {
        return Effect.succeed({
          text: `hello ${input?.username ?? ctx.user?.name ?? 'world'}`,
        })
      }),
  })
