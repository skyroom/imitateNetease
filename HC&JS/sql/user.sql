SET NAMES utf8;

DROP DATABASE IF EXISTS netease;
CREATE DATABASE netease CHARSET=UTF8;
USE netease;

CREATE TABLE IF NOT EXISTS `users` (
  `user_id` int(11) PRIMARY KEY  AUTO_INCREMENT,
  `user_name` varchar(100),
  `user_pwd` varchar(100)
);
INSERT INTO `users` VALUES(NULL, 'sky', '123456');