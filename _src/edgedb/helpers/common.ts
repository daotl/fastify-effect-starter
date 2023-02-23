import { identity } from 'rambdax/immutable'

import { e } from '../index.js'
import type { InsertShape } from '../generated/edgeql-js/insert.mjs'
import type { $expr_PathNode } from '../generated/edgeql-js/path.mjs'
import type { $scopify, TypeSet } from '../generated/edgeql-js/typesystem.mjs'
import type { UpdateShape } from '../generated/edgeql-js/update.mjs'

export type UpsertShape<Root extends $expr_PathNode> = InsertShape<
  Root['__element__']
> &
  UpdateShape<Root>

export const upsertConflictGetter =
  <
    Root extends $expr_PathNode,
    On extends TypeSet | null,
    InsShape extends UpsertShape<Root>,
    UpShapeFn extends (insertShape: UpsertShape<Root>) => UpdateShape<Root>,
  >(
    on: On,
    insertShape: InsShape,
    updateShapeFn: UpShapeFn = identity as UpShapeFn,
  ) =>
  // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
  (obj: $scopify<Root['__element__']>) => ({
    on,
    else: e.update(obj, () => ({
      set: updateShapeFn(insertShape),
    })),
  })
