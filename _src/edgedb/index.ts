// 3p
import type { Client } from 'edgedb'
export type { Client }
import edgeqlJs from 'edgeql-js'

// app
export * from './common.js'
export * from './schema.js'
export * from './utils.js'

export const tagEdgedb = Tag<Client>()

export const createLiveEdgedb = (cfg: Parameters<Client['withConfig']>[0]) =>
  Layer.succeed(tagEdgedb, edgeqlJs.createClient().withConfig(cfg))
