/**
 * common string schema
 */
export const strBaseObj = {
  value: Schema.string,
  cast: Schema.optional(Schema.literal('str')),
}

export const strContainsSchema = Schema.struct({
  ...strBaseObj,
  op: Schema.optional(Schema.literal('contains')).withDefault(() => 'contains'),
})

export const strEqualSchema = Schema.struct({
  ...strBaseObj,
  op: Schema.optional(Schema.literal('=')).withDefault(() => '='),
})

export const strNotEqualSchema = Schema.struct({
  ...strBaseObj,
  op: Schema.optional(Schema.literal('!=')).withDefault(() => '!='),
})

export const strInSchema = Schema.struct({
  ...strBaseObj,
  op: Schema.optional(Schema.literal('in')).withDefault(() => 'in'),
})

export const strNotInSchema = Schema.struct({
  ...strBaseObj,
  op: Schema.optional(Schema.literal('not in')).withDefault(() => 'not in'),
})

/**
 * common number schema
 */

export const numBaseObj = {
  value: Schema.number,
  cast: Schema.optional(Schema.literal('int64', 'int32', 'int16')),
}

export const numAdditionSchema = Schema.struct({
  ...numBaseObj,
  op: Schema.optional(Schema.literal('+')).withDefault(() => '+'),
})

export const numSubtractionSchema = Schema.struct({
  ...numBaseObj,
  op: Schema.optional(Schema.literal('-')).withDefault(() => '-'),
})

export const numMultiplicationSchema = Schema.struct({
  ...numBaseObj,
  op: Schema.optional(Schema.literal('*')).withDefault(() => '*'),
})

export const numDivisionSchema = Schema.struct({
  ...numBaseObj,
  op: Schema.optional(Schema.literal('/')).withDefault(() => '/'),
})

export const numGreaterThanSchema = (num: number) =>
  Schema.struct({
    ...numBaseObj,
    value: pipe(Schema.number, Schema.greaterThan(num)),
    op: Schema.optional(Schema.literal('>')).withDefault(() => '>'),
  })

export const numGreaterThanOrEqualToSchema = (num: number) =>
  Schema.struct({
    ...numBaseObj,
    value: pipe(Schema.number, Schema.greaterThanOrEqualTo(num)),
    op: Schema.optional(Schema.literal('>=')).withDefault(() => '>='),
  })

export const numLessThanSchema = (num: number) =>
  Schema.struct({
    ...numBaseObj,
    value: pipe(Schema.number, Schema.lessThan(num)),
    op: Schema.optional(Schema.literal('<')).withDefault(() => '<'),
  })

export const numLessThanOrEqualToSchema = (num: number) =>
  Schema.struct({
    ...numBaseObj,
    value: pipe(Schema.number, Schema.lessThanOrEqualTo(num)),
    op: Schema.optional(Schema.literal('<=')).withDefault(() => '<='),
  })

export const numBetweenSchema = (min: number, max: number) =>
  Schema.struct({
    ...numBaseObj,
    op: Schema.optional(Schema.literal('all')).withDefault(() => 'all'),
    // value: pipe(Schema.number, Schema.between(min, max)),
    value: Schema.struct({
      min: numGreaterThanOrEqualToSchema(min),
      max: numLessThanOrEqualToSchema(max),
    }),
  })
