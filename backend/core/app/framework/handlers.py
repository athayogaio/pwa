from rest_framework.generics import GenericAPIView
from rest_framework.views import APIView

from core.app.framework.serializers import UnimplementedSerializer


class Handler(APIView):
    serializer_class = UnimplementedSerializer
    ...


class GenericHandler(GenericAPIView):
    ...
