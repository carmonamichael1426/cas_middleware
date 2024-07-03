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
-- Table structure for table `nav_print_logs`
--

DROP TABLE IF EXISTS `nav_print_logs`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `nav_print_logs` (
  `log_no` int(11) NOT NULL AUTO_INCREMENT,
  `rp_no` int(11) NOT NULL,
  `pisi_doc` varchar(150) DEFAULT NULL,
  `sum_doc` varchar(150) DEFAULT NULL,
  `cm_sum_doc` varchar(150) DEFAULT NULL,
  `cm_pisi_doc` varchar(150) DEFAULT NULL,
  `pisi_print` tinyint(4) NOT NULL,
  `sum_print` tinyint(4) NOT NULL,
  `cm_sum_print` tinyint(4) NOT NULL,
  `cm_pisi_print` tinyint(4) NOT NULL,
  `audited_by` varchar(70) DEFAULT NULL,
  PRIMARY KEY (`log_no`),
  KEY `rp_no` (`rp_no`)
) ENGINE=MyISAM AUTO_INCREMENT=121 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `nav_print_logs`
--

LOCK TABLES `nav_print_logs` WRITE;
/*!40000 ALTER TABLE `nav_print_logs` DISABLE KEYS */;
INSERT INTO `nav_print_logs` VALUES (119,2,'./reports/nav-nav/PISI-#2.pdf','./reports/nav-nav/SUMPISI-#2.pdf',NULL,NULL,0,0,0,0,NULL),(120,3,'./reports/nav-nav/PISI-#3.pdf','./reports/nav-nav/SUMPISI-#3.pdf',NULL,NULL,0,0,0,0,NULL);
/*!40000 ALTER TABLE `nav_print_logs` ENABLE KEYS */;
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
