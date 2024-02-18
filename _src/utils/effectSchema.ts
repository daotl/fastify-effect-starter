export const toCreateSchema = <
  // biome-ignore lint/suspicious/noExplicitAny: <explanation>
  A extends { [K in keyof I]: any },
  I extends {
    readonly id: string
    readonly createdAt: string
  },
  R = never,
>(
  schema: Schema<A, I, R>,
) => {
  return pipe(schema, Schema.omit('id', 'createdAt'))
}

export const toUpdateSchema = <
  // biome-ignore lint/suspicious/noExplicitAny: <explanation>
  A extends { [K in keyof I]: any },
  I extends {
    readonly id: string
    readonly createdAt: string
  },
  R = never,
>(
  schema: Schema<A, I, R>,
) => {
  return Schema.partial(pipe(schema, Schema.omit('id', 'createdAt')))
}
