import edgeqlJs from 'edgeql-js'
import { castMaps } from 'edgeql-js/imports'
import type models from 'edgeql-js/modules/default'
import { type $bool } from 'edgeql-js/modules/std'
import * as $ from 'edgeql-js/reflection'
import type { EmptyObject, Except } from 'type-fest'

export const e = edgeqlJs.default

import type { ModelMap as ModelTypeMap } from '~/models/index.js'

export type ModelMap = Except<typeof models, 'Base'>
export type Model = ModelMap[keyof ModelTypeMap]

type EBool = castMaps.orScalarLiteral<$.TypeSet<$bool>>

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export const all = (...args: [EBool, ...EBool[]]) => e.all(e.set(...args))

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export const any = (...args: [EBool, ...EBool[]]) => e.any(e.set(...args))

export function filterPropsEqual<
  K extends keyof ModelTypeMap,
  M extends ModelMap[K],
>(
  m: M,
  filter: Exclude<Partial<ModelTypeMap[K]>, EmptyObject>,
):
  | $.$expr_Function<$bool, $.Cardinality.One>
  | $.$expr_Literal<$.ScalarType<'std::bool', boolean, true>> {
  const filters = Object.entries(filter)
  return filters.length
    ? // @ts-expect-error ignore
      all(...filters.map(([k, v]) => e.op(m[k], '=', v)))
    : e.bool(true)
}
