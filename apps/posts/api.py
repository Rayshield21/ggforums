from rest_framework import viewsets, permissions
from rest_framework.parsers import FormParser, MultiPartParser
from .serializers import PostSerializer, PostImagesSerializer
from .models import Post

class PostViewset(viewsets.ModelViewSet):
  serializer_class = PostSerializer
  parser_classes = (FormParser, MultiPartParser)

  def get_queryset(self):
    queryset = Post.objects.all()
    return queryset

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