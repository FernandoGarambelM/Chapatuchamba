import React from 'react'
import { default as Button } from './Button'

const ChallengeCard = ({ 
  challenge, 
  variant = 'card', // 'card' o 'list'
  className = '' 
}) => {
  const {
    id,
    company,
    title,
    description,
    category,
    technology,
    prize,
    opportunityType,
    gradient,
    icon
  } = challenge

  // Variante normal (card) - sin imagen
  if (variant === 'card') {
    return (
      <div className={`bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow ${className}`}>
        <div className="p-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 bg-secondary-500 rounded-full flex items-center justify-center shrink-0">
              <div className="w-6 h-6 text-primary-900" dangerouslySetInnerHTML={{ __html: icon }} />
            </div>
            <span className="text-sm font-semibold text-primary-600 bg-neutral-100 px-3 py-1 rounded-full">
              {category}
            </span>
          </div>
          
          <div className="mb-3">
            <h4 className="text-sm font-semibold text-primary-600 mb-1">
              {company}
            </h4>
            <h3 className="text-xl font-bold text-primary-900">
              {title}
            </h3>
          </div>
          <p className="text-primary-700 mb-4">
            {description}
          </p>
          <div className="flex items-center justify-between text-sm text-primary-600 mb-4">
            <span className="bg-secondary-100 text-secondary-800 px-2 py-1 rounded">
              {technology}
            </span>
            <div className="flex gap-2">
              <span className="bg-primary-100 text-primary-800 px-2 py-1 rounded font-semibold">
                {prize}
              </span>
              <span className="bg-secondary-500 text-primary-900 px-2 py-1 rounded text-xs font-bold">
                {opportunityType}
              </span>
            </div>
          </div>
          <Button variant="primary" size="small" className="w-full flex ">
            Ver Detalles
          </Button>
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
                <div className="w-5 h-5 text-primary-900" dangerouslySetInnerHTML={{ __html: icon }} />
              </div>
              <div>
                <h4 className="text-xs font-semibold text-primary-600">
                  {company}
                </h4>
                <h3 className="text-lg font-bold text-primary-900">
                  {title}
                </h3>
                <span className="text-xs font-semibold text-primary-600 bg-neutral-100 px-2 py-1 rounded-full">
                  {category}
                </span>
              </div>
            </div>
            <div className="flex gap-2">
              <span className="bg-primary-100 text-primary-800 px-3 py-1 rounded text-sm font-semibold">
                {prize}
              </span>
              <span className="bg-secondary-500 text-primary-900 px-2 py-1 rounded text-xs font-bold">
                {opportunityType}
              </span>
            </div>
          </div>
          
          <p className="text-primary-700 mb-4 line-clamp-2">
            {description}
          </p>
          
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <span className="bg-secondary-100 text-secondary-800 px-2 py-1 rounded text-sm">
                {technology}
              </span>
            </div>
            <Button variant="primary" size="small">
              Ver Detalles
            </Button>
          </div>
        </div>
      </div>
    )
  }

  return null
}

export default ChallengeCard