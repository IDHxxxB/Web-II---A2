-- MySQL dump 10.13  Distrib 8.0.43, for Win64 (x86_64)
--
-- Host: localhost    Database: charityevents_db
-- ------------------------------------------------------
-- Server version	8.0.43

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `categories`
--

DROP TABLE IF EXISTS `categories`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `categories` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `categories`
--

LOCK TABLES `categories` WRITE;
/*!40000 ALTER TABLE `categories` DISABLE KEYS */;
INSERT INTO `categories` VALUES 
(1,'Fun Run'),
(2,'Gala Dinner'),
(3,'Silient Auction'),
(4,'Concert'),
(5,'Sports for Good Challenge'),
(6,'Second-Hand Giveback Bazaar');
/*!40000 ALTER TABLE `categories` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `events`
--

DROP TABLE IF EXISTS `events`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `events` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `description` text,
  `event_date` date DEFAULT NULL,
  `location` varchar(255) DEFAULT NULL,
  `category_id` int DEFAULT NULL,
  `ticket_price` decimal(10,2) DEFAULT NULL,
  `fundraising_goal` decimal(15,2) DEFAULT NULL,
  `current_amount` decimal(15,2) DEFAULT '0.00',
  `is_active` tinyint(1) DEFAULT '1',
  PRIMARY KEY (`id`),
  KEY `category_id` (`category_id`),
  CONSTRAINT `events_ibfk_1` FOREIGN KEY (`category_id`) REFERENCES `categories` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `events`
--

LOCK TABLES `events` WRITE;
/*!40000 ALTER TABLE `events` DISABLE KEYS */;
INSERT INTO `events` VALUES 
(1,'National University Charity Basketball League','32 university basketball teams competing to raise funds for sports facilities in impoverished areas','2025-11-20','Wukesong Arena, Beijing',5,50.00,150000.00,65000.00,1),
(2,'Beijing Vintage Charity Bazaar','Fashion hotspot! Selling vintage clothing and handicrafts, proceeds donated to stray animal protection','2025-10-20','798 Art District, Beijing',6,30.00,50000.00,18000.00,1),
(3,'West Lake Charity Fun Run','5km fun run around West Lake supporting autism children rehabilitation programs','2025-10-28','West Lake, Hangzhou',1,80.00,80000.00,32000.00,1),
(4,'Greater Bay Area Charity Gala','Michelin-star chef curated gala dinner supporting rural teacher training programs','2025-12-12','Four Seasons Hotel, Guangzhou',2,888.00,300000.00,150000.00,1),
(5,'Chinese Contemporary Art Silent Auction','Silent auction of works donated by famous artists, proceeds for traditional culture preservation','2025-11-18','West Bund Museum, Shanghai',3,0.00,150000.00,60000.00,1),
(6,'Chengdu Panda Conservation Concert','Local musicians joint performance fundraising for giant panda conservation and research','2025-12-25','Chengdu Music Park',4,120.00,100000.00,45000.00,1),
(7,'Great Wall Charity Hike Challenge','Hiking challenge on the ancient Great Wall, supporting heritage conservation and restoration','2025-11-08','Mutianyu Great Wall, Beijing',5,150.00,120000.00,48000.00,1),
(8,'Shenzhen Eco-Friendly Book Bazaar','Second-hand book exchange and sale, proceeds support libraries in impoverished areas','2025-10-10','Shenzhen Book Mall',6,10.00,30000.00,12000.00,1),
(9,'Beijing Spring Charity Run','Last year\'s successful 10km run that raised the target amount for children\'s medical fund','2024-04-20','Olympic Park, Beijing',1,100.00,100000.00,100000.00,0),
(10,'Winter Charity Gala (Postponed)','Winter charity event temporarily postponed due to weather conditions','2025-12-24','Harbin Ice World',2,500.00,180000.00,0.00,0);
/*!40000 ALTER TABLE `events` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2025-09-29 13:01:03
