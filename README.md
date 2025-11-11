# Chapatuchamba

Aplicación web con React (Frontend) y Django (Backend)

## Estructura del Proyecto

```
Chapatuchamba/
├── frontend/          # React + Vite + Tailwind CSS
├── backend/           # Django + Django REST Framework
└── README.md
```

## Requisitos

- Python 3.10+
- Node.js 18+
- npm o yarn

## Configuración del Backend (Django)

```bash
cd backend

# Crear y activar entorno virtual
python -m venv venv
source venv/bin/activate  # En Windows: venv\Scripts\activate

# Instalar dependencias
pip install -r requirements.txt

# Ejecutar migraciones
python manage.py migrate

# Crear superusuario (opcional)
python manage.py createsuperuser

# Iniciar servidor de desarrollo
python manage.py runserver
```

El backend estará disponible en: `http://localhost:8000`

## Configuración del Frontend (React)

```bash
cd frontend

# Instalar dependencias
npm install

# Iniciar servidor de desarrollo
npm run dev
```

El frontend estará disponible en: `http://localhost:5173`

## Desarrollo

1. Inicia el backend en una terminal: `cd backend && python manage.py runserver`
2. Inicia el frontend en otra terminal: `cd frontend && npm run dev`
3. Accede a `http://localhost:5173` para ver la aplicación

## Tecnologías

### Frontend
- React 19
- Vite
- Tailwind CSS v4
- ESLint

### Backend
- Django 5.2
- Django REST Framework
- django-cors-headers
- SQLite (desarrollo)

## API

La API REST está disponible en `http://localhost:8000/api/`

## Producción

### Build del Frontend
```bash
cd frontend
npm run build
```

### Configurar Django para producción
- Cambiar `DEBUG = False` en settings.py
- Configurar `ALLOWED_HOSTS`
- Usar base de datos de producción (PostgreSQL)
- Configurar archivos estáticos y media
