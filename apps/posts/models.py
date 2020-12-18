from django.db import models
from django.conf import settings
from django.contrib.auth.models import User
# Create your models here.
class Post(models.Model):
  title = models.CharField(max_length=255, unique=True)
  message = models.TextField()
  author = models.ForeignKey(User, on_delete=models.CASCADE, related_name='posts')
  created_at = models.DateTimeField(auto_now_add=True)
  class Meta:
    ordering = ['created_at']

class PostImages(models.Model):
  post = models.ForeignKey(Post, on_delete=models.CASCADE, related_name='post_images')
  image = models.ImageField(blank=True, null=True, upload_to='post_images')

  def __str__(self):
    return self.image