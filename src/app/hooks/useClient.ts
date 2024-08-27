import { useContext, useState, useEffect } from 'react'
import { ClientContext } from '../contexts/ClientProvider.js'

export const useClient = () => {
  const ctx = useContext(ClientContext)

  if (!ctx) {
    throw new Error('useClient must be used within a ClientProvider')
  }

  return ctx
}

export const useLocation = () => {
  const [location, setLocation] = useState<string>('default')
  const client = useClient()

  useEffect(() => {
    client.context().then((data) => {
      setLocation(data.location)
    })
  }, [setLocation, client])

  return location
}
