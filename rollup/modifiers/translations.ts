const marketplaceKeys = [
  'name',
  'description',
  'short_description',
  'long_description',
  'installation_instructions',
  'parameters'
]

type MarketplaceTranslation = {
  _warning: string
  app: {
    [key in typeof marketplaceKeys[number]]?: string
  }
}

const JS_INDENT = 2

export function extractMarketplaceTranslation(content: Buffer, filename: string): Buffer {
  const translations = JSON.parse(content.toString())

  console.log('testemarket')

  const translationsOutput: MarketplaceTranslation = {
    _warning: `AUTOMATICALLY GENERATED FROM $/src/translations/${filename} - DO NOT MODIFY THIS FILE DIRECTLY`,
    app: {}
  }

  marketplaceKeys.forEach((key) => {
    if (translations.app[key]) translationsOutput.app[key] = translations.app[key]
  })

  return Buffer.from(JSON.stringify(translationsOutput, null, JS_INDENT))
}
