from rest_framework import serializers
from django.contrib.auth import get_user_model
from django.contrib.auth import authenticate
from django.contrib.auth.hashers import make_password
from .models import Profile

User = get_user_model()

# UserSerializer
class UserSerializer(serializers.ModelSerializer):
  class Meta:
    model = User
    fields = ('id', 'username', 'email')

# ProfileSerializer

class ProfileSerializer(serializers.ModelSerializer):
  user = UserSerializer()
  class Meta:
    model = Profile
    fields = '__all__'

class UpdateProfileSerializer(serializers.ModelSerializer):
  class Meta:
    model = Profile
    exclude = ('user','avatar')

# RegisterSerializer

class RegisterSerializer(serializers.ModelSerializer):
  class Meta:
    model = User
    fields = ('id', 'username', 'email', 'password')
    extra_kwargs = {'password': {'write_only': True}}

  def create(self, validated_data):
    user = User.objects.create(
      username=validated_data['username'],
      email=validated_data['email'], 
      password=make_password(validated_data['password']))
    user.save()
    return user

# LoginSerializer
class LoginSerializer(serializers.Serializer):
  username = serializers.CharField()
  password = serializers.CharField()

  def validate(self, data):
    user = authenticate(**data)

    if user and user.is_active:
      return user
    raise serializers.ValidationError('Incorrect Credentials')