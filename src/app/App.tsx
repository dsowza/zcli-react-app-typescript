import { JSX, lazy, Suspense } from 'react'
import { useLocation } from './hooks/useClient'
import { DEFAULT_THEME, ThemeProvider } from '@zendeskgarden/react-theming'
import TranslationProvider from './contexts/TranslationProvider.tsx'
import { AppLocation } from '../types.ts'

const TicketSideBar = lazy(() => import('./locations/TicketSideBar'))
const Modal = lazy(() => import('./locations/Modal'))
const Default = lazy(() => import('./locations/Default'))

const LOCATIONS: Partial<Record<AppLocation, React.LazyExoticComponent<() => JSX.Element>>> = {
  ticket_sidebar: TicketSideBar,
  modal: Modal
}

function App() {
  const location = useLocation()
  const Location = LOCATIONS[location] ?? Default

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
