import { createClient } from 'edgedb'

import { AuthConfig } from '../auth/config.js'

const client = createClient().withConfig({
  allow_user_specified_id: true,
})

const authConfig = AuthConfig.config.runSync$

async function main(): Promise<void> {
  const users = await Promise.all([
    e
      .insert(e.User, {
        id: authConfig.mockUserId,
        email: 'nex@daot.io',
        name: 'Nex',
      })
      .unlessConflict((_) => ({
        on: e.User.email,
        else: e.update(_, () => ({
          set: {
            email: 'nex@daot.io',
            name: 'Nex',
          },
        })),
      })),
    e
      .insert(e.User, {
        email: 'john@daot.io',
        name: 'John',
      })
      .unlessConflict((_) => ({
        on: e.User.email,
        else: e.update(_, () => ({
          set: {
            email: 'john@daot.io',
            name: 'John',
          },
        })),
      })),
    e
      .insert(e.User, {
        email: 'marie@daot.io',
        name: 'Marie',
      })
      .unlessConflict((_) => ({
        on: e.User.email,
        else: e.update(_, () => ({
          set: {
            email: 'marie@daot.io',
            name: 'Marie',
          },
        })),
      })),
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
  ]

  await Promise.all([
    ...posts.map((p) =>
      // FIXME: Update author also. Currently if we don't omit `author`, there's an error:
      //   Error: Cannot extract repeated or aliased expression into 'WITH' block, expression or its aliases appear outside root scope
      e
        .insert(e.Post, p)
        .unlessConflict((_) => ({
          on: e.Post.title,
          else: e.update(_, () => ({
            set: R.omit(['author'])(p),
          })),
        }))
        .run(client),
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
