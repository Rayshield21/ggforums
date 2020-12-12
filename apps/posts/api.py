from rest_framework import viewsets, permissions, status
from rest_framework.response import Response
from rest_framework.parsers import FormParser, MultiPartParser
from .serializers import PostSerializer, PostImagesSerializer
from .models import Post

class PostViewset(viewsets.ModelViewSet):
  serializer_class = PostSerializer
  queryset = Post.objects.all()
  parser_classes = (FormParser,MultiPartParser)
  permission_classes = [permissions.IsAuthenticatedOrReadOnly]

  def perform_create(self, serializer):  
    serializer.save(author=self.request.user)

  def perform_update(self, serializer):
    serializer.save(author=self.request.user)