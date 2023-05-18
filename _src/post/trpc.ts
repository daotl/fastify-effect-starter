import * as E from '~/edgedb/index.js'

import { sIdInput, sListInput } from '~/trpc/crud.js'
import { p, t } from '~/trpc/trpc.js'
import { toCreateSchema, toUpdateSchema } from '~/utils/effectSchema.js'
import { postSchema } from '~/models/generated/interfaces.schema.js'

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
    test,
  })

const count = p.optional
  .input(Schema.parse(zPostListInput))
  .query(({ input }) =>
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

const list = p.optional.input(Schema.parse(zPostListInput)).query(({ input }) =>
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

const listWithTotal = p.optional
  .input(Schema.parse(zPostListInput))
  .query(({ input }) => {
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

const get = p.optional
  .input(Schema.parse(sIdInput))
  .query(({ input: { id } }) =>
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

const create = p.optional
  .input(Schema.parse(toCreateSchema(postSchema)))
  .mutation(async ({ input }) =>
    E.tagEdgedb.flatMap((edgedb) =>
      Effect.promise(
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
  .input(Schema.parse(toUpdateSchema(postSchema)))
  .mutation(async ({ input }) =>
    E.tagEdgedb.flatMap((edgedb) =>
      Effect.promise(
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
  .input(Schema.parse(sIdInput))
  .mutation(async ({ input: { id } }) =>
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

// {
//   title: 'DAOT Labs',
//   content: {
//     value: 'h',
//     op: 'contains',
//   },
//   author: {
//     op: 'all',
//     value: {
//       name: 'Marie',
//       role: {
//         op: '=',
//         value: 'user',
//         cast: 'str',
//       },
//     },
//   },
// }

const test = p.optional
  .input(
    Schema.parse(
      Schema.struct({
        title: Schema.string,
        content: E.sStrContains,
        author: Schema.struct({
          op: Schema.literal('all'),
          value: Schema.struct({
            name: Schema.string,
            role: E.sStrEqual,
          }),
        }),
      }),
    ),
  )
  .query(({ input }) => {
    return E.tagEdgedb.flatMap((edgedb) => {
      return Effect.promise(
        e
          .select(e.Post, (p) => ({
            ...e.Post['*'],
            author: { ...e.User['*'] },
            filter: E.genFilterQuery(p, input),
            // filter_single: { id: '' },
          }))
          .run(edgedb),
      )
    })
  })
