// 3p
export { Client as EdgedbClient } from 'edgedb/dist/baseClient.js'
import edgeqlJs from 'edgeql-js'

// app
export const e = edgeqlJs.default
export * from './utils.js'
export * from './helpers/index.js'
