#!/bin/bash

echo "🚀 Iniciando Chapatuchamba..."
echo ""

# Colores
GREEN='\033[0;32m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Función para manejar Ctrl+C
trap 'echo -e "\n\n🛑 Deteniendo servidores..."; pkill -f "manage.py runserver"; pkill -f "vite"; exit' INT

# Iniciar Backend
echo -e "${BLUE}🐍 Iniciando Backend Django...${NC}"
cd backend
source venv/bin/activate
python manage.py runserver &
BACKEND_PID=$!
cd ..

# Esperar a que el backend se inicie
sleep 3

# Iniciar Frontend
echo -e "${BLUE}⚛️  Iniciando Frontend React...${NC}"
cd frontend
npm run dev &
FRONTEND_PID=$!
cd ..

echo ""
echo -e "${GREEN}✅ Aplicación iniciada!${NC}"
echo ""
echo "📍 Frontend: http://localhost:5173"
echo "📍 Backend API: http://localhost:8000/api/"
echo "📍 Django Admin: http://localhost:8000/admin/"
echo ""
echo "Presiona Ctrl+C para detener los servidores"

# Mantener el script corriendo
wait
