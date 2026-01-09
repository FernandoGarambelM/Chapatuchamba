import React from 'react'

export {default as Navbar} from './Navbar'
export {default as Layout} from './Layout'
export {default as Button} from './Button'
export {default as Footer} from './Footer'
export {ChallengeCard} from './ChallengeCard'
export {default as LlamaImage} from './LlamaImage'

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
