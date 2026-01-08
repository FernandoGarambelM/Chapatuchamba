// Hooks reutilizables relacionados con auth (useAuth, useSession, etc.)
import { useState, useEffect } from 'react'

export function useAuthPlaceholder() {
  const [user, setUser] = useState(null)
  useEffect(() => {
    // placeholder: cargar usuario desde storage o API
  }, [])
  return { user, setUser }
}
