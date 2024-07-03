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
-- Table structure for table `nav_account_masterfile`
--

DROP TABLE IF EXISTS `nav_account_masterfile`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `nav_account_masterfile` (
  `account_id` int(11) NOT NULL AUTO_INCREMENT,
  `store` varchar(45) DEFAULT NULL,
  `sales_type` varchar(45) DEFAULT NULL,
  `formula_id` int(11) DEFAULT NULL,
  `account_no` varchar(45) DEFAULT NULL,
  `dimension_1` varchar(45) DEFAULT NULL,
  `dimension_2` varchar(45) DEFAULT NULL,
  `account_type` varchar(45) DEFAULT NULL,
  `source_code` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`account_id`),
  KEY `store` (`store`),
  KEY `sales_type` (`sales_type`),
  KEY `account_no` (`account_no`),
  KEY `account_type` (`account_type`),
  KEY `dimension` (`dimension_2`),
  KEY `dimension_1` (`dimension_1`),
  KEY `source_code` (`source_code`)
) ENGINE=InnoDB AUTO_INCREMENT=233 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `nav_account_masterfile`
--

LOCK TABLES `nav_account_masterfile` WRITE;
/*!40000 ALTER TABLE `nav_account_masterfile` DISABLE KEYS */;
INSERT INTO `nav_account_masterfile` VALUES (1,'ICM-S0001','cash_sales',1,'B-007','1.04','01.04.1.01','Bank Account','ITEMJNL'),(2,'ICM-S0001','card_sales',2,'10.10.01.03.01.08.01','1.04','01.04.1.01','G/L Account','ITEMJNL'),(3,'ICM-S0001','variance',3,'10.10.01.03.01.01 ','1.04','01.04.1.01','G/L Account','ITEMJNL'),(4,'ICM-S0001','tot_sales',4,'20.40.01.01.01','1.04','01.04.1.01','G/L Account','ITEMJNL'),(5,'ICM-S0001','vat_amount',5,'10.20.01.01.01.12','1.04','01.04.1.01','G/L Account','ITEMJNL'),(7,'ICM-S0002','cash_sales',1,'B-011','01.04','01.04.1.02','Bank Account','ITEMJNL'),(8,'ICM-S0002','card_sales',2,'10.10.01.03.01.08.01','01.04','01.04.1.02','G/L Account','ITEMJNL'),(9,'ICM-S0002','variance',3,'10.10.01.03.01.01 ','01.04','01.04.1.02','G/L Account','ITEMJNL'),(10,'ICM-S0002','tot_sales',4,'20.40.01.01.01','01.04','01.04.1.02','G/L Account','ITEMJNL'),(11,'ICM-S0002','vat_amount',5,'10.20.01.01.01.12','01.04','01.04.1.02','G/L Account','ITEMJNL'),(12,'ASC-S0004','cash_sales',1,'B-002','01.01.1','01.01.1.06','Bank Account','ITEMJNL'),(13,'ASC-S0004','card_sales',2,'10.10.01.03.01.08.01','01.01.1','01.01.1.06','G/L Account','ITEMJNL'),(14,'ASC-S0004','variance',3,'10.10.01.03.01.01 ','01.01.1','01.01.1.06','G/L Account','ITEMJNL'),(15,'ASC-S0004','tot_sales',4,'20.40.01.01.01','01.01.1','01.01.1.06','G/L Account','ITEMJNL'),(16,'ASC-S0004','vat_amount',5,'10.20.01.01.01.12','01.01.1','01.01.1.06','G/L Account','ITEMJNL'),(22,'ASC-S0005','cash_sales',1,'B-002','1.01','01.01.1.05','Bank Account','ITEMJNL'),(23,'ASC-S0005','card_sales',2,'10.10.01.03.01.08.01','1.01','01.01.1.05','G/L Account','ITEMJNL'),(24,'ASC-S0005','variance',3,'10.10.01.03.01.01 ','1.01','01.01.1.05','G/L Account','ITEMJNL'),(25,'ASC-S0005','tot_sales',4,'20.40.01.01.01','1.01','01.01.1.05','G/L Account','ITEMJNL'),(26,'ASC-S0005','vat_amount',5,'10.20.01.01.01.12','1.01','01.01.1.05','G/L Account','ITEMJNL'),(32,'ASC-S0002','cash_sales',1,'B-011','1.01','01.01.1.02','Bank Account','ITEMJNL'),(33,'ASC-S0002','card_sales',2,'10.10.01.03.01.08.01','1.01','01.01.1.02','G/L Account','ITEMJNL'),(34,'ASC-S0002','variance',3,'10.10.01.03.01.01 ','1.01','01.01.1.02','G/L Account','ITEMJNL'),(35,'ASC-S0002','tot_sales',4,'20.40.01.01.01','1.01','01.01.1.02','G/L Account','ITEMJNL'),(36,'ASC-S0002','vat_amount',5,'10.20.01.01.01.12','1.01','01.01.1.02','G/L Account','ITEMJNL'),(42,'ASC-S0003','cash_sales',1,'B-002','1.01','01.01.1.07','Bank Account','ITEMJNL'),(43,'ASC-S0003','card_sales',2,'10.10.01.03.01.08.01','1.01','01.01.1.07','G/L Account','ITEMJNL'),(44,'ASC-S0003','variance',3,'10.10.01.03.01.01 ','1.01','01.01.1.07','G/L Account','ITEMJNL'),(45,'ASC-S0003','tot_sales',4,'20.40.01.01.01','1.01','01.01.1.07','G/L Account','ITEMJNL'),(46,'ASC-S0003','vat_amount',5,'10.20.01.01.01.12','1.01','01.01.1.07','G/L Account','ITEMJNL'),(52,'ASC-S0008','cash_sales',1,'B-002','1.01','01.01.1.09','Bank Account','ITEMJNL'),(53,'ASC-S0008','card_sales',2,'10.10.01.03.01.08.01','1.01','01.01.1.09','G/L Account','ITEMJNL'),(54,'ASC-S0008','variance',3,'10.10.01.03.01.01 ','1.01','01.01.1.09','G/L Account','ITEMJNL'),(55,'ASC-S0008','tot_sales',4,'20.40.01.01.01','1.01','01.01.1.09','G/L Account','ITEMJNL'),(56,'ASC-S0008','vat_amount',5,'10.20.01.01.01.12','1.01','01.01.1.09','G/L Account','ITEMJNL'),(62,'ASC-S0001','cash_sales',1,'B-002','1.01','01.01.1.01','Bank Account','ITEMJNL'),(63,'ASC-S0001','card_sales',2,'10.10.01.03.01.08.01','1.01','01.04.1.01','G/L Account','ITEMJNL'),(64,'ASC-S0001','variance',3,'10.10.01.03.01.01 ','1.01','01.04.1.01','G/L Account','ITEMJNL'),(65,'ASC-S0001','tot_sales',4,'20.40.01.01.01','1.01','01.04.1.01','G/L Account','ITEMJNL'),(66,'ASC-S0001','vat_amount',5,'10.20.01.01.01.12','1.01','01.04.1.01','G/L Account','ITEMJNL'),(72,'ASC-S0015','cash_sales',1,'B-002','1.01','01.01.1.20','Bank Account','ITEMJNL'),(73,'ASC-S0015','card_sales',2,'10.10.01.03.01.08.01','1.01','01.01.1.20','G/L Account','ITEMJNL'),(74,'ASC-S0015','variance',3,'10.10.01.03.01.01 ','1.01','01.01.1.20','G/L Account','ITEMJNL'),(75,'ASC-S0015','tot_sales',4,'20.40.01.01.01','1.01','01.01.1.20','G/L Account','ITEMJNL'),(76,'ASC-S0015','vat_amount',5,'10.20.01.01.01.12','1.01','01.01.1.20','G/L Account','ITEMJNL'),(82,'ASC-S0016','cash_sales',1,'B-002','1.04','01.04.1.01','Bank Account','ITEMJNL'),(83,'ASC-S0016','card_sales',2,'10.10.01.03.01.08.01','1.04','01.04.1.01','G/L Account','ITEMJNL'),(84,'ASC-S0016','variance',3,'10.10.01.03.01.01 ','1.04','01.04.1.01','G/L Account','ITEMJNL'),(85,'ASC-S0016','tot_sales',4,'20.40.01.01.01','1.04','01.04.1.01','G/L Account','ITEMJNL'),(86,'ASC-S0016','vat_amount',5,'10.20.01.01.01.12','1.04','01.04.1.01','G/L Account','ITEMJNL'),(92,'ICM-S0003','cash_sales',1,'B-007','1.04','01.04.1.07','Bank Account','ITEMJNL'),(93,'ICM-S0003','card_sales',2,'10.10.01.03.01.08.01','1.04','01.04.1.07','G/L Account','ITEMJNL'),(94,'ICM-S0003','variance',3,'10.10.01.03.01.01 ','1.04','01.04.1.07','G/L Account','ITEMJNL'),(95,'ICM-S0003','tot_sales',4,'20.40.01.01.01','1.04','01.04.1.07','G/L Account','ITEMJNL'),(96,'ICM-S0003','vat_amount',5,'10.20.01.01.01.12','1.04','01.04.1.07','G/L Account','ITEMJNL'),(102,'ICM-S0005','cash_sales',1,'B-011','1.04','01.04.1.05','Bank Account','ITEMJNL'),(103,'ICM-S0005','card_sales',2,'10.10.01.03.01.08.01','1.04','01.04.1.05','G/L Account','ITEMJNL'),(104,'ICM-S0005','variance',3,'10.10.01.03.01.01 ','1.04','01.04.1.05','G/L Account','ITEMJNL'),(105,'ICM-S0005','tot_sales',4,'20.40.01.01.01','1.04','01.04.1.05','G/L Account','ITEMJNL'),(106,'ICM-S0005','vat_amount',5,'10.20.01.01.01.12','1.04','01.04.1.05','G/L Account','ITEMJNL'),(122,'ICM-S0008','cash_sales',1,'B-007','1.04','01.04.1.04','Bank Account','ITEMJNL'),(123,'ICM-S0008','card_sales',2,'10.10.01.03.01.08.01','1.04','01.04.1.04','G/L Account','ITEMJNL'),(124,'ICM-S0008','variance',3,'10.10.01.03.01.01 ','1.04','01.04.1.04','G/L Account','ITEMJNL'),(125,'ICM-S0008','tot_sales',4,'20.40.01.01.01','1.04','01.04.1.04','G/L Account','ITEMJNL'),(126,'ICM-S0008','vat_amount',5,'10.20.01.01.01.12','1.04','01.04.1.04','G/L Account','ITEMJNL'),(127,'WDG-FR001','cash_sales',1,'B-007','1.04','01.04.1.04','Bank Account','ITEMJNL'),(128,'WDG-FR001','card_sales',2,'10.10.01.03.01.08.01','1.04','01.04.1.04','G/L Account','ITEMJNL'),(129,'WDG-FR001','variance',3,'10.10.01.03.01.01 ','1.04','01.04.1.04','G/L Account','ITEMJNL'),(130,'WDG-FR001','tot_sales',4,'20.40.01.01.01','1.04','01.04.1.04','G/L Account','ITEMJNL'),(131,'WDG-FR001','vat_amount',5,'10.20.01.01.01.12','1.04','01.04.1.04','G/L Account','ITEMJNL'),(132,'ASC-S0010','cash_sales',1,'B-007','04.00','04.05.1','Bank Account','ITEMJNL'),(133,'ASC-S0010','card_sales',2,'10.10.01.03.01.08.01','04.00','04.05.1','G/L Account','ITEMJNL'),(134,'ASC-S0010','variance',3,'10.10.01.03.01.01 ','04.00','04.05.1','G/L Account','ITEMJNL'),(135,'ASC-S0010','tot_sales',4,'20.40.01.01.01','04.00','04.05.1','G/L Account','ITEMJNL'),(136,'ASC-S0010','vat_amount',5,'10.20.01.01.01.12','04.00','04.05.1','G/L Account','ITEMJNL'),(137,'ASC-S0010','cash_sales',1,'B-007','1.04','04.05.1','Bank Account','ITEMJNL'),(138,'ASC-S0010','card_sales',2,'10.10.01.03.01.08.01','','04.05.1','G/L Account','ITEMJNL'),(139,'ASC-S0010','variance',3,'10.10.01.03.01.01 ','','04.05.1','G/L Account','ITEMJNL'),(140,'ASC-S0010','tot_sales',4,'20.40.01.01.01','','04.05.1','G/L Account','ITEMJNL'),(141,'ASC-S0010','vat_amount',5,'10.20.01.01.01.12','','04.05.1','G/L Account','ITEMJNL'),(142,'ICM-S0004','cash_sales',1,'B-002','1.01','01.01.1.05','Bank Account','ITEMJNL'),(143,'ICM-S0004','card_sales',2,'10.10.01.03.01.08.01','1.01','01.01.1.05','G/L Account','ITEMJNL'),(144,'ICM-S0004','variance',3,'10.10.01.03.01.01 ','1.01','01.01.1.05','G/L Account','ITEMJNL'),(145,'ICM-S0004','tot_sales',4,'20.40.01.01.01','1.01','01.01.1.05','G/L Account','ITEMJNL'),(146,'ICM-S0004','vat_amount',5,'10.20.01.01.01.12','1.01','01.01.1.05','G/L Account','ITEMJNL'),(147,'TUB-S0002','cash_sales',1,'B-002','1.01','01.01.1.09','Bank Account','ITEMJNL'),(148,'TUB-S0002','card_sales',2,'10.10.01.03.01.08.01','1.01','01.01.1.09','G/L Account','ITEMJNL'),(149,'TUB-S0002','variance',3,'10.10.01.03.01.01 ','1.01','01.01.1.09','G/L Account','ITEMJNL'),(150,'TUB-S0002','tot_sales',4,'20.40.01.01.01','1.01','01.01.1.09','G/L Account','ITEMJNL'),(151,'TUB-S0002','vat_amount',5,'10.20.01.01.01.12','1.01','01.01.1.09','G/L Account','ITEMJNL'),(152,'TUB-S0005','cash_sales',1,'B-001','1.01','01.01.1.09','Bank Account','ITEMJNL'),(153,'TUB-S0005','card_sales',2,'10.10.01.03.01.08.01','1.01','01.01.1.09','G/L Account','ITEMJNL'),(154,'TUB-S0005','variance',3,'10.10.01.03.01.01 ','1.01','01.01.1.09','G/L Account','ITEMJNL'),(155,'TUB-S0005','tot_sales',4,'20.40.01.01.01','1.01','01.01.1.09','G/L Account','ITEMJNL'),(156,'TUB-S0005','vat_amount',5,'10.20.01.01.01.12','1.01','01.01.1.09','G/L Account','ITEMJNL'),(157,'TUB-S0003','cash_sales',1,'B-001','1.01','01.01.1.09','Bank Account','ITEMJNL'),(158,'TUB-S0003','card_sales',2,'10.10.01.03.01.08.01','1.01','01.01.1.09','G/L Account','ITEMJNL'),(159,'TUB-S0003','variance',3,'10.10.01.03.01.01 ','1.01','01.01.1.09','G/L Account','ITEMJNL'),(160,'TUB-S0003','tot_sales',4,'20.40.01.01.01','1.01','01.01.1.09','G/L Account','ITEMJNL'),(161,'TUB-S0003','vat_amount',5,'10.20.01.01.01.12','1.01','01.01.1.09','G/L Account','ITEMJNL'),(162,'CDC-S0001','cash_sales',1,'B-003','6','06.00.1.06','Bank Account','ITEMJNL'),(163,'CDC-S0001','card_sales',2,'10.10.01.03.01.08.01','6','06.00.1.06','G/L Account','ITEMJNL'),(164,'CDC-S0001','variance',3,'10.10.01.03.01.01 ','6','06.00.1.06','G/L Account','ITEMJNL'),(165,'CDC-S0001','tot_sales',4,'20.40.01.01.01','6','06.00.1.06','G/L Account','ITEMJNL'),(166,'CDC-S0001','vat_amount',5,'10.20.01.01.01.12','6','06.00.1.06','G/L Account','ITEMJNL'),(167,'ASC-S0010','cash_sales',1,'B-002','1.01','01.01.1.09','Bank Account','ITEMJNL'),(168,'ASC-S0010','card_sales',2,'10.10.01.03.01.08.01','1.01','01.01.1.09','G/L Account','ITEMJNL'),(169,'ASC-S0010','variance',3,'10.10.01.03.01.01 ','1.01','01.01.1.09','G/L Account','ITEMJNL'),(170,'ASC-S0010','tot_sales',4,'20.40.01.01.01','1.01','01.01.1.09','G/L Account','ITEMJNL'),(171,'ASC-S0010','vat_amount',5,'10.20.01.01.01.12','1.01','01.01.1.09','G/L Account','ITEMJNL'),(172,'HDC-S0005','cash_sales',1,'B-002','06.00','06.04','Bank Account','ITEMJNL'),(173,'HDC-S0005','card_sales',2,'10.10.01.03.01.08.01','06.00','06.04','G/L Account','ITEMJNL'),(174,'HDC-S0005','variance',3,'10.10.01.03.01.01 ','06.00','06.04','G/L Account','ITEMJNL'),(175,'HDC-S0005','tot_sales',4,'20.40.01.01.01','06.00','06.04','G/L Account','ITEMJNL'),(176,'HDC-S0005','vat_amount',5,'10.20.01.01.01.12','06.00','06.04','G/L Account','ITEMJNL'),(177,'PDC-S0008','cash_sales',1,'B-011','106.00','206.03','Bank Account','ITEMJNL'),(178,'PDC-S0008','card_sales',2,'10.10.01.03.01.08.01','106.00','206.03','G/L Account','ITEMJNL'),(179,'PDC-S0008','variance',3,'10.10.01.03.01.01 ','106.00','206.03','G/L Account','ITEMJNL'),(180,'PDC-S0008','tot_sales',4,'20.40.01.01.01','106.00','206.03','G/L Account','ITEMJNL'),(181,'PDC-S0008','vat_amount',5,'10.20.01.01.01.12','106.00','206.03','G/L Account','ITEMJNL'),(182,'DDC-S0002','cash_sales',1,'B-011','06.00','06.02','Bank Account','ITEMJNL'),(183,'DDC-S0002','card_sales',2,'10.10.01.03.01.08.01','06.00','06.02','G/L Account','ITEMJNL'),(184,'DDC-S0002','variance',3,'10.10.01.03.01.01 ','06.00','06.02','G/L Account','ITEMJNL'),(185,'DDC-S0002','tot_sales',4,'20.40.01.01.01','06.00','06.02','G/L Account','ITEMJNL'),(186,'DDC-S0002','vat_amount',5,'10.20.01.01.01.12','06.00','06.02','G/L Account','ITEMJNL'),(187,'TAL-S0002','cash_sales',1,'B-005','01.02','01.02.1.02','Bank Account','ITEMJNL'),(188,'TAL-S0002','card_sales',2,'10.10.01.03.01.08.01','01.02','01.02.1.02','G/L Account','ITEMJNL'),(189,'TAL-S0002','variance',3,'10.10.01.03.01.01 ','01.02','01.02.1.02','G/L Account','ITEMJNL'),(190,'TAL-S0002','tot_sales',4,'20.40.01.01.01','01.02','01.02.1.02','G/L Account','ITEMJNL'),(191,'TAL-S0002','vat_amount',5,'10.20.01.01.01.14','01.02','01.02.1.02','G/L Account','ITEMJNL'),(192,'TAL-S0008','cash_sales',1,'B-005','01.02','01.02.1.05','Bank Account','ITEMJNL'),(193,'TAL-S0008','card_sales',2,'10.10.01.03.01.08.01','01.02','01.02.1.05','G/L Account','ITEMJNL'),(194,'TAL-S0008','variance',3,'10.10.01.03.01.01 ','01.02','01.02.1.05','G/L Account','ITEMJNL'),(195,'TAL-S0008','tot_sales',4,'20.40.01.01.01','01.02','01.02.1.05','G/L Account','ITEMJNL'),(196,'TAL-S0008','vat_amount',5,'10.20.01.01.01.14','01.02','01.02.1.05','G/L Account','ITEMJNL'),(197,'TAL-S0001','cash_sales',1,'B-005','01.02','01.02.1.01','Bank Account','ITEMJNL'),(198,'TAL-S0001','card_sales',2,'10.10.01.03.01.08.01','01.02','01.02.1.01','G/L Account','ITEMJNL'),(199,'TAL-S0001','variance',3,'10.10.01.03.01.01 ','01.02','01.02.1.01','G/L Account','ITEMJNL'),(200,'TAL-S0001','tot_sales',4,'20.40.01.01.01','01.02','01.02.1.01','G/L Account','ITEMJNL'),(201,'TAL-S0001','vat_amount',5,'10.20.01.01.01.14','01.02','01.02.1.01','G/L Account','ITEMJNL'),(202,NULL,NULL,NULL,NULL,NULL,NULL,NULL,''),(203,'TAL-S0003','cash_sales',1,'B-005','01.02','01.02.1.02','Bank Account','ITEMJNL'),(204,'TAL-S0003','card_sales',2,'10.10.01.03.01.08.01','01.02','01.02.1.02','G/L Account','ITEMJNL'),(205,'TAL-S0003','variance',3,'10.10.01.03.01.01 ','01.02','01.02.1.02','G/L Account','ITEMJNL'),(206,'TAL-S0003','tot_sales',4,'20.40.01.01.01','01.02','01.02.1.02','G/L Account','ITEMJNL'),(207,'TAL-S0003','vat_amount',5,'20.40.01.01.01','01.02','01.02.1.02','G/L Account','ITEMJNL'),(208,'TAL-S0004','cash_sales',1,'B-005','01.02','01.02.1.06','Bank Account','ITEMJNL'),(209,'TAL-S0004','card_sales',2,'10.10.01.03.01.08.01','01.02','01.02.1.06','G/L Account','ITEMJNL'),(210,'TAL-S0004','variance',3,'10.10.01.03.01.01 ','01.02','01.02.1.06','G/L Account','ITEMJNL'),(211,'TAL-S0004','tot_sales',4,'20.40.01.01.01','01.02','01.02.1.06','G/L Account','ITEMJNL'),(212,'TAL-S0004','vat_amount',5,'20.40.01.01.01','01.02','01.02.1.06','G/L Account','ITEMJNL'),(213,'TAL-S0005','cash_sales',1,'B-005','01.02','01.02.1.05','Bank Account','ITEMJNL'),(214,'TAL-S0005','card_sales',2,'10.10.01.03.01.08.01','01.02','01.02.1.05','G/L Account','ITEMJNL'),(215,'TAL-S0005','variance',3,'10.10.01.03.01.01 ','01.02','01.02.1.05','G/L Account','ITEMJNL'),(216,'TAL-S0005','tot_sales',4,'20.40.01.01.01','01.02','01.02.1.05','G/L Account','ITEMJNL'),(217,'TAL-S0005','vat_amount',5,'10.20.01.01.01.14','01.02','01.02.1.05','G/L Account','ITEMJNL'),(218,'AC001','cash_sales',1,'B-006','08.00','08.01.1.01','Bank Account','ITEMJNL'),(219,'AC001','card_sales',2,'10.10.01.03.01.08.01','08.00','08.01.1.01','G/L Account','ITEMJNL'),(220,'AC001','variance',3,'10.10.01.03.01.01 ','08.00','08.01.1.01','G/L Account','ITEMJNL'),(221,'AC001','tot_sales',4,'20.40.01.01.01','08.00','08.01.1.01','G/L Account','ITEMJNL'),(222,'AC001','vat_amount',5,'10.20.01.01.01.14','08.00','08.01.1.01','G/L Account','ITEMJNL'),(223,'AC002','cash_sales',1,'B-006','08.00','08.01.1.04','Bank Account','ITEMJNL'),(224,'AC002','card_sales',2,'10.10.01.03.01.08.01','08.00','08.01.1.04','G/L Account','ITEMJNL'),(225,'AC002','variance',3,'10.10.01.03.01.01 ','08.00','08.01.1.04','G/L Account','ITEMJNL'),(226,'AC002','tot_sales',4,'20.40.01.01.01','08.00','08.01.1.04','G/L Account','ITEMJNL'),(227,'AC002','vat_amount',5,'10.20.01.01.01.14','08.00','08.01.1.04','G/L Account','ITEMJNL'),(228,'FRT-S0005','cash_sales',1,'B-009','01.11','01.11.01.05','Bank Account','ITEMJNL'),(229,'FRT-S0005','card_sales',2,'10.10.01.03.01.08.01','01.11','01.11.01.05','G/L Account','ITEMJNL'),(230,'FRT-S0005','variance',3,'10.10.01.03.01.01 ','01.11','01.11.01.05','G/L Account','ITEMJNL'),(231,'FRT-S0005','tot_sales',4,'20.40.01.01.01','01.11','01.11.01.05','G/L Account','ITEMJNL'),(232,'FRT-S0005','vat_amount',5,'10.20.01.01.01.14','01.11','01.11.01.05','G/L Account','ITEMJNL');
/*!40000 ALTER TABLE `nav_account_masterfile` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-01-18 13:54:38
