import React from 'react'
import { Link } from 'react-router-dom'
import { default as Button } from './Button'

const ChallengeCard = ({ 
  challenge, 
  variant = 'card', // 'card' o 'list'
  className = '' 
}) => {
  // Mapear tanto la estructura antigua como la nueva de la API
  const {
    id,
    company = challenge.companyName, // Soporte para ambas estructuras
    companyName,
    title,
    description,
    category = challenge.status, // Usar status como category por defecto
    technology = 'Challenge', // Valor por defecto
    prize = 'Por definir', // Valor por defecto
    opportunityType = challenge.status,
    gradient,
    icon,
    startDate,
    endDate,
    status
  } = challenge

  // Determinar valores finales
  const finalCompany = companyName || company
  const finalCategory = category || status || 'ACTIVE'
  const finalIcon = icon || '<svg fill="currentColor" viewBox="0 0 20 20"><path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3z"/></svg>'

  // Función para formatear fechas
  const formatDate = (dateString) => {
    if (!dateString) return ''
    const date = new Date(dateString)
    return date.toLocaleDateString('es-ES', { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric' 
    })
  }

  // Variante normal (card) - sin imagen
  if (variant === 'card') {
    return (
      <div className={`bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow ${className}`}>
        <div className="p-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 bg-secondary-500 rounded-full flex items-center justify-center shrink-0">
              <div className="w-6 h-6 text-primary-900" dangerouslySetInnerHTML={{ __html: finalIcon }} />
            </div>
            <span className="text-sm font-semibold text-primary-600 bg-neutral-100 px-3 py-1 rounded-full">
              {finalCategory}
            </span>
          </div>
          
          <div className="mb-3">
            <h4 className="text-sm font-semibold text-primary-600 mb-1">
              {finalCompany}
            </h4>
            <h3 className="text-xl font-bold text-primary-900">
              {title}
            </h3>
          </div>
          <p className="text-primary-700 mb-4">
            {description}
          </p>
          <div className="flex flex-wrap items-center gap-2 text-sm text-primary-600 mb-4">
            {startDate && (
              <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded">
                Inicio: {formatDate(startDate)}
              </span>
            )}
            {endDate && (
              <span className="bg-red-100 text-red-800 px-2 py-1 rounded">
                Fin: {formatDate(endDate)}
              </span>
            )}
            <span className="bg-secondary-500 text-primary-900 px-2 py-1 rounded text-xs font-bold">
              {status || opportunityType || 'ACTIVE'}
            </span>
          </div>
          <Link to={`/retos/${id}`}>
            <Button variant="primary" size="small" className="w-full flex ">
              Ver Detalles
            </Button>
          </Link>
        </div>
      </div>
    )
  }

  // Variante listado (list) - sin imagen, más estirada horizontalmente
  if (variant === 'list') {
    return (
      <div className={`bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow ${className}`}>
        <div className="p-6">
          <div className="flex justify-between items-start mb-3">
            <div className="flex items-center gap-3 flex-1 mr-4">
              <div className="w-10 h-10 bg-secondary-500 rounded-full flex items-center justify-center shrink-0">
                <div className="w-5 h-5 text-primary-900" dangerouslySetInnerHTML={{ __html: finalIcon }} />
              </div>
              <div>
                <h4 className="text-xs font-semibold text-primary-600">
                  {finalCompany}
                </h4>
                <h3 className="text-lg font-bold text-primary-900">
                  {title}
                </h3>
                <span className="text-xs font-semibold text-primary-600 bg-neutral-100 px-2 py-1 rounded-full">
                  {finalCategory}
                </span>
              </div>
            </div>
            <div className="flex gap-2">
              {startDate && (
                <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-sm">
                  {formatDate(startDate)}
                </span>
              )}
              <span className="bg-secondary-500 text-primary-900 px-2 py-1 rounded text-xs font-bold">
                {status || opportunityType || 'ACTIVE'}
              </span>
            </div>
          </div>
          
          <p className="text-primary-700 mb-4 line-clamp-2">
            {description}
          </p>
          
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              {endDate && (
                <span className="bg-red-100 text-red-800 px-2 py-1 rounded text-sm">
                  Fin: {formatDate(endDate)}
                </span>
              )}
            </div>
            <Link to={`/retos/${id}`}>
              <Button variant="primary" size="small">
                Ver Detalles
              </Button>
            </Link>
          </div>
        </div>
      </div>
    )
  }

  return null
}

export default ChallengeCard