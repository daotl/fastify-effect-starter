import * as Fa from 'fastify'
import type { ResolveFastifyReplyType } from 'fastify/types/type-provider.js'
import type { Except } from 'type-fest'

import type { Method } from './types.js'

export class NodeServerCloseError {
  readonly _tag = 'NodeServerCloseError'
  constructor(readonly error: Error) {}
}

export class NodeServerListenError {
  readonly _tag = 'NodeServerListenError'
  constructor(readonly error: Error) {}
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

export type EffectFastifyPlugin<
  // rome-ignore format: compact
  // To workaround: The inferred type of this node exceeds the maximum length the compiler will serialize. An explicit type annotation is needed.
  // FastifyInstance extends Fa.FastifyInstance<RawServer, RawRequest, RawReply, Logger, TypeProvider>,
  Fastify = any,
  FastifyApp = any,
  R = never,
  Options extends Fa.FastifyPluginOptions = Record<never, never>,
> = (
  // To workaround: The inferred type of this node exceeds the maximum length the compiler will serialize. An explicit type annotation is needed.
  // Fastify: ReturnType<typeof _effectify<FastifyInstance>>,
  Fastify: Fastify,
  opts: Options,
  // ) => Effect<ReturnType<typeof _effectify<FastifyInstance>> | R, never, void>
) => Effect<FastifyApp | R, never, void>

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
  ContextConfig = Fa.ContextConfigDefault,
  TypeProvider extends Fa.FastifyTypeProvider = Fa.FastifyTypeProviderDefault,
  SchemaCompiler extends Fa.FastifySchema = Fa.FastifySchema,
  RawServer extends Fa.RawServerBase = Fa.RawServerDefault,
  RawRequest extends Fa.RawRequestDefaultExpression<RawServer> = Fa.RawRequestDefaultExpression<RawServer>,
  RawReply extends Fa.RawReplyDefaultExpression<RawServer> = Fa.RawReplyDefaultExpression<RawServer>,
  Logger extends Fa.FastifyBaseLogger = Fa.FastifyBaseLogger,
  RouteGeneric extends Fa.RouteGenericInterface = Fa.RouteGenericInterface,
  // rome-ignore format: compact
  FastifyInstance extends Fa.FastifyInstance<RawServer, RawRequest, RawReply, Logger, TypeProvider> = Fa.FastifyInstance<RawServer, RawRequest, RawReply, Logger, TypeProvider>,
>(
  fastify: FastifyInstance,
  // Used to pass liveFastifyAppConfig to effectified Fastify sub instances for plugins
  liveFastifyAppConfig?: Layer<never, never, FastifyAppConfig>,
) {
  const _effectify = <
    // rome-ignore format: compact
    FastifyInstance extends Fa.FastifyInstance<RawServer, RawRequest, RawReply, Logger, TypeProvider>,
  >(
    fastify: FastifyInstance,
    liveFastifyAppConfig?: Layer<never, never, FastifyAppConfig>,
  ) =>
    // rome-ignore format: compact
    effectify<
      ContextConfig, TypeProvider, SchemaCompiler, RawServer, RawRequest, RawReply, Logger, RouteGeneric, FastifyInstance
    >(fastify, liveFastifyAppConfig)

  // rome-ignore format: compact
  type FastifyRequest = Fa.FastifyRequest<RouteGeneric, RawServer, RawRequest, SchemaCompiler, TypeProvider, ContextConfig, Logger>
  // rome-ignore format: compact
  type FastifyReply = Fa.FastifyReply<RawServer, RawRequest, RawReply, RouteGeneric, ContextConfig, SchemaCompiler, TypeProvider>

  // rome-ignore format: compact
  type RouteHandlerMethod = Fa.RouteHandlerMethod<RawServer, RawRequest, RawReply, RouteGeneric, ContextConfig, SchemaCompiler, TypeProvider, Logger>

  // Modified `ResolveFastifyReplyReturnType` from `fastify/types/type-provider.d.ts`
  // The target reply return type. This type is inferenced on fastify 'routes' via generic argument assignment
  type _ResolveFastifyReplyReturnType = ResolveFastifyReplyType<
    TypeProvider,
    SchemaCompiler,
    RouteGeneric
  > extends infer Return
    ? Return | void
    : unknown

  type _ResolveFastifyReplyReturnTypePromise = ResolveFastifyReplyType<
    TypeProvider,
    SchemaCompiler,
    RouteGeneric
  > extends infer Return
    ? Promise<Return | void>
    : unknown

  type EffectRouteHandlerMethod<R = never> = (
    this: FastifyInstance,
    req: FastifyRequest,
    reply: FastifyReply,
  ) => Effect<R, never, _ResolveFastifyReplyReturnType>
  // rome-ignore format: compact
  type RouteOptions = Fa.RouteOptions<RawServer, RawRequest, RawReply, RouteGeneric, ContextConfig, SchemaCompiler, TypeProvider, Logger>
  type EffectRouteOptions<R = never> = Except<RouteOptions, 'handler'> & {
    handler: EffectRouteHandlerMethod<R>
  }

  // rome-ignore format: compact
  type RouteShorthandOptions = Fa.RouteShorthandOptions<RawServer, RawRequest, RawReply, RouteGeneric, ContextConfig, SchemaCompiler, TypeProvider, Logger>
  // rome-ignore format: compact
  type RouteShorthandOptionsWithHandler = Fa.RouteShorthandOptionsWithHandler<RawServer, RawRequest, RawReply, RouteGeneric, ContextConfig, SchemaCompiler, TypeProvider, Logger>
  type EffectRouteShorthandOptionsWithHandler<R = never> = Except<
    RouteShorthandOptionsWithHandler,
    'handler'
  > & {
    handler: EffectRouteHandlerMethod<R>
  }

  const tFastifyApp = Effect.gen(function* ($) {
    // if scope closes, set open to false
    const open = yield* $(
      Ref.make(true).acquireRelease((a) => Effect(a.set(false))),
    )

    const { exitHandler } = yield* $(tagFastifyAppConfig.access)

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
        // Scopes are closed when plugin registrations are done for effectified Fastify sub instances, so don't close the server here for now.
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

    const runtime = <R = never>(
      // rome-ignore format: compact
      handler: EffectRouteHandlerMethod<R>,
    ) =>
      Effect.runtime<R>().map(
        (r): RouteHandlerMethod =>
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
                ) as _ResolveFastifyReplyReturnTypePromise,
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
    tFastifyApp.toScopedLayer(tagFastifyApp)

  const createLiveFastify = <R = never>(
    host: string,
    port: number,
    exitHandler: ExitHandler = defaultExitHandler,
  ): Layer<R, never, FastifyCtx> =>
    (liveFastifyAppConfig ??= createLiveFastifyAppConfig(
      host,
      port,
      exitHandler,
    )) > liveFastifyApp

  const accessFastify = tagFastifyApp.accessWith((_) => _.fastify)

  const withFastify = <R, E, A>(
    self: (_: FastifyInstance) => Effect<R, E, A>,
  ) => tagFastifyApp.accessWithEffect((_) => self(_.fastify))

  const listen = (tagFastifyAppConfig.access & accessFastify).flatMap(
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

  const register =
    <
      // To workaround: The inferred type of this node exceeds the maximum length the compiler will serialize. An explicit type annotation is needed.
      Fastify,
      R = never,
      Options extends Fa.FastifyPluginOptions = Record<never, never>,
    >(
      plugin: EffectFastifyPlugin<Fastify, FastifyApp, R, Options>,
    ) =>
    (
      opts?: FastifyRegisterOptions<FastifyInstance, Options>,
    ): Effect<FastifyApp | R, never, void> =>
      accessFastify.flatMap((fastify) =>
        Effect.async<FastifyApp, never, void>(async (cb) => {
          await fastify.register((instance, _opts, done) => {
            const Fastify = _effectify(
              instance as unknown as FastifyInstance,
              liveFastifyAppConfig,
            )

            const tPlugin = plugin(Fastify as unknown as Fastify, _opts)
              .provideServiceEffect(tagFastifyApp, Fastify.tFastifyApp)
              .scoped.tap(() => {
                done()
                return Effect.unit
              }) as unknown as Effect<FastifyApp, never, void>

            cb(tPlugin)
          }, opts as Fa.FastifyRegisterOptions<Options>)
        }),
      )

  const runFasitfyHandler = <R = never>(handler: EffectRouteHandlerMethod<R>) =>
    tagFastifyApp.accessWithEffect((_) => _.runtime(handler))

  const route = <R = never>(opts: EffectRouteOptions<R>) =>
    runFasitfyHandler(opts.handler).flatMap((handler) =>
      withFastify((fastify) =>
        Effect(() => {
          // rome-ignore format: compact
          fastify.route({ ...opts, handler } as Fa.RouteOptions<RawServer, RawRequest, RawReply, RouteGeneric, ContextConfig, SchemaCompiler, TypeProvider>)
        }),
      ),
    )

  type _EffectRouteShorthandMethod<R = never> = EffectRouteShorthandMethod<
    RouteShorthandOptions,
    EffectRouteHandlerMethod<R>,
    EffectRouteShorthandOptionsWithHandler<R>,
    R
  >

  function isEffectRouteHandlerMethod<R>(
    _: unknown,
  ): _ is EffectRouteHandlerMethod<R> {
    return _ instanceof Function
  }

  const routeMethod = <R = never>(
    method: Method,
  ): _EffectRouteShorthandMethod<R> =>
    ((path: string, ...args: unknown[]) => {
      const [handler, opts] = isEffectRouteHandlerMethod<R>(args[0])
        ? [args[0], undefined]
        : isEffectRouteHandlerMethod<R>(args[1])
        ? [args[1], args[0] as RouteShorthandOptions]
        : [
            (args[0] as EffectRouteShorthandOptionsWithHandler<R>).handler,
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
    }) as _EffectRouteShorthandMethod<R>

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
    // rome-ignore format: compact
    _types: {
      FastifyRequest: _type<FastifyRequest>(),
      FastifyReply: _type<FastifyReply>(),
      RouteHandlerMethod: _type<RouteHandlerMethod>(),
      EffectRouteHandlerMethod: <R = never>() => _type<EffectRouteHandlerMethod<R>>(),
      RouteOptions: _type<RouteOptions>(),
      EffectRouteOptions: <R = never>() => _type<EffectRouteOptions<R>>(),
      RouteShorthandOptions: _type<RouteShorthandOptions>(),
      RouteShorthandOptionsWithHandler: _type<RouteShorthandOptionsWithHandler>(),
      EffectRouteShorthandOptionsWithHandler: <R = never>() => _type<EffectRouteShorthandOptionsWithHandler<R>>(),
      FastifyApp: _type<FastifyApp>(),
      FastifyCtx: _type<FastifyCtx>(),
      EffectFastifyRegister: _type<_EffectFastifyRegister>(),
      EffectRouteShorthandMethod: <R = never>() => _type<_EffectRouteShorthandMethod<R>>(),
    },
  }
}
