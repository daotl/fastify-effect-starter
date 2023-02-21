import { TLRU } from 'tlru'

export const sessionIdCookieName = 'daotl_session_id'

export type Session = {
  id: string
}

// TODO: Switch to Redis for session cache
export class SessionCache extends TLRU<string, Session> {}

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export function newSessionCache() {
  return new SessionCache({
    maxStoreSize: 10000,
    maxAgeMs: 3600_000,
  })
}
