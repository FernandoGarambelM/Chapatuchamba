import React from 'react'

export function ChallengeCardPlaceholder({ challenge }) {
  return (
    <div style={{border: '1px solid #ddd', padding: 12, borderRadius: 6}}>
      <h3>{challenge?.title ?? 'Challenge title'}</h3>
      <p>{challenge?.summary ?? 'Resumen del challenge'}</p>
    </div>
  )
}

export default function ChallengesComponentsPlaceholder() {
  return (
    <div>
      <h2>Challenges — Components (placeholder)</h2>
    </div>
  )
}
