#!/bin/bash

echo "⚙️  Configurando el proyecto Chapatuchamba..."
echo ""

# Backend Setup
echo "🐍 Configurando Backend..."
cd backend

# Crear entorno virtual si no existe
if [ ! -d "venv" ]; then
    python -m venv venv
fi

# Activar entorno virtual e instalar dependencias
source venv/bin/activate
pip install -r requirements.txt

# Ejecutar migraciones
python manage.py migrate

echo ""
echo "¿Deseas crear un superusuario para Django Admin? (s/n)"
read -r response
if [[ "$response" =~ ^([sS][iI]|[sS])$ ]]; then
    python manage.py createsuperuser
fi

cd ..

# Frontend Setup
echo ""
echo "⚛️  Configurando Frontend..."
cd frontend

# Instalar dependencias
npm install

cd ..

echo ""
echo "✅ ¡Configuración completada!"
echo ""
echo "Para iniciar el proyecto ejecuta: ./start.sh"
echo "O manualmente:"
echo "  Backend:  cd backend && source venv/bin/activate && python manage.py runserver"
echo "  Frontend: cd frontend && npm run dev"
