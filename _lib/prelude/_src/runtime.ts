export const appRuntime = <R, E, A>(layer: Layer<R, E, A>) =>
  Effect.gen(function* ($) {
    const scope = yield* $(Scope.make())
    const env = yield* $(layer.buildWithScope(scope))
    const runtime = yield* $(Effect.runtime<A>().scoped.provideContext(env))

    return {
      runtime,
      clean: scope.close(Exit.unit),
    }
  })
