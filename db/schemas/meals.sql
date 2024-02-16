CREATE TABLE `meals` (
  `meal_id` int NOT NULL AUTO_INCREMENT,
  `event_id` int NOT NULL,
  `meal_type` enum('Breakfast','Lunch','Dinner','Snack') NOT NULL,
  `date` date NOT NULL,
  PRIMARY KEY (`meal_id`),
  UNIQUE KEY `id_type_unique` (`meal_type`,`date`),
  KEY `event_id_idx` (`event_id`),
  CONSTRAINT `event_id` FOREIGN KEY (`event_id`) REFERENCES `events` (`event_id`)
) ENGINE=InnoDB AUTO_INCREMENT=125 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
