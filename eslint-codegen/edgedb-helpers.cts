import fs from 'node:fs'

import type { Preset } from 'eslint-plugin-codegen'

const content = fs.readFileSync('src/edgedb/helpers/__template.ts').toString()

export const all: Preset<Record<string, never>> = ({
  meta,
  // options,
}) => content.replaceAll(
    '__MODEL__',
    meta.filename.split('/').pop()!.split('.')[0]!,
  )
