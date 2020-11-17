from rest_framework import routers
from .api import PostViewset

router = routers.DefaultRouter()
router.register('api/posts', PostViewset, 'posts')

urlpatterns = router.urls