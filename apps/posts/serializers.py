from rest_framework import serializers
from .models import Post, PostImages

class PostImagesSerializer(serializers.ModelSerializer):
  class Meta:
    model = PostImages
    fields = ('image',)
class PostSerializer(serializers.ModelSerializer):
  post_images = PostImagesSerializer(many=True, required=False)
  author = serializers.StringRelatedField()
  class Meta:
    model = Post
    fields = '__all__'

  def create(self, validated_data):
    images_data = self.context.get('request').FILES
    print(images_data)
    post = Post.objects.create(**validated_data)
    for image_data in images_data.getlist('post_images'):
      PostImages.objects.create(post=post, image=image_data)
    return post

