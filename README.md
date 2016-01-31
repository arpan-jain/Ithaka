# Ithaka
FirstNodeJSProject

Framework :Express.js

Database Schema:

----------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| user  | CREATE TABLE `user` (
  `user_id` int(10) NOT NULL AUTO_INCREMENT,
  `fname` varchar(100) DEFAULT NULL,
  `lname` varchar(100) DEFAULT NULL,
  `gender` enum('M','F') NOT NULL,
  `email_id` varchar(512) DEFAULT NULL,
  `password` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`user_id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=latin1 |


+-------+-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| hotel | CREATE TABLE `hotel` (
  `hotel_id` int(10) NOT NULL AUTO_INCREMENT,
  `name` varchar(1000) DEFAULT NULL,
  `location` varchar(1000) NOT NULL,
  `stars` enum('1','2','3','4','5') DEFAULT NULL,
  PRIMARY KEY (`hotel_id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=latin1 |

                                                                                                                                         
+-------+---------------------------------------------------------------------------------------------------------------------------------------------------------------+
| fav   | CREATE TABLE `fav` (
  `user_id` int(10) NOT NULL,
  `hotel_id` int(10) NOT NULL,
  PRIMARY KEY (`user_id`,`hotel_id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1 |
+-------+----------------------------------
