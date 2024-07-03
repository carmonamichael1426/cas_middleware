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
-- Table structure for table `nav_tran_sales_bir_consolidated`
--

DROP TABLE IF EXISTS `nav_tran_sales_bir_consolidated`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `nav_tran_sales_bir_consolidated` (
  `sales_id` int(11) NOT NULL AUTO_INCREMENT,
  `store` varchar(45) DEFAULT NULL,
  `db_id` varchar(45) DEFAULT NULL,
  `transaction_no` varchar(45) DEFAULT NULL,
  `line_no` varchar(45) DEFAULT NULL,
  `receipt_no` varchar(45) DEFAULT NULL,
  `barcode_no` varchar(45) DEFAULT NULL,
  `item_code` varchar(45) DEFAULT NULL,
  `description` varchar(200) DEFAULT NULL,
  `sales_staff` varchar(45) DEFAULT NULL,
  `item_department` varchar(45) DEFAULT NULL,
  `item_group` varchar(45) DEFAULT NULL,
  `price` varchar(45) DEFAULT NULL,
  `net_price` varchar(45) DEFAULT NULL,
  `quantity` varchar(45) DEFAULT NULL,
  `vat_code` varchar(45) DEFAULT NULL,
  `transaction_status` varchar(45) DEFAULT NULL,
  `disc_amount` varchar(45) DEFAULT NULL,
  `cost_amount` varchar(45) DEFAULT NULL,
  `date_` varchar(45) DEFAULT NULL,
  `time_` varchar(45) DEFAULT NULL,
  `shift_no` varchar(45) DEFAULT NULL,
  `shift_date` varchar(45) DEFAULT NULL,
  `net_amount` varchar(45) DEFAULT NULL,
  `vat_amount` varchar(45) DEFAULT NULL,
  `promotion_no` varchar(45) DEFAULT NULL,
  `standard_net_price` varchar(45) DEFAULT NULL,
  `disc_amt_from_std_price` varchar(45) DEFAULT NULL,
  `statement_no` varchar(45) DEFAULT NULL,
  `customer_no` varchar(45) DEFAULT NULL,
  `section` varchar(45) DEFAULT NULL,
  `shelf` varchar(45) DEFAULT NULL,
  `statement_code` varchar(45) DEFAULT NULL,
  `item_disc_group` varchar(45) DEFAULT NULL,
  `transaction_code` varchar(45) DEFAULT NULL,
  `store_no` varchar(200) DEFAULT NULL,
  `item_number_scanned` varchar(45) DEFAULT NULL,
  `keyboard_item_entry` varchar(45) DEFAULT NULL,
  `price_in_barcode` varchar(45) DEFAULT NULL,
  `price_change` varchar(45) DEFAULT NULL,
  `weight_manually_entered` varchar(45) DEFAULT NULL,
  `line_was_discounted` varchar(45) DEFAULT NULL,
  `scale_item` varchar(45) DEFAULT NULL,
  `weight_item` varchar(45) DEFAULT NULL,
  `return_no_sale` varchar(45) DEFAULT NULL,
  `item_corrected_line` varchar(45) DEFAULT NULL,
  `type_of_sale` varchar(45) DEFAULT NULL,
  `linked_no_not_orig` varchar(45) DEFAULT NULL,
  `orig_of_linked_item_list` varchar(45) DEFAULT NULL,
  `pos_terminal_no` varchar(45) DEFAULT NULL,
  `staff_id` varchar(45) DEFAULT NULL,
  `item_posting_group` varchar(45) DEFAULT NULL,
  `total_rounded_amt` varchar(45) DEFAULT NULL,
  `counter` varchar(45) DEFAULT NULL,
  `variant_code` varchar(45) DEFAULT NULL,
  `line_discount` varchar(45) DEFAULT NULL,
  `replicated` varchar(45) DEFAULT NULL,
  `customer_discount` varchar(45) DEFAULT NULL,
  `infocode_discount` varchar(45) DEFAULT NULL,
  `cust_invoice_discount` varchar(45) DEFAULT NULL,
  `unit_of_measure` varchar(45) DEFAULT NULL,
  `uom_quantity` varchar(45) DEFAULT NULL,
  `uom_price` varchar(45) DEFAULT NULL,
  `total_discount` varchar(45) DEFAULT NULL,
  `total_disc_percentage` varchar(45) DEFAULT NULL,
  `tot_disc_info_line_no` varchar(45) DEFAULT NULL,
  `periodic_disc_type` varchar(45) DEFAULT NULL,
  `periodic_disc_group` varchar(45) DEFAULT NULL,
  `periodic_discount` varchar(45) DEFAULT NULL,
  `discount_amt_for_printing` varchar(45) DEFAULT NULL,
  `item_division` varchar(45) DEFAULT NULL,
  `addon_code` varchar(45) DEFAULT NULL,
  `addon_percentage` varchar(45) DEFAULT NULL,
  `used_amount` varchar(45) DEFAULT NULL,
  `item_internal_type` varchar(45) DEFAULT NULL,
  `crm_loyalty_card` varchar(45) DEFAULT NULL,
  `crm_loyalty_card_type` varchar(45) DEFAULT NULL,
  `crm_earned_points` varchar(45) DEFAULT NULL,
  `item_points` varchar(45) DEFAULT NULL,
  `vendor_no` varchar(45) DEFAULT NULL,
  `no_stock_posting` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`sales_id`),
  KEY `db_id` (`db_id`),
  KEY `transaction_no` (`transaction_no`),
  KEY `line_no` (`line_no`),
  KEY `receipt_no` (`receipt_no`),
  KEY `barcode_no` (`barcode_no`),
  KEY `item_code` (`item_code`),
  KEY `sales_staff` (`sales_staff`),
  KEY `item_department` (`item_department`),
  KEY `item_group` (`item_group`),
  KEY `price` (`price`),
  KEY `net_price` (`net_price`),
  KEY `quantity` (`quantity`),
  KEY `vat_code` (`vat_code`),
  KEY `transaction_status` (`transaction_status`),
  KEY `disc_amount` (`disc_amount`),
  KEY `cost_amount` (`cost_amount`),
  KEY `date_` (`date_`),
  KEY `time_` (`time_`),
  KEY `shift_no` (`shift_no`),
  KEY `shift_date` (`shift_date`),
  KEY `net_amount` (`net_amount`),
  KEY `vat_amount` (`vat_amount`),
  KEY `promotion_no` (`promotion_no`),
  KEY `standard_net_price` (`standard_net_price`),
  KEY `disc_amt_from_std_price` (`disc_amt_from_std_price`),
  KEY `statement_no` (`statement_no`),
  KEY `customer_no` (`customer_no`),
  KEY `section` (`section`),
  KEY `shelf` (`shelf`),
  KEY `statement_code` (`statement_code`),
  KEY `item_disc_group` (`item_disc_group`),
  KEY `transaction_code` (`transaction_code`),
  KEY `store_no` (`store_no`),
  KEY `item_number_scanned` (`item_number_scanned`),
  KEY `keyboard_item_entry` (`keyboard_item_entry`),
  KEY `price_in_barcode` (`price_in_barcode`),
  KEY `price_change` (`price_change`),
  KEY `weight_manually_entered` (`weight_manually_entered`),
  KEY `line_was_discounted` (`line_was_discounted`),
  KEY `scale_item` (`scale_item`),
  KEY `weight_item` (`weight_item`),
  KEY `return_no_sale` (`return_no_sale`),
  KEY `item_corrected_line` (`item_corrected_line`),
  KEY `type_of_sale` (`type_of_sale`),
  KEY `linked_no_not_orig` (`linked_no_not_orig`),
  KEY `orig_of_linked_item_list` (`orig_of_linked_item_list`),
  KEY `pos_terminal_no` (`pos_terminal_no`),
  KEY `staff_id` (`staff_id`),
  KEY `item_posting_group` (`item_posting_group`),
  KEY `total_rounded_amt` (`total_rounded_amt`),
  KEY `descripton` (`description`),
  KEY `No Stock Posting` (`no_stock_posting`)
) ENGINE=InnoDB AUTO_INCREMENT=7074635 DEFAULT CHARSET=latin1;
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
