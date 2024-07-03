-- MySQL dump 10.13  Distrib 5.6.12, for Win32 (x86)
--
-- Host: 172.16.161.37    Database: variance_ci
-- ------------------------------------------------------
-- Server version	5.5.5-10.4.28-MariaDB

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `line_columns`
--

DROP TABLE IF EXISTS `line_columns`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `line_columns` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `bu_code` varchar(20) DEFAULT NULL,
  `count` tinyint(4) DEFAULT NULL,
  `document_no` tinyint(4) DEFAULT NULL,
  `item_code` tinyint(4) DEFAULT NULL,
  `description` tinyint(4) DEFAULT NULL,
  `unit_of_measurements` tinyint(4) DEFAULT NULL,
  `quantity` tinyint(4) DEFAULT NULL,
  `price` tinyint(4) DEFAULT NULL,
  `amount` tinyint(4) DEFAULT NULL,
  `unit_amount` tinyint(4) DEFAULT NULL,
  `unit_code` tinyint(4) DEFAULT NULL,
  `var_code` tinyint(4) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `line_columns`
--

LOCK TABLES `line_columns` WRITE;
/*!40000 ALTER TABLE `line_columns` DISABLE KEYS */;
INSERT INTO `line_columns` VALUES (1,'NAV-SI',13,0,2,3,4,5,6,7,10,11,12),(2,'NAV-PI',16,0,2,3,5,6,7,10,13,14,15);
/*!40000 ALTER TABLE `line_columns` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-01-18  8:17:13
