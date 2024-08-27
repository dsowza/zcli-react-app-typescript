import { Plugin } from 'rollup'
import fs from 'fs/promises'
import path from 'path'
import { flatten } from 'flat'

export default function TranslationsLoader(): Plugin {
  return {
    name: 'translations-loader',
    async transform(_, id) {
      if (id.endsWith('.json') && path.resolve(id).includes(path.resolve(__dirname, '../src/translations'))) {
        const contentFile = await fs.readFile(id, 'utf-8')
        const translations = JSON.parse(contentFile)

        return {
          code: `export default ${JSON.stringify(flatten(translations))};`,
          map: null
        }
      }
      return null
    }
  }
}
