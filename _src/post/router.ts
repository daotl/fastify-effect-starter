import * as E from '~/edgedb/index.js'
import {
  zCreatePostInput,
  zPostFilter,
  zUpdatePostInput,
} from '~/models/zod.js'
import { zIdInput, zListInput } from '~/trpc/crud.js'
import { p, t } from '~/trpc/trpc.js'

export const zPostListInput = zListInput.extend({
  filter: zPostFilter.optional(),
})

export const router = () =>
  t.router({
    count,
    list,
    listWithTotal,
    get,
    create,
    update,
    delete: _delete,
  })

const count = p.optional.input(zPostListInput).query(({ input }) =>
  E.tagEdgedb.flatMap((edgedb) =>
    Effect.promise(
      e
        .count(
          e.select(e.Post, (_p) => ({
            ...input,
            filter: E.filterPropsEqual(e.Post, input.filter),
          })),
        )
        .run(edgedb),
    ),
  ),
)

const list = p.optional.input(zPostListInput).query(({ input }) =>
  E.tagEdgedb.flatMap((edgedb) =>
    Effect.promise(
      e
        .select(e.Post, (_p) => ({
          ...input,
          filter: E.filterPropsEqual(e.Post, input.filter),
          ...e.Post['*'],
        }))
        .run(edgedb),
    ),
  ),
)

const listWithTotal = p.optional.input(zPostListInput).query(({ input }) => {
  const shape = {
    ...e.Post['*'],
    ...input,
    filter: E.filterPropsEqual(e.Post, input.filter),
  }
  return E.tagEdgedb.flatMap((edgedb) =>
    Effect.promise(
      e
        .select({
          total: e.count(
            e.select(e.Post, (_) => R.omit(['offset', 'limit'])(shape)),
          ),
          data: e.select(e.Post, (_) => shape),
        })
        .run(edgedb),
    ),
  )
})

const get = p.optional.input(zIdInput).query(({ input: { id } }) =>
  E.tagEdgedb.flatMap((edgedb) =>
    Effect.promise(
      e
        .select(e.Post, (p) => ({
          filter_single: e.op(p.id, '=', e.cast(e.uuid, id)),
          ...e.Post['*'],
        }))
        .run(edgedb),
    ),
  ),
)

const create = p.optional.input(zCreatePostInput).mutation(async ({ input }) =>
  E.tagEdgedb.flatMap((edgedb) =>
    Effect.promise(
      e
        .insert(e.Post, {
          ...input,
          author: e.select(e.User, (u) => ({
            filter_single: e.op(u.id, '=', e.cast(e.uuid, input.authorId)),
          })),
        })
        .run(edgedb),
    ),
  ),
)

const update = p.optional.input(zUpdatePostInput).mutation(async ({ input }) =>
  E.tagEdgedb.flatMap((edgedb) =>
    Effect.promise(
      e
        .update(e.Post, () => ({
          set: input,
        }))
        .run(edgedb),
    ),
  ),
)

const _delete = p.optional.input(zIdInput).mutation(async ({ input: { id } }) =>
  E.tagEdgedb.flatMap((edgedb) =>
    Effect.promise(
      e
        .delete(e.Post, (p) => ({
          filter_single: e.op(p.id, '=', e.cast(e.uuid, id)),
        }))
        .run(edgedb),
    ),
  ),
)
