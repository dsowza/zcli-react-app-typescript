import { createContext, useState, useEffect, useCallback } from 'react'
import { useClient } from '../hooks/useClient'
import { UserContext } from '../../types.ts'
import I18n from '../../lib/i18n.ts'

const i18n = new I18n()

type LoadContextType = {
  i18n: I18n
  setLocale: (currentLocale: string) => void
}
export const TranslationContext = createContext<LoadContextType | null>(null)

const TranslationProvider = ({ children }: { children: React.ReactNode }) => {
  const client = useClient()
  const [locale, setLocale] = useState('')
  const [loading, setLoading] = useState(true)

  const loadTranslations = useCallback(
    async (currentLocale: string) => {
      const { currentUser }: { currentUser: UserContext } = await client.get('currentUser')

      const locale = currentLocale || currentUser.locale

      console.log(locale, currentUser)
      await i18n.loadTranslations(locale)

      setLoading(false)
    },
    [client]
  )

  useEffect(() => {
    loadTranslations(locale)
  }, [locale, loadTranslations])

  if (loading) return null

  return <TranslationContext.Provider value={{ i18n, setLocale }}>{children}</TranslationContext.Provider>
}

export default TranslationProvider
