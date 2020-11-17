from rest_framework import serializers
from .models import Post, PostImages

class PostSerializer(serializers.ModelSerializer):
  post_images = PostImagesSerializer(many=False,
    queryset = Post.post_images.all()
  )
  class Meta:
    model = Post
    fields = '__all__'

class PostImagesSerializer(serializers.ModelSerializer):
  class Meta:
    model = PostImages
    fields = '__all__'