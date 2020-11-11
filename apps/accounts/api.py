from rest_framework import generics, permissions, viewsets, parsers, exceptions
from rest_framework.response import Response
from knox.models import AuthToken
from .models import Profile
from PIL import Image
from django.shortcuts import get_object_or_404
from .serializers import (UserSerializer, RegisterSerializer, LoginSerializer, ProfileSerializer, UpdateProfileSerializer)

class ImageUploadParser(parsers.FileUploadParser):
  media_type = 'image/*';

# REGISTER

class RegisterAPI(generics.GenericAPIView):
  serializer_class = RegisterSerializer

  def post(self, request, *args, **kwargs):
    serializer = self.get_serializer(data=request.data)
    serializer.is_valid(raise_exception=True)
    user = serializer.save()
    return Response({
      "user": UserSerializer(user, context=self.get_serializer_context()).data,
      "token": AuthToken.objects.create(user)[1]
    })  

class LoginAPI(generics.GenericAPIView):
  serializer_class = LoginSerializer

  def post(self, request, *args, **kwargs):
    serializer = self.get_serializer(data=request.data)
    serializer.is_valid(raise_exception=True)
    user = serializer.validated_data
    return Response({
      "user": UserSerializer(user, context=self.get_serializer_context()).data,
      "token": AuthToken.objects.create(user)[1]
    })

class UserAPI(generics.RetrieveAPIView):
  permission_classes = [
    permissions.IsAuthenticated
  ]

  serializer_class = UserSerializer

  def get_object(self):
    return self.request.user

class ListProfileAPI(generics.ListAPIView):
  permission_classes = [
    permissions.AllowAny
  ]

  serializer_class = ProfileSerializer

  queryset = Profile.objects.all()

class ViewProfileAPI(generics.RetrieveAPIView):
  permission_classes = [
    permissions.AllowAny
  ]

  lookup_field = 'user'
  lookup_url_kwarg = 'username'
  serializer_class = ProfileSerializer

  def get_object(self, *args, **kwargs):
    return Profile.objects.get(user__username=self.kwargs['username'])

class EditProfileAPI(generics.UpdateAPIView):
  permission_classes = [
    permissions.AllowAny
  ]

  parser_class = (ImageUploadParser,)

  lookup_field = 'user'
  lookup_url_kwarg = 'username'
  serializer_class = UpdateProfileSerializer

  def get_object(self, *args, **kwargs):
    return get_object_or_404(Profile, user__username=self.kwargs['username'])

  # def put(self, request, *args, **kwargs):
  #   if 'file' not in request.data:
  #     raise exceptions.ParseError("Empty Content")

  #   f = request.data['file']

  #   try:
  #     img = Image.open(f)
  #     img.verify()
  #   except:
  #     raise exceptions.ParseError("Unsupported Image Type")

  #   Profile.avatar.save(f.name, f, save=True)
  #   return Response(status=status.HTTP_201_CREATED)