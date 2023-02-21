import type { Session } from '~/auth/index.js'
import type { User } from '~/models/index.js'

export type Context = {
  session?: Session
  user?: User
}
