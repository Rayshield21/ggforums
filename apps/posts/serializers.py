from rest_framework import serializers
from .models import Post, PostImages
from PIL import Image
class PostImagesSerializer(serializers.ModelSerializer):
  image = serializers.ImageField()
  image_file_str = serializers.SerializerMethodField(method_name='to_file_str')

  def to_file_str(self, obj):
    file = obj.image
    return '{}'.format(file)
  class Meta:
    model = PostImages
    fields = ('image', 'image_file_str')
class PostSerializer(serializers.ModelSerializer):
  post_images = PostImagesSerializer(many=True, required=False)
  author = serializers.StringRelatedField()
  class Meta:
    model = Post
    fields = ('id', 'author', 'title', 'message', 'post_images', 'author')

  def create(self, validated_data):
    images_data = self.context.get('request').data
    post = Post.objects.create(**validated_data)
    for image_data in images_data.getlist('post_images'):
      PostImages.objects.create(post=post, image=image_data)
    return post

  def update(self, instance, validate_data):
    images_data = self.context.get('request').data
    instance.title = validate_data.get('title', instance.title)
    instance.message = validate_data.get('message', instance.message)
    instance_images = PostImages.objects.filter(post=instance)
    instance.save()

    for image_data in images_data.getlist('post_images'):
      if image_data:
        PostImages.objects.get_or_create(post=instance, image=image_data)
      else:
        instance_images.delete()

    return instance
