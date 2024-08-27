const JS_INDENT = 2

export function changeLocation(content: Buffer, filename: string): Buffer {
  const manifest: Manifest = JSON.parse(content.toString())

  manifest.location = Object.keys(manifest.location).reduce((acc: Record<string, Record<string, { url: string }>>, key: string) => {
    const app = manifest.location[key]

    const appLocations = Object.keys(app).reduce((acc, key) => {
      const value = app[key]
      return { ...acc, [key]: { ...value, url: process.env.VITE_ZENDESK_LOCATION } }
    }, {})

    return { ...acc, [key]: appLocations }
  }, {})

  const manifestOutput: Manifest = {
    _warning: `AUTOMATICALLY GENERATED FROM $/src/${filename} - DO NOT MODIFY THIS FILE DIRECTLY`,
    ...manifest
  }

  return Buffer.from(JSON.stringify(manifestOutput, null, JS_INDENT))
}

interface Manifest {
  _warning?: string
  defaultLocale?: string
  location: Record<string, Record<string, { url: string }>>
  parameter?: Record<string, string>
}
