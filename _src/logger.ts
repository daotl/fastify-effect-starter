import { pino, type Logger } from 'pino'

export const logger = pino()

export const tagLogger = Tag<Logger>()

export const liveLogger = Layer.succeed(tagLogger, logger)
