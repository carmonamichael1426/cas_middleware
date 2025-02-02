-- MySQL dump 10.13  Distrib 5.6.12, for Win32 (x86)
--
-- Host: 172.16.161.37    Database: nav_db
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
-- Table structure for table `icms-pi`
--

DROP TABLE IF EXISTS `icms-pi`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `icms-pi` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `document_no` varchar(24) DEFAULT NULL,
  `date` date DEFAULT NULL,
  `reference_no` varchar(24) DEFAULT NULL,
  `amount` varchar(24) DEFAULT NULL,
  `multicopy` tinyint(4) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `uindex` (`document_no`)
) ENGINE=InnoDB AUTO_INCREMENT=13 DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `icms-pi`
--

LOCK TABLES `icms-pi` WRITE;
/*!40000 ALTER TABLE `icms-pi` DISABLE KEYS */;
INSERT INTO `icms-pi` VALUES (1,'ISM-P4357588','2023-08-10','23001225','12539.6',1),(2,'ISM-P4359387','2023-08-24','23001286','7943.22',1),(3,'ISM-P4359388','2023-08-31','23001313','7404.71',1),(7,'ISM-P4356784','2023-08-03','23000656','9134.32',1),(8,'ISM-P4359384','2023-08-24','23000723','5141.25',1),(9,'ISM-P4359385','2023-08-31','23000747','4534.81',1);
/*!40000 ALTER TABLE `icms-pi` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-01-18  8:17:11
