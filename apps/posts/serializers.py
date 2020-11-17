from rest_framework import serializers
from .models import Post, PostImages

class PostImagesSerializer(serializers.ModelSerializer):
  class Meta:
    model = PostImages
    fields = '__all__'
class PostSerializer(serializers.ModelSerializer):
  post_images = PostImagesSerializer(many=True)
  class Meta:
    model = Post
    fields = '__all__'

