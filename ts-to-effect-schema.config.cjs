/**
 * ts-to-zod configuration.
 *
 * @type {import("ts-to-effect-schema").TsToEffectSchemaConfig}
 */
module.exports = [
  {
    name: 'edgedb',
    input: '_src/models/generated/interfaces.ts',
    output: '_src/models/generated/interfaces.schema.ts',
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
        'Group',
        'GroupRole',
      ].includes(n),
  },
]
