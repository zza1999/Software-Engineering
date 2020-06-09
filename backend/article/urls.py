from django.urls import path, include
from rest_framework.routers import DefaultRouter
from article import views
from article import log

router = DefaultRouter()
router.register(r'articles', views.ArticleViewSet)

urlpatterns = [
    path('', include(router.urls)),
    path('reception/check_RDR', log.check_RDR),
    path('reception/check_bill', log.check_bill),
    path('manager/check_report', log.check_report),

    path('reception/add_RDR', log.add_RDR),
    path('reception/add_bill', log.add_bill),
    path('manager/add_report', log.add_report)
]
