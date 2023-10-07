import type { Cardinality } from 'edgedb/dist/reflection'
import type { castMaps } from 'edgeql-js/imports'
import type models from 'edgeql-js/modules/default'
import type { $bool } from 'edgeql-js/modules/std'
import type * as $ from 'edgeql-js/reflection'
import type { Primitive } from 'type-fest/source/primitive.js'

import type { ModelMap as ModelTypeMap } from '../models/index.js'

export type ModelMap = Except<typeof models, 'Base'>
export type Model = ModelMap[keyof ModelTypeMap]

type EBool = castMaps.orScalarLiteral<$.TypeSet<$bool>>

export const edgedbOpOption = [
  '!=',
  '%',
  '*',
  '+',
  '++',
  '-',
  '/',
  '//',
  '<',
  '<=',
  '=',
  '>',
  '>=',
  '?!=',
  '?=',
  '??',
  '^',
  'and',
  'if',
  'ilike',
  'in',
  'like',
  'not ilike',
  'not in',
  'or',
  'union',
] as const

export type EdgedbOpOption = typeof edgedbOpOption[number]

export const opOption = [...edgedbOpOption, 'contains', 'any', 'all']

export type OpOption = typeof opOption[number]

export type FilterJson = {
  [P in string]:
    | Primitive
    | TaggedUnion<
        'op',
        {
          [K in 'any' | 'all']: {
            value: FilterJson
          }
        } & {
          [K in EdgedbOpOption | 'contains']: {
            value: Primitive
            cast?: string
          }
        }
      >
}

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export const all = (...args: [EBool, ...EBool[]]) => e.all(e.set(...args))

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export const any = (...args: [EBool, ...EBool[]]) => e.any(e.set(...args))

export function filterPropsEqual<
  K extends keyof ModelTypeMap,
  M extends ModelMap[K],
>(
  m: M,
  filter: Exclude<Partial<ModelTypeMap[K]>, EmptyObject> | undefined,
):
  | $.$expr_Function<$bool, $.Cardinality.One>
  | $.$expr_Literal<$.ScalarType<'std::bool', boolean, boolean, true>> {
  if (!filter) {
    return e.bool(true)
  }

  const filters = Object.entries(filter)
  return filters.length
    ? // @ts-expect-error ignore
      all(...filters.map(([k, v]) => e.op(m[k], '=', v)))
    : e.bool(true)
}

type OModel = Omit<Model, '__cardinality__'> & {
  __cardinality__: Cardinality.One
}

export const genFilterQuery = <M extends OModel>(
  obj: M,
  filterJson: FilterJson,
  set: 'all' | 'any' = 'all',
  parentPath = '',
) => {
  const ops = Object.entries(filterJson).reduce((pre, [key, item]) => {
    const _o = {}
    const o = R.pathOr(
      obj,
      // @ts-expect-error
      `${parentPath ? `${parentPath}.` : ''}${key}`.split('.'),
      _o,
    )

    if (_o === o) {
      return pre
    } else if (!R.isObject(item)) {
      // @ts-expect-error
      pre.push(e.op(o, '=', item))
    } else if (item.op === 'contains') {
      // @ts-expect-error
      const v = item.cast ? e.cast(e[item.cast], o) : o
      // @ts-expect-error
      pre.push(e.contains(v, item.value))
    } else if (['any', 'all'].includes(item.op)) {
      // @ts-expect-error
      pre.push(genFilterQuery(obj, item.value, item.op, key))
    } else {
      // @ts-expect-error
      const v = item.cast ? e.cast(e[item.cast], o) : o
      // @ts-expect-error
      pre.push(e.op(v, item.op ?? '=', item.value))
    }

    return pre
  }, [])

  return ops.length ? e[set](e.set(...ops)) : e.bool(true)
}
