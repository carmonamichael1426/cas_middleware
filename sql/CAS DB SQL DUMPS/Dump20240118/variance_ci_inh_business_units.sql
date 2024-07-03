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
-- Table structure for table `inh_business_units`
--

DROP TABLE IF EXISTS `inh_business_units`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `inh_business_units` (
  `bu_no` int(11) NOT NULL AUTO_INCREMENT,
  `bu_name1` varchar(50) NOT NULL,
  `bu_name2` varchar(50) NOT NULL,
  `bu_code1` varchar(50) NOT NULL,
  `bu_code2` varchar(50) NOT NULL,
  `bu_group` varchar(1) NOT NULL,
  `sup_code` varchar(50) NOT NULL,
  `cust_code` varchar(50) NOT NULL,
  PRIMARY KEY (`bu_no`),
  KEY `bu_group` (`bu_group`),
  KEY `index` (`bu_code1`,`bu_code2`)
) ENGINE=InnoDB AUTO_INCREMENT=59 DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `inh_business_units`
--

LOCK TABLES `inh_business_units` WRITE;
/*!40000 ALTER TABLE `inh_business_units` DISABLE KEYS */;
INSERT INTO `inh_business_units` VALUES (2,'MFI-TIPCAN','BAMDECORP','MFI_TIPCAN-SI','BAMDE-PI','D','40','0'),(3,'BROILER GROW-OUT - UBAY','BROILER DRESSING PLANT - UBAY','BGU-SI','BDP-PI','D','1','0'),(4,'BREEDER - BILAR','BROILER HATCHERY - BILAR','BB-SI','BHB-PI','D','286','AGC-00062'),(6,'BREEDER - DIMIAO CANHAYUPON','BROILER HATCHERY - BILAR','BDC-SI','BHB-PI','D','770','AGC-00062'),(7,'BROILER HATCHERY - BILAR','BROILER GROW-OUT - UBAY','BHB-SI','BGU-PI','D','4','HEV-00117'),(8,'BREEDER - DIMIAO LAPSAON','BROILER HATCHERY - BILAR','BDL-SI','BHB-PI','D','711','AGC-00062'),(9,'BREEDER - DIMIAO CANHAYUPON','BREEDER - BILAR','BDC-SI','BB-PI','D','615','DCCNTI0003'),(10,'BREEDER - DIMIAO LAPSAON','BREEDER - BILAR','BDL-SI','BB-PI','D','711','AGC-00038'),(11,'MFI FEEDMILL UBAY','PIGGERY CORTES','FMILL-SI','PGRY-PI','D','412','WRTI-00006'),(12,'MFI FEEDMILL UBAY','BREEDER BILAR','FMILL-SI','BB2-PI','D','412','AGC-00038'),(13,'MFI FEEDMILL UBAY','POULTRY CORTES','FMILL-SI','PLTRY-PI','D','412','CABO-00003'),(14,'MFI RENDERING PLANT','MFI FEEDMILL UBAY','REN-SI','FMILL-PI','D','835','REN-00002'),(16,'MFI FEEDMILL UBAY','MFI MARIBOJOC','FMILL-SI','MAR-PI','D','9','AGC-00016'),(17,'MFI FEEDMILL UBAY','MFI CATAGBAKAN','FMILL-SI','CaboC-PI','D','25','AGC-00088'),(18,'BROILER DRESSING PLANT - UBAY','MFI FEEDMILL UBAY','BDP-SI','FMILL-PI','D','66','AGC00035'),(19,'POULTRY CORTES','MFI FEEDMILL UBAY','PLTRY-SI','FMILL-PI','D','334','WRTI-00031'),(20,'BUCAREZ-PEANUT KISSES','MFI FEEDMILL UBAY','BPK-SI','FMILL-PI','D','381','WRTI-00031'),(21,'MFI FEEDMILL UBAY','BREEDER - DIMIAO CANHAYUPON','FMILL-SI','BDC2-PI','D','412','AGC-00099'),(22,'MFI FEEDMILL UBAY','PIGGERY UNTAGA','FMILL-SI','UNTAGA-PI','D','412','FM-00007'),(23,'BREEDER - DIMIAO LAPSAON','MFI FEEDMILL UBAY','BDL-SI','FMILL-PI','D','711','AGC00035'),(26,'MFI FEEDMILL UBAY','RIZAL BREEDER','FMILL-SI','RIZAL-PI','D','412','BIL-00153'),(27,'MFI FEEDMILL UBAY','BREEDER - DIMIAO LAPSAON','FMILL-SI','BDL-PI','D','412','AGC-00098'),(35,'MFI FEEDMILL UBAY','BROILER - GROWOUT (MABUHAY)','FMILL-SI','BGU3-PI','D','5','FMS-00146'),(36,'MFI FEEDMILL UBAY','BROILER GROW-OUT - UBAY','FMILL-SI','BGU2-PI','D','5','AGC-00085'),(37,'MFI FEEDMILL UBAY','BROILER - GROWOUT(GABI-QUISUMBING)','FMILL-SI','BGU4-PI','D','5','FMS-00147'),(38,'MFI FEEDMILL UBAY','BROILER - GROWOUT(GABI-DR.TAN)','FMILL-SI','BGU5-PI','D','5','FMS-00148'),(39,'MFI FEEDMILL UBAY','BROILER - GROWOUT(LA HACIENDA, ALICIA)','FMILL-SI','BGU6-PI','D','5','HEV-00071'),(40,'MFI FEEDMILL UBAY','BROILER - GROWOUT(UNTAGA, ALICIA)','FMILL-SI','BGU7-PI','D','5','HEV-00103'),(41,'MFI FEEDMILL UBAY','BROILER - GROWOUT(PILAR)','FMILL-SI','BGU8-PI','D','5','HEV-00117'),(43,'BREEDER - RIZAL','BROILER HATCHERY - BILAR','RIZAL-SI','BHB-PI','D','972','AGC-00062'),(55,'MFI FEEDMILL UBAY','BREEDER - DIMIAO CANHAYUPON','FMILL-SI-NEW','BDC2-PI-NEW','','412','AGC-00099'),(56,'MFI FEEDMILL UBAY','BREEDER BILAR','FMILL-SI-NEW','BB2-PI-NEW','','412','AGC-00038'),(57,'FEEDMILL UBAY','LAPSAON','FMILL-SI-NEW','BDL-PI-NEW','','412','AGC-00098'),(58,'FEEDMILL UBAY','RIZAL BREEDER','FMILL-SI','RIZAL-PI','','','');
/*!40000 ALTER TABLE `inh_business_units` ENABLE KEYS */;
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