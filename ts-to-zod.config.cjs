/**
 * ts-to-zod configuration.
 *
 * @type {import("ts-to-zod").TsToZodConfig}
 */
module.exports = [
  {
    name: 'edgedb',
    input: '_src/models/generated/interfaces.ts',
    output: '_src/models/generated/interfaces.zod.ts',
    nameFilter: (n) =>
      [
        'StdBaseObject',
        'StdObject',
        'Base',
        'Category',
        'Post',
        'Profile',
        'Role',
        'User',
      ].includes(n),
  },
]
