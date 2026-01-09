// Utilidades compartidas

export function formatDate(date) {
  try {
    return new Date(date).toLocaleString()
  } catch (e) {
    return String(date)
  }
}

export async function apiFetch(url, options = {}) {
  // placeholder: envolver fetch con headers, auth, baseUrl, manejo de errores
  const res = await fetch(url, options)
  if (!res.ok) throw new Error(`HTTP ${res.status}`)
  return res.json()
}
