import React from 'react'

const LlamaImage = ({ 
  imageSrc = "/images/LLAMA FELIZ.png",
  altText = "Llama feliz",
  className = "",
  circleClassName = "",
  imageClassName = "",
  showCircle = true
}) => {
  return (
    <div className={`w-full max-w-sm relative ${className}`}>
      {/* Círculo amarillo de fondo */}
      {showCircle && (
        <div className={`absolute transform left-[10%] w-[80%] h-[80%] bg-secondary-500 rounded-full ${circleClassName}`}></div>
      )}
      
      <img 
        src={imageSrc} 
        alt={altText} 
        className={`w-full h-auto rounded-lg relative z-10 ${imageClassName}`}
        onError={(e) => {
          // Fallback placeholder
          e.target.parentElement.innerHTML = `
            <div class="w-full max-w-sm relative">
              ${showCircle ? '<div class="absolute left-[10%] w-[80%] h-[80%] bg-secondary-500 rounded-full"></div>' : ''}
              <div class="w-full h-80 bg-linear-to-br from-primary-100 to-secondary-100 rounded-lg flex items-center justify-center relative z-10">
                <div class="text-center">
                  <div class="w-16 h-16 bg-primary-700 rounded-full flex items-center justify-center mx-auto mb-4">
                    <svg class="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"></path>
                    </svg>
                  </div>
                  <p class="text-primary-700 font-medium">Imagen de Llama</p>
                </div>
              </div>
            </div>
          `;
        }}
      />
    </div>
  )
}

export default LlamaImage