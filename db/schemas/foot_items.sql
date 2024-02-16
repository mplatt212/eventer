CREATE TABLE `food_items` (
  `item_id` int NOT NULL AUTO_INCREMENT,
  `meal_id` int NOT NULL,
  `name` varchar(25) DEFAULT NULL,
  `user_id` int DEFAULT NULL,
  PRIMARY KEY (`item_id`),
  KEY `meal_id_idx` (`meal_id`),
  KEY `user_id_idx` (`user_id`),
  CONSTRAINT `link_food_item_to_user` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`),
  CONSTRAINT `meal_id` FOREIGN KEY (`meal_id`) REFERENCES `meals` (`meal_id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=37 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
