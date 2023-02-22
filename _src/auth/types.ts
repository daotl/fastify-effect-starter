import { User } from '~/models/index.js'

import { Session } from './session.js'

export type AuthLevel = 'public' | 'optional' | 'protected' | 'admin'

export type ContextData = {
  session: Session
  user: User
}
