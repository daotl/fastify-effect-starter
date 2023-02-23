import type { EmptyObject, Except } from 'type-fest'

import type { ModelMap as ModelTypeMap } from '~/models/index.js'

import { e } from './index.js'
import { castMaps } from './generated/edgeql-js/imports.mjs'
import type models from './generated/edgeql-js/modules/default.mjs'
import { type $bool } from './generated/edgeql-js/modules/std.mjs'
import * as $ from './generated/edgeql-js/reflection.mjs'

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
