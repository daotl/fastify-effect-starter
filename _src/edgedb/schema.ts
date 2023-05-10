/**
 * common string schema
 */
export const strBaseObj = {
  value: Schema.string,
  cast: Schema.literal('str'),
}

export const SStrContains = Schema.struct({
  ...strBaseObj,
  op: Schema.literal('contains'),
})

export const SStrEqual = Schema.struct({
  ...strBaseObj,
  op: Schema.literal('='),
})

export const SStrNotEqual = Schema.struct({
  ...strBaseObj,
  op: Schema.literal('!='),
})

export const SStrIn = Schema.struct({
  ...strBaseObj,
  op: Schema.literal('in'),
})

export const SStrNotIn = Schema.struct({
  ...strBaseObj,
  op: Schema.literal('not in'),
})

/**
 * common number schema
 */

export const numBaseObj = {
  value: Schema.number,
  cast: Schema.literal('int64', 'int32', 'int16'),
}

export const SNumAddition = Schema.struct({
  ...numBaseObj,
  op: Schema.literal('+'),
})

export const SNumSubtraction = Schema.struct({
  ...numBaseObj,
  op: Schema.literal('-'),
})

export const SNumMultiplication = Schema.struct({
  ...numBaseObj,
  op: Schema.literal('*'),
})

export const SNumDivision = Schema.struct({
  ...numBaseObj,
  op: Schema.literal('/'),
})

export const SNumGreaterThan = (num: number) =>
  Schema.struct({
    ...numBaseObj,
    value: pipe(Schema.number, Schema.greaterThan(num)),
    op: Schema.literal('>'),
  })

export const SNumGreaterThanOrEqualTo = (num: number) =>
  Schema.struct({
    ...numBaseObj,
    value: pipe(Schema.number, Schema.greaterThanOrEqualTo(num)),
    op: Schema.literal('>='),
  })

export const SNumLessThan = (num: number) =>
  Schema.struct({
    ...numBaseObj,
    value: pipe(Schema.number, Schema.lessThan(num)),
    op: Schema.literal('<'),
  })

export const SNumLessThanOrEqualTo = (num: number) =>
  Schema.struct({
    ...numBaseObj,
    value: pipe(Schema.number, Schema.lessThanOrEqualTo(num)),
    op: Schema.literal('<='),
  })

export const SNumBetween = (min: number, max: number) =>
  Schema.struct({
    ...numBaseObj,
    op: Schema.literal('all'),
    // value: pipe(Schema.number, Schema.between(min, max)),
    value: Schema.struct({
      min: SNumGreaterThanOrEqualTo(min),
      max: SNumLessThanOrEqualTo(max),
    }),
  })
