const strSchemaBase = {
  value: Schema.string,
  cast: Schema.literal('str'),
}

export const sStrContains = Schema.struct({
  ...strSchemaBase,
  op: Schema.literal('contains'),
})

export const sStrEqual = Schema.struct({
  ...strSchemaBase,
  op: Schema.literal('='),
})

export const sStrNotEqual = Schema.struct({
  ...strSchemaBase,
  op: Schema.literal('!='),
})

export const sStrIn = Schema.struct({
  ...strSchemaBase,
  op: Schema.literal('in'),
})

export const sStrNotIn = Schema.struct({
  ...strSchemaBase,
  op: Schema.literal('not in'),
})

const numSchemaBase = {
  value: Schema.number,
  cast: Schema.literal('int64', 'int32', 'int16'),
}

export const sNumAdd = Schema.struct({
  ...numSchemaBase,
  op: Schema.literal('+'),
})

export const sNumSubtract = Schema.struct({
  ...numSchemaBase,
  op: Schema.literal('-'),
})

export const sNumMultiply = Schema.struct({
  ...numSchemaBase,
  op: Schema.literal('*'),
})

export const sNumDivide = Schema.struct({
  ...numSchemaBase,
  op: Schema.literal('/'),
})

export const sNumGt = (num: number) =>
  Schema.struct({
    ...numSchemaBase,
    value: pipe(Schema.number, Schema.greaterThan(num)),
    op: Schema.literal('>'),
  })

export const sNumGte = (num: number) =>
  Schema.struct({
    ...numSchemaBase,
    value: pipe(Schema.number, Schema.greaterThanOrEqualTo(num)),
    op: Schema.literal('>='),
  })

export const sNumLt = (num: number) =>
  Schema.struct({
    ...numSchemaBase,
    value: pipe(Schema.number, Schema.lessThan(num)),
    op: Schema.literal('<'),
  })

export const sNumLte = (num: number) =>
  Schema.struct({
    ...numSchemaBase,
    value: pipe(Schema.number, Schema.lessThanOrEqualTo(num)),
    op: Schema.literal('<='),
  })

export const sNumRangeOpen = (min: number, max: number) =>
  Schema.struct({
    ...numSchemaBase,
    op: Schema.literal('all'),
    value: Schema.struct({
      min: sNumGt(min),
      max: sNumLt(max),
    }),
  })

export const sNumRangeClosed = (min: number, max: number) =>
  Schema.struct({
    ...numSchemaBase,
    op: Schema.literal('all'),
    value: Schema.struct({
      min: sNumGte(min),
      max: sNumLte(max),
    }),
  })
