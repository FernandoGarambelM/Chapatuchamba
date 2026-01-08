import React from 'react'

export function ButtonPlaceholder({ children, onClick }) {
  return (
    <button onClick={onClick} style={{padding: '8px 12px', borderRadius: 4}}>
      {children}
    </button>
  )
}

export default function SharedComponentsPlaceholder() {
  return (
    <div>
      <h2>Shared — Components (placeholder)</h2>
    </div>
  )
}
