// import type { Runtime } from '@effect/io/Runtime'

const POOL_ID = process.env['VITEST_POOL_ID']
// const PORT = 40000 + parseInt(POOL_ID ?? '1')

// type LayerA<T> = T extends Layer<any, any, infer A> ? A : never

declare global {
  // biome-ignore lint/style/noVar: ignore
  var cleanup: () => Promise<void>
}

beforeAll(async () => {
  // if (globalThis.runtime) return
  console.log(`[${POOL_ID}] Creating runtime`)

  // const appRuntime = <R, E, A>(layer: Layer<R, E, A>) =>
  //   Effect.gen(function* ($) {
  //     const scope = yield* $(Scope.make())
  //     const env = yield* $(layer.buildWithScope(scope))
  //     const runtime = yield* $(Effect.runtime<A>().scoped.provideContext(env))

  //     return {
  //       runtime,
  //       clean: scope.close(Exit.unit),
  //     }
  //   })

  // const runtime = appRuntime(appLayer).runPromise$.catch((error) => {
  //   console.error(error)
  //   throw error
  // })

  // const cleanup = () =>
  //   Effect.promise(() => runtime).flatMap((_) => _.clean).runPromise$

  // globalThis.cleanup = cleanup
  // globalThis.runtime = (await runtime).runtime
}, 30 * 1000)

afterAll(async () => {
  if (globalThis.cleanup) {
    console.log(`[${POOL_ID}] Destroying runtime`)
    await globalThis.cleanup().catch((error) => {
      console.error(error)
      throw error
    })
  }
})
