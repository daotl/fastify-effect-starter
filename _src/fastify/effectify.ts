import type * as Fa from 'fastify'
import type { ResolveFastifyReplyType } from 'fastify/types/type-provider.js'

import type { Method } from './types.js'

export class NodeServerCloseError {
  readonly _tag = 'NodeServerCloseError'
  constructor(readonly _error: Error) {}
}

export class NodeServerListenError {
  readonly _tag = 'NodeServerListenError'
  constructor(readonly _error: Error) {}
}

type ExitHandler = (
  req: Fa.FastifyRequest,
  reply: Fa.FastifyReply,
) => (cause: Cause<never>) => Effect<never, never, void>

export const stagFastifyAppConfig = '@effect-app/fastify/AppConfig' as const

export interface FastifyAppConfig {
  readonly _tag: typeof stagFastifyAppConfig
  readonly host: string
  readonly port: number
  readonly exitHandler: ExitHandler
}

export const tagFastifyAppConfig = Tag<FastifyAppConfig>()

export const createLiveFastifyAppConfig = (
  host: string,
  port: number,
  exitHandler: ExitHandler = defaultExitHandler,
) =>
  Effect.contextWith((ctx: Context<never>) => ({
    _tag: stagFastifyAppConfig,
    host,
    port,
    exitHandler:
      (req: Fa.FastifyRequest, reply: Fa.FastifyReply) =>
      (cause: Cause<never>) =>
        exitHandler(req, reply)(cause).provideContext(ctx),
  })).toLayer(tagFastifyAppConfig)

export const stagFastifyAppTag = '@effect-app/fastify/App' as const

export const defaultExitHandler: ExitHandler =
  (_req: Fa.FastifyRequest, res: Fa.FastifyReply) => (cause) =>
    Effect(() => {
      if (cause.isDie()) {
        console.error(cause.pretty)
      }
      res.statusCode = 500
    })

/**
 * FastifyPluginCallback
 *
 * Fastify allows the user to extend its functionalities with plugins. A plugin can be a set of routes, a server decorator or whatever. To activate plugins, use the `fastify.register()` method.
 */
export type FastifyPluginCallback<
  FastifyInstance,
  Options extends Fa.FastifyPluginOptions = Record<never, never>,
> = (
  instance: FastifyInstance,
  opts: Options,
  done: (err?: Error) => void,
) => void

/**
 * FastifyPluginAsync
 *
 * Fastify allows the user to extend its functionalities with plugins. A plugin can be a set of routes, a server decorator or whatever. To activate plugins, use the `fastify.register()` method.
 */
export type FastifyPluginAsync<
  FastifyInstance,
  Options extends Fa.FastifyPluginOptions = Record<never, never>,
> = (instance: FastifyInstance, opts: Options) => Promise<void>

export type FastifyRegisterOptions<FastifyInstance, Options> =
  | (Fa.RegisterOptions & Options)
  | ((instance: FastifyInstance) => Fa.RegisterOptions & Options)

/**
 * FastifyRegister
 *
 * Function for adding a plugin to fastify. The options are inferred from the passed in FastifyPlugin parameter.
 */
export interface EffectFastifyRegister<FastifyInstance, FastifyApp> {
  <Options extends Fa.FastifyPluginOptions>(
    plugin: FastifyPluginCallback<FastifyInstance, Options>,
  ): (
    opts?: FastifyRegisterOptions<FastifyInstance, Options>,
  ) => Effect<FastifyApp, never, void>
  <Options extends Fa.FastifyPluginOptions>(
    plugin: FastifyPluginAsync<FastifyInstance, Options>,
  ): (
    opts?: FastifyRegisterOptions<FastifyInstance, Options>,
  ) => Effect<FastifyApp, never, void>
  <Options extends Fa.FastifyPluginOptions>(
    plugin:
      | FastifyPluginCallback<FastifyInstance, Options>
      | FastifyPluginAsync<FastifyInstance, Options>
      | Promise<{
          default: FastifyPluginCallback<FastifyInstance, Options>
        }>
      | Promise<{
          default: FastifyPluginAsync<FastifyInstance, Options>
        }>,
  ): (
    opts?: FastifyRegisterOptions<FastifyInstance, Options>,
  ) => Effect<FastifyApp, never, void>
}

export interface EffectRouteShorthandMethod<
  RouteShorthandOptions,
  EffectRouteHandlerMethod,
  EffectRouteShorthandOptionsWithHandler,
  R = never,
> {
  (
    path: string,
    opts: RouteShorthandOptions,
    handler: EffectRouteHandlerMethod,
  ): Effect<R, never, void>
  // rome-ignore format: compact
  (path: string, handler: EffectRouteHandlerMethod): Effect<R, never, void>
  // rome-ignore format: compact
  (path: string, opts: EffectRouteShorthandOptionsWithHandler): Effect<R, never, void>
}

const _type = <T>(): T => undefined as T

export function effectify<
  BaseContextConfig = Fa.ContextConfigDefault,
  TypeProvider extends Fa.FastifyTypeProvider = Fa.FastifyTypeProviderDefault,
  BaseSchemaCompiler extends Fa.FastifySchema = Fa.FastifySchema,
  RawServer extends Fa.RawServerBase = Fa.RawServerDefault,
  RawRequest extends Fa.RawRequestDefaultExpression<RawServer> = Fa.RawRequestDefaultExpression<RawServer>,
  RawReply extends Fa.RawReplyDefaultExpression<RawServer> = Fa.RawReplyDefaultExpression<RawServer>,
  Logger extends Fa.FastifyBaseLogger = Fa.FastifyBaseLogger,
  BaseRouteGeneric extends Fa.RouteGenericInterface = Fa.RouteGenericInterface,
  // rome-ignore format: compact
  FastifyInstance extends Fa.FastifyInstance<RawServer, RawRequest, RawReply, Logger, TypeProvider> = Fa.FastifyInstance<RawServer, RawRequest, RawReply, Logger, TypeProvider>,
>(
  fastify: FastifyInstance,
  // Used to pass liveFastifyAppConfig to effectified Fastify sub instances which will be passed to plugins
  liveFastifyAppConfig?: Layer<never, never, FastifyAppConfig>,
) {
  let _liveFastifyAppConfig = liveFastifyAppConfig

  const _effectify = <
    // rome-ignore format: compact
    FastifyInstance extends Fa.FastifyInstance<RawServer, RawRequest, RawReply, Logger, TypeProvider>,
  >(
    fastify: FastifyInstance,
    liveFastifyAppConfig?: Layer<never, never, FastifyAppConfig>,
  ) =>
    // rome-ignore format: compact
    effectify<
      BaseContextConfig, TypeProvider, BaseSchemaCompiler, RawServer, RawRequest, RawReply, Logger, BaseRouteGeneric, FastifyInstance
    >(fastify, liveFastifyAppConfig)

  type Fastify = ReturnType<typeof _effectify<FastifyInstance>>

  // rome-ignore format: compact
  type FastifyRequest<
    RouteGeneric extends BaseRouteGeneric = BaseRouteGeneric,
    ContextConfig extends BaseContextConfig = BaseContextConfig,
    SchemaCompiler extends BaseSchemaCompiler = BaseSchemaCompiler,
  > = Fa.FastifyRequest<RouteGeneric, RawServer, RawRequest, SchemaCompiler, TypeProvider, ContextConfig, Logger>

  // rome-ignore format: compact
  type FastifyReply<
    RouteGeneric extends BaseRouteGeneric = BaseRouteGeneric,
    ContextConfig extends BaseContextConfig = BaseContextConfig,
    SchemaCompiler extends BaseSchemaCompiler = BaseSchemaCompiler,
  > = Fa.FastifyReply<RawServer, RawRequest, RawReply, RouteGeneric, ContextConfig, SchemaCompiler, TypeProvider>

  // rome-ignore format: compact
  type RouteHandlerMethod<
    RouteGeneric extends BaseRouteGeneric = BaseRouteGeneric,
    ContextConfig extends BaseContextConfig = BaseContextConfig,
    SchemaCompiler extends BaseSchemaCompiler = BaseSchemaCompiler,
  > = Fa.RouteHandlerMethod<RawServer, RawRequest, RawReply, RouteGeneric, ContextConfig, SchemaCompiler, TypeProvider, Logger>

  type EffectRouteHandlerMethod<
    R = never,
    RouteGeneric extends BaseRouteGeneric = BaseRouteGeneric,
    ContextConfig extends BaseContextConfig = BaseContextConfig,
    SchemaCompiler extends BaseSchemaCompiler = BaseSchemaCompiler,
  > = (
    this: FastifyInstance,
    req: FastifyRequest<RouteGeneric, ContextConfig, SchemaCompiler>,
    reply: FastifyReply<RouteGeneric, ContextConfig, SchemaCompiler>,
  ) => Effect<
    R,
    never,
    ResolveFastifyReplyType<
      TypeProvider,
      SchemaCompiler,
      RouteGeneric
    > extends infer Return
      ? Return | void
      : unknown
  >

  // rome-ignore format: compact
  type RouteOptions<
    RouteGeneric extends BaseRouteGeneric = BaseRouteGeneric,
    ContextConfig extends BaseContextConfig = BaseContextConfig,
    SchemaCompiler extends BaseSchemaCompiler = BaseSchemaCompiler,
  > = Fa.RouteOptions<RawServer, RawRequest, RawReply, RouteGeneric, ContextConfig, SchemaCompiler, TypeProvider/*, Logger*/>

  type EffectRouteOptions<
    R = never,
    RouteGeneric extends BaseRouteGeneric = BaseRouteGeneric,
    ContextConfig extends BaseContextConfig = BaseContextConfig,
    SchemaCompiler extends BaseSchemaCompiler = BaseSchemaCompiler,
  > = Except<
    RouteOptions<RouteGeneric, ContextConfig, SchemaCompiler>,
    'handler'
  > & {
    // rome-ignore format: compact
    handler: EffectRouteHandlerMethod<R, RouteGeneric, ContextConfig, SchemaCompiler>
  }

  // rome-ignore format: compact
  type RouteShorthandOptions<
    RouteGeneric extends BaseRouteGeneric = BaseRouteGeneric,
    ContextConfig extends BaseContextConfig = BaseContextConfig,
    SchemaCompiler extends BaseSchemaCompiler = BaseSchemaCompiler,
  > = Fa.RouteShorthandOptions<RawServer, RawRequest, RawReply, RouteGeneric, ContextConfig, SchemaCompiler, TypeProvider, Logger>

  // rome-ignore format: compact
  type RouteShorthandOptionsWithHandler<
    RouteGeneric extends BaseRouteGeneric = BaseRouteGeneric,
    ContextConfig extends BaseContextConfig = BaseContextConfig,
    SchemaCompiler extends BaseSchemaCompiler = BaseSchemaCompiler,
  > = Fa.RouteShorthandOptionsWithHandler<RawServer, RawRequest, RawReply, RouteGeneric, ContextConfig, SchemaCompiler, TypeProvider, Logger>

  type EffectRouteShorthandOptionsWithHandler<
    R = never,
    RouteGeneric extends BaseRouteGeneric = BaseRouteGeneric,
    ContextConfig extends BaseContextConfig = BaseContextConfig,
    SchemaCompiler extends BaseSchemaCompiler = BaseSchemaCompiler,
  > = Except<RouteShorthandOptionsWithHandler, 'handler'> & {
    // rome-ignore format: compact
    handler: EffectRouteHandlerMethod<R, RouteGeneric, ContextConfig, SchemaCompiler>
  }

  const tFastifyApp = Effect.gen(function* ($) {
    // if scope closes, set open to false
    const open = yield* $(
      Ref.make(true).acquireRelease((a) => Effect(a.set(false))),
    )

    const { exitHandler } = yield* $(tagFastifyAppConfig)

    // if scope opens, create server, on scope close, close connections and server.
    yield* $(
      Effect.async<never, never, FastifyInstance>((cb) => {
        fastify.addHook('onError', (_req, _reply, err, done) => {
          done()
          cb(Effect.die(new NodeServerListenError(err)))
        })
        cb(Effect.succeed(fastify))
      }).acquireRelease(
        (_fastify) => Effect.unit,
        // Scopes are also closed when plugin registrations are done for effectified Fastify sub instances, so don't close the server here for now.
        // Effect.async<never, never, void>((cb) => {
        //   void fastify.close().then((err) => {
        //     if (err) {
        //       cb(Effect.die(new NodeServerCloseError(err)))
        //     } else {
        //       cb(Effect.unit)
        //     }
        //   })
        // }),
      ),
    )

    const supervisor = yield* $(
      Supervisor.track().acquireRelease((s) =>
        s.value().flatMap((_) => _.interruptAll),
      ),
    )

    const runtime = <
      R = never,
      RouteGeneric extends BaseRouteGeneric = BaseRouteGeneric,
      ContextConfig extends BaseContextConfig = BaseContextConfig,
      SchemaCompiler extends BaseSchemaCompiler = BaseSchemaCompiler,
    >(
      // rome-ignore format: compact
      handler: EffectRouteHandlerMethod<R, RouteGeneric, ContextConfig, SchemaCompiler>,
    ) =>
      Effect.runtime<R>().map(
        (r): RouteHandlerMethod<RouteGeneric, ContextConfig, SchemaCompiler> =>
          (req, reply) =>
            // TODO: restore trace from "handler"
            Debug.untraced(
              (restore) =>
                r.runPromise(
                  open.get.flatMap((open) =>
                    restore(() =>
                      open
                        ? handler.call(fastify, req, reply)
                        : Effect.interrupt(),
                    )()
                      .onError(
                        exitHandler(
                          req as Fa.FastifyRequest,
                          reply as Fa.FastifyReply,
                        ),
                      )
                      .supervised(supervisor),
                  ),
                ) as ResolveFastifyReplyType<
                  TypeProvider,
                  SchemaCompiler,
                  RouteGeneric
                > extends infer Return
                  ? Promise<Return | void>
                  : unknown,
            ),
      )

    // function middieRuntime<
    //   Handler extends EffectMiddieHandler<any>,
    // >(handler: Handler) {
    //   type Env = _R<
    //     Handler extends EffectMiddieHandler<infer R>
    //       ? Effect<R, never, void>
    //       : never
    //   >
    //   return Effect.runtime<Env>().map(
    //     (r): Middie.Handler =>
    //       (req, res, next) => {
    //         r.runCallback(
    //           open.get
    //             .flatMap((open) =>
    //               open ? handler(req, res, next) : Effect.interrupt(),
    //             )
    //             .onError(exitHandler(req, res))
    //             .supervised(supervisor),
    //         )
    //       },
    //   )
    // }

    // function middieSimpleRuntime<
    //   Handler extends EffectMiddieSimpleHandler<any>
    // >(handler: Handler) {
    //   type Env = _R<
    //     Handler extends EffectMiddieSimpleHandler<infer R> ? Effect<R, never, void>
    //       : never
    //   >
    //   return Effect.runtime<Env>().map((r): Middie.SimpleHandleFunction => (req, res) => {
    //     r.runCallback(
    //       open.get
    //         .flatMap(open => open ? handler(req, res) : Effect.interrupt())
    //         .onError(exitHandler(req, res))
    //         .supervised(supervisor)
    //     )
    //   })
    // }

    // function middieNextRuntime<
    //   Handler extends EffectMiddieNextHandler<any>
    // >(handler: Handler) {
    //   type Env = _R<
    //     Handler extends EffectMiddieNextHandler<infer R> ? Effect<R, never, void>
    //       : never
    //   >
    //   return Effect.runtime<Env>().map((r): Middie.NextHandleFunction => (req, res, next) => {
    //     r.runCallback(
    //       open.get
    //         .flatMap(open => open ? handler(req, res, next) : Effect.interrupt())
    //         .onError(exitHandler(req, res))
    //         .supervised(supervisor)
    //     )
    //   })
    // }

    return {
      _tag: stagFastifyAppTag,
      fastify,
      supervisor,
      runtime: runtime,
      // middieRuntime,
      // middieSimpleRuntime,
      // middieNextRuntime
    }
  })

  type FastifyApp = Effect.Success<typeof tFastifyApp>
  type FastifyCtx = FastifyAppConfig | FastifyApp

  const tagFastifyApp = Tag<FastifyApp>()

  const liveFastifyApp: Layer<FastifyAppConfig, never, FastifyApp> =
    tFastifyApp.toLayerScoped(tagFastifyApp)

  function createLiveFastify<R = never>(
    host: string,
    port: number,
    exitHandler: ExitHandler = defaultExitHandler,
  ): Layer<R, never, FastifyCtx> {
    _liveFastifyAppConfig ??= createLiveFastifyAppConfig(
      host,
      port,
      exitHandler,
    )
    return _liveFastifyAppConfig > liveFastifyApp
  }

  const accessFastify = tagFastifyApp.map((_) => _.fastify)

  const withFastify = <R, E, A>(
    self: (_: FastifyInstance) => Effect<R, E, A>,
  ) => tagFastifyApp.flatMap((_) => self(_.fastify))

  const listen = (tagFastifyAppConfig & accessFastify).flatMap(
    ([{ host, port }, fastify]) =>
      Effect.async<never, never, FastifyInstance>((cb) => {
        fastify.listen({ host, port }, (err, _address) => {
          if (err) {
            cb(Effect.die(new NodeServerListenError(err)))
          } else {
            cb(Effect.succeed(fastify))
          }
        })
      }),
  )

  type _EffectFastifyRegister = EffectFastifyRegister<
    FastifyInstance,
    FastifyApp
  >

  const registerNative: _EffectFastifyRegister = (<
      Options extends Fa.FastifyPluginOptions,
    >(
      plugin:
        | FastifyPluginCallback<FastifyInstance, Options>
        | FastifyPluginAsync<FastifyInstance, Options>
        | Promise<{
            default: FastifyPluginCallback<FastifyInstance, Options>
          }>
        | Promise<{
            default: FastifyPluginAsync<FastifyInstance, Options>
          }>,
    ) =>
    (opts?: FastifyRegisterOptions<FastifyInstance, Options>) =>
      withFastify((fastify) =>
        Effect.promise(async () => {
          await fastify.register(
            // rome-ignore format: compact
            plugin as unknown as (Fa.FastifyPluginCallback<Options, RawServer, TypeProvider, Logger> | Fa.FastifyPluginAsync<Options, RawServer, TypeProvider, Logger> | Promise<{ default: Fa.FastifyPluginCallback<Options, RawServer, TypeProvider, Logger> }> | Promise<{ default: Fa.FastifyPluginAsync<Options, RawServer, TypeProvider, Logger> }>),
            opts as Fa.FastifyRegisterOptions<Options>,
          )
        }),
      )) as _EffectFastifyRegister

  type EffectFastifyPlugin<
    R = never,
    Options extends Fa.FastifyPluginOptions = Record<never, never>,
  > = (Fastify: Fastify, opts: Options) => Effect<Fastify | R, never, void>

  const register =
    <R = never, Options extends Fa.FastifyPluginOptions = Record<never, never>>(
      plugin: EffectFastifyPlugin<R, Options>,
    ) =>
    (
      opts?: FastifyRegisterOptions<FastifyInstance, Options>,
    ): Effect<FastifyApp | R, never, void> =>
      accessFastify.flatMap((fastify) =>
        Effect.async<FastifyApp, never, void>(async (cb) => {
          await fastify.register((instance, _opts, done) => {
            const Fastify = _effectify(
              instance as unknown as FastifyInstance,
              _liveFastifyAppConfig,
            )

            const tPlugin = plugin(Fastify, _opts)
              // TODO: This is a bit hacky way to just provide the child FastifyApp
              .provideServiceEffect(Fastify.tagFastifyApp, Fastify.tFastifyApp)
              .scoped.tap(() => {
                done()
                return Effect.unit
              }) as unknown as Effect<FastifyApp, never, void>

            cb(tPlugin)
          }, opts as Fa.FastifyRegisterOptions<Options>)
        }),
      )

  const runFasitfyHandler = <
    R = never,
    RouteGeneric extends BaseRouteGeneric = BaseRouteGeneric,
    ContextConfig extends BaseContextConfig = BaseContextConfig,
    SchemaCompiler extends BaseSchemaCompiler = BaseSchemaCompiler,
  >(
    // rome-ignore format: compact
    handler: EffectRouteHandlerMethod<R, RouteGeneric, ContextConfig, SchemaCompiler>,
  ) => tagFastifyApp.flatMap((_) => _.runtime(handler))

  const route = <
    R = never,
    RouteGeneric extends BaseRouteGeneric = BaseRouteGeneric,
    ContextConfig extends BaseContextConfig = BaseContextConfig,
    SchemaCompiler extends BaseSchemaCompiler = BaseSchemaCompiler,
  >(
    opts: EffectRouteOptions<R, RouteGeneric, ContextConfig, SchemaCompiler>,
  ) =>
    runFasitfyHandler(opts.handler).flatMap((handler) =>
      withFastify((fastify) =>
        Effect(() => {
          // rome-ignore format: compact
          fastify.route({ ...opts, handler } as RouteOptions<RouteGeneric, ContextConfig, SchemaCompiler>)
        }),
      ),
    )

  type _EffectRouteShorthandMethod<
    R = never,
    RouteGeneric extends BaseRouteGeneric = BaseRouteGeneric,
    ContextConfig extends BaseContextConfig = BaseContextConfig,
    SchemaCompiler extends BaseSchemaCompiler = BaseSchemaCompiler,
  > = EffectRouteShorthandMethod<
    RouteShorthandOptions<RouteGeneric, ContextConfig, SchemaCompiler>,
    EffectRouteHandlerMethod<R, RouteGeneric, ContextConfig, SchemaCompiler>,
    // rome-ignore format: compact
    EffectRouteShorthandOptionsWithHandler<R, RouteGeneric, ContextConfig, SchemaCompiler>,
    FastifyApp | R
  >

  function isEffectRouteHandlerMethod<
    R = never,
    RouteGeneric extends BaseRouteGeneric = BaseRouteGeneric,
    ContextConfig extends BaseContextConfig = BaseContextConfig,
    SchemaCompiler extends BaseSchemaCompiler = BaseSchemaCompiler,
  >(
    _: unknown,
  ): // rome-ignore format: compact
  _ is EffectRouteHandlerMethod<R, RouteGeneric, ContextConfig, SchemaCompiler> {
    return _ instanceof Function
  }

  const routeMethod =
    <
      R = never,
      RouteGeneric extends BaseRouteGeneric = BaseRouteGeneric,
      ContextConfig extends BaseContextConfig = BaseContextConfig,
      SchemaCompiler extends BaseSchemaCompiler = BaseSchemaCompiler,
    >(
      method: Method,
    ): // rome-ignore format: compact
    _EffectRouteShorthandMethod<R, RouteGeneric, ContextConfig, SchemaCompiler> =>
    (path: string, ...args: unknown[]) => {
      // rome-ignore format: compact
      const [handler, opts] = isEffectRouteHandlerMethod<R, RouteGeneric, ContextConfig, SchemaCompiler>(args[0])
        ? [args[0], undefined]
        : isEffectRouteHandlerMethod<R, RouteGeneric, ContextConfig, SchemaCompiler>(args[1])
        ? [
            args[1],
            // rome-ignore format: compact
            args[0] as RouteShorthandOptions<RouteGeneric, ContextConfig, SchemaCompiler>,
          ]
        : [
            (
              // rome-ignore format: compact
              args[0] as EffectRouteShorthandOptionsWithHandler<R, RouteGeneric, ContextConfig, SchemaCompiler>
            ).handler,
            undefined,
          ]

      return runFasitfyHandler(handler).flatMap((handler) =>
        withFastify((fastify) =>
          Effect(() => {
            opts
              ? fastify[method](path, opts, handler)
              : fastify[method](path, handler)
          }),
        ),
      )
    }

  return {
    tFastifyApp,
    tagFastifyApp,
    liveFastifyApp,
    createLiveFastify,
    accessFastify,
    withFastify,
    listen,
    registerNative,
    register,
    route,
    routeMethod,
    all: routeMethod('all'),
    get: routeMethod('get'),
    post: routeMethod('post'),
    put: routeMethod('put'),
    delete: routeMethod('delete'),
    patch: routeMethod('patch'),
    options: routeMethod('options'),
    head: routeMethod('head'),

    // Only for exporting types, don't use the values
    _types: {
      // This will cause: Type alias 'Fastify' circularly references itself.
      // Fastify: _type<Fastify>(),

      FastifyRequest: <
        RouteGeneric extends BaseRouteGeneric = BaseRouteGeneric,
        ContextConfig extends BaseContextConfig = BaseContextConfig,
        SchemaCompiler extends BaseSchemaCompiler = BaseSchemaCompiler,
      >() =>
        _type<FastifyRequest<RouteGeneric, ContextConfig, SchemaCompiler>>(),

      FastifyReply: <
        RouteGeneric extends BaseRouteGeneric = BaseRouteGeneric,
        ContextConfig extends BaseContextConfig = BaseContextConfig,
        SchemaCompiler extends BaseSchemaCompiler = BaseSchemaCompiler,
      >() => _type<FastifyReply<RouteGeneric, ContextConfig, SchemaCompiler>>(),

      RouteHandlerMethod: <
        RouteGeneric extends BaseRouteGeneric = BaseRouteGeneric,
        ContextConfig extends BaseContextConfig = BaseContextConfig,
        SchemaCompiler extends BaseSchemaCompiler = BaseSchemaCompiler,
      >() =>
        _type<
          RouteHandlerMethod<RouteGeneric, ContextConfig, SchemaCompiler>
        >(),

      // rome-ignore format: compact
      EffectRouteHandlerMethod: <
        R = never,
        RouteGeneric extends BaseRouteGeneric = BaseRouteGeneric,
        ContextConfig extends BaseContextConfig = BaseContextConfig,
        SchemaCompiler extends BaseSchemaCompiler = BaseSchemaCompiler,
      >() => _type<EffectRouteHandlerMethod<R, RouteGeneric, ContextConfig, SchemaCompiler>>(),

      RouteOptions: <
        RouteGeneric extends BaseRouteGeneric = BaseRouteGeneric,
        ContextConfig extends BaseContextConfig = BaseContextConfig,
        SchemaCompiler extends BaseSchemaCompiler = BaseSchemaCompiler,
      >() => _type<RouteOptions<RouteGeneric, ContextConfig, SchemaCompiler>>(),

      EffectRouteOptions: <
        R = never,
        RouteGeneric extends BaseRouteGeneric = BaseRouteGeneric,
        ContextConfig extends BaseContextConfig = BaseContextConfig,
        SchemaCompiler extends BaseSchemaCompiler = BaseSchemaCompiler,
      >() =>
        _type<
          EffectRouteOptions<R, RouteGeneric, ContextConfig, SchemaCompiler>
        >(),

      RouteShorthandOptions: <
        RouteGeneric extends BaseRouteGeneric = BaseRouteGeneric,
        ContextConfig extends BaseContextConfig = BaseContextConfig,
        SchemaCompiler extends BaseSchemaCompiler = BaseSchemaCompiler,
      >() =>
        _type<
          RouteShorthandOptions<RouteGeneric, ContextConfig, SchemaCompiler>
        >(),

      // rome-ignore format: compact
      RouteShorthandOptionsWithHandler: <
        RouteGeneric extends BaseRouteGeneric = BaseRouteGeneric,
        ContextConfig extends BaseContextConfig = BaseContextConfig,
        SchemaCompiler extends BaseSchemaCompiler = BaseSchemaCompiler,
      >() => _type<RouteShorthandOptionsWithHandler<RouteGeneric, ContextConfig, SchemaCompiler>>(),

      // rome-ignore format: compact
      EffectRouteShorthandOptionsWithHandler: <
        R = never,
        RouteGeneric extends BaseRouteGeneric = BaseRouteGeneric,
        ContextConfig extends BaseContextConfig = BaseContextConfig,
        SchemaCompiler extends BaseSchemaCompiler = BaseSchemaCompiler,
      >() =>
        _type<EffectRouteShorthandOptionsWithHandler<R, RouteGeneric, ContextConfig, SchemaCompiler>>(),

      FastifyApp: _type<FastifyApp>(),
      FastifyCtx: _type<FastifyCtx>(),
      EffectFastifyRegister: _type<_EffectFastifyRegister>(),
      EffectFastifyPlugin: <
        R = never,
        Options extends Fa.FastifyPluginOptions = Record<never, never>,
      >() => _type<EffectFastifyPlugin<R, Options>>(),

      // rome-ignore format: compact
      EffectRouteShorthandMethod: <
        R = never,
        RouteGeneric extends BaseRouteGeneric = BaseRouteGeneric,
        ContextConfig extends BaseContextConfig = BaseContextConfig,
        SchemaCompiler extends BaseSchemaCompiler = BaseSchemaCompiler,
      >() =>
        _type<_EffectRouteShorthandMethod<R, RouteGeneric, ContextConfig, SchemaCompiler>>(),
    },
  }
}
