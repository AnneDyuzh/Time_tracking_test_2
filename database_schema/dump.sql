
DROP TABLE IF EXISTS `tasks`;

CREATE TABLE `tasks` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `description` varchar(500) NOT NULL,
  `createdAt` datetime DEFAULT NULL,
  `timeTask` varchar(255) DEFAULT '00:00:00',
  PRIMARY KEY (`id`) 
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8;

LOCK TABLES `tasks` WRITE;
INSERT INTO `tasks` VALUES (1,'Выполнить дз','Нарисовать дом','2019-11-16 07:53:53','00:43:45');

UNLOCK TABLES;
