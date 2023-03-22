// 3p
import { Client } from 'edgedb/dist/baseClient.js'
export { Client }
import edgeqlJs from 'edgeql-js'

// app
export * from './utils.js'
export * from './common.js'

export const tagEdgedb = Tag<Client>()

export const createLiveEdgedb = (cfg: Parameters<Client['withConfig']>[0]) =>
  Layer.succeed(tagEdgedb, edgeqlJs.createClient().withConfig(cfg))
