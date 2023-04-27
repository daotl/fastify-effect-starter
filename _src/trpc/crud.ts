export const sListInput = Schema.struct({
  offset: Schema.optional(Schema.number),
  limit: Schema.optional(Schema.number),
})

export const sIdInput = Schema.struct({
  id: Schema.UUID,
})
