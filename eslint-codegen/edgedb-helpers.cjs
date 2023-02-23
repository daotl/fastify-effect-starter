const fs = require('node:fs')

// import type { Preset } from 'eslint-plugin-codegen'

const content = fs.readFileSync('_src/edgedb/helpers/__template.ts').toString()

exports.all = ({
  meta,
  // options,
}) =>
  content.replaceAll('__MODEL__', meta.filename.split('/').pop().split('.')[0])
