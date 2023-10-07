import { tagLogger } from '~/logger.js'
import { p, t } from '~/trpc/trpc.js'

export const router = () =>
  t.router({
    hello: p.protected
      .input(
        Schema.parseSync(
          Schema.struct({ username: Schema.optional(Schema.string) }),
        ),
      )
      .output(Schema.parseSync(Schema.struct({ text: Schema.string })))
      .query(({ input, ctx }) => {
        return tagLogger.flatMap((logger) => {
          const text = `hello ${input?.username ?? ctx.user?.name ?? 'world'}`
          logger.info(text)
          return Effect.succeed({
            text,
          })
        })
      }),
  })
