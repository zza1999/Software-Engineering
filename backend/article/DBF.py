import sys
import logging
import pymysql      #连接数据库
#from backend import settings     #导入数据库登录信息

# Schedule[room_id,windspeed,temp,start_time, end_time, flag]
# RDR[room_id,speed,rate,start_time, end_time,dur_cost]
# Invoice[room_id,check_in_time,check_out_time,cost]
# 经理的增加表跟获取表虽然room_id[]是列表，但是已经在后端log进行处理，room_id将会发送一个一个的过来
# Report[room_id,times_of_on,duration,total_fee,times_of_dispatch,number_of_RDR,times_of_change_temp,times_of_change_speed]

DATABASES = {
    'default': {
        # 'ENGINE': 'django.db.backends.sqlite3',
        # 'NAME': os.path.join(BASE_DIR, 'db.sqlite3'),
        "ENGINE": 'django.db.backends.mysql',
        "NAME": "hotel",
        "USER": "admin",
        "PASSWORD": "123456",
        "HOST": "47.95.29.108",
        "PORT": "3306",
    }
}
user = DATABASES["default"]["USER"]
host = DATABASES["default"]["HOST"]
password = DATABASES["default"]["PASSWORD"]
database = DATABASES["default"]["NAME"]

connect1 = pymysql.connect(host=host, port=3306, user=user, password=password, database=database,charset='utf8',cursorclass=pymysql.cursors.DictCursor,autocommit =True)
cur1 = connect1.cursor(cursor=pymysql.cursors.DictCursor)

cur1.execute("CREATE TABLE IF NOT EXISTS RDR(room_id INT,speed INT,rate FLOAT,start_time TIMESTAMP, end_time TIMESTAMP,dur_cost FLOAT)")
cur1.execute("CREATE TABLE IF NOT EXISTS Invoice(room_id INT,check_in_time TIMESTAMP, check_out_time TIMESTAMP)")
cur1.execute("CREATE TABLE IF NOT EXISTS Report(room_id INT,times_of_on INT,duration INT,total_fee FLOAT,times_of_dispatch INT,number_of_RDR INT,times_of_change_temp INT,times_of_change_speed INT)")
cur1.execute("CREATE TABLE IF NOT EXISTS Schedule(room_id INT,windspeed INT,temp FLOAT,start_time TIMESTAMP, end_time TIMESTAMP,flag INT)")
cur1.close()
connect1.close()


def get_connection():
    connect = pymysql.connect(host=host, port=3306, user=user, password=password, database=database,charset='utf8',cursorclass=pymysql.cursors.DictCursor,autocommit =True)
    return connect, connect.cursor(cursor=pymysql.cursors.DictCursor)

def check_schedule(room_id):
    connect, cur = get_connection()
    cur.execute("select * from Schedule WHERE room_id=%s", [room_id])
    result=cur.fetchall()
    cur.close()
    connect.close()
    return result

def check_RDR(room_id):
    connect, cur = get_connection()
    cur.execute("select * from RDR WHERE room_id=%s", [room_id])
    result = cur.fetchall()
    cur.close()
    connect.close()
    return result

def check_bill(room_id):
    connect, cur = get_connection()
    cur.execute("select * from Invoice WHERE room_id=%s", [room_id])
    result = cur.fetchall()
    cur.close()
    connect.close()
    return result

def check_report(room_id):
    connect, cur = get_connection()
    cur.execute("select * from Report WHERE room_id=%s", [room_id])
    result = cur.fetchall()
    cur.close()
    connect.close()
    return result

def add_RDR(room_id, speed,rate, start_time, end_time, dur_cost):
    connect, cur = get_connection()
    cur.execute("INSERT INTO RDR(room_id,speed,rate,start_time, end_time,dur_cost) VALUES(%s,%s,%s,%s,%s,$s)", [room_id, speed, rate, start_time, end_time, dur_cost])
    cur.close()
    connect.close()

def add_report(room_id,times_of_on,duration,total_fee,times_of_dispatch,number_of_RDR,times_of_change_temp,times_of_change_speed):
    connect, cur = get_connection()
    cur.execute("INSERT INTO Report(room_id,times_of_on,duration,total_fee,times_of_dispatch,number_of_RDR,times_of_change_temp,times_of_change_speed) VALUES(%s,%s,%s,%s,%s,$s,%s,%s)", [room_id,times_of_on,duration,total_fee,times_of_dispatch,number_of_RDR,times_of_change_temp,times_of_change_speed])
    cur.close()
    connect.close()

def add_bill(room_id , speed,rate, check_in_time, check_out_time, cost):
    connect, cur = get_connection()
    cur.execute("INSERT INTO Invoice(room_id, check_in_time, check_out_time, cost) VALUES(%s,%s,%s,%s)", [room_id, check_in_time, check_out_time, cost])
    cur.close()
    connect.close()

def add_schedule(room_id, windspeed, temp, start_time, end_time, flag):
    connect, cur = get_connection()
    cur.execute("INSERT INTO Schedule(room_id,windspeed,temp,start_time, end_time, flag) VALUES(%s,%s,%s,%s,%s,%s)", [room_id , windspeed, temp, start_time, end_time, flag])
    cur.close()
    connect.close()
