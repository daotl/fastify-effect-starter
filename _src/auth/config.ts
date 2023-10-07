import type { ConfigA } from '@daotl-effect/prelude/config'

export const AuthConfig = Config.all({
  mockUserId: Config.string('mockUserId').withDefault(
    '58f593d2-8752-11ed-aaf6-93aa3de653de',
  ),
})

export type AuthConfig = ConfigA<typeof AuthConfig>
