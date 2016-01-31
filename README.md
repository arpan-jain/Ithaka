# Ithaka
FirstNodeJSProject

Framework :Express.js

Database Schema:
+----------+---------------+------+-----+---------+----------------+
| Field    | Type          | Null | Key | Default | Extra          |
+----------+---------------+------+-----+---------+----------------+
| user_id  | int(10)       | NO   | PRI | NULL    | auto_increment |
| fname    | varchar(100)  | YES  |     | NULL    |                |
| lname    | varchar(100)  | YES  |     | NULL    |                |
| gender   | enum('M','F') | NO   |     | NULL    |                |
| email_id | varchar(512)  | YES  |     | NULL    |                |
| password | varchar(50)   | YES  |     | NULL    |                |
+----------+---------------+------+-----+---------+----------------+
+----------+---------------------------+------+-----+---------+----------------+
| Field    | Type                      | Null | Key | Default | Extra          |
+----------+---------------------------+------+-----+---------+----------------+
| hotel_id | int(10)                   | NO   | PRI | NULL    | auto_increment |
| name     | varchar(1000)             | YES  |     | NULL    |                |
| location | varchar(1000)             | NO   |     | NULL    |                |
| stars    | enum('1','2','3','4','5') | YES  |     | NULL    |                |
+----------+---------------------------+------+-----+---------+----------------+

+----------+---------+------+-----+---------+-------+
| Field    | Type    | Null | Key | Default | Extra |
+----------+---------+------+-----+---------+-------+
| user_id  | int(10) | NO   | PRI | NULL    |       |
| hotel_id | int(10) | NO   | PRI | NULL    |       |
+----------+---------+------+-----+---------+-------+
