import { useContext } from 'react'
import { TranslationContext } from '../contexts/TranslationProvider.js'

export function useI18n() {
  const ctx = useContext(TranslationContext)

  if (!ctx) {
    throw new Error('useI18n must be used within a TranslationProvider')
  }

  return ctx.i18n
}
