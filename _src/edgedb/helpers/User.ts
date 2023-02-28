// codegen:start {preset: custom, source: ../../../eslint-codegen/edgedb-helpers.cjs, export: all}
import type { Cardinality } from 'edgedb/dist/reflection'
import type {
  $expr_Insert,
  $expr_InsertUnlessConflict,
  InsertShape,
} from 'edgeql-js/insert'
import * as R from 'remeda'
import type { $expr_PathNode, $linkPropify } from 'edgeql-js/path'
import type {
  ComputeSelectCardinality,
  SelectModifierNames,
  SelectModifiers,
  UnknownSelectModifiers,
  objectTypeToSelectShape,
} from 'edgeql-js/select'
import type { $scopify, TypeSet } from 'edgeql-js/typesystem'
import type { $expr_Update, UpdateShape } from 'edgeql-js/update'

import { type ModelMap, e } from '../utils.js'
import { type UpsertShape, upsertConflictGetter } from './common.js'

type Model = ModelMap['User']
type Element = Model['__element__']
const modelType = e.User

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export const selectWithTotal = <
  /**
   * The shape of the select statement.
   */
  Shape extends objectTypeToSelectShape<Element> & SelectModifiers<Element>,
  /**
   * The modifiers that can be applied to the select statement.
   *
   * @remarks
   * By default, this is any modifier that is not offset or limit.
   */
  Modifiers extends UnknownSelectModifiers = Pick<Shape, SelectModifierNames>,
>(
  shape: (
    scope: $scopify<Element> &
      $linkPropify<{
        [k in keyof Model]: k extends '__cardinality__'
          ? Cardinality.One
          : Model[k]
      }>,
  ) => Readonly<Shape>,
) => {
  return e.select({
    total: e.count(
      e.select<Model, Shape, Modifiers>(
        modelType,
        (scope) => R.omit(shape(scope), ['offset', 'limit']) as Readonly<Shape>,
      ),
    ),
    data: e.select<Model, Shape, Modifiers>(modelType, shape),
  })
}

type ExprInsert = $expr_Insert<Element>

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export const insertSelect = <
  SelShape extends objectTypeToSelectShape<ExprInsert['__element__']> &
    SelectModifiers<ExprInsert['__element__']> = Model['*'],
>(
  insertShape: InsertShape<Element>,
  selectShape: SelShape = modelType['*'] as SelShape,
) =>
  e.select<ExprInsert, SelShape>(
    e.insert(modelType, insertShape),
    () => selectShape,
  )

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export const updateSelect = <
  UpShape extends {
    filter?: SelectModifiers['filter']
    filter_single?: SelectModifiers<Element>['filter_single']
    order_by?: SelectModifiers['order_by']
    limit?: SelectModifiers['limit']
    offset?: SelectModifiers['offset']
    set: UpdateShape<Model>
  },
  ExprUpdateExact extends [
    $expr_Update<Element, ComputeSelectCardinality<Model, UpShape>>,
  ],
  SelShape extends objectTypeToSelectShape<ExprUpdateExact[0]['__element__']> &
    SelectModifiers<ExprUpdateExact[0]['__element__']> = (Model &
    $expr_PathNode)['*'],
>(
  updateShape: (scope: $scopify<Element>) => Readonly<UpShape>,
  selectShape: SelShape = modelType['*'] as SelShape,
) =>
  e.select<ExprUpdateExact[0], SelShape>(
    e.update(modelType, updateShape),
    () => selectShape,
  )

export const upsert = <
  On extends TypeSet | null,
  InsShape extends UpsertShape<Model>,
  UpShapeFn extends (
    insertShape: UpsertShape<Model>,
  ) => UpdateShape<Model> = typeof R['identity'],
>(
  on: On,
  insertShape: InsShape,
  updateShapeFn: UpShapeFn = R.identity as unknown as UpShapeFn,
): $expr_InsertUnlessConflict<
  Element,
  ReturnType<
    ReturnType<typeof upsertConflictGetter<Model, On, InsShape, UpShapeFn>>
  >
> =>
  e
    .insert(modelType, insertShape)
    .unlessConflict(
      upsertConflictGetter<Model, On, InsShape, UpShapeFn>(
        on,
        insertShape,
        updateShapeFn,
      ),
    )

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export const upsertSelect = <
  On extends TypeSet | null,
  InsShape extends UpsertShape<Model>,
  ExprInsertUnlessConflictExact extends [
    $expr_InsertUnlessConflict<
      Element,
      ReturnType<
        ReturnType<typeof upsertConflictGetter<Model, On, InsShape, UpShapeFn>>
      >
    >,
  ],
  UpShapeFn extends (
    insertShape: UpsertShape<Model>,
  ) => UpdateShape<Model> = typeof R['identity'],
  SelShape extends objectTypeToSelectShape<
    ExprInsertUnlessConflictExact[0]['__element__']
  > &
    SelectModifiers<ExprInsertUnlessConflictExact[0]['__element__']> = (Model &
    $expr_PathNode)['*'],
>(
  on: On,
  insertShape: InsShape,
  updateShapeFn: UpShapeFn = R.identity as unknown as UpShapeFn,
  selectShape: SelShape = modelType['*'] as unknown as SelShape,
) =>
  e.select<ExprInsertUnlessConflictExact[0], SelShape>(
    upsert(on, insertShape, updateShapeFn),
    () => selectShape,
  )
// codegen:end
