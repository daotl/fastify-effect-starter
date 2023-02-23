import 'module-alias/register'

import { createClient } from 'edgedb'
import { omit } from 'rambdax/immutable'

import { Config } from '~/auth/config'
import { default as e } from '~/edgedb/generated/edgeql-js/index.js'
import * as E from '~/edgedb/index.js'

const client = createClient().withConfig({
  allow_user_specified_id: true,
})

async function main(): Promise<void> {
  // const eu = new EdgedbUtil(client)
  // Examples:
  // const ex1 = await E.User.insertSelect(
  //   { name: '', email: '' },
  //   // { name: true, email: true },
  // ).run()
  // const ex2 = await E.User.updateSelect(
  //   () => ({ set: { name: '', email: '' } }),
  //   // { name: true, email: true },
  // ).run()
  // const ex3 = await E.User.updateSelect(
  //   () => ({ filter_single: { email: '' }, set: { name: '', email: '' } }),
  //   // { name: true, email: true },
  // ).run()
  // const ex4 = await E.User.upsertSelect(
  //   e.User.email,
  //   {
  //     email: 'nex@daot.io',
  //     name: 'Nex',
  //   },
  //   identity,
  //   // { name: true, email: true },
  // ).run()
  // const ex5 = await E.User.selectCount(() => ({
  //   offset: 100,
  //   limit: 10,
  //   ...e.User['*'],
  // })).run()

  const users = await Promise.all([
    E.User.upsert(
      e.User.email,
      {
        id: new Config().mockUserId,
        email: 'nex@daot.io',
        name: 'Nex',
      },
      omit<E.UpsertShape<typeof e.User>>('id'),
    ),
    E.User.upsert(e.User.email, {
      email: 'john@daot.io',
      name: 'John',
    }),
    E.User.upsert(e.User.email, {
      email: 'marie@daot.io',
      name: 'Marie',
    }),
  ])

  const posts = [
    {
      title:
        'EdgeDB is an open-source database designed as a spiritual successor to SQL and the relational paradigm.',
      content: 'https://www.edgedb.com/',
      published: true,
      author: users[0],
    },
    {
      title: 'tRPC——End-to-end typesafe APIs made easy.',
      content: 'https://trpc.io/',
      published: true,
      author: users[1],
    },
    {
      title: 'DAOT Labs',
      content: 'https://daot.io/',
      published: true,
      author: users[2],
    },
  ] as const

  await Promise.all([
    ...posts.map((p) =>
      // FIXME: Update author also. Currently if we don't omit `author`, there's an error:
      //   Error: Cannot extract repeated or aliased expression into 'WITH' block, expression or its aliases appear outside root scope
      E.Post.upsert(e.Post.title, p, omit<typeof p>('author')).run(client),
    ),
  ])
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  // eslint-disable-next-line @typescript-eslint/no-misused-promises
  .finally(async () => {
    await client.close()
  })
