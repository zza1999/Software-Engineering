from django.urls import path, include
from rest_framework.routers import DefaultRouter
from article import views


#router = DefaultRouter()
#router.register(r'articles', views.ArticleViewSet)

urlpatterns = [
    path('administrator/power_on', views.Open),
    path('administrator/power_off', views.Close),
    path('administrator/set_parameter', views.SetPara),
    path('administrator/start_up',views.StartUp),
    path('administrator/check_room_state',
         views.CheckRoomState),
    path('customer/room_request',views.RoomRequest),
    path('customer/power_on', views.PowerOn),
    path('customer/change_target_temp',
         views.ChangeTargetTemp),
    path('customer/change_target_speed',
         views.ChangeTargetSpeed),
    path('customer/get_temp_cost', views.GetTempCost),
    path('customer/power_off', views.PowerOff),
]
