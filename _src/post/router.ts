import edgeqlJs from 'edgeql-js'

import * as E from '~/edgedb/index.js'
import {
  zCreatePostInput,
  zPostFilter,
  zUpdatePostInput,
} from '~/models/zod.js'
import { zIdInput, zListInput } from '~/trpc/crud.js'
import { p, t } from '~/trpc/trpc.js'

// TODO: Get from Effect context
const edgedb = edgeqlJs.createClient().withConfig({
  allow_user_specified_id: true,
})

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
  e
    .count(
      e.select(e.Post, (_p) => ({
        ...input,
        filter: E.filterPropsEqual(e.Post, input.filter),
      })),
    )
    .run(edgedb),
)

const list = p.optional.input(zPostListInput).query(({ input }) =>
  e
    .select(e.Post, (_p) => ({
      ...input,
      filter: E.filterPropsEqual(e.Post, input.filter),
      ...e.Post['*'],
    }))
    .run(edgedb),
)

const listWithTotal = p.optional.input(zPostListInput).query(({ input }) => {
  const shape = {
    ...e.Post['*'],
    ...input,
    filter: E.filterPropsEqual(e.Post, input.filter),
  }
  return e
    .select({
      total: e.count(
        e.select(e.Post, (_) => R.omit(['offset', 'limit'])(shape)),
      ),
      data: e.select(e.Post, (_) => shape),
    })
    .run(edgedb)
})

const get = p.optional.input(zIdInput).query(({ input: { id } }) =>
  e
    .select(e.Post, (p) => ({
      filter_single: e.op(p.id, '=', e.cast(e.uuid, id)),
      ...e.Post['*'],
    }))
    .run(edgedb),
)

const create = p.optional.input(zCreatePostInput).mutation(async ({ input }) =>
  e
    .insert(e.Post, {
      ...input,
      author: e.select(e.User, (u) => ({
        filter_single: e.op(u.id, '=', e.cast(e.uuid, input.authorId)),
      })),
    })
    .run(edgedb),
)

const update = p.optional.input(zUpdatePostInput).mutation(async ({ input }) =>
  e
    .update(e.Post, () => ({
      set: input,
    }))
    .run(edgedb),
)

const _delete = p.optional.input(zIdInput).mutation(async ({ input: { id } }) =>
  e
    .delete(e.Post, (p) => ({
      filter_single: e.op(p.id, '=', e.cast(e.uuid, id)),
    }))
    .run(edgedb),
)
