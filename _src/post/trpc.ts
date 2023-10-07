import * as E from '~/edgedb/index.js'

import { postSchema } from '~/models/generated/interfaces.schema.js'
import { sIdInput, sListInput } from '~/trpc/crud.js'
import { p, t } from '~/trpc/trpc.js'
import { toCreateSchema, toUpdateSchema } from '~/utils/effectSchema.js'

export const zPostListInput = pipe(
  sListInput,
  Schema.extend(
    Schema.struct({
      filter: postSchema,
    }),
  ),
)

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

const count = p.optional
  .input(Schema.parseSync(zPostListInput))
  .query(({ input }) =>
    E.tagEdgedb.flatMap((edgedb) =>
      Effect.promise(() =>
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

const list = p.optional
  .input(Schema.parseSync(zPostListInput))
  .query(({ input }) =>
    E.tagEdgedb.flatMap((edgedb) =>
      Effect.promise(() =>
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

const listWithTotal = p.optional
  .input(Schema.parseSync(zPostListInput))
  .query(({ input }) => {
    const shape = {
      ...e.Post['*'],
      ...input,
      filter: E.filterPropsEqual(e.Post, input.filter),
    }
    return E.tagEdgedb.flatMap((edgedb) =>
      Effect.promise(() =>
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

const get = p.optional
  .input(Schema.parseSync(sIdInput))
  .query(({ input: { id } }) =>
    E.tagEdgedb.flatMap((edgedb) =>
      Effect.promise(() =>
        e
          .select(e.Post, (p) => ({
            filter_single: e.op(p.id, '=', e.cast(e.uuid, id)),
            ...e.Post['*'],
          }))
          .run(edgedb),
      ),
    ),
  )

const create = p.optional
  .input(Schema.parseSync(toCreateSchema(postSchema)))
  .mutation(async ({ input }) =>
    E.tagEdgedb.flatMap((edgedb) =>
      Effect.promise(() =>
        e
          .insert(e.Post, {
            ...R.omit(input, [
              'author',
              'categories',
              'viewerGroups',
              'editorGroups',
              'viewers',
              'editors',
            ]),
            author: e.select(e.User, (u) => ({
              filter_single: e.op(u.id, '=', e.cast(e.uuid, input.author.id)),
            })),
          })
          .run(edgedb),
      ),
    ),
  )

const update = p.optional
  .input(Schema.parseSync(toUpdateSchema(postSchema)))
  .mutation(async ({ input }) =>
    E.tagEdgedb.flatMap((edgedb) =>
      Effect.promise(() =>
        e
          .update(e.Post, () => ({
            set: R.omit(input, [
              'author',
              'categories',
              'viewerGroups',
              'editorGroups',
              'viewers',
              'editors',
            ]),
          }))
          .run(edgedb),
      ),
    ),
  )

const _delete = p.optional
  .input(Schema.parseSync(sIdInput))
  .mutation(async ({ input: { id } }) =>
    E.tagEdgedb.flatMap((edgedb) =>
      Effect.promise(() =>
        e
          .delete(e.Post, (p) => ({
            filter_single: e.op(p.id, '=', e.cast(e.uuid, id)),
          }))
          .run(edgedb),
      ),
    ),
  )
