# -* coding:utf-8 -*

import requests
import json
import sys
import logging
import request
from article import DBF
from django.shortcuts import render
from rest_framework import viewsets
import time

def check_RDR(request):                         #打印详单
    room_id = int(request.POST['room_id'])
    messages=DBF.check_RDR(room_id)
    return render(request, 'xxxx.html',context={'data':messages})

def check_bill(request):                        #打印账单
    room_id=int(request.POST['room_id'])
    messages = DBF.check_bill(room_id)
    return render(request, 'xxxx.html', context={'data':messages})

def check_report(request):                      #查看报表
    room_id = request.POST['room_id']   #room_id:list
    messages = []
    for i in range(room_id):
        j = int(room_id[i])
        mess = DBF.check_report(j)
        messages.append(mess)
    return render(request, 'xxxx.html', context={'data':messages})

def add_RDR(request):                           #增加详单
    room_id, speed, rate, start_time, end_time, dur_cost = int(request.POST['room_id']), int(request.POST['speed']), float(request.POST['rate']), str(request.POST['start_time']), str(request.POST['end_time']), float(request.POST['dur_cost'])
    DBF.add_RDR(room_id, speed, rate, start_time, end_time, dur_cost)
    return render(request, 'xxxx.html')

def add_bill(request):                          #增加订单
    room_id, check_in_time, check_out_time, cost = int(request.POST['room_id']), str(request.POST['check_in_time']), str(request.POST['check_out_time']), float(request.POST['cost'])
    DBF.add_bill(room_id, check_in_time, check_out_time, cost)
    return render(request, 'xxxx.html')

def add_report(request):                          #增加报表
    room_id,times_of_on,duration,total_fee,times_of_dispatch, number_of_RDR, times_of_change_temp,times_of_change_speed = int(request.POST['room_id']), int(request.POST['times_of_on']), int(request.POST['duration']), float(request.POST['total_fee']), int(request.POST['times_of_dispatch']), int(request.POST['number_of_RDR']), int(request.POST['times_of_change_temp']), int(request.POST['times_of_change_speed'])
    DBF.add_report(room_id,times_of_on,duration,total_fee,times_of_dispatch,number_of_RDR,times_of_change_temp,times_of_change_speed)
    return render(request, 'xxxx.html')


