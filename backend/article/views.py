from django.shortcuts import render
from rest_framework import viewsets
from article.serializers import ArticleSerializer
from article.models import Article


class ArticleViewSet(viewsets.ModelViewSet):
    queryset = Article.objects.all()
    serializer_class = ArticleSerializer
