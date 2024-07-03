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
-- Table structure for table `nav_reports`
--

DROP TABLE IF EXISTS `nav_reports`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `nav_reports` (
  `rp_no` int(11) NOT NULL AUTO_INCREMENT,
  `id_no` int(11) NOT NULL,
  `bu_code1` varchar(100) NOT NULL,
  `bu_code2` varchar(100) NOT NULL,
  `date` datetime NOT NULL DEFAULT current_timestamp(),
  `datePeriod` varchar(128) DEFAULT NULL,
  `status` varchar(10) NOT NULL,
  `pisi_doc` varchar(150) DEFAULT NULL,
  `sum_doc` varchar(150) NOT NULL,
  `cm_sum_doc` varchar(150) DEFAULT NULL,
  `cm_pisi_doc` varchar(150) DEFAULT NULL,
  `audit_status` varchar(10) DEFAULT NULL,
  `new` tinyint(1) DEFAULT 1,
  PRIMARY KEY (`rp_no`),
  KEY `id_no` (`id_no`),
  KEY `bu_code1` (`bu_code1`),
  KEY `bu_code2` (`bu_code2`),
  KEY `rp_no` (`rp_no`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `nav_reports`
--

LOCK TABLES `nav_reports` WRITE;
/*!40000 ALTER TABLE `nav_reports` DISABLE KEYS */;
INSERT INTO `nav_reports` VALUES (1,2,'CDC','ICM SUPERMARKET','2024-01-16 17:17:09','For the period June 15 - 15, 2023','cancelled',NULL,'',NULL,NULL,NULL,1),(2,2,'ASC MAIN SUPERMARKET','ICM SUPERMARKET','2024-01-16 17:21:18','For the period August 3 - 31, 2022','successful','./reports/nav-nav/PISI-#2.pdf','./reports/nav-nav/SUMPISI-#2.pdf',NULL,NULL,NULL,NULL),(3,2,'CDC','ICM SUPERMARKET','2024-01-16 17:23:25','For the period June 15 - 15, 2023','successful','./reports/nav-nav/PISI-#3.pdf','./reports/nav-nav/SUMPISI-#3.pdf',NULL,NULL,NULL,NULL);
/*!40000 ALTER TABLE `nav_reports` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-01-18  8:17:12
