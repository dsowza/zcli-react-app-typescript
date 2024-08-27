import { lazy, Suspense } from 'react'
import { useLocation } from './hooks/useClient'
import { DEFAULT_THEME, ThemeProvider } from '@zendeskgarden/react-theming'
import TranslationProvider from './contexts/TranslationProvider.tsx'

const TicketSideBar = lazy(() => import('./locations/TicketSideBar'))
const Modal = lazy(() => import('./locations/Modal'))

const LOCATIONS = {
  ticket_sidebar: TicketSideBar,
  modal: Modal,
  default: () => null
}

function App() {
  const location = useLocation()
  const Location = location ? LOCATIONS[location as keyof typeof LOCATIONS] : LOCATIONS.default

  return (
    <ThemeProvider theme={{ ...DEFAULT_THEME }}>
      <TranslationProvider>
        <Suspense fallback={<span>Loading...</span>}>
          <Location />
        </Suspense>
      </TranslationProvider>
    </ThemeProvider>
  )
}

export default App
