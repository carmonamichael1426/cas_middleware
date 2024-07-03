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
-- Table structure for table `nav_accumulated_sales_ledger`
--

DROP TABLE IF EXISTS `nav_accumulated_sales_ledger`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `nav_accumulated_sales_ledger` (
  `ledger_id` int(11) NOT NULL AUTO_INCREMENT,
  `pos_terminal` varchar(45) DEFAULT NULL,
  `acc_date` varchar(45) DEFAULT NULL,
  `store_code` varchar(45) DEFAULT NULL,
  `total_net_sales` varchar(45) DEFAULT NULL,
  `vat_amount` varchar(45) DEFAULT NULL,
  `no_item_sold` varchar(45) DEFAULT NULL,
  `cash_sales` varchar(100) DEFAULT NULL,
  `card_sales` varchar(100) DEFAULT NULL,
  `float_entry` varchar(100) DEFAULT NULL,
  `remove_entry` varchar(100) DEFAULT NULL,
  `vatable_sales` varchar(100) DEFAULT NULL,
  `vat_exempt_sales` varchar(100) DEFAULT NULL,
  `old_accumulated_sales` varchar(100) DEFAULT NULL,
  `new_accumulated_sales` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`ledger_id`),
  KEY `pos_terminal` (`pos_terminal`),
  KEY `acc_date` (`acc_date`),
  KEY `store` (`store_code`),
  KEY `total_net_sales` (`total_net_sales`),
  KEY `vat_amount` (`vat_amount`),
  KEY `no_item_sold` (`no_item_sold`),
  KEY `cash_sales` (`cash_sales`),
  KEY `card_sales` (`card_sales`),
  KEY `float_entry` (`float_entry`),
  KEY `remove_entry` (`remove_entry`),
  KEY `vatable_sales` (`vatable_sales`),
  KEY `vat_exempt_sales` (`vat_exempt_sales`),
  KEY `old_accumulated_sales` (`old_accumulated_sales`),
  KEY `new_accumulated_sales` (`new_accumulated_sales`)
) ENGINE=InnoDB AUTO_INCREMENT=10853 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-01-18 13:55:54
