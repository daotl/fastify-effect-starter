import { pino } from 'pino'

export const logger = pino()
export type Logger = typeof logger

export const tagLogger = Tag('Logger')<Logger, Logger>()

export const liveLogger = Layer.succeed(tagLogger, logger)
