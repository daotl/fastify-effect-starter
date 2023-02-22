import type * as Fa from 'fastify'

import { type User } from '~/models/index.js'

import { type Session } from './session.js'

// export function extractSessionFromRequest(
//   req: Fa.FastifyRequest,
// ): Session | undefined {
//   return req.store?.session as Session
// }

// export function extractUserFromRequest(req: HttpRequest): User | undefined {
//   return req.store?.user as User
// }

// export class SessionParameterResolver {
//   resolve(ctx: RouteParameterResolverContext): Session | Promise<Session> {
//     const session = extractSessionFromRequest(ctx.request)
//     if (!session) {
//       throw new Error('No session loaded')
//     }
//     return session
//   }
// }

// export class AuthenticatedUserParameterResolver {
//   resolve(
//     ctx: RouteParameterResolverContext,
//   ): User | undefined | Promise<User | undefined> {
//     const user = extractUserFromRequest(ctx.request)
//     if (
//       !user &&
//       !['public', 'optional'].includes(
//         ctx.route.data.get('authGroup') as string,
//       )
//     ) {
//       throw new Error('No user loaded')
//     }
//     return user
//   }
// }
