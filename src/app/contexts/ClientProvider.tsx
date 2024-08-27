import { useMemo, useState, useEffect, createContext } from 'react'
import { Client } from '../../types.ts'

export const ClientContext = createContext<Client | null>(null)

declare const ZAFClient: {
  init: () => Client
}

const ClientProvider =({ children }:{children: React.ReactNode}) => {
  const client = useMemo(() => ZAFClient.init(), [])
  const [appRegistered, setAppRegistered] = useState(false)

  useEffect(() => {
    client.on('app.registered', function () {
      setAppRegistered(true)
    })
  }, [client])

  if (!appRegistered) return null

  return <ClientContext.Provider value={client}>{children}</ClientContext.Provider>
}

export default ClientProvider
