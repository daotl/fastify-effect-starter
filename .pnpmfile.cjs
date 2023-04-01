// TODO: Write a marker to package.json instead?
const enforceSingleVersion = [
  '@effect/io',
  '@effect/stm',
  // Language service currently depends on them
  // "@fp-ts/core",
  '@effect/data',
  '@fp-ts/optic',
  '@effect-app/core',
  '@effect-app/infra-adapters',
  '@effect-app/schema',
  '@effect-app/infra',
  '@effect-app/prelude',
  '@effect-app/react',
  '@effect-app/vue',
  'vue',
  'date-fns',
]

function afterAllResolved(lockfile, context) {
  context.log(`Checking duplicate packages`)
  const packagesKeys = Object.keys(lockfile.packages)
  const found = {}
  for (let p of packagesKeys) {
    for (let x of enforceSingleVersion) {
      if (p.startsWith(`/${x}/`)) {
        if (found[x]) {
          found[x] += 1
        } else {
          found[x] = 1
        }
      }
    }
  }
  let msg = ''
  for (let p in found) {
    const count = found[p]
    if (count > 1) {
      msg += `${p} found ${count} times\n`
    }
  }
  if (msg) {
    throw new Error(msg)
  }
  return lockfile
}

module.exports = {
  hooks: {
    // Temporary disabled for causing errors for unknown reason:
    //   ERROR  @effect-app/prelude found 2 times
    //   @effect-app/infra-adapters found 2 times
    // afterAllResolved,
  },
}
