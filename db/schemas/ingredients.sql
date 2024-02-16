CREATE TABLE `ingredients` (
  `ingred_id` int NOT NULL AUTO_INCREMENT,
  `food_item_id` int NOT NULL,
  `name` varchar(45) DEFAULT NULL,
  `user_id` int DEFAULT NULL,
  PRIMARY KEY (`ingred_id`),
  KEY `food_item_id_idx` (`food_item_id`),
  KEY `user_id_idx` (`user_id`),
  CONSTRAINT `food_item_id` FOREIGN KEY (`food_item_id`) REFERENCES `food_items` (`item_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `link_ing_to_user` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=27 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
