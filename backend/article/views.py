from django.shortcuts import render
from django.http import HttpResponse
from article.serializers import ArticleSerializer
from article.models import Article


"""
urlSet(待定)
class ArticleViewSet(viewsets.ModelViewSet):
    queryset = Article.objects.all()
    serializer_class = ArticleSerializer
"""

#管理员
def Open():
     
def Close():
    
def SetPara():

def StartUp():

def CheckRoomState():
    
#顾客
def RoomRequest():
    
def PowerOn():
    
def ChangeTargetTemp():
    
def ChangeTargetSpeed():
    
def GetTempCost():
    
def PowerOff():
    
#调度，传给下一级Cost
def Schedule(): 