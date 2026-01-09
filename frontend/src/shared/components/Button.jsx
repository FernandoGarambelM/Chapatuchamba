import React from 'react'
import { Link } from 'react-router-dom'

export default function Button({ 
  children, 
  to, 
  onClick, 
  variant = 'primary', 
  size = 'medium',
  className = '',
  disabled = false,
  type = 'button',
  ...props 
}) {
  // Variantes de colores predeterminadas
  const variants = {
    primary: 'bg-primary-900 hover:bg-primary-800 text-neutral-50 hover:text-neutral-100',
    secondary: 'bg-secondary-500 hover:bg-secondary-600 text-primary-900 hover:text-primary-950',
    neutral: 'bg-transparent border-2 border-primary-900 text-primary-900 hover:bg-neutral-200 hover:text-primary-900'
  }

  // Tamaños predeterminados
  const sizes = {
    small: 'px-3 py-1.5 text-xs',
    medium: 'px-4 py-2 text-sm',
    large: 'px-6 py-3 text-base'
  }

  // Clases base del botón
  const baseClasses = 'font-medium rounded-md transition-colors duration-200 inline-flex items-center justify-center focus:outline-none focus:ring-2 focus:ring-secondary-500 focus:ring-offset-2'
  
  // Clases para disabled
  const disabledClasses = disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'

  // Combinar todas las clases
  const buttonClasses = `${baseClasses} ${variants[variant]} ${sizes[size]} ${disabledClasses} ${className}`

  // Si tiene prop 'to', renderizar como Link de React Router
  if (to) {
    return (
      <Link
        to={to}
        className={buttonClasses}
        {...props}
      >
        {children}
      </Link>
    )
  }

  // Si no, renderizar como button normal
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={buttonClasses}
      {...props}
    >
      {children}
    </button>
  )
}