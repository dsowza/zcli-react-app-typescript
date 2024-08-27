import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import ClientProvider from './contexts/ClientProvider.tsx'
import '@zendeskgarden/css-bedrock'
import './index.css'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <ClientProvider>
    <App />
  </ClientProvider>
)
