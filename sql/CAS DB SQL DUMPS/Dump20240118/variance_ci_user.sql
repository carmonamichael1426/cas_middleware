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
-- Table structure for table `user`
--

DROP TABLE IF EXISTS `user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `user` (
  `id_no` int(11) NOT NULL AUTO_INCREMENT,
  `emp_id` varchar(11) NOT NULL,
  `name` varchar(70) DEFAULT NULL,
  `position` varchar(100) DEFAULT NULL,
  `dept_name` varchar(60) DEFAULT NULL,
  `business_unit` varchar(100) DEFAULT NULL,
  `username` varchar(64) NOT NULL,
  `password` varchar(128) NOT NULL,
  `system_type` varchar(24) NOT NULL,
  `user_type` varchar(24) NOT NULL,
  `status` varchar(15) DEFAULT NULL,
  `updated_at` datetime DEFAULT NULL,
  `deleted_at` datetime DEFAULT NULL,
  `created_at` datetime DEFAULT NULL,
  `session_start` int(11) DEFAULT NULL,
  `session_id` varchar(128) DEFAULT NULL,
  PRIMARY KEY (`id_no`),
  KEY `session_id` (`session_id`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user`
--

LOCK TABLES `user` WRITE;
/*!40000 ALTER TABLE `user` DISABLE KEYS */;
INSERT INTO `user` VALUES (1,'02172-2023','Nayve, CJ','System Programmer I','Information Technology','HO','Admin','81dc9bdb52d04dc20036dbd8313ed055','','Admin','offline','2024-01-18 01:16:24',NULL,NULL,1705536979,'j9kfi0jls34r5gpfmsuc5mrn3unovesv'),(2,'03836-2023','Barace, Harvey Jaranilla ','System Programmer I','Information Technology','HO','barace_harvey','c5a12e583965d381ac4234b7264a4693','bi-system','Accounting','offline','2024-01-17 09:24:48',NULL,'2024-01-16 10:09:29',1705479584,'tmcddiepc2iqqat4jacqaioq6gooqjvq'),(3,'24779-2013','De La Peña, Berly Dumanig','System Analyst II','Information Technology','HO','delapeña_berly','c5a12e583965d381ac4234b7264a4693','inh-inh','Audit','offline','2024-01-17 09:16:41',NULL,'2024-01-16 10:09:57',1705479392,'j9se52lq9088uedc1k5uoptl64ircmgi'),(4,'04144-2017','Renacia, Luisa May Calumpang','System Analyst III','Information Technology','HO','renacia_luisa','c5a12e583965d381ac4234b7264a4693','bi-system','Accounting','offline','2024-01-17 06:32:19',NULL,'2024-01-16 10:27:24',NULL,NULL),(5,'01157-2023','Cinches, Lecelle Ann Digamon ','AP/AR Clerk I','ADMIN','Bilar Breeder','cinches_lecelle','c5a12e583965d381ac4234b7264a4693','inh-inh','Accounting','offline','2024-01-17 06:32:19',NULL,'2024-01-16 10:29:43',NULL,NULL),(6,'04742-2013','Raotraot, Winda Ingay ','Production Clerk','PRODUCTION','Canhayupon','raotraot_winda','c5a12e583965d381ac4234b7264a4693','inh-inh','Accounting','offline','2024-01-17 06:32:19',NULL,'2024-01-16 10:30:09',NULL,NULL),(7,'16501-2018','Cagulang, Jaya Marie Cañares ','AP/AR Clerk II','ADMIN','Lapsaon','cagulang_jaya','c5a12e583965d381ac4234b7264a4693','inh-inh','Accounting','offline','2024-01-17 09:19:28',NULL,'2024-01-16 10:30:24',1705479499,'gvec5bh7oj6fs3hmrsfabo8na59qor5g'),(8,'03015-2023','Quisora, Renelyn Cajetas ','AP/AR Clerk I','ADMIN','Rizal Breeder','quisora_renelyn','c5a12e583965d381ac4234b7264a4693','inh-inh','Accounting','offline','2024-01-17 06:32:19',NULL,'2024-01-16 10:30:41',NULL,NULL),(9,'03025-2013','Pajal, Maria Sherilyn Ayag','Bookkeeper II','ADMIN','Hatchery','pajal_maria','c5a12e583965d381ac4234b7264a4693','inh-inh','Accounting','offline','2024-01-17 06:32:19',NULL,'2024-01-16 10:31:05',NULL,NULL),(10,'04676-2023','Pulta, Syra Jean Valleser ','AP/AR Clerk I','ADMIN','Bilar Breeder','pulta_syra','c5a12e583965d381ac4234b7264a4693','inh-inh','Accounting','offline','2024-01-17 06:32:19',NULL,'2024-01-16 10:31:34',NULL,NULL);
/*!40000 ALTER TABLE `user` ENABLE KEYS */;
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
