-- MySQL dump 10.13  Distrib 5.6.12, for Win32 (x86)
--
-- Host: 172.16.170.10    Database: cas_middleware
-- ------------------------------------------------------
-- Server version	5.7.40

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
-- Table structure for table `nav_purch_inv_header`
--

DROP TABLE IF EXISTS `nav_purch_inv_header`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `nav_purch_inv_header` (
  `head_id` int(11) NOT NULL AUTO_INCREMENT,
  `db_id` int(11) DEFAULT NULL,
  `store_no` varchar(45) DEFAULT NULL,
  `pay_to_vendor_no` varchar(45) DEFAULT NULL,
  `posting_date` date DEFAULT NULL,
  `location_code` varchar(45) DEFAULT NULL,
  `dimension_1` varchar(45) DEFAULT NULL,
  `dimension_2` varchar(45) DEFAULT NULL,
  `no` varchar(45) DEFAULT NULL,
  `pay_to_name` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`head_id`),
  KEY `db_id` (`db_id`),
  KEY `store_no` (`store_no`),
  KEY `pay_to_vendor_no` (`pay_to_vendor_no`),
  KEY `posting_date` (`posting_date`),
  KEY `location_code` (`location_code`),
  KEY `dimension_1` (`dimension_1`),
  KEY `dimension_2` (`dimension_2`),
  KEY `no` (`no`),
  KEY `pay_to_name` (`pay_to_name`)
) ENGINE=MyISAM AUTO_INCREMENT=4 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `nav_purch_inv_header`
--

LOCK TABLES `nav_purch_inv_header` WRITE;
/*!40000 ALTER TABLE `nav_purch_inv_header` DISABLE KEYS */;
INSERT INTO `nav_purch_inv_header` VALUES (1,36,NULL,'FR-0473','2023-08-21','ICM-FIXRT','01.04','01.04.1.05','FR-20027259','DC- FIXRITE HARDWARE\r'),(2,36,'ICM-S0005','FR-0473','2023-08-21','ICM-FIXRT','01.04','01.04.1.05','FR-20027259','DC- FIXRITE HARDWARE\r'),(3,88,'HDC-S0005','HDC-0000003','2023-08-18','DC-HARD.','06.00','06.04','HDC-S507393','ISLAND CITY MALL FIXRITE\r');
/*!40000 ALTER TABLE `nav_purch_inv_header` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-01-18 13:54:41
