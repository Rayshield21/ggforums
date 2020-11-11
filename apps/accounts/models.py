from django.db import models
from django.contrib.auth import get_user_model
from django.db.models.signals import post_save
from django.dispatch import receiver
# Create your models here.

User = get_user_model();

class Profile(models.Model):
  user = models.OneToOneField(User, on_delete=models.CASCADE, related_name='profile', unique=True)
  first_name = models.CharField(blank=True, max_length=255)
  last_name = models.CharField(blank=True, max_length=255)
  bio = models.TextField(blank=True)
  avatar = models.ImageField(null=True, blank=True, upload_to='profile_pics/')

@receiver(post_save, sender=User)
def update_user_profile(sender, instance, created, **kwargs):
    if created:
        Profile.objects.create(user=instance)

post_save.connect(update_user_profile, sender=User)