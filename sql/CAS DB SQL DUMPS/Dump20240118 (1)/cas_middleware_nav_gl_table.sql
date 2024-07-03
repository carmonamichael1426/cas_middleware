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
-- Table structure for table `nav_gl_table`
--

DROP TABLE IF EXISTS `nav_gl_table`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `nav_gl_table` (
  `gl_id` int(11) NOT NULL AUTO_INCREMENT,
  `db_id` int(11) DEFAULT NULL,
  `store_no` varchar(45) DEFAULT NULL,
  `posting_date` date DEFAULT NULL,
  `gl_account_no` varchar(45) DEFAULT NULL,
  `document_type` varchar(45) DEFAULT NULL,
  `document_no` varchar(45) DEFAULT NULL,
  `description` varchar(45) DEFAULT NULL,
  `amount` varchar(45) DEFAULT NULL,
  `dimension_1` varchar(45) DEFAULT NULL,
  `dimension_2` varchar(45) DEFAULT NULL,
  `source_code` varchar(45) DEFAULT NULL,
  `journal_batch_name` varchar(45) DEFAULT NULL,
  `source_type` varchar(45) DEFAULT NULL,
  `source_no` varchar(45) DEFAULT NULL,
  `external_doc_no` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`gl_id`),
  KEY `db_id` (`db_id`),
  KEY `store_no` (`store_no`),
  KEY `posting_date` (`posting_date`),
  KEY `gl_account_no` (`gl_account_no`),
  KEY `document_type` (`document_type`),
  KEY `document_no` (`document_no`),
  KEY `description` (`description`),
  KEY `amount` (`amount`),
  KEY `dimension_1` (`dimension_1`),
  KEY `dimension_2` (`dimension_2`),
  KEY `source_code` (`source_code`),
  KEY `journal_batch_name` (`journal_batch_name`),
  KEY `source_type` (`source_type`),
  KEY `source_no` (`source_no`),
  KEY `external_doc_no` (`external_doc_no`)
) ENGINE=MyISAM AUTO_INCREMENT=7 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `nav_gl_table`
--

LOCK TABLES `nav_gl_table` WRITE;
/*!40000 ALTER TABLE `nav_gl_table` DISABLE KEYS */;
INSERT INTO `nav_gl_table` VALUES (1,36,'ICM-S0005','2023-08-21','20.50.01.01.01.03','Invoice','FR-20027259','Order FR-1024587','42,817.47','01.04','01.04.1.05','PURCHASES','','Vendor','FR-0473','HDC-S507393\r'),(2,36,'ICM-S0005','2023-08-21','10.10.01.06.06','Invoice','FR-20027259','Order FR-1024587','5,138.1','01.04','01.04.1.05','PURCHASES','','Vendor','FR-0473','HDC-S507393\r'),(3,36,'ICM-S0005','2023-08-21','10.20.01.01.01.02','Invoice','FR-20027259','Order FR-1024587','-47,955.57','01.04','01.04.1.05','PURCHASES','','Vendor','FR-0473','HDC-S507393\r'),(4,88,'HDC-S0005','2023-08-18','20.50.01.01.02','Invoice','HDC-S507393','Order HDC-S607659','-42,817.47','06.00','06.04','SALES','','Customer','HDC-0000003','R0005911\r'),(5,88,'HDC-S0005','2023-08-18','10.20.01.01.01.14','Invoice','HDC-S507393','Order HDC-S607659','-5,138.1','06.00','06.04','SALES','','Customer','HDC-0000003','R0005911\r'),(6,88,'HDC-S0005','2023-08-18','10.10.01.03.02','Invoice','HDC-S507393','Order HDC-S607659','47,955.57','06.00','06.04','SALES','','Customer','HDC-0000003','R0005911\r');
/*!40000 ALTER TABLE `nav_gl_table` ENABLE KEYS */;
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
