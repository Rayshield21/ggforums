from rest_framework import viewsets, permissions, status
from rest_framework.response import Response
from rest_framework.parsers import FormParser, MultiPartParser
from .serializers import PostSerializer, PostImagesSerializer
from .models import Post

class PostViewset(viewsets.ModelViewSet):
  serializer_class = PostSerializer
  queryset = Post.objects.all()
  parser_classes = (FormParser,MultiPartParser)

  def get_permissions(self):
    if self.action == 'list' or self.action == 'detail':
      permission_classes = [permissions.AllowAny]
    else: 
      permission_classes = [permissions.IsAuthenticated]
    return [permission() for permission in permission_classes]

  def perform_create(self, serializer):  
    serializer.save(author=self.request.user)

  def perform_update(self, serializer):
    serializer.save(author=self.request.user)