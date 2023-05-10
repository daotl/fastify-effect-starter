import { p, t } from '~/trpc/trpc.js'
import { tagLogger } from '~/logger.js'

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
        return tagLogger.flatMap((logger) => {
          logger.info(`${input.username}------------------------------------>`)
          return Effect.succeed({
            text: `hello ${input?.username ?? ctx.user?.name ?? 'world'}`,
          })
        })
      }),
  })
