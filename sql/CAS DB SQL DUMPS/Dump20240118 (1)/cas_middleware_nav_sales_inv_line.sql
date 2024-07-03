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
-- Table structure for table `nav_sales_inv_line`
--

DROP TABLE IF EXISTS `nav_sales_inv_line`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `nav_sales_inv_line` (
  `line_id` int(11) NOT NULL AUTO_INCREMENT,
  `db_id` int(11) DEFAULT NULL,
  `store_no` varchar(45) DEFAULT NULL,
  `line_no` varchar(45) DEFAULT NULL,
  `no` varchar(45) DEFAULT NULL,
  `description` varchar(45) DEFAULT NULL,
  `quantity` varchar(45) DEFAULT NULL,
  `unit_of_measure_code` varchar(45) DEFAULT NULL,
  `variant_code` varchar(45) DEFAULT NULL,
  `document_no` varchar(45) DEFAULT NULL,
  `dimension_1` varchar(45) DEFAULT NULL,
  `dimension_2` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`line_id`),
  KEY `db_id` (`db_id`),
  KEY `store_no` (`store_no`),
  KEY `line_no` (`line_no`),
  KEY `no` (`no`),
  KEY `description` (`description`),
  KEY `quantity` (`quantity`),
  KEY `unit_of_measure_code` (`unit_of_measure_code`),
  KEY `variant_code` (`variant_code`),
  KEY `document_no` (`document_no`),
  KEY `dimension_1` (`dimension_1`),
  KEY `dimension_2` (`dimension_2`)
) ENGINE=MyISAM AUTO_INCREMENT=10 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `nav_sales_inv_line`
--

LOCK TABLES `nav_sales_inv_line` WRITE;
/*!40000 ALTER TABLE `nav_sales_inv_line` DISABLE KEYS */;
INSERT INTO `nav_sales_inv_line` VALUES (1,88,'HDC-S0005','10000','436266','BOYSEN S-GLOS200 ENA.WHITE GAL','8','GAL','','HDC-S507393','06.00','06.04\r'),(2,88,'HDC-S0005','20000','430752','BULLDOG WOOD & LEATHER 3G 48\'S','48','CRD','','HDC-S507393','06.00','06.04\r'),(3,88,'HDC-S0005','30000','436313','CORD A.PURPOSE EPOXY1/2 PINT24','24','PR','','HDC-S507393','06.00','06.04\r'),(4,88,'HDC-S0005','50000','434216','STP OIL TREATMENT 15 OZ. 12\'S','12','BOT','','HDC-S507393','06.00','06.04\r'),(5,88,'HDC-S0005','60000','436839','VS1 PROTECTOR 120ML 24\'s','48','PCS','','HDC-S507393','06.00','06.04\r'),(6,88,'HDC-S0005','70000','436840','VS1 PROTECTOR 250ML 12\'s','48','PCS','','HDC-S507393','06.00','06.04\r'),(7,88,'HDC-S0005','80000','430812','VULCASEAL 1/4 LIT 24\'S','24','CAN','','HDC-S507393','06.00','06.04\r'),(8,88,'HDC-S0005','90000','430813','VULCASEAL 1/2 LIT 12\'S','12','CAN','','HDC-S507393','06.00','06.04\r'),(9,88,'HDC-S0005','100000','430814','VULCASEAL LIT 12\'S','24','CAN','','HDC-S507393','06.00','06.04');
/*!40000 ALTER TABLE `nav_sales_inv_line` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-01-18 13:54:39
