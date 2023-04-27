export const toDtoSchema = <
  // rome-ignore lint/suspicious/noExplicitAny: <explanation>
  From extends { [K in keyof To]: any },
  To extends {
    readonly id: string
    readonly createdAt: Date
  } = From,
>(
  schema: Schema<From, To>,
) => {
  return pipe(
    schema,
    Schema.omit('id', 'createdAt'),
    Schema.extend(
      Schema.struct({
        createdAt: Schema.optional(Schema.Date),
      }),
    ),
  )
}
