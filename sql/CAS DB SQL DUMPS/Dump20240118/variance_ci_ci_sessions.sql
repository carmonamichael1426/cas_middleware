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
-- Table structure for table `ci_sessions`
--

DROP TABLE IF EXISTS `ci_sessions`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `ci_sessions` (
  `id` varchar(128) NOT NULL,
  `ip_address` varchar(45) NOT NULL,
  `timestamp` int(10) unsigned NOT NULL DEFAULT 0,
  `data` blob NOT NULL,
  PRIMARY KEY (`id`),
  KEY `ci_sessions_timestamp` (`timestamp`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `ci_sessions`
--

LOCK TABLES `ci_sessions` WRITE;
/*!40000 ALTER TABLE `ci_sessions` DISABLE KEYS */;
INSERT INTO `ci_sessions` VALUES ('pb16d782dadatpu6q9c9rbm809hq5slv','172.16.43.142',1705396983,'__ci_last_regenerate|i:1705396983;name|s:25:\"Barace, Harvey Jaranilla \";username|s:13:\"barace_harvey\";id_no|s:1:\"2\";emp_id|s:10:\"03836-2023\";system_type|s:7:\"nav-nav\";user_type|s:10:\"Accounting\";business_unit|s:2:\"HO\";session_start|i:1705396600;is_logged_in|b:1;filename_sales|s:10:\"A615-1.txt\";filename_purchase|s:10:\"A615-2.txt\";bu_code1|s:6:\"A615-1\";bu_code2|s:6:\"A615-2\";matched_header|a:3:{s:5:\"match\";a:13:{i:0;s:58:\"ASM-S40022845|ISM-P4311393|08/03/22|08/11/22|5077.5|5052.5\";i:1;s:49:\"ASM-S40022845|ISM-P4311396|08/03/22|08/11/22|0|25\";i:2;s:56:\"ASM-S40022844|ISM-P4311400|08/03/22|08/11/22|68875|68875\";i:3;s:58:\"ASM-S40022938|ISM-P4311690|08/13/22|08/15/22|5495.4|5495.4\";i:4;s:60:\"ASM-S40022945|ISM-P4311923|08/15/22|08/15/22|19629.4|19629.4\";i:5;s:60:\"ASM-S40022973|ISM-P4312594|08/17/22|08/17/22|8638.32|8638.32\";i:6;s:54:\"ASM-S40022955|ISM-P4312595|08/16/22|08/17/22|3750|3750\";i:7;s:56:\"ASM-S40023035|ISM-P4313007|08/24/22|08/24/22|21800|21800\";i:8;s:56:\"ASM-S40023081|ISM-P4314248|08/31/22|09/01/22|12750|12750\";i:9;s:58:\"ASM-S40023067|ISM-P4314249|08/30/22|09/01/22|2709.6|2709.6\";i:10;s:58:\"ASM-S40023068|ISM-P4314250|08/30/22|09/01/22|6710.4|6710.4\";i:11;s:57:\"ASM-S40023121|ISM-P4315113|08/25/22|09/01/22|7548|5683.02\";i:12;s:51:\"ASM-S40023121|ISM-P4315114|08/25/22|09/01/22|0|7548\";}s:10:\"si_nomatch\";a:1:{i:0;s:42:\"ASM-S40023046|08/25/22|SM00690374|11816.02\";}s:10:\"pi_nomatch\";a:4:{i:0;s:43:\"ISM-P4314554|09/05/22|ASM-S40023128|6872.52\";i:1;s:43:\"ISM-P4315107|09/07/22|ASM-S40023137|1446.66\";i:2;s:41:\"ISM-P4315292|09/09/22|ASM-S40023122|81300\";i:3;s:40:\"ISM-P4315294|09/09/22|ASM-S40023123|1420\";}}matched_line|a:7:{s:12:\"line_amounts\";a:0:{}s:20:\"unit_of_measurements\";a:0:{}s:8:\"quantity\";a:0:{}s:5:\"price\";a:0:{}s:13:\"total_amounts\";a:2:{i:0;s:87:\"ASM-S40022845|08/03/22|SM00688211 A|ISM-P4311393|08/11/22|ASM-S40022845|5077.5 = 5052.5\";i:1;s:84:\"ASM-S40023121|08/25/22|SM00690374|ISM-P4315113|09/01/22|ASM-S40023121|7548 = 5683.02\";}s:15:\"sales_multicopy\";a:0:{}s:18:\"purchase_multicopy\";a:0:{}}min_date|s:8:\"08/03/22\";max_date|s:8:\"08/31/22\";msg_success|s:25:\"Upload Successfuly 0.1494\";__ci_vars|a:1:{s:11:\"msg_success\";s:3:\"new\";}'),('j59rl49aehtj31fff8bud9c60t2n71vk','172.16.43.177',1705397888,'__ci_last_regenerate|i:1705397888;'),('m2snadeugc22aosch56k2rj9pvsgg90c','172.16.42.146',1705397940,'__ci_last_regenerate|i:1705397940;'),('n839s2ai6c13taali31e6n53jjjqsngj','172.16.43.142',1705397524,'__ci_last_regenerate|i:1705397524;name|s:9:\"Nayve, CJ\";username|s:5:\"admin\";id_no|s:1:\"1\";emp_id|s:10:\"02172-2023\";system_type|s:0:\"\";user_type|s:5:\"Admin\";business_unit|s:2:\"HO\";session_start|i:1705397219;is_logged_in|b:1;'),('eon89dijl8tri7565i0mf26m2uum43q9','172.16.43.142',1705398201,'__ci_last_regenerate|i:1705398201;'),('jcj9hcis5g90djtfq13cvb16vnkj1eg6','172.16.42.146',1705398559,'__ci_last_regenerate|i:1705398559;'),('bu66i2d5d02gsiek6che6608pfrhfn4i','172.16.43.142',1705398375,'__ci_last_regenerate|i:1705398375;'),('r80umff0frfkdesl6r77rfiuavp90upi','172.16.43.177',1705400772,'__ci_last_regenerate|i:1705400772;name|s:25:\"Barace, Harvey Jaranilla \";username|s:13:\"barace_harvey\";id_no|s:1:\"2\";emp_id|s:10:\"03836-2023\";system_type|s:7:\"inh-nav\";user_type|s:10:\"Accounting\";business_unit|s:2:\"HO\";session_start|i:1705398547;is_logged_in|b:1;'),('amfi61hqhc5fte3d870hha3btudff4f6','172.16.42.146',1705398559,'__ci_last_regenerate|i:1705398559;'),('08equ2j792v8b9ckpru1nb2sh0uamm1l','172.16.43.177',1705400772,'__ci_last_regenerate|i:1705400772;'),('kcevmss73qjvlndc9vkibjfhco3gegvi','172.16.42.146',1705448754,'__ci_last_regenerate|i:1705448754;'),('prj30d5ju31eqau4nng84eb7sq12mf56','172.16.42.146',1705448765,'__ci_last_regenerate|i:1705448765;'),('spafa4id9n3dag81cakttvisashvve0l','172.16.43.177',1705451925,'__ci_last_regenerate|i:1705451760;name|s:30:\"Cagulang, Jaya Marie Cañares \";username|s:13:\"cagulang_jaya\";id_no|s:1:\"7\";emp_id|s:10:\"16501-2018\";system_type|s:7:\"inh-inh\";user_type|s:10:\"Accounting\";business_unit|s:7:\"Lapsaon\";session_start|i:1705451779;is_logged_in|b:1;'),('cevd681rk8r6p272jgqa268uch1eqkj3','172.16.42.146',1705457601,'__ci_last_regenerate|i:1705457600;'),('1rbj1iqiql1c1tdrbm7nhg43ni72lr6g','172.16.43.177',1705475381,'__ci_last_regenerate|i:1705475381;'),('9ehs59f0sn5vf5hveoovipo3h0l34a7l','172.16.43.177',1705477802,'__ci_last_regenerate|i:1705477802;name|s:9:\"Nayve, CJ\";username|s:5:\"admin\";id_no|s:1:\"1\";emp_id|s:10:\"02172-2023\";system_type|s:0:\"\";user_type|s:5:\"Admin\";business_unit|s:2:\"HO\";session_start|i:1705475381;is_logged_in|b:1;'),('3njkhfn9ofkb23e8ir8htk3vrfgeugrm','172.16.43.177',1705479369,'__ci_last_regenerate|i:1705479369;name|s:9:\"Nayve, CJ\";username|s:5:\"admin\";id_no|s:1:\"1\";emp_id|s:10:\"02172-2023\";system_type|s:0:\"\";user_type|s:5:\"Admin\";business_unit|s:2:\"HO\";session_start|i:1705477812;is_logged_in|b:1;'),('tmcddiepc2iqqat4jacqaioq6gooqjvq','172.16.43.177',1705479886,'__ci_last_regenerate|i:1705479886;name|s:25:\"Barace, Harvey Jaranilla \";username|s:13:\"barace_harvey\";id_no|s:1:\"2\";emp_id|s:10:\"03836-2023\";system_type|s:7:\"inh-nav\";user_type|s:10:\"Accounting\";business_unit|s:2:\"HO\";session_start|i:1705479584;is_logged_in|b:1;filename_data|s:10:\"PMS-PI.txt\";bu_code|s:6:\"PMS-PI\";'),('ln7bvecq64odib1virm8gh70cjfila4t','172.16.42.146',1705479632,'__ci_last_regenerate|i:1705479632;'),('ldegcr06h7ohtrples6ufshe0sim3nu7','172.16.43.177',1705479888,'__ci_last_regenerate|i:1705479888;'),('lknop85p9b5d7m8aca5v9ji4polblg9a','172.16.43.142',1705487103,'__ci_last_regenerate|i:1705487103;'),('0bo29nmaapudvplblp5rqel2dmm2lcm6','172.16.42.146',1705536823,'__ci_last_regenerate|i:1705536823;'),('6ia82c239j2iuo9ibc0rm1dcqvrmresu','172.16.42.146',1705536833,'__ci_last_regenerate|i:1705536833;'),('tagf5fdfruierau06f11gn1jebu6iba5','172.16.43.142',1705536984,'__ci_last_regenerate|i:1705536984;');
/*!40000 ALTER TABLE `ci_sessions` ENABLE KEYS */;
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
