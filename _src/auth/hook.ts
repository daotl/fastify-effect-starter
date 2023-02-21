import type * as Fa from 'fastify'

import type { FastifyContextConfig } from '~/fastify.js'
import { cookieStr } from '~/http/index.js'

import type { AuthConfig } from './config.js'
import { type Session, SessionCache, sessionIdCookieName } from './session.js'
import { User } from '~/models/index.js'

// onRequest hook
export const newAuthHook =
  (_config: AuthConfig, sessionCache: SessionCache): Fa.onRequestHookHandler =>
  (req, reply, done) => {
    const authLevel =
      (req.routeConfig as FastifyContextConfig).authLevel ?? 'protected'

    if (
      // Allow access to static files without authenticatio
      !req.url.startsWith('/api/') ||  authLevel === 'public'
    ) {
      return done()
    }

    // TODO: Should validate cached sessions' status?
    const sessionIdCookie = req.cookies[sessionIdCookieName]
    const oSession = Option.fromNullable(sessionIdCookie)
      .flatMapNullable((cookie) => sessionCache.get(cookie))
      // TODO: temp
      .tap((session) => {
        const ttl = 3600_000
        sessionCache.set(session.id, session, ttl)
        return some(null)
      })
    // Mock authenticated user for developing
    // .orElse(() =>
    //   config.mockUserId
    //     ? some({
    //         id: config.mockUserId,
    //       } as Session)
    //     : none(),
    // )

    oSession.flatMap((session) => {
      const oUser = some({
        createdAt: new Date(),
        id: session.id,
        name: 'Nex',
        email: 'hitnexup@gmail.com',
      } as User)

      oUser.match(
        () => {
          // Not successfully signed-in
          console.log('haha fuck')
          oSession.tap((s) => {
            // Invalid session, remove it
            sessionCache.delete(s.id)
            return some(null)
          })
          // Deny if auth is not optional
          if (authLevel !== 'optional') {
            reply.code(401).send()
          }
        },
        (user) => {
          // Signed-in, make sure all routes have the `User` object if they want
          // via AuthenticatedUserParameterResolver
          req.log.info('Secure API requested by', user.name)
          ;(req.requestContext as any).session = session
          ;(req.requestContext as any).user = user

          // Set or refresh session ID cookie
          reply.header('Set-Cookie', cookieStr(sessionIdCookieName, session.id))
        },
      )

      return oUser
    }).match(
      () => {
        // Deny if auth is not optional
        if (authLevel !== 'optional') {
          reply.code(401).send()
        }
      },
      () => {}
    )

    // // Set or refresh session ID cookie
    // event.response.setHeader(
    //   'Set-Cookie',
    //   cookieStr(sessionIdCookieName, session.id),
    // )

    done()
  }
