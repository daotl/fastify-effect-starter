import type { BaseConfig, ConfigA } from '@daotl-effect/prelude/config'
import dotenv from 'dotenv'
import { expand } from 'dotenv-expand'

const env = dotenv.config()
if (env.error) {
  console.log('did not load .env')
} else {
  console.log('loading env from: .env')
}
expand(env)

// From: https://github.com/effect-ts-app/boilerplate/blob/3a31f077b1dd748eb1d7c4cfcf6deb542bf61dfc/_project/api/_src/config.ts

export const ApiConfig = Config.all({
  apiVersion: Config.string('apiVersion').withDefault('local-dev'),
  host: Config.string('host').withDefault('0.0.0.0'),
  port: Config.integer('port').withDefault(3000),
})

export type ApiConfig = ConfigA<typeof ApiConfig>

export type ApiMainConfig = ApiConfig & BaseConfig

export * from '@daotl-effect/prelude/config'
