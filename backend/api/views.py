from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status


@api_view(['GET'])
def api_root(request):
    """
    API Root - Información general de la API
    """
    return Response({
        'message': 'Bienvenido a la API de Chapatuchamba',
        'version': '1.0.0',
        'endpoints': {
            'health': '/api/health/',
            'admin': '/admin/',
        }
    })


@api_view(['GET'])
def health_check(request):
    """
    Health Check endpoint
    """
    return Response({
        'status': 'healthy',
        'message': 'API funcionando correctamente'
    }, status=status.HTTP_200_OK)

