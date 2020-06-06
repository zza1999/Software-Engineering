from django.shortcuts import HttpResponse, render, redirect
import pymysql

def get_temp_cost(request):
    global cost
    if request.method == 'GET':
        conn = pymysql.connect(host='127.0.0.1', port=3306, user='root', passwd='990929', db='test', charset='utf8')
        cursor = conn.cursor(cursor=pymysql.cursors.DictCursor)
        cursor.execute("select * from list")
        conn.commit()
        message_list = cursor.fetchall()
        cursor.close()
        conn.close()
        return render(request, 'class.html', {'message_list': message_list})
    else:
        room_id = int(request.POST.get('room_id'))
        wind_speed = int(request.POST.get('wind_speed'))
        temp = int(request.POST.get('cur_temp'))
        start_time = request.POST.get('start_time')
        end_time = request.POST.get('end_time')

        conn = pymysql.connect(host='127.0.0.1', port=3306, user='root', passwd='990929', db='test', charset='utf8')
        cursor = conn.cursor(cursor=pymysql.cursors.DictCursor)
        cursor.execute("select * from list")
        conn.commit()
        row = cursor.rowcount

        cursor.execute("select timestampdiff(second,%s,%s)", [start_time, end_time])
        conn.commit()
        minute = cursor.fetchall()
        for i in minute[0].keys():
            time = minute[0][i]
        if wind_speed == 0:
              cost = time/180
        elif wind_speed == 1:
              cost = time/120
        else:
              cost = time/60

        cursor.execute("insert into list values(%s,%s,%s,%s,%s,%s,%s)", [row+1, room_id, wind_speed, temp, start_time, end_time, cost])
        conn.commit()
        cursor.execute("select * from list")
        conn.commit()
        message_list = cursor.fetchall()
        cursor.close()
        conn.close()
        return render(request, 'class.html', {'message_list': message_list})
