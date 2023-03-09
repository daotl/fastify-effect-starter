// import type * as Fa from 'fastify'
// import type { Except } from 'type-fest'

// export type RouteFn<
//   ContextConfig = Fa.ContextConfigDefault,
//   TypeProvider extends Fa.FastifyTypeProvider = Fa.FastifyTypeProviderDefault,
//   SchemaCompiler extends Fa.FastifySchema = Fa.FastifySchema,
//   RawServer extends Fa.RawServerBase = Fa.RawServerDefault,
//   RawRequest extends Fa.RawRequestDefaultExpression<RawServer> = Fa.RawRequestDefaultExpression<RawServer>,
//   RawReply extends Fa.RawReplyDefaultExpression<RawServer> = Fa.RawReplyDefaultExpression<RawServer>,
//   Logger extends Fa.FastifyBaseLogger = Fa.FastifyBaseLogger,
//   RouteGeneric extends Fa.RouteGenericInterface = Fa.RouteGenericInterface,
// > = (
//   opts: Fa.RouteOptions<
//     RawServer,
//     RawRequest,
//     RawReply,
//     RouteGeneric,
//     ContextConfig,
//     SchemaCompiler,
//     TypeProvider,
//     Logger
//   >,
// ) => Fa.FastifyInstance<RawServer, RawRequest, RawReply, Logger, TypeProvider>

// export type FastifyInstance<
//   ContextConfig = Fa.ContextConfigDefault,
//   TypeProvider extends Fa.FastifyTypeProvider = Fa.FastifyTypeProviderDefault,
//   SchemaCompiler extends Fa.FastifySchema = Fa.FastifySchema,
//   RawServer extends Fa.RawServerBase = Fa.RawServerDefault,
//   RawRequest extends Fa.RawRequestDefaultExpression<RawServer> = Fa.RawRequestDefaultExpression<RawServer>,
//   RawReply extends Fa.RawReplyDefaultExpression<RawServer> = Fa.RawReplyDefaultExpression<RawServer>,
//   Logger extends Fa.FastifyBaseLogger = Fa.FastifyBaseLogger,
//   RouteGeneric extends Fa.RouteGenericInterface = Fa.RouteGenericInterface,
// > = Except<
//   Fa.FastifyInstance<RawServer, RawRequest, RawReply, Logger, TypeProvider>,
//   'route'
// > & {
//   // rome-ignore format: compact
//   route: RouteFn<ContextConfig, TypeProvider, SchemaCompiler, RawServer, RawRequest, RawReply, Logger, RouteGeneric>
// }

// export type CreateFastify<
//   ContextConfig = Fa.ContextConfigDefault,
//   TypeProvider extends Fa.FastifyTypeProvider = Fa.FastifyTypeProviderDefault,
//   SchemaCompiler extends Fa.FastifySchema = Fa.FastifySchema,
//   RawServer extends Fa.RawServerBase = Fa.RawServerDefault,
//   RawRequest extends Fa.RawRequestDefaultExpression<RawServer> = Fa.RawRequestDefaultExpression<RawServer>,
//   RawReply extends Fa.RawReplyDefaultExpression<RawServer> = Fa.RawReplyDefaultExpression<RawServer>,
//   Logger extends Fa.FastifyBaseLogger = Fa.FastifyBaseLogger,
//   RouteGeneric extends Fa.RouteGenericInterface = Fa.RouteGenericInterface,
// > = () => Promise<
//   // rome-ignore format: compact
//   FastifyInstance<ContextConfig, TypeProvider, SchemaCompiler, RawServer, RawRequest, RawReply, Logger, RouteGeneric> & PromiseLike<undefined>
// >

export const methods = [
  'all',
  'get',
  'post',
  'put',
  'delete',
  'patch',
  'options',
  'head',
] as const

export type Method = typeof methods[number]
